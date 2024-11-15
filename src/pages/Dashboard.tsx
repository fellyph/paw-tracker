import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { storageService } from '../services/storage';
import type { Activity, DailyProgress } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [monthlyProgress, setMonthlyProgress] = useState<DailyProgress[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const savedActivities = storageService.getActivities();
    setActivities(savedActivities);

    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const progress = daysInMonth.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayActivities = savedActivities.filter(a => a.date === dateStr);
      const completedActivities = dayActivities.filter(a => a.completed);
      const completionRate = dayActivities.length > 0
        ? (completedActivities.length / dayActivities.length) * 100
        : 0;

      return {
        date: dateStr,
        completionRate,
      };
    });

    setMonthlyProgress(progress);
  }, []);

  const chartData = {
    labels: monthlyProgress.map(day => 
      format(new Date(day.date), 'd MMM', { locale: ptBR })
    ),
    datasets: [
      {
        label: 'Taxa de Conclusão (%)',
        data: monthlyProgress.map(day => day.completionRate),
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progresso Mensal das Atividades',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Conclusão (%)',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard de Atividades</h2>
        <div className="h-[400px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold mb-4">Detalhamento por Dia</h3>
        <div className="space-y-4">
          {monthlyProgress.map((day) => (
            <div key={day.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">
                  {format(new Date(day.date), "dd 'de' MMMM", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-500">
                  Taxa de conclusão: {day.completionRate.toFixed(1)}%
                </p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-brand-500 h-2 rounded-full"
                  style={{ width: `${day.completionRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}