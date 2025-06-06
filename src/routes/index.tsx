import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/public/LandingPage';
import MenuLengkapPage from '@/pages/public/MenuLengkap';
import NotFoundPage from '@/pages/public/404';
import RegisterPage from '@/pages/public/Register';
import LoginPage from '@/pages/public/Login';

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
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
