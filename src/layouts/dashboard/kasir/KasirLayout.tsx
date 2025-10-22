import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import { useKasirDashboard } from '@/features/dashboard/kasir/hooks/kasir.hook';
import KasirHeader from '@/features/dashboard/kasir/components/sections/Header/KasirHeader';
import { Outlet } from 'react-router-dom';

const KasirLayout = () => {
  const { isLoading, isError, error } = useKasirDashboard(true);
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <KasirHeader />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        {isLoading && (
          <CoffeeLoadingAnimation
            title="Kasir Dashboard"
            messages={[
              'Loading dashboard',
              'Fetching analytics',
              'Preparing kasir tools',
            ]}
          />
        )}
        {isError && (
          <p className="flex min-h-screen items-center justify-center text-center text-sm text-red-500">
            {(error as Error).message}
          </p>
        )}
        <Outlet />
      </div>
    </div>
  );
};
export default KasirLayout;
