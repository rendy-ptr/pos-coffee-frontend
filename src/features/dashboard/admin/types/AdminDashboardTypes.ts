export interface IAdminDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    phoneNumber: string;
    profilePicture: string;
  };
}

export interface IAdminLogoutData {
  success: boolean;
  message: string;
}

export interface ICreateCategory {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
}
