import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/contants/navLinks';

const Navbar = () => {
  const { Coffee } = lucideIcons;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e6d9c9] bg-[#f8f3e9]/80 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center px-4 md:px-6">
        {/* Kiri: Logo */}
        <Link to="#" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-[#6f4e37]" />
          <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
        </Link>

        {/* Tengah: Nav */}
        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-6 md:flex">
          {NAV_LINKS.map(item => (
            <Link
              key={item.name}
              to={item.to}
              className="text-sm font-medium text-[#6f4e37] transition-colors hover:text-[#a67c52]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Kanan: Button */}
        <div className="ml-auto">
          <Button className="cursor-pointer bg-[#6f4e37] text-white hover:bg-[#5d4130]">
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
