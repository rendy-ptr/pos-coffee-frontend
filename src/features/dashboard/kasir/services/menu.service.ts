import type { ApiResponse } from '@/types/ApiResponse';
import type { MenuWithCategory } from '../types/menu';
import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';

export const getMenus = async (): Promise<ApiResponse<MenuWithCategory[]>> => {
  const { data } = await apiClient.get<ApiResponse<MenuWithCategory[]>>(
    API_PATHS.KASIR.MENU()
  );
  return data;
};
