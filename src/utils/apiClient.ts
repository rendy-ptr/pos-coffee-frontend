import axios from 'axios';
import { toastController } from '@/utils/toastController';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.code === 'ERR_CANCELED') return Promise.reject(err);

    if (err.response?.status === 401) {
      const { clearAdminData } = useAdminStore.getState();
      const { isLoggingOut } = useAuthStore.getState();

      if (isLoggingOut) return Promise.reject(err);

      clearAdminData();

      const errorCode = err.response.data?.errorCode;

      switch (errorCode) {
        case 'TOKEN_EXPIRED':
          localStorage.removeItem('welcomeShown');
          toastController.addToast('Sesi habis, silakan login ulang', 'error');
          if (history.location.pathname !== '/auth/login') {
            history.push('/auth/login');
          }
          break;

        case 'INVALID_TOKEN':
        case 'NO_TOKEN':
          localStorage.removeItem('welcomeShown');
          toastController.addToast(
            'Unauthorized, silakan login ulang',
            'error'
          );
          if (history.location.pathname !== '/auth/login') {
            history.push('/auth/login');
          }
          break;

        default:
          console.warn('Unhandled 401 error:', errorCode);
          if (history.location.pathname !== '/auth/login') {
            history.push('/auth/login');
          }
          break;
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;
