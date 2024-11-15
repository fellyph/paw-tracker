export interface Pet {
  name: string;
  gender: 'male' | 'female';
  age: number;
  breed: string;
  imageUrl: string;
}

export interface Activity {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  date: string;
}

export interface DailyProgress {
  date: string;
  completionRate: number;
}