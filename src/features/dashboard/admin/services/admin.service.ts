import type { IAdminDashboardResponse, IAdminLogoutData } from '../types/admin';
import apiClient from '@/utils/apiClient';
import axios from 'axios';
import { API_PATHS } from '@/constants/apiPaths';
import type { UpdateAdminProfileSchemaPayload } from '../schema/admin.schema';
import type { ApiResponse } from '@/types/ApiResponse';

export const logout = async (): Promise<IAdminLogoutData> => {
  const res = await apiClient.post(API_PATHS.AUTH.LOGOUT);
  const data: IAdminLogoutData = res.data;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};

export const fetchAdminDashboard = async (
  signal?: AbortSignal
): Promise<IAdminDashboardResponse> => {
  try {
    const res = await apiClient.get<IAdminDashboardResponse>(
      API_PATHS.ADMIN.DASHBOARD,
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

export const updateAdminProfile = async (
  id: string,
  payload: UpdateAdminProfileSchemaPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
    API_PATHS.ADMIN.SETTING(id),
    payload
  );
  return data;
};
