import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminStore } from '@/store/adminStore';
import { logout } from '../services/api.service';
import type { IAdminLogoutData } from '../types/AdminDashboardTypes';

export function useLogout() {
  const { clearAdminData } = useAdminStore();
  const queryClient = useQueryClient();

  const mutation = useMutation<IAdminLogoutData, Error>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'], exact: true });
      queryClient.removeQueries({ queryKey: ['dashboardAdmin'], exact: true });

      clearAdminData();
    },
  });

  return {
    ...mutation,
    doLogout: mutation.mutateAsync,
  };
}
