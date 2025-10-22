import type { ICartMenuItem } from '@/features/dashboard/kasir/types/cart';

export const getTotalAmount = (cart: ICartMenuItem[]) => {
  return cart.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0
  );
};
