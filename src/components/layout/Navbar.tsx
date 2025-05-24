import { lucideIcons } from '@/icon/lucide-react-icons';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/contants/navLinks';

const Navbar = () => {
  const { Coffee } = lucideIcons;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e6d9c9] bg-[#f8f3e9]/80 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Kiri: Logo */}
        <Link to="#" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-[#6f4e37]" />
          <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
        </Link>

        {/* Tengah: Nav */}
        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="text-lg font-medium text-[#6f4e37] transition-colors hover:text-[#a67c52]"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
