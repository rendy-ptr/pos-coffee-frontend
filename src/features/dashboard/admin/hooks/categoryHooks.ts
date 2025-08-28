import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category';
import type { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAdminCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<Category>,
    Error,
    CreateCategoryInput
  >({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    ...mutation,
    doCreateCategory: mutation.mutateAsync,
  };
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<Category>,
    Error,
    { id: string; payload: UpdateCategoryInput }
  >({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    ...mutation,
    doUpdateCategory: mutation.mutateAsync,
  };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    string
  >({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    ...mutation,
    doDeleteCategory: mutation.mutateAsync,
  };
};
