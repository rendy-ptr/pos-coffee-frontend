import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import type { BaseCategory } from '../types/category';
import type { ApiResponse } from '@/types/ApiResponse';
import { AxiosError } from 'axios';
import {
  type UpdateCategoryInputPayload,
  type CreateCategoryInputPayload,
  createCategorySchema,
  updateCategorySchema,
} from '../schema/category.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    CreateCategoryInputPayload
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
    ApiResponse<null>,
    Error,
    { id: string; payload: UpdateCategoryInputPayload }
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

export const useCreateCategoryForm = () => {
  const methods = useForm<CreateCategoryInputPayload>({
    resolver: zodResolver(createCategorySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      isActive: undefined,
    },
  });
  return methods;
};

export const useUpdateCategoryForm = () => {
  const methods = useForm<UpdateCategoryInputPayload>({
    resolver: zodResolver(updateCategorySchema),
    mode: 'onBlur',
  });
  return methods;
};
