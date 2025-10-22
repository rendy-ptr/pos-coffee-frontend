import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import type { UpdateAdminProfileSchemaPayload } from '@/features/dashboard/admin/schema/admin.schema';

const { Lock } = lucideIcons;

interface ISettingPasswordProps {
  cardClass: string;
  sectionLabelClass: string;
  inputWithIconClass: string;
  inputClass: string;
}

const SettingPassword = ({
  cardClass,
  sectionLabelClass,
  inputWithIconClass,
  inputClass,
}: ISettingPasswordProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateAdminProfileSchemaPayload>();
  return (
    <div className={cardClass}>
      <div className="flex flex-col gap-1 border-b border-dashed border-[#e6d9c9]/60 pb-5">
        <p className={sectionLabelClass}>Keamanan Akun</p>
        <h3 className="text-lg font-semibold text-[#5d4130]">
          Kelola password dengan aman
        </h3>
        <p className="text-sm text-[#8c7158]">
          Isi password saat ini sebelum menetapkan password baru.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-1.5">
          <Label
            htmlFor="currentPassword"
            className="text-sm font-semibold text-[#5d4130]"
          >
            Password Saat Ini
          </Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type="password"
              placeholder="Masukkan password saat ini"
              autoComplete="current-password"
              className={inputWithIconClass}
              {...register('currentPassword')}
            />
            <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
          </div>
          <ErrorMessage
            errors={errors}
            name="currentPassword"
            render={({ message }) => (
              <p className="text-sm text-red-500">{message}</p>
            )}
          />
          <p className="text-xs text-[#8c7158]">
            Hanya isi ketika ingin mengganti password.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="newPassword"
              className="text-sm font-semibold text-[#5d4130]"
            >
              Password Baru
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Opsional"
              autoComplete="new-password"
              className={inputClass}
              {...register('newPassword')}
            />
            <ErrorMessage
              errors={errors}
              name="newPassword"
              render={({ message }) => (
                <p className="text-sm text-red-500">{message}</p>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-[#5d4130]"
            >
              Konfirmasi Password Baru
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Ulangi password baru"
              autoComplete="new-password"
              className={inputClass}
              {...register('confirmPassword')}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) => (
                <p className="text-sm text-red-500">{message}</p>
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#e6d9c9]/60 bg-[#f9f1e7]/80 p-4 text-xs text-[#8c7158] shadow-inner">
        Kosongkan Password Jika Tidak Ingin Mengubah Password.
      </div>
    </div>
  );
};

export default SettingPassword;
