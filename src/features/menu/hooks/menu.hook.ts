import { useQuery } from '@tanstack/react-query';
import { getPublicMenus } from '../services/menu.service';
import type { PublicMenu } from '../types/menu';

export const usePublicMenus = () => {
  return useQuery<PublicMenu[], Error>({
    queryKey: ['publicMenus'],
    queryFn: getPublicMenus,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
