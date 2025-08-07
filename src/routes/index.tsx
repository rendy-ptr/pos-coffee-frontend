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
import KasirPage from '@/pages/dashboard/kasir/KasirPage';
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
      {
        path: 'kasir',
        element: <KasirLayout />,
        children: [
          {
            index: true,
            element: <KasirPage />,
          },
          // {
          //   path: 'checkout',
          //   element: <KasirDetailCheckout />,
          // },
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
