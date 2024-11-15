import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { storageService } from '../services/storage';
import type { Activity } from '../types';

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState({ name: '', time: '' });

  useEffect(() => {
    const savedActivities = storageService.getActivities();
    if (savedActivities.length > 0) setActivities(savedActivities);
  }, []);

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.time) return;

    const activity: Activity = {
      id: Date.now().toString(),
      name: newActivity.name,
      time: newActivity.time,
      completed: false,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedActivities = [...activities, activity];
    setActivities(updatedActivities);
    storageService.saveActivities(updatedActivities);
    setNewActivity({ name: '', time: '' });
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    storageService.saveActivities(updatedActivities);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Gerenciar Atividades</h2>
        
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome da atividade"
              value={newActivity.name}
              onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
            />
            <input
              type="time"
              value={newActivity.time}
              onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
            />
            <button
              onClick={handleAddActivity}
              className="bg-brand-500 text-white p-2 rounded-md hover:bg-brand-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

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
                onClick={() => handleDeleteActivity(activity.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}