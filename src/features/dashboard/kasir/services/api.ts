import apiClient from '@/utils/apiClient';
import type { IKasirLogoutData } from '../types/logoutData';

export const logout = async (): Promise<IKasirLogoutData> => {
  const response = await apiClient.post('/auth/logout');
  const data: IKasirLogoutData = response.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
