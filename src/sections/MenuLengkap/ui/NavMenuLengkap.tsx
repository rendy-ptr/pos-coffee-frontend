import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';

const NavMenuLengkap = () => {
  const { Coffee } = lucideIcons;
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e6d9c9] bg-[#f8f3e9]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-[#6f4e37]" />
          <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
        </Link>

        {/* CTA Button to go back to Beranda */}
        <Link to="/">
          <button className="cursor-pointer rounded-lg bg-[#6f4e37] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5d4130]">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </header>
  );
};
export default NavMenuLengkap;
