import type { ApiResponse } from '@/types/ApiResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateTableInput } from '../types/table.type';
import { createTable } from '../services/table.service';

export const useCreateTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, CreateTableInput>({
    mutationFn: createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mejas'] });
    },
  });

  return {
    ...mutation,
    doCreateTable: mutation.mutateAsync,
  };
};
