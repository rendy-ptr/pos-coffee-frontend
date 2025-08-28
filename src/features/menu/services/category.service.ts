import apiClient from '@/utils/apiClient';
import type { PublicCategory } from '../types/category';
import type { ApiResponse } from '@/types/ApiResponse';
import { API_PATHS } from '@/constants/apiPaths';

export const getPublicCategories = async (): Promise<PublicCategory[]> => {
  const { data } = await apiClient.get<ApiResponse<PublicCategory[]>>(
    API_PATHS.PUBLIC.KATEGORI()
  );
  return data.data;
};
