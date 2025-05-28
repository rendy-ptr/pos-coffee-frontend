import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema/FormRegisterSchema';
import type { RegisterFormData } from '../schema/FormRegisterSchema';

const FormSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { Coffee, ArrowLeft, EyeOff, Eye, Check } = lucideIcons;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="mb-8 inline-flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-[#6f4e37]" />
            <span className="text-[#6f4e37] hover:text-[#a67c52]">
              Kembali ke Beranda
            </span>
          </Link>
          <div className="mb-6 flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-[#6f4e37]" />
            <span className="text-2xl font-bold text-[#6f4e37]">
              Aroma Kopi
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[#6f4e37]">
            Daftar Member
          </h1>
          <p className="text-[#8c7158]">
            Buat akun untuk mendapatkan keuntungan eksklusif
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-medium text-[#6f4e37]">
                Nama Lengkap
              </Label>
              <Input
                {...register('name')}
                id="name"
                className="mt-1 border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="font-medium text-[#6f4e37]">
                Email
              </Label>
              <Input
                {...register('email')}
                id="email"
                className="mt-1 border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                placeholder="nama@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="font-medium text-[#6f4e37]">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  className="border-[#e6d9c9] pr-10 focus:border-[#6f4e37] focus:ring-[#6f4e37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-[#8c7158] hover:text-[#6f4e37]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#6f4e37] py-3 text-lg font-medium text-white hover:bg-[#5d4130]"
          >
            Daftar Sekarang
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-[#8c7158]">
            Sudah punya akun?{' '}
            <Link
              to="/auth/login"
              className="font-medium text-[#6f4e37] hover:text-[#a67c52]"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 rounded-lg bg-[#e6d9c9]/30 p-4">
          <h3 className="mb-3 font-semibold text-[#6f4e37]">
            Keuntungan Menjadi Member:
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#6f4e37]" />
              <span className="text-sm text-[#8c7158]">
                Promo eksklusif setiap bulan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#6f4e37]" />
              <span className="text-sm text-[#8c7158]">
                Poin reward setiap pembelian
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#6f4e37]" />
              <span className="text-sm text-[#8c7158]">
                Akses prioritas ke workshop kopi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#6f4e37]" />
              <span className="text-sm text-[#8c7158]">
                Notifikasi menu baru
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
