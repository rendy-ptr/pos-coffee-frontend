import BenefitRegister from '../components/BenefitRegister';
import FormRegister from '../components/FormRegister';
import HeaderRegister from '../components/HeaderRegister';
import ImageRegister from '../components/ImageRegister';
import LoginLinkRegister from '../components/LoginLinkRegister';

const RegisterContainer = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f3e9]">
      <ImageRegister />
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <HeaderRegister />
          {/* Register Form */}
          <FormRegister />
          {/* Login Link */}
          <LoginLinkRegister />
          {/* Benefits */}
          <BenefitRegister />
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
