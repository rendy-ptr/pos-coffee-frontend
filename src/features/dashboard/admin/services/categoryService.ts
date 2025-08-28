import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category';
import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';

import { API_PATHS } from '@/constants/apiPaths';

export const createCategory = async (
  payload: CreateCategoryInput
): Promise<ApiResponse<Category>> => {
  const { data } = await apiClient.post<ApiResponse<Category>>(
    API_PATHS.ADMIN.KATEGORI(),
    payload
  );
  return data;
};

export const getAdminCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get<ApiResponse<Category[]>>(
    API_PATHS.ADMIN.KATEGORI()
  );
  return data.data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryInput
): Promise<ApiResponse<Category>> => {
  const { data } = await apiClient.patch<ApiResponse<Category>>(
    API_PATHS.ADMIN.KATEGORI(id),
    payload
  );
  return data;
};

export const deleteCategory = async (
  id: string
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    API_PATHS.ADMIN.KATEGORI(id)
  );
  return data;
};
