import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} from '../services/menuService';

import type { ApiResponse } from '@/types/ApiResponse';
import type { Menu, CreateMenuInput, UpdateMenuInput } from '../types/menu';

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<Menu>, Error, CreateMenuInput>({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
  return {
    ...mutation,
    doCreateMenu: mutation.mutateAsync,
  };
};

export const useMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
  });
};

export const useUpdateMenu = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<Menu>,
    Error,
    { id: string; payload: UpdateMenuInput }
  >({
    mutationFn: ({ id, payload }) => updateMenu(id, payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
  return {
    ...mutation,
    doUpdateMenu: mutation.mutateAsync,
  };
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });

  return {
    ...mutation,
    doDeleteMenu: mutation.mutateAsync,
  };
};
