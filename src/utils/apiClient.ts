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

// INTERCEPTOR RESPONSE
apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.code === 'ERR_CANCELED') return Promise.reject(err);

    const { isLoggingOut } = useAuthStore.getState();
    const { clearAdminData } = useAdminStore.getState();

    // jika user sedang logout, abaikan 401
    if (isLoggingOut) return Promise.reject(err);

    // hanya tangani 401
    if (err.response?.status === 401) {
      const requestUrl = err.config?.url; // url request yang kena 401
      const errorCode = err.response.data?.errorCode;

      // jangan munculin toast untuk logout request
      if (requestUrl?.includes('/auth/logout')) {
        clearAdminData();
        return Promise.reject(err);
      }

      // clear data admin
      clearAdminData();
      localStorage.removeItem('welcomeShown');

      switch (errorCode) {
        case 'TOKEN_EXPIRED':
          toastController.addToast('Sesi habis, silakan login ulang', 'error');
          break;

        case 'INVALID_TOKEN':
        case 'NO_TOKEN':
          toastController.addToast(
            'Unauthorized, silakan login ulang',
            'error'
          );
          break;

        default:
          console.warn('Unhandled 401 error:', errorCode);
          toastController.addToast(
            'Unauthorized, silakan login ulang',
            'error'
          );
          break;
      }

      // redirect ke login jika belum di halaman login
      if (history.location.pathname !== '/auth/login') {
        history.push('/auth/login');
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;
