import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../services/uploadService';
import type { UploadResponse } from '../types/upload';

export const useUploadImage = () => {
  const mutation = useMutation<UploadResponse, Error, File>({
    mutationFn: uploadImage,
  });

  return {
    ...mutation,
    doUploadImage: mutation.mutateAsync,
  };
};
