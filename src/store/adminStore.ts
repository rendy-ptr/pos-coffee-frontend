import { create } from 'zustand';
import type { IAdminDashboardResponse } from '../features/dashboard/admin/types/admin';

interface AdminStore {
  adminData: IAdminDashboardResponse['data'] | null;
  setAdminData: (data: IAdminDashboardResponse['data'] | null) => void;
  clearAdminData: () => void;
}

export const useAdminStore = create<AdminStore>(set => ({
  adminData: null,
  setAdminData: data => set({ adminData: data }),
  clearAdminData: () => set({ adminData: null }),
}));
