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
import { useMemo, useState } from 'react';

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

export interface FilterOption {
  value: string;
  label: string;
}

export const FILTER_OPTIONS: FilterOption[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'aktif', label: 'Kategori Aktif' },
  { value: 'tidakAktif', label: 'Kategori Tidak Aktif' },
];

export const useCategoryFilter = (categories: BaseCategory[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('semua');

  const stats = useMemo(
    () => ({
      total: categories.length,
      active: categories.filter(c => c.isActive).length,
      inactive: categories.filter(c => !c.isActive).length,
    }),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesSearch = searchTerm
        ? category.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesFilter =
        selectedFilter === 'semua'
          ? true
          : selectedFilter === 'aktif'
            ? category.isActive === true
            : category.isActive === false;

      return matchesSearch && matchesFilter;
    });
  }, [categories, searchTerm, selectedFilter]);

  return {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    filteredCategories,
    stats,
  };
};
