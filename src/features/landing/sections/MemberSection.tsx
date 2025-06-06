import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { lucideIcons } from '@/icon/lucide-react-icons';

const MemberSection = () => {
  const { Gift, Users } = lucideIcons;
  return (
    <section id="member" className="bg-[#6f4e37] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-white">
            <Gift className="h-5 w-5" />
            <span className="font-medium">Program Member Eksklusif</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Bergabunglah dengan Aroma Kopi Member
            </h2>
            <p className="max-w-[800px] text-white/90 md:text-xl">
              Nikmati berbagai keuntungan eksklusif sebagai member Aroma Kopi.
              Dapatkan promo spesial, poin reward setiap pembelian, dan akses ke
              acara-acara khusus kami.
            </p>
          </div>

          <div className="mt-8 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Promo Eksklusif</h3>
              <p className="text-sm text-white/80">
                Dapatkan diskon dan penawaran khusus yang hanya tersedia untuk
                member
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-white">Poin Reward</h3>
              <p className="text-sm text-white/80">
                Kumpulkan poin setiap pembelian dan tukarkan dengan menu favorit
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Acara Khusus</h3>
              <p className="text-sm text-white/80">
                Akses prioritas ke workshop kopi dan acara eksklusif member
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="bg-white px-8 py-3 text-lg text-[#6f4e37] hover:bg-white/90">
              <Link to="/auth/register">Daftar Jadi Member</Link>
            </Button>
            <Button className="bg-white px-8 py-3 text-lg text-[#6f4e37] hover:bg-white/90">
              <Link to="/auth/login">Sudah Member? Masuk</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
