// Helpers
import { lucideIcons } from '@/icon/lucide-react-icons';
import { capitalize } from '@/utils/formatCapitalize';

// Hooks
import { useAdminStore } from '@/store/adminStore';

// Molecules
import AdminAvatar from '../../molecule/Header/AdminAvatar';

interface ProfileDropdownProps {
  show: boolean;
  onMenuItemClick: (
    action: 'Dashboard' | 'Profile' | 'Setting' | 'Keluar' | 'Kategori'
  ) => void;
}

const ProfileDropdown = ({ show, onMenuItemClick }: ProfileDropdownProps) => {
  const { Home, User, Settings, LogOut, Package } = lucideIcons;
  const { adminData } = useAdminStore();
  const isOnline = true;

  if (!show) return null;
  if (!adminData) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#e6d9c9] bg-white shadow-lg">
      <div className="border-b border-[#e6d9c9] bg-gradient-to-r from-[#6f4e37]/5 to-[#8c7158]/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <AdminAvatar size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-gray-900">
                {adminData.name}
              </p>
              {isOnline && (
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
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
              <p className="truncate text-xs text-gray-500">
                {adminData.email}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="py-2">
        <button
          onClick={() => onMenuItemClick('Dashboard')}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Home className="h-4 w-4" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Profile')}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <User className="h-4 w-4" />
          <span className="font-medium">View Profile</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Setting')}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Settings className="h-4 w-4" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={() => onMenuItemClick('Kategori')}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-all duration-150 hover:bg-[#6f4e37]/5 hover:text-[#6f4e37]"
        >
          <Package className="h-4 w-4" />
          <span className="font-medium">Kategori</span>
        </button>
        <hr className="my-2 border-[#e6d9c9]" />
        <button
          onClick={() => onMenuItemClick('Keluar')}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-all duration-150 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
