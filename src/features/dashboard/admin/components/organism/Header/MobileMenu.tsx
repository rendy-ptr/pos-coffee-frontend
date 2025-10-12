// Helpers
import { lucideIcons } from '@/icon/lucide-react-icons';
import { capitalize } from '@/utils/formatCapitalize';

// Hooks
import { useAdminStore } from '@/store/adminStore';

// Molecules
import AdminAvatar from '../../molecule/Header/AdminAvatar';

interface MobileMenuProps {
  show: boolean;
  onMenuItemClick: (
    action: 'Dashboard' | 'Profile' | 'Setting' | 'Keluar' | 'Kategori'
  ) => void;
}

const MobileMenu = ({ show, onMenuItemClick }: MobileMenuProps) => {
  const { Home, User, Settings, LogOut, Package } = lucideIcons;
  const { adminData } = useAdminStore();
  const isOnline = true;
  if (!show) return null;
  if (!adminData) return null;

  return (
    <div className="mt-4 border-t border-[#e6d9c9] pt-4 md:hidden">
      <div className="mb-3 flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#6f4e37]/5 to-[#8c7158]/5 px-3 py-3">
        <AdminAvatar size="lg" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-gray-900">
              {adminData.name}
            </p>
            {isOnline && (
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-green-600">
                  Online
                </span>
              </div>
            )}
          </div>
          <p className="truncate text-xs text-[#8c7158]">
            {capitalize(adminData.role)}
          </p>
          {adminData.email && (
            <p className="truncate text-xs text-gray-500">{adminData.email}</p>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <button
          onClick={() => onMenuItemClick('Dashboard')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Home className="h-4 w-4" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Profile')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <User className="h-4 w-4" />
          <span className="font-medium">View Profile</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Setting')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Settings className="h-4 w-4" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Kategori')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Package className="h-4 w-4" />
          <span className="font-medium">Kategori</span>
        </button>
        <hr className="my-1 border-[#e6d9c9]" />
        <button
          onClick={() => onMenuItemClick('Keluar')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-all duration-150 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
