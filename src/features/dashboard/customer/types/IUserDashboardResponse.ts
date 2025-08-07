export interface IUserDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
    role: string;
    loyaltyPoints: number;
    phoneNumber: string;
    profilePicture: string;
  };
}
