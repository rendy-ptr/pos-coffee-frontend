import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import { useAdminDashboard } from '@/features/dashboard/admin/hooks/admin.hook';
import HeaderAdmin from '@/features/dashboard/admin/components/sections/Header/AdminHeader';
import { Outlet } from 'react-router-dom';
import CoffeeErrorAnimation from '@/components/shared/CoffeeErrorAnimation';

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
          <CoffeeErrorAnimation
            title="Error Loading Dashboard"
            messages={[
              'Failed to load dashboard',
              'Unable to fetch data',
              error?.message || 'An unexpected error occurred',
            ]}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
