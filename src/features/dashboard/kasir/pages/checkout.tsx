import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import { CustomerInformationSection } from '../components/checkout-components/sections/CustomerInformationSection';
import { OrderTypeSection } from '../components/checkout-components/sections/OrderTypeSection';
import { PaymentMethodSection } from '../components/checkout-components/sections/PaymentMethodSection';
import { OrderNotesSection } from '../components/checkout-components/sections/OrderNotesSection';
import { OrderSummarySection } from '../components/checkout-components/sections/OrderSummarySection';

import type { ICartMenuItem } from '@/features/dashboard/kasir/types/cart';
import type { IBaseTable } from '@/features/dashboard/kasir/types/table';
import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';
import { getTables } from '@/features/dashboard/kasir/services/table.service';
import { checkoutSchema } from '@/features/dashboard/kasir/schemas/checkout.schema';

import { TEXT_COLORS } from '@/constants/Style';
import { useToast } from '@/components/shared/ToastProvider';
import { useCartStore } from '@/store/cartStore';
import { useKasirStore } from '@/store/kasirStore';

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

      console.log('Order data:', orderData);
      await new Promise(resolve => setTimeout(resolve, 1500));

      resetCart();
      addToast('Pesanan berhasil dibuat!', 'success');
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
              <CustomerInformationSection
                register={register}
                errors={errors}
                setValue={setValue}
              />

              <OrderTypeSection
                watch={watch}
                setValue={setValue}
                availableTables={availableTables || []}
              />

              <PaymentMethodSection watch={watch} setValue={setValue} />

              <OrderNotesSection register={register} />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummarySection
                cart={cart}
                totalAmount={totalAmount}
                totalItems={totalItems}
                totalQuantity={totalQuantity}
                isSubmitting={isSubmitting}
                kasirData={kasirData}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KasirCheckoutPage;
