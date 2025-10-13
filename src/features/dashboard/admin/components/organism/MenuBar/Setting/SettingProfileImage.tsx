import { lucideIcons } from '@/icon/lucide-react-icons';
import { Button } from '@/components/ui/button';

import type React from 'react';

const { Upload, User, X } = lucideIcons;

interface ISettingProfileImageProps {
  cardClass: string;
  sectionLabelClass: string;
  imageFile: File | null;
  imagePreview: string | null;
  currentPreviewImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetImageState: () => void;
  IMAGE_CONSTRAINTS: {
    MAX_SIZE: number;
    ACCEPTED_TYPES: string;
  };
}

const SettingProfileImage = ({
  cardClass,
  sectionLabelClass,
  imageFile,
  imagePreview,
  currentPreviewImage,
  fileInputRef,
  handleInputFileChange,
  resetImageState,
  IMAGE_CONSTRAINTS,
}: ISettingProfileImageProps) => {
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <div
        className={`${cardClass} border-dashed border-[#e6d9c9]/70 bg-white/95`}
      >
        <div className="space-y-2 text-center">
          <p className={sectionLabelClass}>Foto Profil</p>
          <h3 className="text-base font-semibold text-[#5d4130]">
            Personalisasi akun administrator Anda
          </h3>
          <p className="text-sm text-[#8c7158]">
            Gunakan foto terbaik agar tim mengenali Anda dengan mudah.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-5">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[#e6d9c9]/60 bg-[#f4ede4] shadow-inner">
            {currentPreviewImage ? (
              <img
                src={currentPreviewImage}
                alt="Foto profil admin"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#6f4e37]">
                <User className="h-12 w-12 text-white" />
              </div>
            )}
          </div>

          <div className="w-full space-y-3 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={IMAGE_CONSTRAINTS.ACCEPTED_TYPES}
              className="hidden"
              onChange={handleInputFileChange}
            />
            {!imageFile && !imagePreview ? (
              <Button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="w-full rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] text-sm font-semibold text-white shadow-sm transition hover:from-[#5b3f2d] hover:to-[#7a5033]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Unggah Foto
              </Button>
            ) : (
              <Button
                type="button"
                onClick={resetImageState}
                className="w-full rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] text-sm font-semibold text-white shadow-sm transition hover:from-[#5b3f2d] hover:to-[#7a5033]"
              >
                <X className="mr-2 h-4 w-4" />
                Hapus Foto
              </Button>
            )}

            {imageFile && (
              <p className="text-xs text-[#6f4e37]">
                File terpilih: {imageFile.name}
              </p>
            )}
            <p className="text-xs text-[#8c7158]">
              Jika tidak mengunggah foto, avatar akan dibuat otomatis
              berdasarkan nama Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e6d9c9]/60 bg-[#f9f1e7]/90 p-5 shadow-inner">
        <p className="text-sm font-semibold text-[#5d4130]">Tips Foto Profil</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs text-[#8c7158]">
          <li>Gunakan rasio 1:1 dengan pencahayaan yang cerah.</li>
          <li>Pastikan wajah terlihat jelas dengan latar bersih.</li>
          <li>Ukuran maksimal 5MB dengan format JPG, PNG, atau WebP.</li>
        </ul>
      </div>
    </div>
  );
};
export default SettingProfileImage;
