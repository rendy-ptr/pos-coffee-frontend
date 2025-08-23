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
import { iconOptions } from '../../../../constant/iconOptions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUpdateCategory } from '../../../../hooks/categoryHooks';
import { useToast } from '@/components/shared/ToastProvider';
import type { Category, UpdateCategoryInput } from '../../../../types/category';
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { COLOR } from '@/constants/Style';

const { BUTTON_HOVER_ICON, ICON_TRANSITION, BUTTON_CANCEL } = COLOR;

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  categoryItem: Category;
}

const EditCategoryModal = ({
  open,
  onClose,
  categoryItem,
}: EditCategoryModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<UpdateCategoryInput>({
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (categoryItem) {
      reset({
        name: categoryItem.name,
        description: categoryItem.description ?? '',
        icon: categoryItem.icon,
        isActive: categoryItem.isActive,
      });
    }
  }, [categoryItem, reset]);

  const selectedIcon = watch('icon');
  const { doUpdateCategory, isPending: isLoadingEdit } = useUpdateCategory();
  const { addToast } = useToast();

  const getLoadingMessage = () => {
    if (isLoadingEdit) return 'Mengedit kategori...';
    return 'Loading...';
  };

  const isLoading = isLoadingEdit || false;

  const submitForm = async (data: UpdateCategoryInput) => {
    // if (!category) return;
    try {
      await doUpdateCategory({ id: categoryItem.id, payload: data });
      console.log('Form Data:', data);
      addToast('Kategori berhasil diperbarui', 'success', 3000);
      reset();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        addToast(err.message || 'Gagal memperbarui kategori', 'error', 3000);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] shadow-xl">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-xl font-bold text-transparent">
            Edit Kategori
          </DialogTitle>
          <DialogDescription>
            Ubah data kategori sesuai kebutuhan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Nama */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-[#6f4e37]">
              Nama Kategori <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register('name', { required: 'Nama kategori wajib diisi' })}
              placeholder="Contoh: Minuman"
              className={`border ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
                  : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e3]/30'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
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
          <div className="space-y-1">
            <Label className="text-[#6f4e37]">
              Pilih Icon <span className="text-red-500">*</span>
            </Label>
            <div
              className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${
                errors.icon ? 'rounded-lg border border-red-500 p-2' : ''
              }`}
            >
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
                      {...register('icon', {
                        required: 'Icon wajib dipilih',
                      })}
                      className="hidden"
                    />
                    <Icon className="h-6 w-6" />
                    {opt.label}
                  </label>
                );
              })}
            </div>
            {errors.icon && (
              <p className="text-sm text-red-500">{errors.icon.message}</p>
            )}
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
              disabled={isLoading}
              className={`h-12 ${BUTTON_CANCEL} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Batalkan
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={`h-12 ${BUTTON_HOVER_ICON} ${isLoading ? 'opacity-90' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{getLoadingMessage()}</span>
                </div>
              ) : (
                <>
                  <CheckCircle
                    className={`h-5 w-5 ${ICON_TRANSITION} text-white`}
                  />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
