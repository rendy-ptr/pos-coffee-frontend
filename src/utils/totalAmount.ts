import type { IMenuItem } from '@/types/kasir/menuitem';
interface ICartItem extends IMenuItem {
  quantity: number;
}

export const getTotalAmount = (cart: ICartItem[]) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
