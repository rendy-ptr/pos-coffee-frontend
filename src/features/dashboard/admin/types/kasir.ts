import type { User } from './user';

export interface Kasir extends User {
  kasirProfile?: KasirProfile | null;
}

export interface KasirProfile {
  id: string;
  shiftStart: string;
  shiftEnd: string;
  todaySales: number;
  todayOrder: number;
  totalOrder: number;
  userId: string;
}

export interface CreateKasirInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture?: string | null;
  shiftStart: string;
  shiftEnd: string;
  isActive: boolean;
}
