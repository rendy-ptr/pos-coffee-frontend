import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IMenuItem } from '@/types/kasir/menuitem';

interface ICartItem extends IMenuItem {
  quantity: number;
}

interface ICartStore {
  cart: ICartItem[];
  addToCart: (item: IMenuItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<ICartStore>()(
  persist(
    set => ({
      cart: [],
      addToCart: (item: IMenuItem) =>
        set(state => {
          const existingItem = state.cart.find(
            cartItem => cartItem.id === item.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map(cartItem =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: Math.min(cartItem.quantity + 1, cartItem.stock),
                    }
                  : cartItem
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      updateQuantity: (id, quantity) =>
        set(state => {
          const targetItem = state.cart.find(item => item.id === id);
          if (!targetItem) return state;
          if (quantity === 0) {
            return { cart: state.cart.filter(item => item.id !== id) };
          }
          if (quantity <= targetItem.stock) {
            return {
              cart: state.cart.map(item =>
                item.id === id ? { ...item, quantity } : item
              ),
            };
          }
          return state;
        }),
      resetCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
