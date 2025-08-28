import { useState } from 'react';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/navLinks';
import { navScrollToSection } from '@/utils/navScrollToSection';

interface NavbarProps {
  variant?: 'landing' | 'subpage';
}

const Navbar = ({ variant = 'landing' }: NavbarProps) => {
  const { Coffee, Menu, X } = lucideIcons;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e6d9c9] bg-[#f8f3e9]/80 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="#beranda"
          onClick={e => {
            e.preventDefault();
            navScrollToSection('beranda');
          }}
          className="flex items-center gap-2"
        >
          <Coffee className="h-6 w-6 text-[#6f4e37]" />
          <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
        </Link>

        {/* Desktop Nav */}
        {variant === 'landing' && (
          <>
            <nav className="hidden gap-6 md:flex">
              {NAV_LINKS.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={e => {
                    e.preventDefault();
                    navScrollToSection(item.to);
                  }}
                  className="text-md font-medium text-[#6f4e37] transition-colors hover:text-[#a67c52]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="rounded-lg p-2 text-[#6f4e37] transition hover:bg-[#e6d9c9]/30 md:hidden"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </>
        )}

        {/* Subpage CTA */}
        {variant === 'subpage' && (
          <Link
            to="/"
            className="rounded-lg bg-[#6f4e37] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a3d2c]"
          >
            Kembali ke Beranda
          </Link>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {variant === 'landing' && isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-16 z-40 flex flex-col gap-2 border-t border-[#e6d9c9] bg-[#f8f3e9]/95 p-4 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={e => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                navScrollToSection(item.to);
              }}
              className="block rounded-lg px-4 py-2 font-medium text-[#6f4e37] transition hover:bg-[#e6d9c9]/50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
