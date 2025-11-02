import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { CARD_STYLES, TEXT_COLORS } from '@/constants/Style';

import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';
import type { UseFormRegister } from 'react-hook-form';

interface OrderNotesSectionProps {
  register: UseFormRegister<CheckoutFormData>;
}

export const OrderNotesSection = ({ register }: OrderNotesSectionProps) => {
  return (
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
  );
};
