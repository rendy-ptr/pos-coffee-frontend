import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { BaseKasir } from '../types/kasir';
import type { ApiResponse } from '@/types/ApiResponse';
import {
  createKasir,
  deleteKasir,
  getKasirs,
  refreshKasir,
  updateKasir,
} from '../services/kasir.service';
import {
  CreateKasirSchema,
  editKasirSchema,
  type CreateKasirInputPayload,
  type UpdateKasirInputPayload,
} from '../schema/kasir.schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateKasir = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    CreateKasirInputPayload
  >({
    mutationFn: createKasir,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kasirs'] });
    },
  });
  return {
    ...mutation,
    doCreateKasir: mutation.mutateAsync,
  };
};

export const useGetKasirs = () => {
  const query = useQuery<ApiResponse<BaseKasir[]>>({
    queryKey: ['kasirs'],
    queryFn: getKasirs,
  });

  return {
    kasirs: query.data?.data ?? [],
    ...query,
  };
};

export const useUpdateKasir = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    { id: string; payload: UpdateKasirInputPayload }
  >({
    mutationFn: ({ id, payload }) => updateKasir(id, payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['kasirs'] });
    },
  });
  return {
    ...mutation,
    doUpdateKasir: mutation.mutateAsync,
  };
};

export const useDeleteKasir = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteKasir,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kasirs'] });
    },
  });
  return {
    ...mutation,
    doDeleteKasir: mutation.mutateAsync,
  };
};

export const useRefreshKasir = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<BaseKasir>, Error, string>({
    mutationFn: refreshKasir,
    onSuccess: (data, id) => {
      queryClient.setQueryData(['kasir', id], data);
    },
  });

  return {
    ...mutation,
    doRefreshKasir: mutation.mutateAsync,
  };
};

export const useCreateKasirForm = () => {
  const method = useForm<CreateKasirInputPayload>({
    resolver: zodResolver(CreateKasirSchema),
    mode: 'onBlur',
  });
  return {
    ...method,
    Controller,
  };
};

export const useEditKasirForm = () => {
  const method = useForm<UpdateKasirInputPayload>({
    resolver: zodResolver(editKasirSchema),
    mode: 'onBlur',
  });
  return {
    ...method,
    Controller,
  };
};
