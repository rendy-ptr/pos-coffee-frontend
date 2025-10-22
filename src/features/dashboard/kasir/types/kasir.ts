export interface IKasirDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    profilePicture: string;
    KasirProfile: {
      id: string;
      shiftStart: string;
      shiftEnd: string;
      todaySales: number;
      todayOrder: number;
      totalOrder: number;
      userId: string;
    };
  };
}

export interface IKasirLogoutData {
  success: boolean;
  message: string;
}
