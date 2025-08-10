import { lucideIcons } from '@/icon/lucide-react-icons';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HeaderAdmin = () => {
  const { Coffee, Settings, Menu } = lucideIcons;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
                Admin
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-red-100 text-xs text-red-800"
            >
              Admin
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
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Keluar
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mt-3 border-t border-[#e6d9c9] pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Pengaturan
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Keluar
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
