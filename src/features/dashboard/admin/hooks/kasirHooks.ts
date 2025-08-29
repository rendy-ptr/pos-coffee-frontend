import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { CreateKasirInput, Kasir } from '../types/kasir';
import type { ApiResponse } from '@/types/ApiResponse';
import { createKasir, getKasirs } from '../services/kasirService';

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
