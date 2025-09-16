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
import { Controller } from 'react-hook-form';
import { COLOR } from '@/constants/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useToast } from '@/components/shared/ToastProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AxiosError } from 'axios';
import { useCreateTable, useCreateTableForm } from '../../../hooks/table.hook';

import type { CreateTableFormData } from '../../../schema/table.schema';

const { BUTTON_HOVER_ICON, ICON_TRANSITION, BUTTON_CANCEL } = COLOR;
const { CheckCircle, XCircle, SquaresExclude, Home, Palmtree } = lucideIcons;

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTableModal = ({ isOpen, onClose }: AddTableModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCreateTableForm();

  const { addToast } = useToast();
  const { doCreateTable, isPending: isLoading } = useCreateTable();

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitForm = async (data: CreateTableFormData) => {
    try {
      const response = await doCreateTable(data);
      if (response.success) {
        addToast(
          response.message || `Meja ${data.number} berhasil ditambahkan`,
          'success',
          3000
        );
        console.log('Table created:', response);
        console.log('Status :', response.success);
        handleClose();
      } else {
        addToast(response.message || 'Gagal menambahkan meja', 'error', 3000);
      }
      console.log('Response:', response);
    } catch (err) {
      if (err instanceof AxiosError) {
        addToast(err.response?.data?.message || err.message, 'error', 3000);
      } else {
        addToast('Gagal menambahkan meja', 'error', 3000);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] p-0 shadow-xl">
        {/* Header */}
        <DialogHeader className="border-b-2 border-[#e6d9c9]/50 bg-gradient-to-r from-white to-[#faf9f7] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-xl ${COLOR.BG_ICON} p-2 shadow-md`}>
              <SquaresExclude className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                Tambah Meja Baru
              </DialogTitle>
              <DialogDescription className={`text-sm ${COLOR.TEXT_SECONDARY}`}>
                Tambahkan meja baru dengan detail nomor, kapasitas, dan lokasi
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="space-y-6">
            {/* Section: Detail Meja */}
            <div className="rounded-2xl border-2 border-[#e6d9c9]/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className={`rounded-xl ${COLOR.BG_ICON} p-2 shadow-md`}>
                  <SquaresExclude className="h-5 w-5 text-white" />
                </div>
                <h3 className={`text-lg ${COLOR.TEXT_PRIMARY}`}>Detail Meja</h3>
              </div>
              <div className="space-y-4">
                {/* Nomor Meja */}
                <div className="space-y-2">
                  <Label
                    className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    htmlFor="table-number"
                  >
                    Nomor Meja <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="table-number"
                    type="number"
                    {...register('number', { valueAsNumber: true })}
                    placeholder="Contoh: 01"
                    className={`h-10 rounded-xl border-2 bg-white/70 ${COLOR.TEXT_PRIMARY} transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                      errors.number
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                    }`}
                  />
                  {errors.number && (
                    <p className="flex items-center gap-2 text-sm text-red-500">
                      <XCircle className="h-4 w-4" />
                      {errors.number.message}
                    </p>
                  )}
                </div>

                {/* Kapasitas */}
                <div className="space-y-2">
                  <Label
                    className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    htmlFor="table-capacity"
                  >
                    Kapasitas <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="table-capacity"
                    type="number"
                    {...register('capacity', { valueAsNumber: true })}
                    placeholder="Contoh: 4"
                    className={`h-10 rounded-xl border-2 bg-white/70 ${COLOR.TEXT_PRIMARY} transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                      errors.capacity
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                    }`}
                  />
                  {errors.capacity && (
                    <p className="flex items-center gap-2 text-sm text-red-500">
                      <XCircle className="h-4 w-4" />
                      {errors.capacity.message}
                    </p>
                  )}
                </div>

                {/* Lokasi */}
                <div className="space-y-2">
                  <Label
                    className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                  >
                    Lokasi <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`h-10 w-full rounded-xl border-2 bg-white/70 text-base ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                            errors.location
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                              : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                          }`}
                        >
                          <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-[#e6d9c9]/60 bg-white shadow-lg">
                          <SelectItem
                            value="INDOOR"
                            className="flex items-center gap-2"
                          >
                            <Home className="h-4 w-4" />
                            INDOOR
                          </SelectItem>
                          <SelectItem
                            value="OUTDOOR"
                            className="flex items-center gap-2"
                          >
                            <Palmtree className="h-4 w-4" />
                            OUTDOOR
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.location && (
                    <p className="flex items-center gap-2 text-sm text-red-500">
                      <XCircle className="h-4 w-4" />
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t-2 border-[#e6d9c9]/50 bg-gradient-to-r from-white to-[#faf9f7] px-6 py-4">
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className={`h-10 ${BUTTON_CANCEL} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(submitForm)}
              disabled={isLoading}
              className={`h-10 ${BUTTON_HOVER_ICON} ${isLoading ? 'opacity-90' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Menyimpan meja...</span>
                </div>
              ) : (
                <>
                  <CheckCircle
                    className={`h-5 w-5 ${ICON_TRANSITION} text-white`}
                  />
                  Tambah Meja
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTableModal;
