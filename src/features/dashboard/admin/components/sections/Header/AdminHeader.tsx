import { lucideIcons } from '@/icon/lucide-react-icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProfileDropdown from '../../organism/Header/ProfileDropdown';
import MobileMenu from '../../organism/Header/MobileMenu';
import { useAdminStore } from '@/store/adminStore';
import { useToast } from '@/components/shared/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { capitalize } from '@/utils/formatCapitalize';
import { useLogout } from '@/features/dashboard/admin/hooks/useLogout';
import { useAuthStore } from '@/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import AdminAvatar from '../../molecule/Header/AdminAvatar';

// TYPES
type MenuAction = 'Dashboard' | 'Profile' | 'Setting' | 'Keluar' | 'Kategori';

const HeaderAdmin = () => {
  const { Coffee, Menu, ChevronDown } = lucideIcons;
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { doLogout } = useLogout();
  const { adminData } = useAdminStore();
  const { setLoggingOut } = useAuthStore();
  const queryClient = useQueryClient();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowProfileDropdown(false);
    }
  }, []);

  const handleProfileClick = useCallback((): void => {
    setShowProfileDropdown(prev => !prev);
  }, []);

  const handleMobileMenuToggle = useCallback((): void => {
    setShowMobileMenu(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setLoggingOut(true);
      const response = await doLogout();

      console.log('Logout Response:', response.message);
      addToast(response.message, 'success', 3000);

      localStorage.removeItem('welcomeShown');
      queryClient.removeQueries({ queryKey: ['auth'], exact: true });
      await queryClient.cancelQueries();
      queryClient.clear();

      navigate('/auth/login', { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Terjadi kesalahan';
      addToast(errorMessage, 'error', 5000);
    }
  }, [doLogout, navigate, addToast, queryClient, setLoggingOut]);

  const handleMenuItemClick = useCallback(
    (action: MenuAction): void => {
      setShowProfileDropdown(false);
      setShowMobileMenu(false);
      switch (action) {
        case 'Dashboard':
          navigate('/dashboard/admin');
          break;
        case 'Profile':
          navigate('profile');
          break;
        case 'Setting':
          navigate('setting');
          break;
        case 'Keluar':
          handleLogout();
          break;
        case 'Kategori':
          navigate('kategori');
          break;
      }
    },
    [handleLogout, navigate]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  if (!adminData) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#e6d9c9] bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200" />
              <div className="flex flex-col gap-1">
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-2 w-32 animate-pulse rounded bg-gray-100" />
              </div>
              <div className="ml-2 h-5 w-20 animate-pulse rounded bg-gray-100" />
            </div>
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6d9c9] bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f4e37] to-[#8c7158] shadow-md">
              <Coffee className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#6f4e37]">
                Aroma Kopi
              </span>
              <span className="hidden text-xs font-medium text-[#8c7158] sm:block">
                Coffee Management System
              </span>
            </div>
            <Badge
              variant="secondary"
              className="border border-red-200 bg-gradient-to-r from-red-50 to-red-100 text-xs font-semibold text-red-800 shadow-sm"
            >
              Admin Panel
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-[#6f4e37]/10 md:hidden"
              onClick={handleMobileMenuToggle}
            >
              <Menu className="h-5 w-5 text-[#6f4e37]" />
            </Button>
            <div className="relative hidden md:block" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-5"
              >
                <AdminAvatar size="sm" />
                <div className="hidden flex-col items-start lg:flex">
                  <span className="text-sm leading-tight font-semibold text-gray-900">
                    {adminData.name}
                  </span>
                  <span className="text-xs leading-tight text-[#8c7158]">
                    {capitalize(adminData.role)}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    showProfileDropdown ? 'rotate-180' : ''
                  }`}
                />
              </Button>
              <ProfileDropdown
                show={showProfileDropdown}
                onMenuItemClick={handleMenuItemClick}
              />
            </div>
          </div>
        </div>
        <MobileMenu
          show={showMobileMenu}
          onMenuItemClick={handleMenuItemClick}
        />
      </div>
    </header>
  );
};

export default HeaderAdmin;
