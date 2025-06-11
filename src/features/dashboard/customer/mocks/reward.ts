export type RewardType = {
  name: string;
  points: number;
  description: string;
  available: boolean;
};
export type RewardItemCustomer = RewardType[];
export const availableRewards: RewardItemCustomer = [
  {
    name: 'Free Croissant',
    points: 300,
    description: 'Croissant gratis pilihan Anda',
    available: true,
  },
  {
    name: 'Diskon 20%',
    points: 500,
    description: 'Diskon 20% untuk semua menu',
    available: true,
  },
  {
    name: 'Free Coffee',
    points: 800,
    description: 'Kopi gratis pilihan Anda',
    available: true,
  },
  {
    name: 'VIP Workshop',
    points: 1500,
    description: 'Akses workshop kopi eksklusif',
    available: false,
  },
];
