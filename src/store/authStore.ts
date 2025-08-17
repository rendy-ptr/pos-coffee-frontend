import { create } from 'zustand';

interface AuthStore {
  isLoggingOut: boolean;
  setLoggingOut: (val: boolean) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isLoggingOut: false,
  setLoggingOut: val => set({ isLoggingOut: val }),
}));
