import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

export function MoodTracker() {
  const [mood, setMood] = React.useState<'happy' | 'neutral' | 'sad'>('happy');

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Today's Mood</h2>
      <div className="flex justify-around">
        <button
          onClick={() => setMood('happy')}
          className={`p-2 rounded-full ${
            mood === 'happy' ? 'bg-brand-100 text-brand-500' : 'text-gray-400'
          }`}
        >
          <Smile className="w-8 h-8" />
        </button>
        <button
          onClick={() => setMood('neutral')}
          className={`p-2 rounded-full ${
            mood === 'neutral' ? 'bg-brand-100 text-brand-500' : 'text-gray-400'
          }`}
        >
          <Meh className="w-8 h-8" />
        </button>
        <button
          onClick={() => setMood('sad')}
          className={`p-2 rounded-full ${
            mood === 'sad' ? 'bg-brand-100 text-brand-500' : 'text-gray-400'
          }`}
        >
          <Frown className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}