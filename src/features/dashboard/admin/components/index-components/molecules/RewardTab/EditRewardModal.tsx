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
import { Controller, useWatch } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { AxiosError } from 'axios';
import { formatDateForInputDate } from '@/utils/formatDate';
import {
  useUpdateReward,
  useUpdateRewardForm,
} from '../../../../hooks/reward.hook';
import { useFormPatch } from '@/hooks/patch.hook';
import type { BaseRewards } from '../../../../types/reward';
import type { UpdateRewardInputPayload } from '../../../../schema/reward.schema';
import { useEffect } from 'react';

const { BUTTON_HOVER_ICON, ICON_TRANSITION, BUTTON_CANCEL } = COLOR;
const { CheckCircle, XCircle, Gift, Ticket, Tag, Calendar, FileText } =
  lucideIcons;

interface EditRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardItem: BaseRewards;
}

const EditRewardModal = ({
  isOpen,
  onClose,
  rewardItem,
}: EditRewardModalProps) => {
  const { addToast } = useToast();
  const { createPatch } = useFormPatch<UpdateRewardInputPayload>();
  const { doUpdateReward, isPending: isLoading } = useUpdateReward();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useUpdateRewardForm();

  useEffect(() => {
    if (isOpen && rewardItem) {
      reset({
        title: rewardItem.title || undefined,
        type: rewardItem.type || undefined,
        description: rewardItem.description || undefined,
        points: rewardItem.points || undefined,
        code: rewardItem.code || undefined,
        expiryDate: formatDateForInputDate(rewardItem.expiryDate) || undefined,
        conditions: rewardItem.conditions || undefined,
        isActive: rewardItem.isActive,
      });
    }
  }, [isOpen, rewardItem, reset]);

  const type = useWatch({ control, name: 'type' });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitForm = async (data: UpdateRewardInputPayload) => {
    try {
      const patchPayload = createPatch(data, dirtyFields);
      const response = await doUpdateReward({
        id: rewardItem.id,
        payload: patchPayload,
      });

      if (response.success) {
        addToast(
          response.message || `Reward ${data.title} berhasil ditambahkan`,
          'success',
          3000
        );
        handleClose();
      } else {
        addToast(response.message || 'Gagal menambahkan reward', 'error', 3000);
      }
    } catch (err) {
      let message = 'Gagal menambahkan reward';

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message || message;
      }
      addToast(message, 'error', 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="h-[90vh] max-h-[900px] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] p-0 shadow-xl">
        {/* Header */}
        <DialogHeader className="relative border-b-2 border-[#e6d9c9]/50 bg-transparent bg-gradient-to-r from-white to-[#faf9f7] px-8 py-6">
          <div className="relative flex items-center gap-4">
            <div
              className={`rounded-xl ${COLOR.BG_ICON} hidden p-3 shadow-md sm:flex`}
            >
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className={`text-2xl ${COLOR.TEXT_PRIMARY}`}>
                Edit Reward / Voucher
              </DialogTitle>
              <DialogDescription className={`text-sm ${COLOR.TEXT_SECONDARY}`}>
                Isi detail reward atau voucher untuk pelanggan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Section: Detail Reward */}
              <div className="group rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Detail Reward
                  </h3>
                </div>
                <div className="space-y-6">
                  {/* Judul */}
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Judul Reward <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="title"
                        placeholder="Contoh: VIP Workshop"
                        {...register('title')}
                        className={`h-12 rounded-xl border-2 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                          errors.title
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                        }`}
                      />
                      <Gift
                        className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                      />
                    </div>
                    {errors.title && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Tipe */}
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Tipe <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className={`h-12 w-full justify-between rounded-xl border-2 bg-white/70 px-4 text-base text-[#3e2723] transition-all duration-200 ${
                              errors.type
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                                : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                            }`}
                          >
                            <SelectValue placeholder="Pilih tipe reward" />
                          </SelectTrigger>
                          <SelectContent className="scrollbar-thin scrollbar-thumb-[#d1bfa7] scrollbar-track-transparent max-h-60 overflow-y-auto rounded-2xl border border-[#e6d9c9]/60 bg-white shadow-xl backdrop-blur-md">
                            <SelectItem
                              value="REWARD"
                              className="cursor-pointer rounded-lg px-4 py-2 text-base text-[#3e2723] transition-all duration-200 hover:bg-[#f3ece4] hover:text-[#6f4e37] focus:bg-[#e8d9c9] focus:text-[#3e2723] data-[state=checked]:bg-[#6f4e37] data-[state=checked]:text-white"
                            >
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4" />
                                REWARD
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="VOUCHER"
                              className="cursor-pointer rounded-lg px-4 py-2 text-base text-[#3e2723] transition-all duration-200 hover:bg-[#f3ece4] hover:text-[#6f4e37] focus:bg-[#e8d9c9] focus:text-[#3e2723] data-[state=checked]:bg-[#6f4e37] data-[state=checked]:text-white"
                            >
                              <div className="flex items-center gap-2">
                                <Ticket className="h-4 w-4" />
                                VOUCHER
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Deskripsi
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="description"
                        placeholder="Contoh: Akses workshop kopi eksklusif"
                        {...register('description')}
                        className={`h-24 rounded-xl border-2 bg-white/70 pt-4 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                          errors.description
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                        }`}
                      />
                      <FileText
                        className={`absolute top-4 left-4 h-5 w-5 ${COLOR.TEXT_PRIMARY}`}
                      />
                    </div>
                    {errors.description && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Conditional Fields */}
                  {type === 'REWARD' && (
                    <div className="space-y-2">
                      <Label
                        className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                      >
                        Poin <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="points"
                          type="number"
                          onWheel={e => e.currentTarget.blur()}
                          {...register('points', { valueAsNumber: true })}
                          className={`h-12 rounded-xl border-2 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                            errors.points
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                              : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                          }`}
                        />
                        <Tag
                          className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                        />
                      </div>
                      {errors.points && (
                        <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                          <XCircle className="h-4 w-4" />
                          {errors.points.message}
                        </p>
                      )}
                    </div>
                  )}

                  {type === 'VOUCHER' && (
                    <>
                      <div className="space-y-2">
                        <Label
                          className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                        >
                          Kode Voucher <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="code"
                            {...register('code')}
                            className={`h-12 rounded-xl border-2 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                              errors.code
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                                : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                            }`}
                          />
                          <Ticket
                            className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                          />
                        </div>
                        {errors.code && (
                          <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                            <XCircle className="h-4 w-4" />
                            {errors.code.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                        >
                          Tanggal Kadaluarsa
                        </Label>
                        <div className="relative">
                          <Input
                            id="expiryDate"
                            type="date"
                            {...register('expiryDate')}
                            className={`h-12 rounded-xl border-2 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                              errors.expiryDate
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                                : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                            }`}
                          />
                          <Calendar
                            className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                          />
                        </div>
                        {errors.expiryDate && (
                          <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                            <XCircle className="h-4 w-4" />
                            {errors.expiryDate.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Syarat & Ketentuan */}
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Syarat & Ketentuan
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="conditions"
                        placeholder="Contoh: Hanya berlaku untuk pembelian pertama."
                        {...register('conditions')}
                        className={`h-24 rounded-xl border-2 bg-white/70 pt-4 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                          errors.conditions
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                        }`}
                      />
                      <FileText
                        className={`absolute top-4 left-4 h-5 w-5 ${COLOR.TEXT_PRIMARY}`}
                      />
                    </div>
                    {errors.conditions && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.conditions.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Reward Kasir */}
              <div className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Status Reward
                  </h3>
                </div>
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => field.onChange(true)}
                        className={`group relative overflow-hidden rounded-xl border-2 px-4 py-3 text-center font-medium transition-all duration-300 ${
                          field.value === true
                            ? 'scale-105 border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm'
                            : `border-[#e6d9c9]/50 bg-white/80 ${COLOR.TEXT_PRIMARY} hover:scale-105 hover:border-[#6f4e37] hover:bg-[#6f4e37]/5`
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-base">Reward Aktif</span>
                        </div>
                        {field.value === true && (
                          <div className="absolute inset-0 animate-pulse bg-emerald-400/10"></div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange(false)}
                        className={`group relative overflow-hidden rounded-xl border-2 px-4 py-3 text-center font-medium transition-all duration-300 ${
                          field.value === false
                            ? 'scale-105 border-red-600 bg-red-50 text-red-700 shadow-sm'
                            : `border-[#e6d9c9]/50 bg-white/80 ${COLOR.TEXT_PRIMARY} hover:scale-105 hover:border-[#6f4e37] hover:bg-[#6f4e37]/5`
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="h-5 w-5" />
                          <span className="text-base">Reward Tidak Aktif</span>
                        </div>
                        {field.value === false && (
                          <div className="absolute inset-0 animate-pulse bg-red-400/10"></div>
                        )}
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t-2 border-[#e6d9c9]/50 bg-gradient-to-r from-white to-[#faf9f7] px-8 py-6">
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className={`h-12 ${BUTTON_CANCEL} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit(submitForm)}
              className={`h-12 ${BUTTON_HOVER_ICON} ${isLoading ? 'opacity-90' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Menyimpan...</span>
                </div>
              ) : (
                <>
                  <CheckCircle
                    className={`h-5 w-5 ${ICON_TRANSITION} text-white`}
                  />
                  Simpan Reward
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRewardModal;
