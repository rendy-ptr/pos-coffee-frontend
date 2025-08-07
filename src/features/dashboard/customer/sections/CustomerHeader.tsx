import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Badge } from '@/components/ui/badge';
import { logout } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/shared/ToastProvider';
import { useNavigate } from 'react-router-dom';

const HeaderCustomer = () => {
  const { Coffee, Bell, Settings, LogOut, Home } = lucideIcons;
  const location = useLocation();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const isSettingsPage = location.pathname === '/dashboard/customer/pengaturan';

  const handleLogout = async () => {
    try {
      const response = await logout();
      queryClient.clear();
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
            <Link to="/dashboard/customer" className="flex items-center gap-2">
              <Coffee className="h-6 w-6 text-[#6f4e37]" />
              <span className="hidden text-lg font-bold text-[#6f4e37] sm:block">
                Aroma Kopi
              </span>
            </Link>
            <Badge
              variant="secondary"
              className="bg-[#e6d9c9] text-xs text-[#6f4e37]"
            >
              Member
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-4 w-4" />
            </Button>
            {isSettingsPage ? (
              <Link to="/dashboard/customer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer p-2"
                >
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard/customer/pengaturan">
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer p-2"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderCustomer;
