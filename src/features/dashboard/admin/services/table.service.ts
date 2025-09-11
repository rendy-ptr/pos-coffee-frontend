import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';
import { API_PATHS } from '@/constants/apiPaths';
import type { BaseTable } from '../types/table.type';
import type {
  CreateTableFormData,
  EditTableFormData,
} from '../schema/table.schema';

export const createTable = async (
  payload: CreateTableFormData
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

export const updateTable = async (
  id: string,
  payload: EditTableFormData
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
    API_PATHS.ADMIN.TABLE(id),
    payload
  );
  return data;
};
