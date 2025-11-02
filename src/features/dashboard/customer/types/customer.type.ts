import type { IUserData } from '@/types/user.type';

export interface ICustomerProfileData {
  id: string;
  member_id: string;
  loyaltyPoints: number;
}

export interface ICustomerDashboardResponse {
  success: boolean;
  message: string;
  data: IUserData & {
    customerProfile: ICustomerProfileData;
  };
}
