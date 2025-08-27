import { lucideIcons } from '@/icon/lucide-react-icons';
import Image from '../organism/Image';

const LocationSection = () => {
  const { MapPin, Clock, Phone } = lucideIcons;
  return (
    <section id="location" className="bg-[#f8f3e9] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#6f4e37] sm:text-4xl">
              Kunjungi Kami
            </h2>
            <p className="max-w-[700px] text-[#8c7158] md:text-xl">
              Temukan kami di lokasi yang nyaman di pusat kota
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-[#e6d9c9] bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#6f4e37]" />
                <h3 className="text-xl font-bold text-[#6f4e37]">Alamat</h3>
              </div>
              <p className="text-[#8c7158]">
                Jl. Kopi Nikmat No. 123, Kota Semarang, Jawa Tengah
              </p>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#6f4e37]" />
                <h3 className="text-xl font-bold text-[#6f4e37]">Jam Buka</h3>
              </div>
              <p className="text-[#8c7158]">Senin - Jumat: 07.00 - 22.00</p>
              <p className="text-[#8c7158]">Sabtu - Minggu: 08.00 - 23.00</p>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#6f4e37]" />
                <h3 className="text-xl font-bold text-[#6f4e37]">Kontak</h3>
              </div>
              <p className="text-[#8c7158]">+62 123 4567 890</p>
              <p className="text-[#8c7158]">info@aromakopi.com</p>
            </div>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              image_url="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop"
              alt_text="Coffee shop location"
              width={800}
              height={600}
              class_name="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
