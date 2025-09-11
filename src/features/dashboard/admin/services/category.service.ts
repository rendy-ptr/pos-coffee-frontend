import type { BaseCategory } from '../types/category';
import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';

import { API_PATHS } from '@/constants/apiPaths';
import type {
  UpdateCategoryInputPayload,
  CreateCategoryInputPayload,
} from '../schema/category.schema';

export const createCategory = async (
  payload: CreateCategoryInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.KATEGORI(),
    payload
  );
  return data;
};

export const fetchCategories = async (): Promise<
  ApiResponse<BaseCategory[]>
> => {
  const { data } = await apiClient.get<ApiResponse<BaseCategory[]>>(
    API_PATHS.ADMIN.KATEGORI()
  );

  return data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
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
