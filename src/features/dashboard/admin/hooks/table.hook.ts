import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from '../services/table.service';
import { createTableSchema, editTableSchema } from '../schema/table.schema';

import type { ApiResponse } from '@/types/ApiResponse';
import type { BaseTable } from '../types/table.type';
import type {
  CreateTableFormData,
  EditTableFormData,
} from '../schema/table.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, CreateTableFormData>({
    mutationFn: createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });

  return {
    ...mutation,
    doCreateTable: mutation.mutateAsync,
  };
};

export const useGetTables = () => {
  const query = useQuery<ApiResponse<BaseTable[]>>({
    queryKey: ['tables'],
    queryFn: getTables,
  });

  return {
    tables: query.data?.data ?? [],
    ...query,
  };
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    { id: string; payload: EditTableFormData }
  >({
    mutationFn: ({ id, payload }) => updateTable(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });

  return {
    ...mutation,
    doUpdateTable: mutation.mutateAsync,
  };
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });
  return {
    ...mutation,
    doDeleteTable: mutation.mutateAsync,
  };
};

// React Hooks Form
export const useCreateTableForm = () => {
  const methods = useForm<CreateTableFormData>({
    resolver: zodResolver(createTableSchema),
    mode: 'onBlur',
  });
  return methods;
};

export const useEditTableForm = (defaultValues?: EditTableFormData) => {
  const methods = useForm<EditTableFormData>({
    resolver: zodResolver(editTableSchema),
    defaultValues,
    mode: 'onBlur',
  });

  return methods;
};
