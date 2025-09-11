import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} from '../services/menu.service';

import type { ApiResponse } from '@/types/ApiResponse';
import type { UpdateMenuInput, BaseMenu } from '../types/menu';
import {
  createMenuSchema,
  type CreateMenuInputPayload,
} from '../schema/menu.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    CreateMenuInputPayload
  >({
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

export const useCreateMenuForm = () => {
  const method = useForm<CreateMenuInputPayload>({
    resolver: zodResolver(createMenuSchema),
    mode: 'onBlur',
  });
  return method;
};
