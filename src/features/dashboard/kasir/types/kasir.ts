import type { IUserData } from '@/types/user.type';

export interface IKasirProfileData {
  id: string;
  shiftStart: string;
  shiftEnd: string;
  todaySales: number;
  todayOrder: number;
  totalOrder: number;
  userId: string;
}

export interface IKasirDashboardResponse {
  success: boolean;
  message: string;
  data: IUserData & {
    KasirProfile: IKasirProfileData;
  };
}

export interface IKasirLogoutData {
  success: boolean;
  message: string;
}

export interface IMemberIdData {
  id: string;
  name: string;
  memberId: string;
}
