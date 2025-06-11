export type FavoriteType = {
  name: string;
  image: string;
  price: string;
  orderCount: number;
};

export type FavoriteItemCustomer = FavoriteType[];

export const favoriteItems: FavoriteItemCustomer = [
  {
    name: 'Cappuccino',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=300&auto=format&fit=crop',
    price: 'Rp 35.000',
    orderCount: 12,
  },
  {
    name: 'Croissant Butter',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop',
    price: 'Rp 25.000',
    orderCount: 8,
  },
  {
    name: 'Americano',
    image:
      'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=300&auto=format&fit=crop',
    price: 'Rp 28.000',
    orderCount: 6,
  },
];
