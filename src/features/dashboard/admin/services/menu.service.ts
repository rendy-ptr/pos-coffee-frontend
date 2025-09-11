import type { ApiResponse } from '@/types/ApiResponse';
import type { BaseMenu, UpdateMenuInput } from '../types/menu';
import apiClient from '@/utils/apiClient';
import { API_PATHS } from '@/constants/apiPaths';
import type { CreateMenuInputPayload } from '../schema/menu.schema';

export const createMenu = async (
  payload: CreateMenuInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.MENU(),
    payload
  );
  return data;
};

export const getMenus = async (): Promise<ApiResponse<BaseMenu[]>> => {
  const { data } = await apiClient.get<ApiResponse<BaseMenu[]>>(
    API_PATHS.ADMIN.MENU()
  );
  return data;
};

export const updateMenu = async (
  id: string,
  payload: UpdateMenuInput
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
    API_PATHS.ADMIN.MENU(id),
    payload
  );
  return data;
};

export const deleteMenu = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    API_PATHS.ADMIN.MENU(id)
  );
  return data;
};
