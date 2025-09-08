import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchAdminDashboard } from '../services/api.service';
import { useAdminStore } from '@/store/adminStore';

export const useAdminDashboard = (enabled: boolean) => {
  const { setAdminData, clearAdminData } = useAdminStore();

  const query = useQuery({
    queryKey: ['dashboardAdmin'],
    queryFn: ({ signal }) => fetchAdminDashboard(signal),
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
      setAdminData(query.data.data);
    }
    if (query.isError) {
      clearAdminData();
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    setAdminData,
    clearAdminData,
  ]);

  return query;
};
