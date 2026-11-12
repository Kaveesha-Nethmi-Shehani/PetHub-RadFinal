export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'owner' | 'vet' | 'admin';
  phone: string;
  token?: string;
}

export interface Pet {
  _id: string;
  owner: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: number;
  weight: number;
  gender: 'Male' | 'Female';
  medicalHistory: string[];
  createdAt: string;
}

export interface Appointment {
  _id: string;
  pet: Pet | string;
  owner: User | string;
  vet?: User | string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vetNotes?: string;
  createdAt: string;
}