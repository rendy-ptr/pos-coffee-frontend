import type { ApiResponse } from '@/types/ApiResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateMejaInput } from '../types/meja';
import { createMeja } from '../services/meja.service';

export const useCreateMeja = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, CreateMejaInput>({
    mutationFn: createMeja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mejas'] });
    },
  });

  return {
    ...mutation,
    doCreateMeja: mutation.mutateAsync,
  };
};
