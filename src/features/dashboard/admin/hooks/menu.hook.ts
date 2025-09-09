import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} from '../services/menu.service';

import type { ApiResponse } from '@/types/ApiResponse';
import type { CreateMenuInput, UpdateMenuInput, BaseMenu } from '../types/menu';

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, CreateMenuInput>({
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
  const query = useQuery<ApiResponse<BaseMenu[]>>({
    queryKey: ['menus'],
    queryFn: getMenus,
  });

  return {
    menus: query.data?.data ?? [],
    ...query,
  };
};

export const useUpdateMenu = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
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
