export interface ICustomerDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    loyaltyPoints: number;
    phoneNumber: string;
    profilePicture: string;
    createdAt: string;
  };
}
