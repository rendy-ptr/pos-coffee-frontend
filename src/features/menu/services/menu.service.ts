import type { PublicMenu } from './../types/menu';
import apiClient from '@/utils/apiClient';
import type { ApiResponse } from '@/types/ApiResponse';
import { API_PATHS } from '@/constants/apiPaths';

export const getPublicMenus = async (): Promise<PublicMenu[]> => {
  const { data } = await apiClient.get<ApiResponse<PublicMenu[]>>(
    API_PATHS.PUBLIC.MENU()
  );
  return data.data;
};
