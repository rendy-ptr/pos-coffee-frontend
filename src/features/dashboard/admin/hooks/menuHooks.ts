import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createMenu, uploadImage } from '../services/menuService';

import type { ApiResponse } from '@/types/ApiResponse';
import type { Menu, CreateMenuInput, UploadResponse } from '../types/menu';

export const useUploadImage = () => {
  const mutation = useMutation<UploadResponse, Error, File>({
    mutationFn: uploadImage,
  });

  return {
    ...mutation,
    doUploadImage: mutation.mutateAsync,
  };
};

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
