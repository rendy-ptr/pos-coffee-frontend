import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { BUTTON_STYLES, CARD_STYLES, TEXT_COLORS } from '../constant/Style';

import type React from 'react';
import type { MenuItem } from '@/types/kasir/menuitem';
type CartItem = MenuItem & { quantity: number };

type CartItemContentProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const CartItemContent = ({ cart, setCart }: CartItemContentProps) => {
  const { ShoppingCart, Minus, Plus, Trash2, CreditCard, Calculator } =
    lucideIcons;
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const updateQuantity = (id: number, newQuantity: number) => {
    const targetItem = cart.find(item => item.id === id);
    if (!targetItem) return;

    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else if (newQuantity <= targetItem.stock) {
      setCart(
        cart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  return (
    <div className="order-1 lg:order-2 lg:col-span-1">
      <Card className={`sticky top-20 ${CARD_STYLES}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-[#6f4e37]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Keranjang
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className={`${BUTTON_STYLES} px-2 py-1 text-xs`}
              >
                Reset Pesanan
              </button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 space-y-2 overflow-y-auto md:max-h-96 md:space-y-3">
            {cart.length === 0 ? (
              <p
                className={`py-4 text-center text-sm ${TEXT_COLORS.secondary} md:py-8`}
              >
                Keranjang kosong
              </p>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded border border-[#e6d9c9] p-2"
                >
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`truncate text-xs font-medium md:text-sm ${TEXT_COLORS.primary}`}
                    >
                      {item.name}
                    </h4>
                    <p className={`text-xs ${TEXT_COLORS.secondary}`}>
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 cursor-pointer p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-xs font-medium md:text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 cursor-pointer p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 0)}
                      className="h-6 w-6 cursor-pointer p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-4 border-t border-[#e6d9c9] pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className={`font-bold ${TEXT_COLORS.primary}`}>
                  Total:
                </span>
                <span className={`text-lg font-bold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(getTotalAmount())}
                </span>
              </div>
              <div className="space-y-2">
                <Button className={`w-full text-sm ${BUTTON_STYLES}`}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Bayar Tunai
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer text-sm"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Bayar Non-Tunai
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default CartItemContent;
