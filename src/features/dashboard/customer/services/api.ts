import type { IUserDashboardResponse } from '../types/IUserDashboardResponse';
import type { ILogoutData } from '../types/logoutData';
import apiClient from '@/utils/apiClient';

export const fetchCustomerDashboard =
  async (): Promise<IUserDashboardResponse> => {
    const response = await apiClient.get('/dashboard/customer');
    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Gagal memuat dashboard');
    }

    return data;
  };

export const logout = async (): Promise<ILogoutData> => {
  const response = await apiClient.post('/auth/logout');
  const data: ILogoutData = response.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
