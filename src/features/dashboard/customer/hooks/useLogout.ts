import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomerStore } from '@/store/customerStore';
import { logout } from '../services/api';
import type { ICustomerLogoutData } from '../types/logoutData';

export function useLogout() {
  const { clearCustomerData } = useCustomerStore();
  const queryClient = useQueryClient();

  const mutation = useMutation<ICustomerLogoutData, Error>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'], exact: true });
      queryClient.removeQueries({
        queryKey: ['dashboardCustomer'],
        exact: true,
      });

      clearCustomerData();
    },
  });

  return {
    ...mutation,
    doLogout: mutation.mutateAsync,
  };
}
