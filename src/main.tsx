import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import MenuLengkapPage from './pages/MenuLengkapPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/menu-lengkap', element: <MenuLengkapPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
