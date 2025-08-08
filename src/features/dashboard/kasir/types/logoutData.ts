export interface IKasirLogoutData {
  success: boolean;
  message: string;
  data: {
    redirectUrl: string;
  };
}
