import type { MenuItem } from '@/types/kasir/menuitem';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso',
    price: 25000,
    category: 'Kopi',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop',
    stock: 0,
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 35000,
    category: 'Kopi',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop',
    stock: 45,
  },
  {
    id: 3,
    name: 'Americano',
    price: 28000,
    category: 'Kopi',
    image:
      'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=200&auto=format&fit=crop',
    stock: 40,
  },
  {
    id: 4,
    name: 'Croissant Butter',
    price: 25000,
    category: 'Makanan',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop',
    stock: 20,
  },
  {
    id: 5,
    name: 'Sandwich Club',
    price: 45000,
    category: 'Makanan',
    image:
      'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=200&auto=format&fit=crop',
    stock: 15,
  },
];
