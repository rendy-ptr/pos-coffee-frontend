import type { ICustomerDashboardResponse } from '../types/CustomerDashboardResponse';
import type { ICustomerLogoutData } from '../types/logoutData';
import apiClient from '@/utils/apiClient';

export const fetchCustomerDashboard =
  async (): Promise<ICustomerDashboardResponse> => {
    const response = await apiClient.get('/dashboard/customer');
    const data: ICustomerDashboardResponse = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Gagal memuat dashboard');
    }

    return data;
  };

export const logout = async (): Promise<ICustomerLogoutData> => {
  const response = await apiClient.post('/auth/logout');
  const data: ICustomerLogoutData = response.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
