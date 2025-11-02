import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Banknote } from 'lucide-react';
import { CARD_STYLES, TEXT_COLORS } from '@/constants/Style';

import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';

interface PaymentMethodSectionProps {
  watch: UseFormWatch<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
}

export const PaymentMethodSection = ({
  watch,
  setValue,
}: PaymentMethodSectionProps) => {
  const paymentMethod = watch('paymentMethod');

  return (
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
            setValue('paymentMethod', value as 'CASH' | 'CARD' | 'E_WALLET')
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
            <Label htmlFor="e-wallet" className="flex-1 cursor-pointer">
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
  );
};
