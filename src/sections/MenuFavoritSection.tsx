import { Button } from '@/components/ui/button';
import { MENU_FAVORITS } from '@/contants/menuFavorits';

const MenuFavoritSection = () => {
  return (
    <section id="menu" className="bg-[#f8f3e9] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Judul dan deskripsi di tengah */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#6f4e37] sm:text-4xl md:text-5xl">
              Menu Favorit
            </h2>
            <p className="mx-auto max-w-[700px] text-[#8c7158] md:text-xl">
              Pilihan kopi dan makanan terbaik kami yang paling disukai
              pelanggan
            </p>
          </div>
        </div>

        {/* Kartu menu */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MENU_FAVORITS.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-[#e6d9c9] bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#6f4e37]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[#8c7158]">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#6f4e37]">
                    {item.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#6f4e37] text-white hover:bg-[#5d4130]"
                  >
                    Pesan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol aksi */}
        <div className="mt-12 text-center">
          <Button className="bg-[#6f4e37] text-white hover:bg-[#5d4130]">
            Lihat Menu Lengkap
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuFavoritSection;
