import HeaderAdmin from '@/features/dashboard/admin/sections/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <HeaderAdmin />
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
