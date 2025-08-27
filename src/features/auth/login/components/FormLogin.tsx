// LOCAL-IMPORTS
import { lucideIcons } from '@/icon/lucide-react-icons';

// HOOKS
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/shared/ToastProvider';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

// THIRD-PARTY
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// FUNCTIONS

// TYPES
import { AxiosError } from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import type { LoginFormData } from '../schema/FormLoginSchema';
import { login } from '@/services/authService';

interface IApiErrorResponse {
  message: string;
}

const FormLogin = () => {
  const { Eye, EyeOff } = lucideIcons;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { setLoggingOut } = useAuthStore();

  useEffect(() => {
    setLoggingOut(false);
  }, [setLoggingOut]);

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
    setIsSubmitting(true);
    try {
      const response = await login(data);
      console.log('API Response:', response.data);
      if (response.success) {
        addToast(response.message, 'success', 5000);
        await queryClient.invalidateQueries({ queryKey: ['auth'] });
        navigate(response.data.redirectUrl, { replace: true });
      }
    } catch (error) {
      let errorMsg = 'An unexpected error occurred';
      if (error instanceof AxiosError && error.response?.data) {
        errorMsg =
          (error.response.data as IApiErrorResponse).message || errorMsg;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      addToast(errorMsg, 'error', 5000);
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="font-medium text-[#6f4e37]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email wajib diisi' })}
            className="mt-1 border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#6f4e37]"
            placeholder="nama@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="font-medium text-[#6f4e37]">
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password wajib diisi' })}
              className="border-[#e6d9c9] pr-10 focus:border-[#6f4e37] focus:ring-[#6f4e37]"
              placeholder="Masukkan password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[#8c7158] hover:text-[#6f4e37]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-[#e6d9c9] text-[#6f4e37] focus:ring-[#6f4e37]"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-[#8c7158]"
          >
            Ingat saya
          </label>
        </div>

        <div className="text-sm">
          <Link
            to="#"
            className="font-medium text-[#6f4e37] hover:text-[#a67c52]"
          >
            Lupa password?
          </Link>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer bg-[#6f4e37] py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-[#5d4130]"
      >
        {isSubmitting ? 'Submitting...' : 'Masuk'}
      </Button>
    </form>
  );
};
export default FormLogin;
