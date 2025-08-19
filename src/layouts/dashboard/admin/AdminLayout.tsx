import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import { useAdminDashboard } from '@/features/dashboard/admin/hooks/useAdminDashboard';
import HeaderAdmin from '@/features/dashboard/admin/sections/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const { isLoading, isError, error } = useAdminDashboard(true);

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <HeaderAdmin />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        {isLoading && (
          <CoffeeLoadingAnimation
            title="Admin Dashboard"
            messages={[
              'Loading dashboard',
              'Fetching analytics',
              'Preparing admin tools',
            ]}
          />
        )}
        {isError && (
          <p className="text-center text-sm text-red-500">
            {(error as Error).message}
          </p>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
