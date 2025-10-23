// LOCAL-IMPORTS
import { lucideIcons } from '@/icon/lucide-react-icons';
import {
  BUTTON_STYLES,
  CARD_STYLES,
  TEXT_COLORS,
} from '../../../constant/Style';

// HOOKS
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';

// THIRD-PARTY
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// FUNCTIONS
import { formatCurrency } from '@/utils/formatCurrency';
import { getTotalAmount } from '@/utils/totalAmount';

// TYPES
import type { ICartMenuItem } from '../../../types/cart';

const CartItemContent = () => {
  const { cart, updateQuantity, resetCart } = useCartStore();
  const { ShoppingCart, Minus, Plus, Trash2, ShoppingBag } = lucideIcons;
  const navigate = useNavigate();

  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = getTotalAmount(cart);
  const isCartEmpty = totalItems === 0;

  const handleCheckout = () => {
    navigate('/dashboard/kasir/checkout', {
      state: { cart, total: totalAmount },
    });
  };

  return (
    <div className="order-1 lg:order-2 lg:col-span-1">
      <Card className={`sticky top-20 ${CARD_STYLES} shadow-lg`}>
        <CardHeader className="space-y-4 border-b border-[#e6d9c9] bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <CardTitle
                  className={`${TEXT_COLORS.primary} text-lg md:text-xl`}
                >
                  Keranjang Pesanan
                </CardTitle>
                <p className="text-xs text-[#8c7158]">
                  Lihat dan kelola setiap pilihan menu pelanggan secara
                  real-time.
                </p>
              </div>
            </div>
            {!isCartEmpty && (
              <button
                onClick={resetCart}
                className={`${BUTTON_STYLES} flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm transition-transform duration-200`}
              >
                <Trash2 className="h-4 w-4" />
                Bersihkan
              </button>
            )}
          </div>

          {!isCartEmpty ? (
            <div className="grid grid-cols-2 gap-2 text-xs text-[#8c7158] md:grid-cols-3">
              <div className="rounded-lg border border-[#e6d9c9] bg-white px-3 py-2 shadow-sm">
                <p className="text-[11px] tracking-wide text-[#b08a6a] uppercase">
                  Menu unik
                </p>
                <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                  {totalItems}
                </p>
              </div>
              <div className="rounded-lg border border-[#e6d9c9] bg-white px-3 py-2 shadow-sm">
                <p className="text-[11px] tracking-wide text-[#b08a6a] uppercase">
                  Total porsi
                </p>
                <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                  {totalQuantity}
                </p>
              </div>
              <div className="rounded-lg border border-[#e6d9c9] bg-white px-3 py-2 shadow-sm md:col-span-1">
                <p className="text-[11px] tracking-wide text-[#b08a6a] uppercase">
                  Estimasi total
                </p>
                <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#e6d9c9] bg-white px-3 py-3 text-xs text-[#8c7158]">
              Keranjang kosong. Tambahkan menu dari daftar untuk mulai membuat
              pesanan pelanggan.
            </div>
          )}
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="max-h-[22rem] space-y-3 overflow-y-auto pr-1 md:max-h-[28rem]">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#e6d9c9] bg-white px-6 py-10 text-center">
                <ShoppingBag className="h-10 w-10 text-[#c09a75]" />
                <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                  Keranjang belum terisi
                </p>
                <p className="text-xs text-[#8c7158]">
                  Pilih menu favorit pelanggan di sebelah kiri untuk
                  menambahkannya ke keranjang.
                </p>
              </div>
            ) : (
              cart.map((item: ICartMenuItem) => {
                const remainingStock = Math.max(item.stock - item.quantity, 0);
                const subtotal = item.sellingPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-[#e6d9c9] bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d6bfa1] hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        <h4
                          className={`truncate text-sm font-semibold ${TEXT_COLORS.primary}`}
                        >
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8c7158]">
                          <span>
                            {formatCurrency(item.sellingPrice)} / item
                          </span>
                          <span className="hidden md:inline-block">•</span>
                          <span>Sisa stok {remainingStock}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, 0)}
                        className={`${BUTTON_STYLES} rounded-full shadow-sm transition-transform duration-200`}
                        aria-label={`Hapus ${item.name} dari keranjang`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-[#e6d9c9] bg-white px-2 py-1 shadow-inner">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="size-7 rounded-full border border-transparent text-[#6f4e37] transition-colors hover:bg-[#f3e1cb]"
                          aria-label={`Kurangi jumlah ${item.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="min-w-[2.25rem] text-center text-sm font-semibold text-[#6f4e37]">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="size-7 rounded-full border border-transparent text-[#6f4e37] transition-colors hover:bg-[#f3e1cb]"
                          aria-label={`Tambah jumlah ${item.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] tracking-wide text-[#b08a6a] uppercase">
                          Subtotal
                        </p>
                        <p
                          className={`text-sm font-semibold ${TEXT_COLORS.primary}`}
                        >
                          {formatCurrency(subtotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!isCartEmpty && (
            <div className="mt-5 space-y-4 rounded-xl border border-[#e6d9c9] bg-white p-4 shadow-inner transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d6bfa1] hover:shadow-lg">
              <div className="flex items-center justify-between text-sm text-[#8c7158]">
                <span>Menu unik</span>
                <span>{totalItems} jenis</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#8c7158]">
                <span>Total porsi</span>
                <span>{totalQuantity} item</span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-[#ecd7bf] pt-3 text-base font-semibold text-[#6f4e37]">
                <span>Total pembayaran</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <button
                className={`${BUTTON_STYLES} flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide uppercase`}
                onClick={handleCheckout}
              >
                <ShoppingCart className="h-4 w-4" />
                Checkout Pesanan
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItemContent;
