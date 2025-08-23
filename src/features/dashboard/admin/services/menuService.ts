import type { ApiResponse } from '@/types/ApiResponse';
import type {
  Menu,
  CreateMenuInput,
  UploadResponse,
  UpdateMenuInput,
} from '../types/menu';
import apiClient from '@/utils/apiClient';

export const createMenu = async (
  payload: CreateMenuInput
): Promise<ApiResponse<Menu>> => {
  const { data } = await apiClient.post<ApiResponse<Menu>>(
    '/admin/menu',
    payload
  );
  return data;
};

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await apiClient.post<UploadResponse>(
    '/admin/upload',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return data;
};

export const getMenus = async (): Promise<Menu[]> => {
  const { data } = await apiClient.get<ApiResponse<Menu[]>>('/admin/menu');
  return data.data;
};

export const updateMenu = async (
  id: string,
  payload: UpdateMenuInput
): Promise<ApiResponse<Menu>> => {
  const { data } = await apiClient.patch<ApiResponse<Menu>>(
    `/admin/menu/${id}`,
    payload
  );
  return data;
};

export const deleteMenu = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/admin/menu/${id}`
  );
  return data;
};
