import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import type React from 'react';

interface FooterLink {
  to: string;
  icon: React.ElementType;
  label: string;
}

interface FooterProps {
  variant?: 'light' | 'dark';
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ variant = 'light', links }) => {
  const isDark = variant === 'dark';

  return (
    <footer
      className={`py-8 ${
        isDark
          ? 'bg-[#6f4e37] text-white'
          : 'border-t border-[#e6d9c9] bg-[#f8f3e9] text-[#6f4e37]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:justify-between md:px-6">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <Link to="#" className="flex items-center gap-2">
            <Coffee
              className={`h-6 w-6 ${isDark ? 'text-white' : 'text-[#6f4e37]'}`}
            />
            <span className="text-xl font-bold">Aroma Kopi</span>
          </Link>
          <p
            className={`text-sm ${isDark ? 'text-white/80' : 'text-[#8c7158]'}`}
          >
            Menyajikan kopi terbaik sejak 2015
          </p>
        </div>

        {/* Links + Copyright */}
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex gap-4">
            {links.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`${isDark ? 'text-white hover:text-[#e6d9c9]' : 'text-[#6f4e37] hover:text-[#a67c52]'} transition-colors`}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            ))}
          </div>
          <p
            className={`text-sm ${isDark ? 'text-white/80' : 'text-[#8c7158]'}`}
          >
            © 2025 Aroma Kopi. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
