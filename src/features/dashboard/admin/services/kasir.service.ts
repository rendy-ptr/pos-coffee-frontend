import type { ApiResponse } from '@/types/ApiResponse';
import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';
import type { BaseKasir } from '../types/kasir';
import type {
  CreateKasirInputPayload,
  UpdateKasirInputPayload,
} from '../schema/kasir.schema';

export const createKasir = async (
  payload: CreateKasirInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.KASIR(),
    payload
  );
  return data;
};

export const getKasirs = async (): Promise<ApiResponse<BaseKasir[]>> => {
  const { data } = await apiClient.get<ApiResponse<BaseKasir[]>>(
    API_PATHS.ADMIN.KASIR()
  );
  return data;
};

export const updateKasir = async (
  id: string,
  payload: UpdateKasirInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
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

export const refreshKasir = async (
  id: string
): Promise<ApiResponse<BaseKasir>> => {
  const { data } = await apiClient.get<ApiResponse<BaseKasir>>(
    API_PATHS.ADMIN.KASIR(id)
  );
  return data;
};
