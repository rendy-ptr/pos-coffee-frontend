import type { ApiResponse } from '@/types/ApiResponse';
import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';
import type { CreateKasirInput, Kasir, UpdateKasirInput } from '../types/kasir';

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

export const updateKasir = async (
  id: string,
  payload: UpdateKasirInput
): Promise<ApiResponse<Kasir>> => {
  const { data } = await apiClient.patch<ApiResponse<Kasir>>(
    API_PATHS.ADMIN.KASIR(id),
    payload
  );
  return data;
};

export const deleteKasir = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    API_PATHS.ADMIN.KASIR(id)
  );
  return data;
};

export const refreshKasir = async (id: string): Promise<Kasir> => {
  const { data } = await apiClient.get<ApiResponse<Kasir>>(
    API_PATHS.ADMIN.KASIR(id)
  );
  return data.data;
};
