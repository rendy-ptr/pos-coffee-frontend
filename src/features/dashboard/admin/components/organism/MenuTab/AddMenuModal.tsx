import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller, useForm } from 'react-hook-form';
import { COLOR } from '@/constants/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useToast } from '@/components/shared/ToastProvider';

import type { CreateMenuInput } from '../../../types/menu';
import type { BaseCategory } from '../../../types/category';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { useCreateMenu } from '../../../hooks/menu.hook';
import { useUploadImage } from '../../../hooks/useUpload';
import { AxiosError } from 'axios';

type LucideIconName = keyof typeof LucideIcons;
type LucideIconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

const { BUTTON_HOVER_ICON, ICON_TRANSITION, BUTTON_CANCEL } = COLOR;
const {
  Upload,
  X,
  Image,
  DollarSign,
  CheckCircle,
  XCircle,
  TrendingUp,
  Tag,
  Camera,
  UtensilsCrossed,
} = lucideIcons;

interface AddMenuModalProps {
  open: boolean;
  onClose: () => void;
  categories: BaseCategory[];
}

const FORM_DEFAULTS = {
  imageUrl: '',
  name: '',
  categoryId: '',
  stock: 0,
  productionCapital: 0,
  sellingPrice: 0,
  profit: 0,
  isActive: true,
} as const;

const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024,
  ACCEPTED_TYPES: 'image/*',
} as const;

