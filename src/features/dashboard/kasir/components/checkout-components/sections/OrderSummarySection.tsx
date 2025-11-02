import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, CheckCircle, UserCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import type { ICartMenuItem } from '@/features/dashboard/kasir/types/cart';
import { BUTTON_STYLES, CARD_STYLES, TEXT_COLORS } from '@/constants/Style';

interface OrderSummarySectionProps {
  cart: ICartMenuItem[];
  totalAmount: number;
  totalItems: number;
  totalQuantity: number;
  isSubmitting: boolean;
  kasirData: {
    name: string;
    profilePicture?: string;
  } | null;
}

export const OrderSummarySection = ({
  cart,
  totalAmount,
  totalItems,
  totalQuantity,
  isSubmitting,
  kasirData,
}: OrderSummarySectionProps) => {
  return (
    <Card className={`sticky top-6 ${CARD_STYLES} shadow-lg`}>
      <CardHeader className="border-b border-[#e6d9c9] pb-4">
        <CardTitle
          className={`flex items-center gap-2 text-lg ${TEXT_COLORS.primary}`}
        >
          <ShoppingCart className="h-5 w-5" />
          Ringkasan Pesanan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {kasirData && (
          <>
            <div className="flex items-center gap-3 rounded-lg border border-[#e6d9c9] bg-gradient-to-r from-[#faf6f1] to-[#f9f4ef] p-3 shadow-sm">
              {kasirData.profilePicture ? (
                <img
                  src={kasirData.profilePicture}
                  alt="Foto Kasir"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-[#8c7158]" />
              )}
              <div className="flex-1">
                <p className="text-[10px] font-medium tracking-wide text-[#8c7158] uppercase">
                  Nama Kasir
                </p>
                <p className={`text-sm font-bold ${TEXT_COLORS.primary}`}>
                  {kasirData.name}
                </p>
              </div>
            </div>
            <Separator className="bg-[#e6d9c9]" />
          </>
        )}

        <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
          {cart.map(item => (
            <div
              key={item.id}
              className="rounded-lg border border-[#e6d9c9] bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4
                    className={`text-sm font-semibold ${TEXT_COLORS.primary}`}
                  >
                    {item.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#8c7158]">
                    {formatCurrency(item.sellingPrice)} x {item.quantity}
                  </p>
                </div>
                <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(item.sellingPrice * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-[#e6d9c9]" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-[#8c7158]">
            <span>Jumlah item</span>
            <span>{totalItems} jenis</span>
          </div>
          <div className="flex justify-between text-sm text-[#8c7158]">
            <span>Total porsi</span>
            <span>{totalQuantity} item</span>
          </div>
          <Separator className="bg-[#e6d9c9]" />
          <div
            className={`flex justify-between text-base font-bold ${TEXT_COLORS.primary}`}
          >
            <span>Total Pembayaran</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`${BUTTON_STYLES} flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wide uppercase`}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Memproses...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Konfirmasi Pesanan
            </>
          )}
        </Button>

        <p className="text-center text-xs text-[#8c7158]">
          Dengan melanjutkan, Anda menyetujui pesanan ini akan diproses
        </p>
      </CardContent>
    </Card>
  );
};
