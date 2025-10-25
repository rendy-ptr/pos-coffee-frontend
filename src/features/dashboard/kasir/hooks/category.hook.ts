import type { ApiResponse } from '@/types/ApiResponse';
import type { Category } from '../types/category';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category.service';

export const useCategories = () => {
  const query = useQuery<ApiResponse<Category[]>>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    categories: query.data?.data ?? [],
    ...query,
  };
};