const AddMenuModal = ({ open, onClose, categories }: AddMenuModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateMenuInput>({
    defaultValues: FORM_DEFAULTS,
  });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Local state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Hooks
  const { addToast } = useToast();
  const { doUploadImage, isPending: isLoadingUpload } = useUploadImage();
  const { doCreateMenu, isPending: isLoadingSave } = useCreateMenu();

  // Watched values
  const watchedValues = {
    price: watch('sellingPrice'),
    cost: watch('productionCapital'),
    imageUrl: watch('imageUrl'),
    profit: watch('profit'),
  };

  // Computed values
  const activeCategories = useMemo(() => {
    const unique = new Map<string, BaseCategory>();
    categories
      .filter(cat => cat.isActive)
      .forEach(cat => {
        if (!unique.has(cat.name)) {
          unique.set(cat.name, cat);
        }
      });
    return Array.from(unique.values());
  }, [categories]);

  const profitPercentage = useMemo(() => {
    return watchedValues.price > 0
      ? ((watchedValues.profit / watchedValues.price) * 100).toFixed(1)
      : '0';
  }, [watchedValues.price, watchedValues.profit]);

  // Helper function to get loading message
  const getLoadingMessage = () => {
    if (isLoadingUpload) return 'Mengunggah gambar...';
    if (isLoadingSave) return 'Menyimpan menu...';
    return 'Loading...';
  };

  // Combined loading state
  const isLoading = isLoadingUpload || isLoadingSave;

  // Effects
  useEffect(() => {
    const price = Number(watchedValues.price) || 0;
    const cost = Number(watchedValues.cost) || 0;
    const profit = price - cost;
    setValue('profit', profit);
  }, [watchedValues.price, watchedValues.cost, setValue]);

  useEffect(() => {
    if (!watchedValues.imageUrl && !imageFile) {
      setImagePreview(null);
    }
  }, [watchedValues.imageUrl, imageFile]);

  // Helper functions
  const validateFile = (file: File): string | null => {
    if (file.size > IMAGE_CONSTRAINTS.MAX_SIZE) {
      return 'Ukuran file terlalu besar (max 5MB)';
    }
    if (!file.type.startsWith('image/')) {
      return 'File harus berupa gambar';
    }
    return null;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const resetImageState = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('imageUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    reset();
    resetImageState();
  };

  // Event handlers
  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    setImageFile(file);
    setValue('imageUrl', '');
    setImagePreview(URL.createObjectURL(file));
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setValue('imageUrl', url);
    if (url) {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadAreaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const submitForm = async (data: CreateMenuInput) => {
    try {
      // Image validation
      if (!imageFile && !data.imageUrl) {
        addToast(
          'Silakan upload gambar atau masukkan URL gambar',
          'error',
          3000
        );
        return;
      }

      if (data.imageUrl && !isValidUrl(data.imageUrl)) {
        addToast('URL gambar tidak valid', 'error', 3000);
        return;
      }

      // Handle image upload
      let finalImageUrl = data.imageUrl;
      if (imageFile) {
        const result = await doUploadImage(imageFile);
        finalImageUrl = result.imageUrl;
      }

      // Create menu
      const response = await doCreateMenu({
        ...data,
        imageUrl: finalImageUrl,
      });

      if (response.success) {
        addToast(
          response.message || 'Menu berhasil ditambahkan',
          'success',
          3000
        );
        handleClose();
      } else {
        addToast(response.message || 'Gagal menambahkan menu', 'error', 3000);
      }
    } catch (err) {
      let message = 'Gagal menambahkan menu';

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message || message;
      }

      addToast(message, 'error', 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="h-[90vh] max-h-[900px] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] p-0 shadow-xl">
        {/* Header */}
        <DialogHeader className="relative border-b-2 border-[#e6d9c9]/50 bg-transparent bg-gradient-to-r from-white to-[#faf9f7] px-8 py-6">
          <div className="relative flex items-center gap-4">
            <div
              className={`rounded-xl ${COLOR.BG_ICON} hidden p-3 shadow-md sm:flex`}
            >
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>

            <div className="flex-1">
              <DialogTitle className={`text-2xl ${COLOR.TEXT_PRIMARY}`}>
                Tambah Menu Baru
              </DialogTitle>
              <DialogDescription className={`text-sm ${COLOR.TEXT_SECONDARY}`}>
                Tambahkan Menu baru dengan detail yang lengkap
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Section: Upload Gambar */}
              <div className="group rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Gambar Menu
                  </h3>
                  <span className="text-lg text-red-500">*</span>
                </div>
                <div className="space-y-6">
                  {/* Input file tersembunyi */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleInputFileChange}
                    accept={IMAGE_CONSTRAINTS.ACCEPTED_TYPES}
                    className="hidden"
                  />

                  {imagePreview || watchedValues.imageUrl ? (
                    <div className="group/preview relative overflow-hidden rounded-2xl border-2 border-[#e6d9c9]/50 shadow-lg">
                      <img
                        src={imagePreview || watchedValues.imageUrl}
                        alt="Preview"
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover/preview:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"></div>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-4 right-4 rounded-full shadow-lg transition-transform hover:scale-110"
                        onClick={resetImageState}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      tabIndex={-1}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleUploadAreaClick}
                      onKeyDown={handleUploadAreaKeyDown}
                      className={`group/upload w-full cursor-pointer rounded-2xl border-3 border-dashed p-8 transition-all duration-300 focus:ring-2 focus:ring-[#6f4e37] focus:ring-offset-2 focus:outline-none ${
                        dragOver
                          ? 'scale-105 border-[#6f4e37] bg-[#6f4e37]/5'
                          : 'border-[#e6d9c9]/50 bg-white/80 hover:border-[#6f4e37]/30 hover:bg-[#6f4e37]/5'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`mb-4 rounded-full ${COLOR.BG_ICON} p-4`}
                        >
                          <Upload className="h-8 w-8 text-white group-hover/upload:animate-bounce" />
                        </div>
                        <h4 className={`mb-2 text-lg ${COLOR.TEXT_PRIMARY}`}>
                          Drag & Drop Gambar di Sini
                        </h4>
                        <p className={`mb-1 ${COLOR.TEXT_SECONDARY}`}>
                          atau klik untuk memilih file
                        </p>
                        <p className={`text-xs ${COLOR.TEXT_SECONDARY}`}>
                          Maksimal 5MB • JPG, PNG, WebP
                        </p>
                      </div>
                    </button>
                  )}
                  <div className="relative">
                    <Input
                      type="url"
                      {...register('imageUrl')}
                      onChange={handleUrlChange}
                      placeholder="Atau masukkan URL gambar..."
                      className={`h-12 rounded-xl border-2 border-[#e6d9c9]/50 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} transition-all duration-200 placeholder:${COLOR.TEXT_SECONDARY} focus:border-[#6f4e37] focus:bg-white focus:ring-4 focus:ring-[#6f4e37]/30`}
                    />
                    <Image
                      className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Info Menu */}
              <div className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Informasi Menu
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Nama Menu <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('name', {
                        required: 'Nama menu wajib diisi',
                      })}
                      onWheel={e => e.currentTarget.blur()}
                      placeholder="Contoh: Cappuccino Premium Special"
                      className={`h-12 rounded-xl border-2 bg-white/70 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                          : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                      }`}
                    />
                    {errors.name && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Kategori <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="categoryId"
                      control={control}
                      rules={{ required: 'Kategori wajib dipilih' }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={activeCategories.length === 0}
                        >
                          <SelectTrigger
                            className={`h-12 w-full rounded-xl border-2 bg-white/70 ${COLOR.TEXT_PRIMARY} transition-all duration-200 ${
                              errors.categoryId
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                                : 'border-[#e6d9c9]/50 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30'
                            }`}
                          >
                            <SelectValue
                              placeholder={
                                activeCategories.length === 0
                                  ? 'Aktifkan atau Tambahkan Kategori Dahulu'
                                  : 'Pilih Kategori Menu'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2 border-[#e6d9c9]/50 bg-white shadow-lg">
                            {activeCategories.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-gray-500">
                                Tidak ada kategori tersedia
                              </div>
                            ) : (
                              activeCategories.map(cat => {
                                const iconName = cat.icon as LucideIconName;
                                const IconComponent =
                                  (LucideIcons[
                                    iconName
                                  ] as LucideIconComponent) ?? LucideIcons.Box;
                                return (
                                  <SelectItem
                                    key={cat.id}
                                    value={cat.id}
                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 font-medium text-[#6f4e37] hover:bg-[#f7f3ef]"
                                  >
                                    <IconComponent className="h-5 w-5" />
                                    {cat.name}
                                  </SelectItem>
                                );
                              })
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.categoryId && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      className={`flex items-center gap-2 text-base ${COLOR.TEXT_PRIMARY}`}
                    >
                      Stock <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      {...register('stock', {
                        required: 'Stock wajib diisi',
                        min: { value: 0, message: 'Stock tidak boleh negatif' },
                      })}
                      placeholder="0"
                      onWheel={e => e.currentTarget.blur()}
                      className={`h-12 rounded-xl border-2 border-[#e6d9c9]/50 bg-white/70 ${COLOR.TEXT_PRIMARY} [appearance:textfield] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    />
                    {errors.stock && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Harga & Keuntungan */}
              <div className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Harga & Keuntungan
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className={`text-base ${COLOR.TEXT_PRIMARY}`}>
                      Modal Produksi
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        {...register('productionCapital', {
                          min: {
                            value: 0,
                            message: 'Modal tidak boleh negatif',
                          },
                        })}
                        placeholder="0"
                        onWheel={e => e.currentTarget.blur()}
                        className={`h-12 rounded-xl border-2 border-[#e6d9c9]/50 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} [appearance:textfield] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      />
                      <span
                        className={`absolute top-1/2 left-4 -translate-y-1/2 font-semibold ${COLOR.TEXT_PRIMARY}`}
                      >
                        Rp
                      </span>
                    </div>
                    {errors.productionCapital && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.productionCapital.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-base ${COLOR.TEXT_PRIMARY}`}>
                      Harga Jual
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        {...register('sellingPrice', {
                          required: 'Harga jual wajib diisi',
                          min: {
                            value: 0,
                            message: 'Harga jual tidak boleh negatif',
                          },
                        })}
                        placeholder="0"
                        onWheel={e => e.currentTarget.blur()}
                        className={`h-12 rounded-xl border-2 border-[#e6d9c9]/50 bg-white/70 pl-12 ${COLOR.TEXT_PRIMARY} [appearance:textfield] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      />
                      <span
                        className={`absolute top-1/2 left-4 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                      >
                        Rp
                      </span>
                    </div>
                    {errors.sellingPrice && (
                      <p className="animate-in slide-in-from-left-2 flex items-center gap-2 text-sm text-red-500">
                        <XCircle className="h-4 w-4" />
                        {errors.sellingPrice.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-r from-white to-[#faf9f7] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className={`h-6 w-6 ${COLOR.TEXT_PRIMARY}`} />
                      <h4
                        className={`text-md lg:text-lg ${COLOR.TEXT_PRIMARY}`}
                      >
                        Keuntungan
                      </h4>
                    </div>
                    <div
                      className={`rounded-xl bg-[#e6d9c9]/50 px-3 py-1 text-xs lg:text-sm ${COLOR.TEXT_SECONDARY}`}
                    >
                      Margin: {profitPercentage}%
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      {...register('profit')}
                      readOnly
                      className={`h-14 cursor-not-allowed rounded-xl border-2 border-[#e6d9c9]/50 bg-[#faf9f7] pl-12 text-2xl ${COLOR.TEXT_PRIMARY}`}
                    />
                    <span
                      className={`absolute top-1/2 left-4 -translate-y-1/2 ${COLOR.TEXT_PRIMARY}`}
                    >
                      Rp
                    </span>
                  </div>
                  {watchedValues.profit > 0 && (
                    <p
                      className={`mt-2 flex items-center gap-1 text-sm text-green-600`}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Keuntungan dihitung otomatis berdasarkan harga jual -
                      modal
                    </p>
                  )}
                  {watchedValues.profit < 0 && (
                    <p
                      className={`mt-2 flex items-center gap-1 text-sm text-red-600`}
                    >
                      <XCircle className="h-4 w-4" />
                      Menu ini merugi (harga jual lebih rendah dari modal)
                    </p>
                  )}
                </div>
              </div>

              {/* Section: Status */}
              <div className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`rounded-xl ${COLOR.BG_ICON} flex h-10 w-10 items-center justify-center p-2 shadow-md`}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
                    Status Menu
                  </h3>
                </div>
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Tombol Aktif (true) */}
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
                          <span className="text-base">Menu Aktif</span>
                        </div>
                        {field.value === true && (
                          <div className="absolute inset-0 animate-pulse bg-emerald-400/10"></div>
                        )}
                      </button>

                      {/* Tombol Tidak Aktif (false) */}
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
                          <span className="text-base">Tidak Aktif</span>
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
              onClick={handleSubmit(submitForm)}
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
                  Tambah Menu
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuModal;
