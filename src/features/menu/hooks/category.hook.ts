import type { PublicCategory } from './../types/category';
import { useQuery } from '@tanstack/react-query';
import { getPublicCategories } from '../services/category.service';

export const usePublicCategories = () => {
  return useQuery<PublicCategory[], Error>({
    queryKey: ['publicCategories'],
    queryFn: getPublicCategories,
  });
};
