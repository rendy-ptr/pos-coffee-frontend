import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  TEXT_COLORS,
  CARD_STYLES,
  BUTTON_STYLES,
} from '@/features/dashboard/customer/constant/Style';
import { useState } from 'react';
import { lucideIcons } from '@/icon/lucide-react-icons';

const CustomerSettings = () => {
  const { EyeIcon, EyeOffIcon } = lucideIcons;
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="mx-auto max-w-2xl py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid h-auto w-full grid-cols-3 gap-1 rounded-xl bg-[#eaddd0] p-1">
          {[
            { value: 'profile', label: 'Ubah Profil' },
            { value: 'password', label: 'Ganti Kata Sandi' },
            { value: 'delete', label: 'Hapus Akun' },
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="cursor-pointer rounded-lg px-1 py-2 text-xs transition-all duration-200 outline-none hover:bg-[#d2bba3] focus:ring-0 focus:outline-none data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1: Ubah Profil */}
        <TabsContent value="profile">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>Ubah Profil</CardTitle>
              <CardDescription>Perbarui informasi dasar Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="profile-photo"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Foto Profil (opsional)
                </label>
                <Input id="profile-photo" type="file" accept="image/*" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Nama Lengkap
                </label>
                <Input id="full-name" placeholder="Nama Anda" />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Nomor HP (opsional)
                </label>
                <Input id="phone" type="tel" placeholder="08XXXXXXXXXX" />
              </div>

              <div className="pt-2">
                <Button className={`cursor-pointer ${BUTTON_STYLES}`}>
                  Simpan Profil
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Ganti Kata Sandi */}
        <TabsContent value="password">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Ganti Kata Sandi
              </CardTitle>
              <CardDescription>
                Pastikan kata sandi Anda kuat dan aman
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Kata Sandi Saat Ini
                </label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(prev => !prev)}
                    className="absolute top-2 right-2 text-[#6f4e37]"
                  >
                    {showCurrentPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(prev => !prev)}
                    className="absolute top-2 right-2 text-[#6f4e37]"
                  >
                    {showNewPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-[#6f4e37]"
                >
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute top-2 right-2 text-[#6f4e37]"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button className={`cursor-pointer ${BUTTON_STYLES}`}>
                  Perbarui Kata Sandi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Hapus Akun */}
        <TabsContent value="delete">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>Hapus Akun</CardTitle>
              <CardDescription>
                Permintaan ini akan menghapus akun Anda secara permanen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-red-600">
                Tindakan ini tidak dapat dibatalkan. Semua data Anda akan
                dihapus secara permanen dari sistem kami.
              </p>
              <Button
                variant="destructive"
                className="cursor-pointer bg-red-500 hover:bg-red-600"
              >
                Minta Penghapusan Akun
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSettings;
