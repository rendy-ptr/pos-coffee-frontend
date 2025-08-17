import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/services/authService';
import type { AuthMeResponse } from '@/services/authService';

export function useAuth() {
  const query = useQuery<AuthMeResponse>({
    queryKey: ['auth'],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    ...query,
    isAuthenticated: query.data?.success ?? false,
    user: query.data?.data,
    role: query.data?.data?.role,
  };
}
