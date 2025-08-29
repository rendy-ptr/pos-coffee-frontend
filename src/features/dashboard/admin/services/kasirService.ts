import type { ApiResponse } from '@/types/ApiResponse';
import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';
import type { CreateKasirInput, Kasir } from '../types/kasir';

export const createKasir = async (
  payload: CreateKasirInput
): Promise<ApiResponse<Kasir>> => {
  const { data } = await apiClient.post<ApiResponse<Kasir>>(
    API_PATHS.ADMIN.KASIR(),
    payload
  );
  return data;
};

export const getKasirs = async (): Promise<Kasir[]> => {
  const { data } = await apiClient.get<ApiResponse<Kasir[]>>(
    API_PATHS.ADMIN.KASIR()
  );
  return data.data;
};
