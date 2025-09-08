import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';
import { API_PATHS } from '@/constants/apiPaths';
import type { CreateMejaInput } from '../types/meja';

export const createMeja = async (
  payload: CreateMejaInput
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.MEJA(),
    payload
  );
  return data;
};
