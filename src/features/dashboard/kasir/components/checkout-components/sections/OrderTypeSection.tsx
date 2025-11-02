import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, CheckCircle, Users, Home, TreePine } from 'lucide-react';
import { CARD_STYLES, TEXT_COLORS } from '@/constants/Style';

import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBaseTable } from '@/features/dashboard/kasir/types/table';
import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';

interface OrderTypeSectionProps {
  watch: UseFormWatch<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  availableTables: IBaseTable[];
}

export const OrderTypeSection = ({
  watch,
  setValue,
  availableTables,
}: OrderTypeSectionProps) => {
  const orderType = watch('orderType');
  const selectedTableId = watch('tableId');

  return (
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
            <Label htmlFor="dine-in" className="flex-1 cursor-pointer">
              <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                Dine In
              </div>
              <div className="text-xs text-[#8c7158]">Makan di tempat</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border border-[#e6d9c9] bg-white p-4 transition-all hover:border-[#d6bfa1] hover:shadow-md">
            <RadioGroupItem value="TAKEAWAY" id="takeaway" />
            <Label htmlFor="takeaway" className="flex-1 cursor-pointer">
              <div className={`font-semibold ${TEXT_COLORS.primary}`}>
                Take Away
              </div>
              <div className="text-xs text-[#8c7158]">Dibawa pulang</div>
            </Label>
          </div>
        </RadioGroup>

        {orderType === 'DINE_IN' && (
          <div className="space-y-3 pt-2">
            <Label className={`${TEXT_COLORS.primary} text-base font-semibold`}>
              Pilih Meja
            </Label>
            {availableTables && availableTables.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {availableTables.map(table => {
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
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-[#8b5e3c]" />
                        </div>
                      )}

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
                              isSelected ? 'text-white' : 'text-[#6f4e37]'
                            }`}
                          >
                            {table.number}
                          </span>
                        </div>
                      </div>

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
                            {table.location === 'INDOOR' ? 'Indoor' : 'Outdoor'}
                          </span>
                        </div>
                      </div>

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
                  <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                    Tidak ada meja tersedia
                  </p>
                  <p className="mt-1 text-xs text-[#8c7158]">
                    Semua meja sedang digunakan. Silakan pilih Take Away.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
