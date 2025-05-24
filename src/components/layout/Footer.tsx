import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';

const Footer = () => {
  const { Coffee, Instagram, Facebook, Twitter } = lucideIcons;
  return (
    <footer className="border-t border-[#e6d9c9] bg-[#f8f3e9]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex flex-col gap-2">
          <Link to="#" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-[#6f4e37]" />
            <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
          </Link>
          <p className="text-sm text-[#8c7158]">
            Menyajikan kopi terbaik sejak 2015
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex gap-4">
            <Link to="#" className="text-[#6f4e37] hover:text-[#a67c52]">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-[#6f4e37] hover:text-[#a67c52]">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-[#6f4e37] hover:text-[#a67c52]">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <p className="text-sm text-[#8c7158]">
            © 2023 Aroma Kopi. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
