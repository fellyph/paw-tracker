import React from 'react';
import { Camera } from 'lucide-react';

interface PetProfileProps {
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
}

export default function PetProfile({ name, breed, age, imageUrl }: PetProfileProps) {
  return (
    <div className="relative">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-brand-50 transition-colors">
          <Camera className="w-5 h-5 text-brand-600" />
        </button>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        <p className="text-gray-600">
          {breed} • {age} years old
        </p>
      </div>
    </div>
  );
}