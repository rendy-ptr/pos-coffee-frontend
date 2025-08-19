import type {
  Category,
  CreateCategoryInput,
  ApiResponse,
  UpdateCategoryInput,
} from '../types/category';
import apiClient from '@/utils/apiClient';

export const createCategory = async (
  payload: CreateCategoryInput
): Promise<ApiResponse<Category>> => {
  const { data } = await apiClient.post<ApiResponse<Category>>(
    '/admin/kategori',
    payload
  );
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } =
    await apiClient.get<ApiResponse<Category[]>>('/admin/kategori');
  return data.data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryInput
): Promise<ApiResponse<Category>> => {
  const { data } = await apiClient.patch<ApiResponse<Category>>(
    `/admin/kategori/${id}`,
    payload
  );
  return data;
};

export const deleteCategory = async (
  id: string
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/admin/kategori/${id}`
  );
  return data;
};
