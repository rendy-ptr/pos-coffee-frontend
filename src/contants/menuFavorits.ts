type menu = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export const MENU_FAVORITS: menu[] = [
  {
    name: 'Espresso',
    description: 'Kopi hitam pekat dengan cita rasa kuat',
    price: 'Rp 25.000',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Cappuccino',
    description: 'Espresso dengan susu dan foam yang lembut',
    price: 'Rp 35.000',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Kopi Susu Gula Aren',
    description: 'Kopi dengan susu dan gula aren asli',
    price: 'Rp 30.000',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop',
  },
];
