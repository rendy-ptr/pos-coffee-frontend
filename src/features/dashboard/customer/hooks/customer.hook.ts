import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchCustomerDashboard } from '../services/customer.service';
import { useCustomerStore } from '@/store/customerStore';

export const useCustomerDashboard = (enabled: boolean) => {
  const { setCustomerData, clearCustomerData } = useCustomerStore();

  const query = useQuery({
    queryKey: ['dashboardCustomer'],
    queryFn: ({ signal }) => fetchCustomerDashboard(signal),
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
      setCustomerData(query.data.data);
    }
    if (query.isError) {
      clearCustomerData();
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    setCustomerData,
    clearCustomerData,
  ]);

  return query;
};
