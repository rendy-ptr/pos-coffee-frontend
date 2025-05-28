import ImageSection from '@/sections/RegisterPage/ui/ImageSection';
import FormSection from '@/sections/RegisterPage/ui/FormSection';

const RegisterPageLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f3e9]">
      {/* Left side - Image */}
      <ImageSection />
      {/* Right side - Register Form */}
      <FormSection />
    </div>
  );
};

export default RegisterPageLayout;
