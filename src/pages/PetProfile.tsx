import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { storageService } from '../services/storage';
import { identifyDogBreed } from '../services/ai';
import type { Pet } from '../types';

export default function PetProfile() {
  const [pet, setPet] = useState<Pet>({
    name: '',
    gender: 'male',
    age: 0,
    breed: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedPet = storageService.getPet();
    if (savedPet) setPet(savedPet);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const breed = await identifyDogBreed(base64);
        setPet(prev => ({
          ...prev,
          imageUrl: base64,
          breed,
        }));
        storageService.savePet({ ...pet, imageUrl: base64, breed });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.savePet(pet);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Perfil do Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="aspect-square w-48 mx-auto overflow-hidden rounded-full bg-gray-100">
              {pet.imageUrl ? (
                <img
                  src={pet.imageUrl}
                  alt="Pet"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-1/2 translate-x-12 translate-y-3">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
              <span className="cursor-pointer bg-brand-500 text-white p-2 rounded-full shadow-lg hover:bg-brand-600 transition-colors">
                <Camera className="w-5 h-5" />
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={pet.name}
                onChange={(e) => setPet(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sexo</label>
              <select
                value={pet.gender}
                onChange={(e) => setPet(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              >
                <option value="male">Macho</option>
                <option value="female">Fêmea</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Idade</label>
              <input
                type="number"
                value={pet.age}
                onChange={(e) => setPet(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Raça</label>
              <input
                type="text"
                value={pet.breed}
                onChange={(e) => setPet(prev => ({ ...prev, breed: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                readOnly={isLoading}
              />
              {isLoading && (
                <p className="text-sm text-gray-500 mt-1">Identificando raça...</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-500 text-white py-2 px-4 rounded-md hover:bg-brand-600 transition-colors"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}