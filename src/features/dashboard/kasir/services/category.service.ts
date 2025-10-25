import { API_PATHS } from '@/constants/apiPaths';
import type { ApiResponse } from '@/types/ApiResponse';
import type { Category } from '../types/category';
import apiClient from '@/utils/apiClient';

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const { data } = await apiClient.get<ApiResponse<Category[]>>(
    API_PATHS.KASIR.CATEGORY()
  );
  return data;
};
