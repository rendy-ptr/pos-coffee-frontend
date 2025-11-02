import { lucideIcons } from '@/icon/lucide-react-icons';

import type { IAdminDashboardResponse } from '../../../types/admin';

const { Mail, Phone, User } = lucideIcons;

interface ISettingHeaderProps {
  admin: IAdminDashboardResponse['data'];
  summaryPillClass: string;
}

const SettingHeader = ({ admin, summaryPillClass }: ISettingHeaderProps) => {
  return (
    <>
      <div className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-[#f1ddc7]/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10rem] -left-24 h-72 w-72 rounded-full bg-[#f8efe7]/80 blur-3xl" />
      <header className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#f3ece3] px-3 py-1 text-xs font-semibold text-[#6f4e37]">
            Pengaturan Akun
          </span>
          <span className="hidden h-px flex-1 rounded-full bg-[#e6d9c9]/70 md:block" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-[#5d4130]">
            Profil Administrator
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[#8c7158]">
            Perbarui nama, email, nomor telepon, password, dan foto profil.
          </p>
          <p className="max-w-3xl text-xs text-[#8c7158]/80">
            Pastikan informasi selalu terbaru agar tim dan sistem POS tetap
            sinkron. Formulir ini terhubung langsung dengan data akun
            administrator Anda.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {admin.name && (
            <div className={summaryPillClass}>
              <User className="h-4 w-4 text-[#6f4e37]" />
              <span className="font-semibold">{admin.name}</span>
            </div>
          )}
          {admin.email && (
            <div className={summaryPillClass}>
              <Mail className="h-4 w-4 text-[#6f4e37]" />
              <span className="text-[#8c7158]">{admin.email}</span>
            </div>
          )}
          <div className={summaryPillClass}>
            <Phone className="h-4 w-4 text-[#6f4e37]" />
            <span className="text-[#8c7158]">
              {admin.phone ? admin.phone : 'Nomor telepon belum diisi'}
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default SettingHeader;
