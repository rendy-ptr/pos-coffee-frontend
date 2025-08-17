import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CoffeeLoadingAnimation from './CoffeeLoadingAnimation';

interface ProtectedRouteProps {
  allowedRoles: Array<'CUSTOMER' | 'KASIR' | 'ADMIN'>;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, role } = useAuth();

  if (isLoading) {
    return <CoffeeLoadingAnimation />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && (role === undefined || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
