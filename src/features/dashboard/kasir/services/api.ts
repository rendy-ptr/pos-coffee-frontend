import apiClient from '@/utils/apiClient';
import type { IKasirLogoutData } from '../types/logoutData';
import type { IKasirDashboardResponse } from '../types/KasirDashboardResponse';

export const fetchKasirDashboard =
  async (): Promise<IKasirDashboardResponse> => {
    const response = await apiClient.get('/dashboard/kasir');
    const data: IKasirDashboardResponse = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Gagal memuat dashboard');
    }

    return data;
  };

export const logout = async (): Promise<IKasirLogoutData> => {
  const response = await apiClient.post('/auth/logout');
  const data: IKasirLogoutData = response.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
