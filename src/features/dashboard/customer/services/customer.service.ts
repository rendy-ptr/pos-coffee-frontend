import type { ICustomerDashboardResponse } from '../types/customer.type';
import type { ICustomerLogoutData } from '../types/logoutData';
import apiClient from '@/utils/apiClient';
import axios from 'axios';

export const logout = async (): Promise<ICustomerLogoutData> => {
  const response = await apiClient.post('/auth/logout');
  const data: ICustomerLogoutData = response.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};

export const fetchCustomerDashboard = async (
  signal?: AbortSignal
): Promise<ICustomerDashboardResponse> => {
  try {
    const response = await apiClient.get<ICustomerDashboardResponse>(
      '/dashboard/customer',
      { signal }
    );
    const data: ICustomerDashboardResponse = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Gagal memuat dashboard');
    }

    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ERR_CANCELED') {
        throw err;
      }
      if (err.response) {
        throw new Error(
          err.response.data?.message ||
            `Error ${err.response.status}: Gagal memuat data`
        );
      }
      if (err.request) {
        throw new Error(
          'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
        );
      }
    }
    throw new Error('Terjadi kesalahan yang tidak diketahui');
  }
};
