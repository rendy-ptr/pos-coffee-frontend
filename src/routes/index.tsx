import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/public/LandingPage';
import MenuLengkapPage from '@/pages/public/MenuLengkap';
import NotFoundPage from '@/pages/public/404';
import RegisterPage from '@/pages/public/Register';
import LoginPage from '@/pages/public/Login';
import CustomerPage from '@/pages/dashboard/customer/CustomerPage';

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
        element: <CustomerPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
