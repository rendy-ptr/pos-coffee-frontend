import { Link, useLocation } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useEffect, useState } from 'react';

const HeaderLogin = () => {
  const { Coffee, ArrowLeft } = lucideIcons;
  const { state } = useLocation();
  const [isMessageVisible, setIsMessageVisible] = useState(!!state?.message);
  useEffect(() => {
    if (state?.message) {
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state]);
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
      <h1 className="mb-2 text-3xl font-bold text-[#6f4e37]">Masuk ke Akun</h1>
      <p className="text-[#8c7158]">
        Masuk untuk mengakses keuntungan member Anda
      </p>
      {state?.message && isMessageVisible && (
        <div className="rounded bg-green-100 p-2 text-sm text-green-500">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default HeaderLogin;
