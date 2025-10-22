import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useToast } from '@/components/shared/ToastProvider';
import { useUploadImage } from '@/features/dashboard/admin/hooks/useUpload';
import {
  useAdminDashboard,
  useUpdateAdminProfile,
  useUpdateAdminProfileForm,
} from '@/features/dashboard/admin/hooks/admin.hook';
import { useFormPatch } from '@/hooks/patch.hook';

import type { UpdateAdminProfileSchemaPayload } from '@/features/dashboard/admin/schema/admin.schema';
import { AxiosError } from 'axios';

export const useSettingSectionFunc = () => {
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Hooks
  const { addToast } = useToast();
  const {
    data,
    isLoading: isLoadingData,
    isError,
    isSuccess,
  } = useAdminDashboard(true);
  const admin = data?.data;
  const { doUpdateAdminProfile, isPending: isLoadingSave } =
    useUpdateAdminProfile();
  const { doUploadImage, isPending: isLoadingUpload } = useUploadImage();

  const form = useUpdateAdminProfileForm();
  const { handleSubmit, reset, watch, setValue, formState } = form;
  const { dirtyFields } = formState;
  const { createPatch } = useFormPatch<UpdateAdminProfileSchemaPayload>();

  const IMAGE_CONSTRAINTS = {
    MAX_SIZE: 5 * 1024 * 1024,
    ACCEPTED_TYPES: 'image/*',
  } as const;

  useEffect(() => {
    if (!isSuccess || !admin) return;

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
  }, [isSuccess, admin, reset]);

  const watchedValues = {
    name: watch('name'),
  };

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

  return {
    form,
    admin,
    isLoadingData,
    isError,
    isLoading,
    getLoadingMessage,
    fileInputRef,
    imageFile,
    imagePreview,
    currentPreviewImage,
    handleInputFileChange,
    resetImageState,
    resetForm,
    handleSubmit,
    onSubmit,
    IMAGE_CONSTRAINTS,
  };
};
