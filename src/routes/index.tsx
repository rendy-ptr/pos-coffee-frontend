import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/public/LandingPage';
import MenuLengkapPage from '@/pages/public/MenuLengkap';
import NotFoundPage from '@/pages/public/404';
import RegisterPage from '@/pages/public/Register';
import LoginPage from '@/pages/public/Login';
import CustomerLayout from '@/layouts/dashboard/customer/CustomerLayout';
import CustomerPage from '@/pages/dashboard/customer/CustomerPage';
import CustomerSettings from '@/pages/dashboard/customer/CustomerSettingPage';
import KasirLayout from '@/layouts/dashboard/kasir/KasirLayout';
import AdminLayout from '@/layouts/dashboard/admin/AdminLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import AdminCategoryPage from '@/features/dashboard/admin/pages/category';
import AdminSettingPage from '@/features/dashboard/admin/pages/setting';
import KasirCheckoutPage from '@/features/dashboard/kasir/pages/checkout';
import KasirDashboardIndex from '@/features/dashboard/kasir/pages';
import AdminDashboardIndex from '@/features/dashboard/admin/pages';
// import KasirDetailCheckout from '@/pages/dashboard/kasir/KasirDetailCheckout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'menu-lengkap',
    element: <MenuLengkapPage />,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'customer',
        element: <ProtectedRoute allowedRoles={['CUSTOMER']} />,
        children: [
          {
            element: <CustomerLayout />,
            children: [
              {
                index: true,
                element: <CustomerPage />,
              },
              {
                path: 'pengaturan',
                element: <CustomerSettings />,
              },
            ],
          },
        ],
      },
      {
        path: 'kasir',
        element: <ProtectedRoute allowedRoles={['KASIR']} />,
        children: [
          {
            element: <KasirLayout />,
            children: [
              {
                index: true,
                element: <KasirDashboardIndex />,
              },
              {
                path: 'checkout',
                element: <KasirCheckoutPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboardIndex />,
              },
              {
                path: 'kategori',
                element: <AdminCategoryPage />,
              },
              {
                path: 'setting',
                element: <AdminSettingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
