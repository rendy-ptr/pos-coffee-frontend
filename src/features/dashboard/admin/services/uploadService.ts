import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';
import type { UploadResponse } from '../types/upload';

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await apiClient.post<UploadResponse>(
    API_PATHS.PUBLIC.UPLOAD_IMAGE,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return data;
};
