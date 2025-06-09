import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema/FormRegisterSchema';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/utils/apiClient';
import type { RegisterFormData } from '../schema/FormRegisterSchema';
import type { SubmitHandler } from 'react-hook-form';

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { EyeOff, Eye } = lucideIcons;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await apiClient.post('/auth/register', data);
      console.log('Registration successful:', response.data);
      navigate('/auth/login', {
        state: { message: 'Registration successful! Please log in.' },
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message || 'Registration failed'
          : 'Registration failed';
      console.error('Registration error:', errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
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
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
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
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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
      {errorMessage && (
        <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer bg-[#6f4e37] py-3 text-lg font-medium text-white hover:bg-[#5d4130]"
      >
        {isSubmitting ? 'Submitting...' : 'Daftar Sekarang'}
      </Button>
    </form>
  );
};
export default FormRegister;
