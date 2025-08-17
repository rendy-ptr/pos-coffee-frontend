import apiClient from '@/utils/apiClient';

export interface AuthMeResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    role: 'CUSTOMER' | 'KASIR' | 'ADMIN';
  };
}

export const getMe = async (): Promise<AuthMeResponse> => {
  const res = await apiClient.get<AuthMeResponse>('/auth/me');
  return res.data;
};

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    role: string;
    redirectUrl: string;
  };
}

export const login = async (payload: { email: string; password: string }) => {
  const res = await apiClient.post<LoginResponse>('/auth/login', payload);
  return res.data;
};
