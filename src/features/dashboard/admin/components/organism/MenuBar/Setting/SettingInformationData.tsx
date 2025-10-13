import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useUpdateAdminProfileForm } from '@/features/dashboard/admin/hooks/admin.hook';

const { User, Mail, Phone } = lucideIcons;

interface ISettingInformationDataProps {
  cardClass: string;
  sectionLabelClass: string;
  inputWithIconClass: string;
}

const SettingInformationData = ({
  cardClass,
  sectionLabelClass,
  inputWithIconClass,
}: ISettingInformationDataProps) => {
  const {
    register,
    formState: { errors },
  } = useUpdateAdminProfileForm();
  return (
    <div className={cardClass}>
      <div className="flex flex-col gap-1 border-b border-dashed border-[#e6d9c9]/60 pb-5">
        <p className={sectionLabelClass}>Informasi Kontak</p>
        <h3 className="text-lg font-semibold text-[#5d4130]">
          Detail utama akun
        </h3>
        <p className="text-sm text-[#8c7158]">
          Data ini digunakan dalam laporan dan komunikasi resmi.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-[#5d4130]"
          >
            Nama Lengkap
          </Label>
          <div className="relative">
            <Input
              id="name"
              placeholder="Masukkan nama admin"
              className={inputWithIconClass}
              {...register('name')}
            />
            <User className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-[#5d4130]"
          >
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email admin"
              className={inputWithIconClass}
              {...register('email')}
            />
            <Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label
            htmlFor="phone"
            className="text-sm font-semibold text-[#5d4130]"
          >
            Nomor Telepon (opsional)
          </Label>
          <div className="relative">
            <Input
              id="phone"
              placeholder="Contoh: 081234567890"
              className={inputWithIconClass}
              {...register('phone')}
            />
            <Phone className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#e6d9c9]/60 bg-[#fdf7f1]/80 p-4 text-xs text-[#8c7158] shadow-inner">
        Hanya Isi Atau Hanya Rubah Data Yang Ingin Di Edit Nya Saja.
      </div>
    </div>
  );
};

export default SettingInformationData;
