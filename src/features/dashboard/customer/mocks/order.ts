import type { OrdersItemType } from '@/types/customer/order';

export const recentOrders: OrdersItemType = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    time: '14:30',
    items: ['Cappuccino', 'Croissant Butter'],
    total: 'Rp 60.000',
    status: 'Selesai',
    points: 60,
  },
  {
    id: 'ORD-002',
    date: '2024-01-12',
    time: '09:15',
    items: ['Americano', 'Sandwich Club'],
    total: 'Rp 73.000',
    status: 'Selesai',
    points: 73,
  },
  {
    id: 'ORD-003',
    date: '2024-01-10',
    time: '16:45',
    items: ['Latte', 'Tiramisu'],
    total: 'Rp 73.000',
    status: 'Selesai',
    points: 73,
  },
];
