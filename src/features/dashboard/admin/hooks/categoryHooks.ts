import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';
import type {
  Category,
  CreateCategoryInput,
  ApiResponse,
  UpdateCategoryInput,
} from '../types/category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
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

  const mutation = useMutation<ApiResponse<null>, Error, string>({
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
