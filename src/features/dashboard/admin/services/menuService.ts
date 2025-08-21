import type { ApiResponse } from '@/types/ApiResponse';
import type { Menu, CreateMenuInput, UploadResponse } from '../types/menu';
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
