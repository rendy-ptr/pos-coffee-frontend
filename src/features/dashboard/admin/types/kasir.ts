import type { User } from './user';

export interface BaseKasir extends User {
  kasirProfile: KasirProfile;
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
