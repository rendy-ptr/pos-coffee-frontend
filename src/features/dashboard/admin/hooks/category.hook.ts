import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import type {
  BaseCategory,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category';
import type { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';

export const useFetchCategories = () => {
  const query = useQuery<ApiResponse<BaseCategory[]>>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return {
    categories: query.data?.data ?? [],
    ...query,
  };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, CreateCategoryInput>({
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
    ApiResponse<null>,
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
