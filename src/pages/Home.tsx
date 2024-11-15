import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, X } from 'lucide-react';
import { storageService } from '../services/storage';
import type { Activity, Pet, DailyProgress } from '../types';

export default function Home() {
  const [pet, setPet] = useState<Pet | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<DailyProgress[]>([]);

  useEffect(() => {
    const savedPet = storageService.getPet();
    const savedActivities = storageService.getActivities();
    setPet(savedPet);
    
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const todayActivities = savedActivities.map(activity => ({
      ...activity,
      date: todayStr,
    }));
    
    setActivities(todayActivities);
    calculateWeeklyProgress(savedActivities);
  }, []);

  const calculateWeeklyProgress = (allActivities: Activity[]) => {
    const today = new Date();
    const progress: DailyProgress[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayActivities = allActivities.filter(a => a.date === dateStr);
      const completedActivities = dayActivities.filter(a => a.completed);
      const completionRate = dayActivities.length > 0
        ? (completedActivities.length / dayActivities.length) * 100
        : 0;

      progress.push({
        date: dateStr,
        completionRate,
      });
    }

    setWeeklyProgress(progress);
    storageService.saveDailyProgress(progress);
  };

  const toggleActivity = (activityId: string) => {
    const updatedActivities = activities.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: !activity.completed }
        : activity
    );
    
    setActivities(updatedActivities);
    storageService.saveActivities(updatedActivities);
    calculateWeeklyProgress(updatedActivities);
  };

  return (
    <div className="space-y-8">
      {pet && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{pet.name}</h2>
              <p className="text-gray-600">
                {pet.breed} • {pet.age} anos • {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Atividades de Hoje</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <button
                  onClick={() => toggleActivity(activity.id)}
                  className={`p-2 rounded-full ${
                    activity.completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {activity.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Progresso Semanal</h3>
          <div className="space-y-4">
            {weeklyProgress.map((day) => (
              <div key={day.date} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{format(new Date(day.date), "EEEE", { locale: ptBR })}</span>
                  <span>{day.completionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${day.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}