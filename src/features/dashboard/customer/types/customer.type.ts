export interface ICustomerData {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  profilePicture?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICustomerProfileData {
  id: string;
  member_id: string;
  loyaltyPoints: number;
}

export interface ICustomerDashboardResponse {
  success: boolean;
  message: string;
  data: ICustomerData & {
    customerProfile: ICustomerProfileData;
  };
}
