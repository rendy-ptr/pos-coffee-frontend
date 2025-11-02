import { FormProvider } from 'react-hook-form';
import SettingHeader from '../organisms/SettingHeader';
import SettingFormLayout from '../organisms/SettingFormLayout';
import SettingButtonAction from '../organisms/SettingButtonAction';
import SettingLoadingState from '../molecules/SettingLoadingState';
import SettingErrorState from '../molecules/SettingErrorState';
import { useSettingSectionFunc } from '@/features/dashboard/admin/hooks/functions/settingSection.func';
import { useSettingStyles } from '../../../hooks/admin.hook';

const SettingSection = () => {
  const {
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
  } = useSettingSectionFunc();

  const styles = useSettingStyles();

  if (isLoadingData) {
    return <SettingLoadingState />;
  }

  if (isError || !admin) {
    return <SettingErrorState />;
  }

  return (
    <FormProvider {...form}>
      <section className={styles.container}>
        <SettingHeader admin={admin} summaryPillClass={styles.summaryPill} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 mt-10 space-y-10"
        >
          <SettingFormLayout
            imageFile={imageFile}
            imagePreview={imagePreview}
            currentPreviewImage={currentPreviewImage}
            fileInputRef={fileInputRef}
            handleInputFileChange={handleInputFileChange}
            resetImageState={resetImageState}
            IMAGE_CONSTRAINTS={IMAGE_CONSTRAINTS}
            cardClass={styles.card}
            sectionLabelClass={styles.sectionLabel}
            inputWithIconClass={styles.inputWithIcon}
            inputClass={styles.input}
          />

          {/* Action Buttons */}
          <SettingButtonAction
            isLoading={isLoading}
            resetForm={resetForm}
            getLoadingMessage={getLoadingMessage}
          />
        </form>
      </section>
    </FormProvider>
  );
};

export default SettingSection;
