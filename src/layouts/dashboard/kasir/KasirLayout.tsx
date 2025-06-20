import KasirHeader from '@/features/dashboard/kasir/sections/KasirHeader';
import { Outlet } from 'react-router-dom';

const KasirLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <KasirHeader />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        <Outlet />
      </div>
    </div>
  );
};
export default KasirLayout;
