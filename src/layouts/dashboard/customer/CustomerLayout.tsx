import CustomerHeader from '@/features/dashboard/customer/sections/CustomerHeader';
import { Outlet } from 'react-router-dom';
import { useCustomerDashboard } from '@/features/dashboard/customer/hooks/customer.hook';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import CoffeeErrorAnimation from '@/components/shared/CoffeeErrorAnimation';

const CustomerLayout = () => {
  const { isLoading, isError, error } = useCustomerDashboard(true);
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <CustomerHeader />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        {isLoading && (
          <CoffeeLoadingAnimation
            title="Customer Dashboard"
            messages={[
              'Loading dashboard',
              'Fetching analytics',
              'Preparing customer data',
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

export default CustomerLayout;
