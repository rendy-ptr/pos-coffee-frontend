import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { FOOTER_LINKS } from '@/constants/footerLinks';

const Footer = () => {
  const { Coffee } = lucideIcons;
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
            {FOOTER_LINKS.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="text-[#6f4e37] hover:text-[#a67c52]"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            ))}
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
