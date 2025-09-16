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
    TABLE: (id?: string) => (id ? `/admin/table/${id}` : `/admin/table`),
    REWARD: (id?: string) => (id ? `/admin/reward/${id}` : `/admin/reward`),
  },
  PUBLIC: {
    UPLOAD_IMAGE: '/upload',
    MENU: () => '/menu',
    KATEGORI: () => '/menu/kategori',
  },
};
