import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { MemberIdAutocomplete } from './MemberIdAutocomplete';
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { CARD_STYLES, TEXT_COLORS } from '@/constants/Style';

import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';
interface CustomerInformationSectionProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors;
  setValue: UseFormSetValue<CheckoutFormData>;
}

export const CustomerInformationSection = ({
  register,
  errors,
  setValue,
}: CustomerInformationSectionProps) => {
  return (
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
        <MemberIdAutocomplete
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <div className="space-y-2">
          <Label htmlFor="customerName" className={`${TEXT_COLORS.primary}`}>
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
              {errors.customerName.message as string}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
