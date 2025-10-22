import apiClient from '@/utils/apiClient';
import type { IKasirDashboardResponse, IKasirLogoutData } from '../types/kasir';
import axios from 'axios';
import { API_PATHS } from '@/constants/apiPaths';

export const fetchKasirDashboard = async (
  signal?: AbortSignal
): Promise<IKasirDashboardResponse> => {
  try {
    const res = await apiClient.get<IKasirDashboardResponse>(
      API_PATHS.KASIR.DASHBOARD,
      { signal }
    );
    const data = res.data;
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

export const logout = async (): Promise<IKasirLogoutData> => {
  const res = await apiClient.post(API_PATHS.AUTH.LOGOUT);
  const data: IKasirLogoutData = res.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
