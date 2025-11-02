// HOOKS
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

// TYPES
import type { ICartMenuItem } from '@/features/dashboard/kasir/types/cart';
import type { IBaseTable } from '@/features/dashboard/kasir/types/table';

// SERVICES
import { getTables } from '@/features/dashboard/kasir/services/table.service';

// UTILS
import { formatCurrency } from '@/utils/formatCurrency';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { BUTTON_STYLES, CARD_STYLES, TEXT_COLORS } from '@/constants/Style';
import { useToast } from '@/components/shared/ToastProvider';
import { useCartStore } from '@/store/cartStore';
import { useKasirStore } from '@/store/kasirStore';

import { z } from 'zod';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Nama pelanggan minimal 2 karakter'),
  memberId: z.string().min(5, 'Member ID minimal 5 karakter').optional(),
  orderType: z.enum(['DINE_IN', 'TAKEAWAY'], {
    required_error: 'Pilih jenis pesanan',
  }),
  tableId: z.string().optional(),
  paymentMethod: z.enum(['CASH', 'CARD', 'E_WALLET'], {
    required_error: 'Pilih metode pembayaran',
  }),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface LocationState {
  cart: ICartMenuItem[];
  totalAmount: number;
  totalItems: number;
  totalQuantity: number;
}

const KasirCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { resetCart } = useCartStore();
  const { kasirData } = useKasirStore();

  const state = location.state as LocationState | null;
  const {
    cart = [],
    totalAmount = 0,
    totalItems = 0,
    totalQuantity = 0,
  } = state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    ArrowLeft,
    ShoppingCart,
    User,
    MapPin,
    CreditCard,
    Wallet,
    Banknote,
    FileText,
    CheckCircle,
    Users,
    Home,
    TreePine,
    UserCircle,
  } = lucideIcons;

  useEffect(() => {
    if (!state || cart.length === 0) {
      addToast(
        'Keranjang kosong. Silakan tambahkan menu terlebih dahulu.',
        'error'
      );
      navigate('/dashboard/kasir');
    }
  }, [state, cart, navigate, addToast]);

  const { data: tablesData } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
    enabled: true,
  });

  const availableTables = tablesData?.data?.filter(
    (table: IBaseTable) => table.status === 'AVAILABLE'
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      orderType: 'DINE_IN',
      paymentMethod: 'CASH',
    },
  });

  const orderType = watch('orderType');
  const paymentMethod = watch('paymentMethod');
  const selectedTableId = watch('tableId');

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const orderData = {
        ...data,
        items: cart.map(item => ({
          menuId: item.id,
          quantity: item.quantity,
          price: item.sellingPrice,
        })),
        totalAmount,
        totalItems,
        totalQuantity,
      };

      // TODO: Call API to create order
      console.log('Order data:', orderData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart and show success message
      resetCart();
      addToast('Pesanan berhasil dibuat!', 'success');

      // Navigate back to dashboard
      navigate('/dashboard/kasir', { replace: true });
    } catch (error) {
      console.error('Error creating order:', error);
      addToast('Gagal membuat pesanan. Silakan coba lagi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state || cart.length === 0 || !kasirData) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/kasir')}
            className="rounded-full border border-[#e6d9c9] bg-white p-2 text-[#6f4e37] shadow-sm transition-all hover:border-[#d6bfa1] hover:bg-[#f9f4ef] hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1
              className={`text-2xl font-bold ${TEXT_COLORS.primary} md:text-3xl`}
            >
              Checkout Pesanan
            </h1>
            <p className="text-sm text-[#8c7158]">
              Lengkapi data pesanan untuk menyelesaikan transaksi
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Customer Information */}
              <Card className={`${CARD_STYLES} shadow-lg`}>
                <CardHeader className="border-b border-[#e6d9c9] pb-4">
                  <CardTitle
                    className={`flex items-center gap-2 text-lg ${TEXT_COLORS.primary}`}
                  >
                    <User className="h-5 w-5" />
                    Informasi Pelanggan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="memberId"
                      className={`${TEXT_COLORS.primary}`}
                    >
                      Member ID
                      <span className="text-[#8c7158]">(opsional)</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]" />
                      <Input
                        id="memberId"
                        {...register('memberId')}
                        placeholder="AK-XXXXXX"
                        className="border-[#e6d9c9] pl-10 focus:border-[#8b5e3c] focus:ring-[#8b5e3c]"
                      />
                    </div>
                    {errors.memberId && (
                      <p className="text-xs text-red-500">
                        {errors.memberId.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="customerName"
                      className={`${TEXT_COLORS.primary}`}
                    >
                      Nama Pelanggan <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]" />
                      <Input
                        id="customerName"
                        {...register('customerName')}
                        placeholder="Masukkan nama pelanggan"
                        className="border-[#e6d9c9] pl-10 focus:border-[#8b5e3c] focus:ring-[#8b5e3c]"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-xs text-red-500">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className={`${CARD_STYLES} shadow-lg`}>
                <CardHeader className="border-b border-[#e6d9c9] pb-4">
                  <CardTitle
                    className={`flex items-center gap-2 text-lg ${TEXT_COLORS.primary}`}
                  >
                    <MapPin className="h-5 w-5" />
                    Jenis Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={orderType}
                    onValueChange={value =>
                      setValue('orderType', value as 'DINE_IN' | 'TAKEAWAY')
                    }
                  >
                    <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
                      <RadioGroupItem value="DINE_IN" id="dine-in" />
                      <Label
                        htmlFor="dine-in"
                        className="flex-1 cursor-pointer"
                      >
                        <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                          Dine In
                        </div>
                        <div className="text-xs text-[#8c7158]">
                          Makan di tempat
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
                      <RadioGroupItem value="TAKEAWAY" id="takeaway" />
                      <Label
                        htmlFor="takeaway"
                        className="flex-1 cursor-pointer"
                      >
                        <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                          Take Away
                        </div>
                        <div className="text-xs text-[#8c7158]">
                          Dibawa pulang
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {orderType === 'DINE_IN' && (
                    <div className="space-y-3 pt-2">
                      <Label
                        className={`${TEXT_COLORS.primary} text-base font-semibold`}
                      >
                        Pilih Meja
                      </Label>
                      {availableTables && availableTables.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {availableTables.map((table: IBaseTable) => {
                            const isSelected = selectedTableId === table.id;
                            const LocationIcon =
                              table.location === 'INDOOR' ? Home : TreePine;

                            return (
                              <button
                                key={table.id}
                                type="button"
                                onClick={() => setValue('tableId', table.id)}
                                className={`group relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'border-[#8b5e3c] bg-gradient-to-br from-[#f9f4ef] to-[#f3e8dc] shadow-lg'
                                    : 'border-[#e6d9c9] bg-white hover:border-[#d6bfa1] hover:shadow-md'
                                }`}
                              >
                                {/* Selected Indicator */}
                                {isSelected && (
                                  <div className="absolute top-2 right-2">
                                    <CheckCircle className="h-5 w-5 text-[#8b5e3c]" />
                                  </div>
                                )}

                                {/* Table Number Badge */}
                                <div className="mb-3 flex items-center justify-center">
                                  <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-full ${
                                      isSelected
                                        ? 'bg-gradient-to-br from-[#8b5e3c] to-[#6f4e37] shadow-md'
                                        : 'bg-gradient-to-br from-[#e6d9c9] to-[#d6bfa1] group-hover:from-[#d6bfa1] group-hover:to-[#c09a75]'
                                    } transition-all duration-200`}
                                  >
                                    <span
                                      className={`text-xl font-bold ${
                                        isSelected
                                          ? 'text-white'
                                          : 'text-[#6f4e37]'
                                      }`}
                                    >
                                      {table.number}
                                    </span>
                                  </div>
                                </div>

                                {/* Table Info */}
                                <div className="space-y-2 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <Users className="h-4 w-4 text-[#8c7158]" />
                                    <span className="text-xs font-medium text-[#8c7158]">
                                      {table.capacity} Orang
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-center gap-1.5">
                                    <LocationIcon className="h-4 w-4 text-[#8c7158]" />
                                    <span className="text-xs font-medium text-[#8c7158]">
                                      {table.location === 'INDOOR'
                                        ? 'Indoor'
                                        : 'Outdoor'}
                                    </span>
                                  </div>
                                </div>

                                {/* Hover Effect Overlay */}
                                {!isSelected && (
                                  <div className="absolute inset-0 rounded-xl bg-[#8b5e3c] opacity-0 transition-opacity duration-200 group-hover:opacity-5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#e6d9c9] bg-[#faf6f1] px-6 py-8 text-center">
                          <MapPin className="h-10 w-10 text-[#c09a75]" />
                          <div>
                            <p
                              className={`text-sm font-semibold ${TEXT_COLORS.primary}`}
                            >
                              Tidak ada meja tersedia
                            </p>
                            <p className="mt-1 text-xs text-[#8c7158]">
                              Semua meja sedang digunakan. Silakan pilih Take
                              Away.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={`${CARD_STYLES} shadow-lg`}>
                <CardHeader className="border-b border-[#e6d9c9] pb-4">
                  <CardTitle
                    className={`flex items-center gap-2 text-lg ${TEXT_COLORS.primary}`}
                  >
                    <CreditCard className="h-5 w-5" />
                    Metode Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={value =>
                      setValue(
                        'paymentMethod',
                        value as 'CASH' | 'CARD' | 'E_WALLET'
                      )
                    }
                  >
                    <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
                      <RadioGroupItem value="CASH" id="cash" />
                      <Banknote className="h-5 w-5 text-[#8b5e3c]" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                          Tunai
                        </div>
                        <div className="text-xs text-[#8c7158]">
                          Pembayaran dengan uang tunai
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
                      <RadioGroupItem value="CARD" id="card" />
                      <CreditCard className="h-5 w-5 text-[#8b5e3c]" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                          Kartu Debit/Kredit
                        </div>
                        <div className="text-xs text-[#8c7158]">
                          Pembayaran dengan kartu
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
                      <RadioGroupItem value="E_WALLET" id="e-wallet" />
                      <Wallet className="h-5 w-5 text-[#8b5e3c]" />
                      <Label
                        htmlFor="e-wallet"
                        className="flex-1 cursor-pointer"
                      >
                        <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                          E-Wallet
                        </div>
                        <div className="text-xs text-[#8c7158]">
                          OVO, GoPay, DANA, dll
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card className={`${CARD_STYLES} shadow-lg`}>
                <CardHeader className="border-b border-[#e6d9c9] pb-4">
                  <CardTitle
                    className={`flex items-center gap-2 text-lg ${TEXT_COLORS.primary}`}
                  >
                    <FileText className="h-5 w-5" />
                    Catatan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea
                    {...register('notes')}
                    placeholder="Tambahkan catatan khusus untuk pesanan ini (opsional)"
                    className="min-h-[100px] border-[#e6d9c9] focus:border-[#8b5e3c] focus:ring-[#8b5e3c]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
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
                  {/* Cashier Info */}
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
                          <p
                            className={`text-sm font-bold ${TEXT_COLORS.primary}`}
                          >
                            {kasirData.name}
                          </p>
                        </div>
                      </div>
                      <Separator className="bg-[#e6d9c9]" />
                    </>
                  )}

                  {/* Cart Items */}
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
                              {formatCurrency(item.sellingPrice)} x{' '}
                              {item.quantity}
                            </p>
                          </div>
                          <p
                            className={`text-sm font-semibold ${TEXT_COLORS.primary}`}
                          >
                            {formatCurrency(item.sellingPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-[#e6d9c9]" />

                  {/* Summary Details */}
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
                    Dengan melanjutkan, Anda menyetujui pesanan ini akan
                    diproses
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KasirCheckoutPage;
