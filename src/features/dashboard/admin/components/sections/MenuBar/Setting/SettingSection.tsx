import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useToast } from '@/components/shared/ToastProvider';
import { useUploadImage } from '@/features/dashboard/admin/hooks/useUpload';
import {
  useAdminDashboard,
  useUpdateAdminProfile,
  useUpdateAdminProfileForm,
} from '@/features/dashboard/admin/hooks/admin.hook';
import type { UpdateAdminProfileSchemaPayload } from '@/features/dashboard/admin/schema/admin.schema';
import { AxiosError } from 'axios';
import { useFormPatch } from '@/hooks/patch.hook';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';

const { Upload, User, X, Save, Mail, Lock, Phone } = lucideIcons;

const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024,
  ACCEPTED_TYPES: 'image/*',
} as const;

const SettingSection = () => {
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Hooks
  const { addToast } = useToast();
  const { data, isLoading: isLoadingData, isError } = useAdminDashboard(true);
  const admin = data?.data;
  const { doUpdateAdminProfile, isPending: isLoadingSave } =
    useUpdateAdminProfile();
  const { doUploadImage, isPending: isLoadingUpload } = useUploadImage();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useUpdateAdminProfileForm();
  const { createPatch } = useFormPatch<UpdateAdminProfileSchemaPayload>();

  useEffect(() => {
    if (!admin) return;
    reset({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      profilePicture: admin.profilePicture || undefined,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setImageFile(null);
    setImagePreview(admin.profilePicture || null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [admin, reset]);

  const watchedValues = {
    name: watch('name'),
  };
  // const fallbackAvatar = getFallbackAvatar(watchedValues.name);
  const defaultAvatarUrl = useMemo(() => {
    if (!watchedValues.name) return '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(watchedValues.name)}&&background=6f4e37&color=fff&size=128&bold=true`;
  }, [watchedValues.name]);

  const currentPreviewImage = useMemo(() => {
    if (imagePreview) return imagePreview;
    if (defaultAvatarUrl) return defaultAvatarUrl;
    return null;
  }, [imagePreview, defaultAvatarUrl]);

  const validateFile = (file: File): string | null => {
    if (file.size > IMAGE_CONSTRAINTS.MAX_SIZE) {
      return 'Ukuran file terlalu besar (max 5MB)';
    }
    if (!file.type.startsWith('image/')) {
      return 'File harus berupa gambar';
    }
    return null;
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const resetImageState = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('profilePicture', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    reset();
    resetImageState();
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: UpdateAdminProfileSchemaPayload) => {
    if (!admin) return;
    try {
      let finalProfilePicture: string | undefined = undefined;

      if (imageFile) {
        const result = await doUploadImage(imageFile);
        finalProfilePicture = result.imageUrl;
      } else if (data.profilePicture && data.profilePicture.trim() !== '') {
        finalProfilePicture = data.profilePicture;
      }

      const patchPayload = createPatch(data, dirtyFields);

      if (finalProfilePicture !== null) {
        patchPayload.profilePicture = finalProfilePicture;
      }

      console.log('🟢 Patch payload yang dikirim:', patchPayload);

      const response = await doUpdateAdminProfile({
        id: admin.id,
        payload: patchPayload,
      });

      if (response.success) {
        addToast(
          response.message || 'Admin berhasil diperbarui',
          'success',
          3000
        );
      } else {
        addToast(response.message || 'Gagal memperbarui admin', 'error', 3000);
      }
    } catch (err) {
      let message = 'Gagal memperbarui admin';

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message || message;
      }

      addToast(message, 'error', 3000);
    }
  };

  // Helper function to get loading message
  const getLoadingMessage = () => {
    if (isLoadingUpload) return 'Mengunggah gambar...';
    if (isLoadingSave) return 'Menyimpan admin profile...';
    return 'Loading...';
  };

  // Combined loading state
  const isLoading = isLoadingUpload || isLoadingSave;

  if (isLoadingData) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Menu"
        messages={[
          'Mengambil data Menu',
          'Memproses informasi',
          'Mempersiapkan tampilan',
        ]}
      />
    );
  }

  if (isError || !admin) {
    return <p className="text-center text-red-500">Gagal memuat data</p>;
  }

  const inputClass =
    'h-12 rounded-xl border border-[#e6d9c9]/60 bg-white/80 px-4 text-[#5d4130] transition focus:border-[#6f4e37] focus:ring-[#6f4e37]/30';
  const inputWithIconClass =
    'h-12 rounded-xl border border-[#e6d9c9]/60 bg-white/80 pl-12 pr-4 text-[#5d4130] transition focus:border-[#6f4e37] focus:ring-[#6f4e37]/30';

  return (
    <section className="rounded-2xl border border-[#e6d9c9]/60 bg-white p-6 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold text-[#5d4130]">
          Profil Administrator
        </h2>
        <p className="text-sm text-[#8c7158]">
          Perbarui nama, email, nomor telepon, password, dan foto profil.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl border border-dashed border-[#e6d9c9]/60 bg-white/80 p-5 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#e6d9c9]/60 bg-[#f4ede4]">
              {currentPreviewImage ? (
                <img
                  src={currentPreviewImage}
                  alt="Foto profil admin"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#6f4e37]">
                  <User className="h-10 w-10 text-white" />
                </div>
              )}
              {imagePreview && (
                <button
                  type="button"
                  onClick={resetImageState}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#6f4e37] shadow transition hover:bg-[#f2e6da]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="w-full space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept={IMAGE_CONSTRAINTS.ACCEPTED_TYPES}
                className="hidden"
                onChange={handleInputFileChange}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] text-sm font-semibold text-white shadow-sm transition hover:from-[#5b3f2d] hover:to-[#7a5033]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Unggah Foto
              </Button>
              {imageFile && (
                <p className="text-xs text-[#6f4e37]">
                  File terpilih: {imageFile.name}
                </p>
              )}
              <p className="text-xs text-[#8c7158]">
                Jika tidak mengunggah foto, sistem akan membuat avatar default
                berdasarkan nama admin.
              </p>
              <p className="text-xs text-[#8c7158]">
                Format JPG, PNG, atau WebP - Maks 2MB.
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#5d4130]"
                >
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Masukkan nama admin"
                    className={inputWithIconClass}
                    {...register('name')}
                  />
                  <User className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#5d4130]"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email admin"
                    className={inputWithIconClass}
                    {...register('email')}
                  />
                  <Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-[#5d4130]"
              >
                Nomor Telepon (opsional)
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  placeholder="Contoh: 081234567890"
                  className={inputWithIconClass}
                  {...register('phone')}
                />
                <Phone className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="currentPassword"
                className="text-sm font-semibold text-[#5d4130]"
              >
                Password Saat Ini
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Masukkan password saat ini"
                  autoComplete="current-password"
                  className={inputWithIconClass}
                  {...register('currentPassword')}
                />
                <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
              <p className="text-xs text-[#8c7158]">
                Hanya isi ketika ingin mengganti password.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-semibold text-[#5d4130]"
                >
                  Password Baru
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Opsional"
                  autoComplete="new-password"
                  className={inputClass}
                  {...register('newPassword')}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-[#5d4130]"
                >
                  Konfirmasi Password Baru
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password baru"
                  autoComplete="new-password"
                  className={inputClass}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-dashed border-[#e6d9c9]/60 pt-4 min-[420px]:flex-row min-[420px]:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isLoading}
            className="h-11 rounded-xl border border-[#e6d9c9]/70 bg-white/80 px-5 text-sm font-semibold text-[#5d4130] hover:border-[#6f4e37] hover:bg-[#f3ece3]"
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-6 text-sm font-semibold text-white shadow-sm transition hover:from-[#5b3f2d] hover:to-[#7a5033] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{getLoadingMessage()}</span>
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SettingSection;
