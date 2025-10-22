import { FormProvider } from 'react-hook-form';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import SettingHeader from '../../../organism/MenuBar/Setting/SettingHeader';
import SettingProfileImage from '../../../organism/MenuBar/Setting/SettingProfileImage';
import SettingInformationData from '../../../organism/MenuBar/Setting/SettingInformationData';
import SettingPassword from '../../../organism/MenuBar/Setting/SettingPassword';
import SettingButtonAction from '../../../organism/MenuBar/Setting/SettingButtonAction';
import { useSettingSectionFunc } from '@/features/dashboard/admin/hooks/functions/settingSection.func';

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

  console.log(admin);

  if (isLoadingData) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Admin Profile"
        messages={[
          'Mengambil data Admin',
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
    'h-12 rounded-xl border border-[#e6d9c9]/70 bg-white/80 px-4 text-[#5d4130] shadow-[0_1px_0_rgba(111,78,55,0.04)] transition-all duration-200 focus:border-[#6f4e37] focus:ring-4 focus:ring-[#6f4e37]/15 placeholder:text-[#b79c85]';
  const inputWithIconClass =
    'h-12 rounded-xl border border-[#e6d9c9]/70 bg-white/80 pl-12 pr-4 text-[#5d4130] shadow-[0_1px_0_rgba(111,78,55,0.04)] transition-all duration-200 focus:border-[#6f4e37] focus:ring-4 focus:ring-[#6f4e37]/15 placeholder:text-[#b79c85]';
  const cardClass =
    'relative overflow-hidden rounded-2xl border border-[#e6d9c9]/70 bg-white/90 p-6 shadow-[0_24px_48px_-30px_rgba(111,78,55,0.55)] backdrop-blur-sm';
  const sectionLabelClass =
    'text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#8c7158]';
  const summaryPillClass =
    'inline-flex items-center gap-2 rounded-2xl border border-[#e6d9c9]/60 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#5d4130] shadow-sm';

  return (
    <FormProvider {...form}>
      <section className="relative overflow-hidden rounded-3xl border border-[#e6d9c9]/70 bg-gradient-to-br from-[#fdf7f1] via-white to-[#f5e7d6] p-6 shadow-[0_32px_60px_-30px_rgba(111,78,55,0.45)] sm:p-10">
        <SettingHeader admin={admin} summaryPillClass={summaryPillClass} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 mt-10 space-y-10"
        >
          <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
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
