import SettingProfileImage from './SettingProfileImage';
import SettingInformationData from './SettingInformationData';
import SettingPassword from './SettingPassword';
import type React from 'react';

interface SettingFormLayoutProps {
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

  cardClass: string;
  sectionLabelClass: string;
  inputWithIconClass: string;
  inputClass: string;
}

const SettingFormLayout = ({
  imageFile,
  imagePreview,
  currentPreviewImage,
  fileInputRef,
  handleInputFileChange,
  resetImageState,
  IMAGE_CONSTRAINTS,
  cardClass,
  sectionLabelClass,
  inputWithIconClass,
  inputClass,
}: SettingFormLayoutProps) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
      {/* Left Column: Profile Image */}
      <SettingProfileImage
        cardClass={cardClass}
        sectionLabelClass={sectionLabelClass}
        imageFile={imageFile}
        imagePreview={imagePreview}
        currentPreviewImage={currentPreviewImage}
        fileInputRef={fileInputRef}
        handleInputFileChange={handleInputFileChange}
        resetImageState={resetImageState}
        IMAGE_CONSTRAINTS={IMAGE_CONSTRAINTS}
      />

      {/* Right Column: Information & Password */}
      <div className="flex flex-col gap-6">
        <SettingInformationData
          cardClass={cardClass}
          sectionLabelClass={sectionLabelClass}
          inputWithIconClass={inputWithIconClass}
        />

        <SettingPassword
          cardClass={cardClass}
          sectionLabelClass={sectionLabelClass}
          inputWithIconClass={inputWithIconClass}
          inputClass={inputClass}
        />
      </div>
    </div>
  );
};

export default SettingFormLayout;
