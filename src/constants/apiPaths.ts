export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  ADMIN: {
    DASHBOARD: '/dashboard/admin',
    KATEGORI: (id?: string) =>
      id ? `/admin/kategori/${id}` : `/admin/kategori`,
    MENU: (id?: string) => (id ? `/admin/menu/${id}` : `/admin/menu`),
    KASIR: (id?: string) => (id ? `/admin/kasir/${id}` : `/admin/kasir`),
    MEJA: (id?: string) => (id ? `/admin/meja/${id}` : `/admin/meja`),
  },
  PUBLIC: {
    UPLOAD_IMAGE: '/upload',
    MENU: () => '/menu',
    KATEGORI: () => '/menu/kategori',
  },
};
