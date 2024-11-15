import React from 'react';
import { Camera } from 'lucide-react';

export function PetPhoto() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Pet Photo</h2>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1"
          alt="Pet"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 bg-brand-500 text-white p-2 rounded-full shadow-lg hover:bg-brand-600 transition-colors">
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}