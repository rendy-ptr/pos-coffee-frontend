import { lucideIcons } from '@/icon/lucide-react-icons';
const { Search, ShoppingBasket, Flame } = lucideIcons;
import type { PublicMenu } from '../../types/menu';
import { resolveImageUrl } from '@/utils/imageBuilder';

interface MenuGridProps {
  filteredMenuItems: PublicMenu[];
}

const MenuGrid = ({ filteredMenuItems }: MenuGridProps) => {
  return (
    <section className="bg-[#e6d9c9] py-12">
      <div className="mx-auto max-w-7xl px-6">
        {filteredMenuItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/70 shadow-lg">
              <Search className="h-12 w-12 text-[#6f4e37]" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#6f4e37]">
              Menu tidak ditemukan
            </h3>
            <p className="mx-auto max-w-md text-lg text-[#8c7158]">
              Coba kata kunci lain untuk menemukan menu favorit Anda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenuItems.map(item => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Popular Badge */}
                {item.soldCount > 50 && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-orange-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                    <Flame className="h-3 w-3" />
                    Popular
                  </div>
                )}

                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={resolveImageUrl(item.imageUrl, {
                      w: 400,
                      h: 300,
                      q: 80,
                    })}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  {/* Category */}
                  <span className="inline-block rounded-full bg-[#f0e8dc] px-3 py-1 text-sm font-medium text-[#6f4e37]">
                    {item.category.name}
                  </span>

                  {/* Menu Name */}
                  <h3 className="line-clamp-2 text-lg leading-snug font-bold text-[#6f4e37]">
                    {item.name}
                  </h3>

                  {/* Price and Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#6f4e37]">
                      Rp {item.sellingPrice.toLocaleString('id-ID')}
                    </span>

                    <div className="flex items-center gap-1 text-sm text-[#8c7158]">
                      <ShoppingBasket className="h-4 w-4" />
                      <span>{item.soldCount}</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between pt-2">
                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                        item.stock > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                        } ${item.stock > 0 ? 'animate-pulse' : ''}`}
                      ></div>
                      <span>{item.stock > 0 ? 'Tersedia' : 'Habis'}</span>
                    </div>

                    {item.stock > 0 && (
                      <span className="text-sm text-[#8c7158]">
                        Stok: {item.stock}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;
