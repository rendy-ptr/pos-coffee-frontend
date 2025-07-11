import CustomerHeader from '@/features/dashboard/customer/sections/CustomerHeader';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <CustomerHeader />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
