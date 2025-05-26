import type { menuData } from '@/types/menu/menu-data';
import type { menuCategory } from '@/types/menu/menu-category';

export const MENU_FAVORITES: menuData[] = [
  {
    name: 'Espresso',
    description: 'Kopi hitam pekat dengan cita rasa kuat',
    price: 'Rp 25.000',
    category: 'Kopi',
    categoryId: 'kopi',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Cappuccino',
    description: 'Espresso dengan susu dan foam yang lembut',
    price: 'Rp 35.000',
    category: 'Kopi',
    categoryId: 'kopi',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Kopi Susu Gula Aren',
    description: 'Kopi dengan susu dan gula aren asli',
    price: 'Rp 30.000',
    category: 'Kopi',
    categoryId: 'kopi',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Americano',
    description: 'Espresso dengan air panas, rasa kopi murni',
    price: 'Rp 28.000',
    category: 'Kopi',
    categoryId: 'kopi',
    image:
      'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400&auto=format&fit=crop',
  },
  // Non Kopi
  {
    name: 'Chocolate Latte',
    description: 'Minuman cokelat hangat dengan susu steamed',
    price: 'Rp 32.000',
    category: 'Non Kopi',
    categoryId: 'non-kopi',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Matcha Latte',
    description: 'Teh hijau Jepang premium dengan susu',
    price: 'Rp 38.000',
    category: 'Non Kopi',
    categoryId: 'non-kopi',
    image:
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Teh Tarik',
    description: 'Teh susu tradisional dengan teknik tarik khas',
    price: 'Rp 22.000',
    category: 'Non Kopi',
    categoryId: 'non-kopi',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop',
  },
  // Makanan
  {
    name: 'Croissant Butter',
    description: 'Croissant segar dengan butter premium',
    price: 'Rp 25.000',
    category: 'Makanan',
    categoryId: 'makanan',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Sandwich Club',
    description: 'Sandwich dengan ayam, sayuran segar dan saus spesial',
    price: 'Rp 45.000',
    category: 'Makanan',
    categoryId: 'makanan',
    image:
      'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Pasta Aglio Olio',
    description: 'Pasta dengan olive oil, bawang putih dan cabai',
    price: 'Rp 42.000',
    category: 'Makanan',
    categoryId: 'makanan',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop',
  },
  // Dessert
  {
    name: 'Tiramisu',
    description: 'Dessert Italia klasik dengan kopi dan mascarpone',
    price: 'Rp 35.000',
    category: 'Dessert',
    categoryId: 'dessert',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Cheesecake Blueberry',
    description: 'Cheesecake lembut dengan topping blueberry segar',
    price: 'Rp 38.000',
    category: 'Dessert',
    categoryId: 'dessert',
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Brownies Cokelat',
    description: 'Brownies cokelat hangat dengan es krim vanilla',
    price: 'Rp 32.000',
    category: 'Dessert',
    categoryId: 'dessert',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop',
  },
];

export const MENU_CATEGORIES: menuCategory[] = [
  { id: 'kopi', label: 'Kopi' },
  { id: 'non-kopi', label: 'Non Kopi' },
  { id: 'makanan', label: 'Makanan' },
  { id: 'dessert', label: 'Dessert' },
];
