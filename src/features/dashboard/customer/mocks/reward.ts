import type { RewardItemCustomer } from '@/types/customer/reward';
export const availableRewards: RewardItemCustomer = [
  {
    id: 1,
    name: 'Free Croissant',
    points: 300,
    description: 'Croissant gratis pilihan Anda',
    available: true,
  },
  {
    id: 2,
    name: 'Diskon 20%',
    points: 500,
    description: 'Diskon 20% untuk semua menu',
    available: true,
  },
  {
    id: 3,
    name: 'Free Coffee',
    points: 800,
    description: 'Kopi gratis pilihan Anda',
    available: true,
  },
  {
    id: 4,
    name: 'VIP Workshop',
    points: 1500,
    description: 'Akses workshop kopi eksklusif',
    available: false,
  },
];
