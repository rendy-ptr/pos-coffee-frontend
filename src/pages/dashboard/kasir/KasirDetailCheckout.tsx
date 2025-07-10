// LOCAL-IMPORTS
import { lucideIcons } from '@/icon/lucide-react-icons';
import {
  CARD_STYLES,
  TEXT_COLORS,
  BUTTON_STYLES,
} from '../../../features/dashboard/kasir/constant/Style';
import { availableVouchers } from '@/features/dashboard/customer/mocks/voucher';

// HOOKS
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

// THIRD-PARTY
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// FUNCTIONS
import { formatCurrency } from '@/utils/formatCurrency';
import { getTotalAmount } from '@/utils/totalAmount';

// TYPES
import type { IMenuItem } from '@/types/kasir/menuitem';
interface ICartItem extends IMenuItem {
  quantity: number;
}

const KasirDetailCheckout = () => {
  const { cart } = useCartStore();
  const { ShoppingBag, Tag, CreditCard, Calculator } = lucideIcons;

  const [voucherCode, setVoucherCode] = useState('');
  const [voucherMessage, setVoucherMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleCheckVoucher = () => {
    if (voucherCode === '') {
      setVoucherMessage('Masukkan kode voucher terlebih dahulu');
      setDiscount(0);
      return;
    }
    const voucher = availableVouchers.find(
      v => v.code.toUpperCase() === voucherCode.toUpperCase()
    );
    if (!voucher) {
      setVoucherMessage('Kode voucher tidak valid');
      setDiscount(0);
      return;
    }
    if (!voucher.available) {
      setVoucherMessage('Voucher tidak tersedia');
      setDiscount(0);
      return;
    }
    const currentDate = new Date();
    const expirationDate = new Date(voucher.expirationDate);
    if (currentDate > expirationDate) {
      setVoucherMessage('Voucher sudah kadaluarsa');
      setDiscount(0);
      return;
    }
    const total = getTotalAmount(cart);
    if (total < voucher.minPurchase) {
      setVoucherMessage(
        `Total pembelian minimal ${formatCurrency(voucher.minPurchase)} untuk menggunakan voucher ini`
      );
      setDiscount(0);
      return;
    }
    let discountAmount = 0;
    if (voucher.code === 'DISKON10') {
      discountAmount = Math.min(total * 0.1, voucher.maxDiscount);
    }
    setDiscount(discountAmount);
    setVoucherMessage(
      `Voucher "${voucher.name}" diterapkan! Diskon: ${formatCurrency(discountAmount)}`
    );
  };
  const total = getTotalAmount(cart);
  const finalTotal = Math.max(total - discount, 0);

  const availableTables = ['Meja 1', 'Meja 2', 'Meja 3', 'Meja 4', 'Meja 5'];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Card Kiri: Isi Keranjang, Total, dan Voucher */}
        <Card className={`${CARD_STYLES}`}>
          <CardHeader>
            <CardTitle
              className={`flex items-center gap-2 ${TEXT_COLORS.primary}`}
            >
              <ShoppingBag className="h-5 w-5" />
              Detail Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 space-y-2 overflow-y-auto md:max-h-96">
              {cart.length === 0 ? (
                <p
                  className={`py-4 text-center text-sm ${TEXT_COLORS.secondary}`}
                >
                  Keranjang kosong
                </p>
              ) : (
                cart.map((item: ICartItem) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded border border-[#e6d9c9] p-2"
                  >
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`truncate text-sm font-medium ${TEXT_COLORS.primary}`}
                      >
                        {item.name}
                      </h4>
                      <p className={`text-xs ${TEXT_COLORS.secondary}`}>
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className={`text-sm font-medium ${TEXT_COLORS.primary}`}>
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 border-t border-[#e6d9c9] pt-4">
              <div className="flex items-center justify-between">
                <span className={`font-bold ${TEXT_COLORS.bold}`}>
                  Subtotal:
                </span>
                <span className={`text-lg font-bold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(total)}
                </span>
              </div>
              {discount > 0 && (
                <div className="mt-2 flex items-center justify-between">
                  <span className={`font-bold ${TEXT_COLORS.bold}`}>
                    Diskon:
                  </span>
                  <span className={`text-lg font-bold text-green-600`}>
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className={`font-bold ${TEXT_COLORS.bold}`}>
                  Total Akhir:
                </span>
                <span className={`text-lg font-bold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(finalTotal)}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Masukkan kode voucher"
                    value={voucherCode}
                    onChange={e => setVoucherCode(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    onClick={handleCheckVoucher}
                    className={`${BUTTON_STYLES} px-4 py-2 text-sm`}
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    Cek Voucher
                  </Button>
                </div>
                {voucherMessage && (
                  <p
                    className={`text-sm ${discount > 0 ? 'text-green-600' : TEXT_COLORS.secondary}`}
                  >
                    {voucherMessage}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Kanan: Input Nama dan Pemilihan Meja */}
        <Card className={`${CARD_STYLES}`}>
          <CardHeader>
            <CardTitle
              className={`flex items-center gap-2 ${TEXT_COLORS.primary}`}
            >
              Informasi Pemesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className={`text-sm font-medium ${TEXT_COLORS.primary}`}
                >
                  Atas Nama
                </label>
                <Input
                  id="customerName"
                  placeholder="Masukkan nama pemesan"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="selectTable"
                  className={`text-sm font-medium ${TEXT_COLORS.primary}`}
                >
                  Pilih Meja
                </label>
                <Select onValueChange={setSelectedTable} value={selectedTable}>
                  <SelectTrigger id="selectTable" className="mt-1 text-sm">
                    <SelectValue placeholder="Pilih meja" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTables.map(table => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Button
                  className={`${BUTTON_STYLES} w-full text-sm`}
                  disabled={!customerName || !selectedTable}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Bayar Tunai
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer text-sm"
                  disabled={!customerName || !selectedTable}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Bayar Non-Tunai
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KasirDetailCheckout;
