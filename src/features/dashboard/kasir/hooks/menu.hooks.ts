import type { ApiResponse } from '@/types/ApiResponse';
import type { MenuWithCategory } from '../types/menu';
import { useQuery } from '@tanstack/react-query';
import { getMenus } from '../services/menu.service';

export const useMenus = () => {
  const query = useQuery<ApiResponse<MenuWithCategory[]>>({
    queryKey: ['menus'],
    queryFn: getMenus,
  });

  return {
    menus: query.data?.data ?? [],
    ...query,
  };
};
