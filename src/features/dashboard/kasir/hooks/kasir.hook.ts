import { useKasirStore } from '@/store/kasirStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchKasirDashboard, logout } from '../services/kasir.service';
import { useEffect } from 'react';
import axios from 'axios';
import type { IKasirLogoutData } from '../types/kasir';

export const useKasirDashboard = (enabled: boolean) => {
  const { setKasirData, clearKasirData } = useKasirStore();

  const query = useQuery({
    queryKey: ['dashboardKasir'],
    queryFn: ({ signal }) => fetchKasirDashboard(signal),
    enabled,
    retry: (count, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return count < 1;
    },
    staleTime: 60 * 1000,
  });

  // sinkronisasi ke store
  useEffect(() => {
    if (query.isSuccess) {
      setKasirData(query.data.data);
    }
    if (query.isError) {
      clearKasirData();
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    setKasirData,
    clearKasirData,
  ]);

  return query;
};

export function useLogout() {
  const { clearKasirData } = useKasirStore();
  const queryClient = useQueryClient();

  const mutation = useMutation<IKasirLogoutData, Error>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['auth'], exact: true });
      queryClient.removeQueries({ queryKey: ['dashboardKasir'], exact: true });

      clearKasirData();
    },
  });

  return {
    ...mutation,
    doLogout: mutation.mutateAsync,
  };
}
