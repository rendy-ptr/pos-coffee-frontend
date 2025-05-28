import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/public/LandingPage/LandingPage';
import MenuLengkapPage from '@/pages/public/MenuLengkap/MenuLengkapPage';
import NotFoundPage from '@/pages/public/404Page/NotFoundPage';
import RegisterPage from '@/pages/public/RegisterPage/RegisterPage';

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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
