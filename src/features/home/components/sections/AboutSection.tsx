import { lucideIcons } from '@/icon/lucide-react-icons';
import Image from '../organism/Image';

const AboutSection = () => {
  const { Coffee, Clock } = lucideIcons;
  return (
    <section id="about" className="bg-[#e6d9c9] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-[#6f4e37] sm:text-4xl">
              Tentang Aroma Kopi
            </h2>
            <p className="text-[#8c7158] md:text-lg">
              Aroma Kopi didirikan pada tahun 2015 dengan visi sederhana:
              menyajikan kopi terbaik dengan pelayanan yang hangat.
            </p>
            <p className="text-[#8c7158] md:text-lg">
              Kami memilih biji kopi langsung dari petani lokal terbaik,
              menyangrai dengan hati-hati untuk menghasilkan cita rasa yang
              sempurna, dan menyajikannya dengan penuh keahlian oleh barista
              berpengalaman kami.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-[#6f4e37]" />
                <span className="font-medium text-[#6f4e37]">
                  Biji Kopi Premium
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#6f4e37]" />
                <span className="font-medium text-[#6f4e37]">
                  Buka Setiap Hari
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              image_url="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop"
              alt_text="Coffee shop interior"
              width={600}
              height={800}
              class_name="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
