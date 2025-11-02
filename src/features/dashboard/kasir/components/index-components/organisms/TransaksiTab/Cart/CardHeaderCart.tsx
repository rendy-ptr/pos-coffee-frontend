import { CardHeader, CardTitle } from '@/components/ui/card';
import { BUTTON_STYLES, TEXT_COLORS } from '@/constants/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';

interface CardHeaderCartProps {
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  isCartEmpty: boolean;
  resetCart: () => void;
}

const CardHeaderCart = ({
  totalItems,
  totalQuantity,
  totalAmount,
  isCartEmpty,
  resetCart,
}: CardHeaderCartProps) => {
  const { Trash2 } = lucideIcons;
  return (
    <CardHeader className="space-y-4 border-b border-[#e6d9c9] bg-white px-6 py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <CardTitle className={`${TEXT_COLORS.primary} text-lg md:text-xl`}>
              Keranjang Pesanan
            </CardTitle>
            <p className="text-xs text-[#8c7158]">
              Lihat dan kelola setiap pilihan menu pelanggan secara real-time.
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
  );
};

export default CardHeaderCart;
