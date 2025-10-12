export interface IAdminDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    phone: string;
    profilePicture: string;
  };
}

export interface IAdminUpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  profilePicture?: string | null;
  currentPassword?: string;
  newPassword?: string;
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
