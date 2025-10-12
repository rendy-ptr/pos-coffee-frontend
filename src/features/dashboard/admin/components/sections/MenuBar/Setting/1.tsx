import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useAdminDashboard } from '../../../../hooks/admin.hook';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';

const SettingSection = () => {
  const { Settings, Upload, User, Lock, Info, Save, RefreshCw } = lucideIcons;
  const { data, isLoading, isError } = useAdminDashboard(true);

  if (isLoading) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Profile Admin"
        messages={[
          'Mengambil data Admin',
          'Memproses informasi',
          'Mempersiapkan tampilan',
        ]}
      />
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Gagal memuat menu</p>;
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] p-6 shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/15 via-transparent to-[#d2bba3]/10 opacity-60" />
        <h2 className="text-2xl font-semibold text-[#5d4130]">
          Pengaturan Profil Admin
        </h2>
        <p className="mt-2 text-sm text-[#8c7158]">
          Semua field bersifat opsional. Unggah foto profil atau perbarui data
          Anda kapan saja.
        </p>
      </div>

      <Card className="relative overflow-hidden rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-[#f7efe6]/40 to-[#d2bba3]/20 opacity-70" />
        <CardHeader className="relative z-10 px-6 py-6">
          <CardTitle className="flex items-center gap-2 text-xl text-[#5d4130]">
            <Settings className="h-5 w-5" />
            Detail Profil
          </CardTitle>
          <CardDescription className="text-sm text-[#8c7158]/90">
            Pastikan informasi profil tetap akurat untuk pengalaman dashboard
            yang maksimal.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-8 px-6 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[#e6d9c9]/50 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#6f4e37] to-[#8c7158] text-white shadow-md">
                <User className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#5d4130]">
                  Foto Profil
                </p>
                <p className="text-xs text-[#8c7158]">
                  Unggah gambar JPG atau PNG maksimal 2 MB.
                </p>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="profile-picture"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#e6d9c9] bg-white px-4 py-2 text-sm font-medium text-[#6f4e37] shadow-sm transition hover:bg-[#f7efe6]"
                >
                  <Upload className="h-4 w-4" />
                  Pilih File
                </Label>
                <Input
                  id="profile-picture"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="sr-only"
                />
              </div>
              <p className="flex items-center gap-2 text-xs text-[#8c7158]">
                <Info className="h-3.5 w-3.5 text-[#a67850]" />
                Unggah foto baru untuk mengganti foto profil saat ini.
              </p>
            </div>

            <div className="flex-1 space-y-6 rounded-2xl border border-[#e6d9c9]/50 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-name"
                    className="text-sm font-semibold text-[#5d4130]"
                  >
                    Nama Lengkap (Opsional)
                  </Label>
                  <Input
                    id="admin-name"
                    placeholder="Nama Admin"
                    className="border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#b69072]/40"
                    autoComplete="off"
                  />
                  <p className="text-xs text-[#8c7158]">
                    Isi hanya jika ingin mengganti nama tampilan.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="admin-email"
                    className="text-sm font-semibold text-[#5d4130]"
                  >
                    Email (Opsional)
                  </Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@email.com"
                    className="border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#b69072]/40"
                    autoComplete="off"
                  />
                  <p className="text-xs text-[#8c7158]">
                    Email digunakan untuk kebutuhan login dan notifikasi.
                  </p>
                </div>
              </div>

              <Separator className="bg-[#f1e4d6]" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#5d4130]">
                  <Lock className="h-4 w-4 text-[#a67850]" />
                  Pengaturan Password (Opsional)
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="current-password"
                      className="text-xs font-semibold tracking-wide text-[#8c7158] uppercase"
                    >
                      Password Saat Ini
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="********"
                      className="border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#b69072]/40"
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-xs font-semibold tracking-wide text-[#8c7158] uppercase"
                    >
                      Password Baru
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="********"
                      className="border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#b69072]/40"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-xs font-semibold tracking-wide text-[#8c7158] uppercase"
                    >
                      Konfirmasi Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="********"
                      className="border-[#e6d9c9] focus:border-[#6f4e37] focus:ring-[#b69072]/40"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#8c7158]">
                  Kosongkan seluruh kolom password jika tidak ingin melakukan
                  perubahan.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 flex flex-col gap-3 border-t border-[#e6d9c9]/50 bg-white/80 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-[#8c7158]">
            <Info className="h-3.5 w-3.5 text-[#a67850]" />
            Hanya isi kolom yang ingin Anda perbarui.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="border-[#e6d9c9] text-[#6f4e37] hover:bg-[#f7efe6]"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              type="button"
              className="bg-[#6f4e37] text-white shadow-sm hover:bg-[#5d4130]"
            >
              <Save className="h-4 w-4" />
              Simpan Perubahan
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SettingSection;
