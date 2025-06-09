import { Button } from '@/components/ui/button';
import { Coffee, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f3e9]">
      {/* Header */}
      <header className="w-full border-b border-[#e6d9c9] bg-[#f8f3e9]">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-[#6f4e37]" />
            <span className="text-xl font-bold text-[#6f4e37]">Aroma Kopi</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop"
                  alt="Spilled coffee cup representing 404 error"
                  width={600}
                  height={600}
                  className="h-auto w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#6f4e37] text-4xl font-bold text-white shadow-lg">
                  404
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-[#6f4e37] md:text-7xl">
                  Oops!
                </h1>
                <h2 className="text-3xl font-bold text-[#6f4e37] md:text-4xl">
                  Halaman Tidak Ditemukan
                </h2>
                <p className="mx-auto max-w-md text-lg text-[#8c7158] lg:mx-0">
                  Sepertinya halaman yang Anda cari tidak ada. Mungkin halaman
                  tersebut telah dipindahkan atau tidak pernah ada.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[#8c7158]">
                  Tapi jangan khawatir! Mari kita bantu Anda menemukan jalan
                  kembali:
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row lg:items-center">
                  <Button className="bg-[#6f4e37] px-6 py-3 text-white hover:bg-[#5d4130]">
                    <Home className="mr-2 h-5 w-5" />
                    <Link to="/">Kembali ke Beranda</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#6f4e37] px-6 py-3 text-[#6f4e37] hover:bg-[#6f4e37] hover:text-white"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    <Link to="/menu-lengkap">Lihat Menu</Link>
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 rounded-lg bg-[#e6d9c9]/30 p-6">
                <h3 className="mb-4 font-semibold text-[#6f4e37]">
                  Halaman Populer:
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="block text-[#6f4e37] transition-colors hover:text-[#a67c52]"
                  >
                    • Beranda
                  </Link>
                  <Link
                    to="/menu-lengkap"
                    className="block text-[#6f4e37] transition-colors hover:text-[#a67c52]"
                  >
                    • Menu Lengkap
                  </Link>
                  <Link
                    to="/auth/login"
                    className="block text-[#6f4e37] transition-colors hover:text-[#a67c52]"
                  >
                    • Login Member
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block text-[#6f4e37] transition-colors hover:text-[#a67c52]"
                  >
                    • Daftar Member
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#6f4e37]/10 px-6 py-3 text-[#6f4e37]">
              <Coffee className="h-5 w-5" />
              <span className="font-medium">
                Butuh bantuan? Kunjungi kedai kami langsung!
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e6d9c9] bg-[#f8f3e9]">
        <div className="container flex flex-col items-center gap-4 px-4 py-6 md:flex-row md:justify-between md:px-6">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#6f4e37]" />
            <span className="text-sm text-[#8c7158]">
              © 2023 Aroma Kopi. Hak Cipta Dilindungi.
            </span>
          </div>
          <div className="text-sm text-[#8c7158]">
            Jl. Kopi Nikmat No. 123, Kota Semarang | +62 123 4567 890
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
