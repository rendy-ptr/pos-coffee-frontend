import ImageLogin from '../components/ImageLogin';
import HeaderLogin from '../components/HeaderLogin';
import FormLogin from '../components/FormLogin';
import RegisterLinkLogin from '../components/RegisterLinkLogin';
import BenefitLogin from '../components/BenefitLogin';

const LoginContainer = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f3e9]">
      {/* Left side - Image */}
      <ImageLogin />
      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <HeaderLogin />
          {/* Login Form */}
          <FormLogin />
          {/* Register Link */}
          <RegisterLinkLogin />
          {/* Benefits */}
          <BenefitLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
