import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';
import { API_PATHS } from '@/constants/apiPaths';
import type { CreateTableInput, BaseTable } from '../types/table.type';

export const createTable = async (
  payload: CreateTableInput
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.TABLE(),
    payload
  );
  return data;
};

export const getTables = async (): Promise<ApiResponse<BaseTable[]>> => {
  const { data } = await apiClient.get<ApiResponse<BaseTable[]>>(
    API_PATHS.ADMIN.TABLE()
  );
  return data;
};
