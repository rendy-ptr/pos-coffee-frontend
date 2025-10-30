import type { ApiResponse } from '@/types/ApiResponse';
import type { IBaseTable } from '../types/table';
import { useQuery } from '@tanstack/react-query';
import { getTables } from '../services/table.service';

export const useTables = () => {
  const query = useQuery<ApiResponse<IBaseTable[]>>({
    queryKey: ['tables'],
    queryFn: getTables,
  });

  return {
    tables: query.data?.data ?? [],
    ...query,
  };
};
