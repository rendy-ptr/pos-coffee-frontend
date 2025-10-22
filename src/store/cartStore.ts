import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ICartMenuItem } from '../features/dashboard/kasir/types/cart';
import type { MenuWithCategory } from '@/features/dashboard/kasir/types/menu';

interface ICartMenuStore {
  cart: ICartMenuItem[];
  addToCart: (item: MenuWithCategory) => void;
  updateQuantity: (id: string, quantity: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<ICartMenuStore>()(
  persist(
    set => ({
      cart: [],
      addToCart: (item: MenuWithCategory) =>
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
