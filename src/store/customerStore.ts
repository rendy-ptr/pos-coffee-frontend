import { create } from 'zustand';
import type { ICustomerDashboardResponse } from '../features/dashboard/customer/types/CustomerDashboardResponse';

interface CustomerStore {
  customerData: ICustomerDashboardResponse['data'] | null;
  setCustomerData: (data: ICustomerDashboardResponse['data'] | null) => void;
  clearCustomerData: () => void;
}

export const useCustomerStore = create<CustomerStore>(set => ({
  customerData: null,
  setCustomerData: data => set({ customerData: data }),
  clearCustomerData: () => set({ customerData: null }),
}));
