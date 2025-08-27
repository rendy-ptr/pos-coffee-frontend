import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';

const HeaderRegister = () => {
  const { Coffee, ArrowLeft } = lucideIcons;
  return (
    <div className="text-center">
      <Link to="/" className="mb-8 inline-flex items-center gap-2">
        <ArrowLeft className="h-5 w-5 text-[#6f4e37]" />
        <span className="text-[#6f4e37] hover:text-[#a67c52]">
          Kembali ke Beranda
        </span>
      </Link>
      <div className="mb-6 flex items-center justify-center gap-2">
        <Coffee className="h-8 w-8 text-[#6f4e37]" />
        <span className="text-2xl font-bold text-[#6f4e37]">Aroma Kopi</span>
      </div>
      <h1 className="mb-2 text-3xl font-bold text-[#6f4e37]">Daftar Member</h1>
      <p className="text-[#8c7158]">
        Buat akun untuk mendapatkan keuntungan eksklusif
      </p>
    </div>
  );
};
export default HeaderRegister;
