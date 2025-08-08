import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useState } from 'react';
import { logout } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/shared/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useKasirStore } from '@/store/kasirStore';
const KasirHeader = () => {
  const { Coffee, Menu } = lucideIcons;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { kasirData, clearKasirData } = useKasirStore();

  if (!kasirData) return null;

  const handleLogout = async () => {
    try {
      const response = await logout();
      queryClient.clear();
      if (kasirData?.id) {
        localStorage.removeItem(`welcome_shown_${kasirData.id}`);
      }
      clearKasirData();
      addToast(response.message, 'success', 5000);
      navigate(response.data.redirectUrl);
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Terjadi kesalahan',
        'error',
        5000
      );
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6d9c9] bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-[#6f4e37]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#6f4e37]">
                Aroma Kopi
              </span>
              <span className="hidden text-xs text-[#8c7158] sm:block">
                {kasirData.role.toLowerCase()}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-xs text-blue-800"
            >
              Shift: {kasirData.shiftStart} - {kasirData.shiftEnd}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="hidden items-center gap-2 md:flex">
              <div className="text-xs text-[#8c7158]">
                Kasir: <span className="font-medium">{kasirData.name}</span>
              </div>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Keluar Shift
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mt-3 border-t border-[#e6d9c9] pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              <div className="text-xs text-[#8c7158]">
                Kasir: <span className="font-medium">{kasirData.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={handleLogout}
              >
                Keluar Shift
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default KasirHeader;
