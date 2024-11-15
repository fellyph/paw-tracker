import React from 'react';
import { Calendar, Sun, Moon } from 'lucide-react';

type Activity = {
  id: number;
  name: string;
  time: string;
};

export function ActivityLog() {
  const [activities, setActivities] = React.useState<Activity[]>([
    { id: 1, name: 'Morning Walk', time: '8:00 AM' },
    { id: 2, name: 'Lunch', time: '12:00 PM' },
    { id: 3, name: 'Evening Walk', time: '6:00 PM' },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Daily Activities</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              {activity.time.includes('AM') ? (
                <Sun className="w-5 h-5 text-brand-500" />
              ) : (
                <Moon className="w-5 h-5 text-brand-500" />
              )}
              <span>{activity.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}