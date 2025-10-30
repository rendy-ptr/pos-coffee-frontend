import type { IBaseTable } from './../types/table';
import { API_PATHS } from '@/constants/apiPaths';
import type { ApiResponse } from '@/types/ApiResponse';
import apiClient from '@/utils/apiClient';

export const getTables = async (): Promise<ApiResponse<IBaseTable[]>> => {
  const { data } = await apiClient.get<ApiResponse<IBaseTable[]>>(
    API_PATHS.KASIR.TABLE()
  );
  return data;
};
