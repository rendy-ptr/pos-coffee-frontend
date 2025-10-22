import { create } from 'zustand';
import type { IKasirDashboardResponse } from '../features/dashboard/kasir/types/kasir';

interface KasirStore {
  kasirData: IKasirDashboardResponse['data'] | null;
  setKasirData: (data: IKasirDashboardResponse['data'] | null) => void;
  clearKasirData: () => void;
}

export const useKasirStore = create<KasirStore>(set => ({
  kasirData: null,
  setKasirData: data => set({ kasirData: data }),
  clearKasirData: () => set({ kasirData: null }),
}));
