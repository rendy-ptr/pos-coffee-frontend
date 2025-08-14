export interface IKasirDashboardResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    shiftStart: string;
    shiftEnd: string;
    phoneKasir: string;
  };
}
