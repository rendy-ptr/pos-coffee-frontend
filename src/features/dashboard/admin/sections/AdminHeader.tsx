import { lucideIcons } from '@/icon/lucide-react-icons';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StaffAvatar from '../components/header/AdminAvatar';
import ProfileDropdown from '../components/header/ProfileDropdown';
import MobileMenu from '../components/header/MobileMenu';
import type React from 'react';

// Types
interface Staff {
  name: string;
  role?: string;
  email?: string;
  isOnline?: boolean;
}

interface HeaderAdminProps {
  staff?: Staff;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

type MenuAction = 'Profile' | 'Settings' | 'Keluar';

const DEFAULT_STAFF: Staff = {
  name: 'Admin User',
  role: 'Administrator',
  email: 'admin@aromakopi.com',
  isOnline: true,
};

const HeaderAdmin: React.FC<HeaderAdminProps> = ({
  staff = DEFAULT_STAFF,
  onProfileClick,
  onSettingsClick,
  onLogout,
}) => {
  const { Coffee, Menu, ChevronDown } = lucideIcons;

  // States
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handlers
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

  const handleMenuItemClick = useCallback(
    (action: MenuAction): void => {
      setShowProfileDropdown(false);
      setShowMobileMenu(false);
      switch (action) {
        case 'Profile':
          onProfileClick?.();
          break;
        case 'Settings':
          onSettingsClick?.();
          break;
        case 'Keluar':
          onLogout?.();
          break;
      }
    },
    [onProfileClick, onSettingsClick, onLogout]
  );

  // Effects
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

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
                <StaffAvatar staff={staff} size="sm" />
                <div className="hidden flex-col items-start lg:flex">
                  <span className="text-sm leading-tight font-semibold text-gray-900">
                    {staff.name}
                  </span>
                  <span className="text-xs leading-tight text-[#8c7158]">
                    {staff.role}
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
                staff={staff}
                onMenuItemClick={handleMenuItemClick}
              />
            </div>
          </div>
        </div>
        <MobileMenu
          show={showMobileMenu}
          staff={staff}
          onMenuItemClick={handleMenuItemClick}
        />
      </div>
    </header>
  );
};

export default HeaderAdmin;
