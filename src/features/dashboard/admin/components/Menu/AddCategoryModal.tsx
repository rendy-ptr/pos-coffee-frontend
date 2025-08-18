import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { iconOptions } from '../../constant/iconOptions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type CategoryFormValues = {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
};

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormValues) => void;
}

const AddCategoryModal = ({ open, onClose, onSave }: AddCategoryModalProps) => {
  const { register, handleSubmit, reset, watch, control } =
    useForm<CategoryFormValues>();

  const selectedIcon = watch('icon');

  const submitForm = (data: CategoryFormValues) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] shadow-xl">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-xl font-bold text-transparent">
            Tambah Kategori Baru
          </DialogTitle>
          <DialogDescription>
            Lengkapi form berikut untuk menambahkan kategori baru.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Nama */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#6f4e37]">
              Nama Kategori
            </Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              placeholder="Contoh: Minuman"
              className="border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#6f4e37]">
              Deskripsi (Opsional)
            </Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Tulis deskripsi kategori..."
              className="min-h-[90px] border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label className="text-[#6f4e37]">Pilih Icon</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {iconOptions.map(opt => {
                const Icon = opt.icon;
                return (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                      selectedIcon === opt.value
                        ? 'border-[#6f4e37] bg-[#6f4e37]/10 text-[#6f4e37]'
                        : 'border-[#e6d9c9]/50 text-[#8c7158] hover:bg-[#6f4e37]/5'
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      {...register('icon')}
                      className="hidden"
                    />
                    <Icon className="h-6 w-6" />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-[#6f4e37]">Status</Label>
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <RadioGroup
                  value={field.value ? 'true' : 'false'}
                  onValueChange={val => field.onChange(val === 'true')}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* Aktif */}
                  <label
                    htmlFor="aktif"
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 font-medium transition-all ${
                      field.value
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'border-[#e6d9c9]/70 bg-white text-[#6f4e37] hover:border-[#6f4e37]'
                    }`}
                  >
                    <RadioGroupItem
                      value="true"
                      id="aktif"
                      className="sr-only"
                    />
                    Aktif
                  </label>

                  {/* Tidak Aktif */}
                  <label
                    htmlFor="nonaktif"
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 font-medium transition-all ${
                      !field.value
                        ? 'border-red-600 bg-red-50 text-red-700 shadow-sm'
                        : 'border-[#e6d9c9]/70 bg-white text-[#6f4e37] hover:border-[#6f4e37]'
                    }`}
                  >
                    <RadioGroupItem
                      value="false"
                      id="nonaktif"
                      className="sr-only"
                    />
                    Tidak Aktif
                  </label>
                </RadioGroup>
              )}
            />
          </div>

          {/* Actions */}
          <DialogFooter className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#e6d9c9]/70 text-[#6f4e37] hover:bg-[#6f4e37]/10"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] text-white shadow-md hover:from-[#5d4130] hover:to-[#7a5033]"
            >
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
