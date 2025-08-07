export interface ILogoutData {
  success: boolean;
  message: string;
  data: {
    redirectUrl: string;
  };
}
