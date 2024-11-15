import { Pet, Activity, DailyProgress } from '../types';

const STORAGE_KEYS = {
  PET: 'pet_profile',
  ACTIVITIES: 'pet_activities',
  PROGRESS: 'daily_progress',
};

export const storageService = {
  getPet: (): Pet | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PET);
    return data ? JSON.parse(data) : null;
  },

  savePet: (pet: Pet): void => {
    localStorage.setItem(STORAGE_KEYS.PET, JSON.stringify(pet));
  },

  getActivities: (): Activity[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : [];
  },

  saveActivities: (activities: Activity[]): void => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  },

  getDailyProgress: (): DailyProgress[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : [];
  },

  saveDailyProgress: (progress: DailyProgress[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
};