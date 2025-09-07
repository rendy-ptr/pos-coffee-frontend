import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { CreateKasirInput, Kasir, UpdateKasirInput } from '../types/kasir';
import type { ApiResponse } from '@/types/ApiResponse';
import {
  createKasir,
  deleteKasir,
  getKasirs,
  updateKasir,
} from '../services/kasirService';

export const useCreateKasir = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<Kasir>, Error, CreateKasirInput>({
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
  return useQuery({
    queryKey: ['kasirs'],
    queryFn: getKasirs,
  });
};

export const useUpdateKasir = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<Kasir>,
    Error,
    { id: string; payload: UpdateKasirInput }
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
