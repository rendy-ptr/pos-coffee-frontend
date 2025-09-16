import { lucideIcons } from '@/icon/lucide-react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  formatDateTimeLocal,
  parseDateTimeLocalToISO,
} from '@/utils/formatDate';

import { useEditTableForm, useUpdateTable } from '../../../hooks/table.hook';
import { useToast } from '@/components/shared/ToastProvider';

import type { BaseTable } from '../../../types/table.type';
import type { EditTableFormData } from '../../../schema/table.schema';
import { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { useFormPatch } from '@/hooks/patch.hook';

interface EditTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableItem: BaseTable;
}

const EditTableModal = ({
  isOpen,
  onClose,
  tableItem,
}: EditTableModalProps) => {
  const {
    Save,
    X,
    Users,
    Wrench,
    Info,
    Sparkles,
    BookmarkCheck,
    CheckCircle,
    Home,
    TreeDeciduous,
  } = lucideIcons;

  const { doUpdateTable, isPending: isLoadingSave } = useUpdateTable();
  const { addToast } = useToast();
  const { createPatch } = useFormPatch<EditTableFormData>();

  const defaultValues: EditTableFormData = useMemo(
    () => ({
      number: tableItem.number as number | undefined,
      capacity: tableItem.capacity as number | undefined,
      status: tableItem.status as EditTableFormData['status'] | undefined,
      location: tableItem.location as EditTableFormData['location'] | undefined,
      currentGuests: tableItem.currentGuests as number | undefined,
      lastCleaned: tableItem.lastCleaned
        ? formatDateTimeLocal(tableItem.lastCleaned)
        : undefined,
      reservedBy: tableItem.reservedBy ?? undefined,
      reservedTime: tableItem.reservedTime
        ? formatDateTimeLocal(tableItem.reservedTime)
        : undefined,
    }),
    [tableItem]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useEditTableForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset, defaultValues]);

  const watchedStatus = watch('status');

  useEffect(() => {
    if (watchedStatus !== 'RESERVED') {
      setValue('reservedBy', undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('reservedTime', undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedStatus, setValue]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
        };
      case 'OCCUPIED':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          gradient: 'from-blue-400 via-blue-500 to-blue-600',
        };
      case 'RESERVED':
        return {
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          gradient: 'from-purple-400 via-purple-500 to-purple-600',
        };
      case 'MAINTENANCE':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          gradient: 'from-red-400 via-red-500 to-red-600',
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          gradient: 'from-gray-400 via-gray-500 to-gray-600',
        };
    }
  };

  const statusConfig = getStatusConfig(watchedStatus ?? '');

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: EditTableFormData) => {
    try {
      const transformedData = {
        ...data,
        lastCleaned: data.lastCleaned
          ? parseDateTimeLocalToISO(data.lastCleaned)
          : undefined,
        reservedTime: data.reservedTime
          ? parseDateTimeLocalToISO(data.reservedTime)
          : undefined,
      };

      const patchData = createPatch(transformedData, dirtyFields);
      console.log('Patch Data:', patchData);
      const response = await doUpdateTable({
        id: tableItem.id,
        payload: patchData,
      });
      if (response.success) {
        addToast(
          response.message || 'Meja berhasil diperbarui',
          'success',
          3000
        );
        handleClose();
      } else {
        addToast(response.message || 'Gagal memperbarui meja', 'error', 3000);
      }
    } catch (err) {
      let message = 'Gagal memperbarui meja';

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message || message;
      }

      addToast(message, 'error', 3000);
    }
  };

  const getLoadingMessage = () => {
    if (isLoadingSave) return 'Menyimpan Meja...';
    if (isSubmitting) return 'Memvalidasi Data...';
    return 'Loading...';
  };

  // Combined loading state
  const isLoading = isLoadingSave || isSubmitting;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl">
        {/* Animated Header */}
        <div className="relative overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${statusConfig.gradient}`} />

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute h-3 w-3 animate-bounce text-white/30"
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 p-6">
          <DialogHeader className="space-y-0 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {/* Table Number Display */}
                <div className="group relative">...</div>

                <div className="space-y-1">
                  <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
                    Edit Meja {tableItem.number}
                  </DialogTitle>
                  <DialogDescription className="flex items-center space-x-2 text-sm text-gray-500">
                    <Wrench className="h-4 w-4 text-amber-600" />
                    <span>
                      Ubah informasi detail meja dan simpan perubahan.
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              {/* Table Number */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="table-number"
                >
                  Nomor Meja
                </Label>
                <input
                  id="table-number"
                  {...register('number', { valueAsNumber: true })}
                  type="number"
                  className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    errors.number
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                  placeholder="Contoh: 01 atau 1"
                />
                {errors.number && (
                  <p className="text-xs text-red-600">
                    {errors.number.message}
                  </p>
                )}
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="table-capacity"
                >
                  Kapasitas
                </Label>
                <input
                  id="table-capacity"
                  {...register('capacity', { valueAsNumber: true })}
                  type="number"
                  className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    errors.capacity
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                  }`}
                  placeholder="Contoh: 4"
                />
                {errors.capacity && (
                  <p className="text-xs text-red-600">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status and Location */}
            <div className="grid grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="table-status"
                >
                  Status
                </Label>
                <Select
                  defaultValue={watch('status')}
                  onValueChange={val =>
                    setValue('status', val as EditTableFormData['status'], {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger
                    className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                      errors.status
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                    }`}
                  >
                    <SelectValue placeholder="Pilih status meja" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
                    <SelectItem
                      value="AVAILABLE"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-emerald-700 transition-all focus:bg-gradient-to-r focus:from-emerald-50 focus:to-emerald-100 focus:text-emerald-800"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      Tersedia
                    </SelectItem>

                    <SelectItem
                      value="OCCUPIED"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-blue-700 transition-all focus:bg-gradient-to-r focus:from-blue-50 focus:to-blue-100 focus:text-blue-800"
                    >
                      <Users className="h-4 w-4 text-blue-600" />
                      Terisi
                    </SelectItem>

                    <SelectItem
                      value="RESERVED"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-purple-700 transition-all focus:bg-gradient-to-r focus:from-purple-50 focus:to-purple-100 focus:text-purple-800"
                    >
                      <BookmarkCheck className="h-4 w-4 text-purple-600" />
                      Direservasi
                    </SelectItem>

                    <SelectItem
                      value="MAINTENANCE"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-red-700 transition-all focus:bg-gradient-to-r focus:from-red-50 focus:to-red-100 focus:text-red-800"
                    >
                      <Wrench className="h-4 w-4 text-red-600" />
                      Maintenance
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="table-location"
                >
                  Lokasi
                </Label>
                <Select
                  defaultValue={watch('location')}
                  onValueChange={val =>
                    setValue('location', val as EditTableFormData['location'], {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger
                    className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                      errors.location
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                    }`}
                  >
                    <SelectValue placeholder="Pilih lokasi meja" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
                    <SelectItem
                      value="INDOOR"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-amber-700 transition-all focus:bg-gradient-to-r focus:from-amber-50 focus:to-amber-100 focus:text-amber-800"
                    >
                      <Home className="h-4 w-4 text-amber-600" />
                      Indoor
                    </SelectItem>

                    <SelectItem
                      value="OUTDOOR"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-green-700 transition-all focus:bg-gradient-to-r focus:from-green-50 focus:to-green-100 focus:text-green-800"
                    >
                      <TreeDeciduous className="h-4 w-4 text-green-600" />
                      Outdoor
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-xs text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Current Guests */}
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-gray-700"
                htmlFor="table-current-guests"
              >
                Jumlah Tamu Saat Ini
              </Label>
              <input
                id="table-current-guests"
                {...register('currentGuests', { valueAsNumber: true })}
                type="number"
                min="0"
                max="20"
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                  errors.currentGuests
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                }`}
                placeholder="0"
              />

              {errors.currentGuests && (
                <p className="text-xs text-red-600">
                  {errors.currentGuests.message}
                </p>
              )}
            </div>

            {/* Last Cleaned At */}
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-gray-700"
                htmlFor="table-last-cleaned"
              >
                Terakhir Dibersihkan
              </Label>
              <input
                id="table-last-cleaned"
                type="datetime-local"
                {...register('lastCleaned')}
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:ring-2 focus:outline-none ${
                  errors.lastCleaned
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200'
                }`}
                disabled={isSubmitting || isLoadingSave}
              />
              {errors.lastCleaned && (
                <p className="text-xs text-red-600">
                  {errors.lastCleaned.message}
                </p>
              )}
            </div>

            {/* Reservation Fields - Only show if status is RESERVED */}
            {watchedStatus === 'RESERVED' && (
              <div className="space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4">
                <div className="flex items-center space-x-2 text-purple-700">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Informasi Reservasi</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Reserved By */}
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="table-reserved-by"
                    >
                      Nama Pemesan
                    </Label>
                    <input
                      id="table-reserved-by"
                      {...register('reservedBy')}
                      type="text"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      placeholder="Nama lengkap pemesan"
                      disabled={isSubmitting || isLoadingSave}
                    />
                    {errors.reservedBy && (
                      <p className="text-xs text-red-600">
                        {errors.reservedBy.message}
                      </p>
                    )}
                  </div>

                  {/* Reserved Time */}
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="table-reserved-time"
                    >
                      Waktu Reservasi
                    </Label>
                    <input
                      id="table-reserved-time"
                      {...register('reservedTime')}
                      type="datetime-local"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                    />
                    {errors.reservedTime && (
                      <p className="text-xs text-red-600">
                        {errors.reservedTime.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isLoadingSave}
                className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#5d4130] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>{getLoadingMessage()}</span>
                    </div>
                  ) : (
                    <>
                      <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </span>
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                disabled={isSubmitting || isLoadingSave}
                onClick={handleClose}
                className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50 px-4 py-4 font-bold text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-gray-300 hover:shadow-lg active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                <X className="relative h-5 w-5 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Info Footer */}
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Info className="h-3 w-3" />
              <span>Semua field wajib diisi kecuali info reservasi</span>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTableModal;
