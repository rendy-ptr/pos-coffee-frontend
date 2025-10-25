import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Plus, X } from 'lucide-react';
import { TEXT_COLORS, BUTTON_STYLES } from '../../../../constant/Style';
import { formatCurrency } from '@/utils/formatCurrency';

import type { MenuWithStockInfo } from '../../../../types/menu';

interface CardContentMenuProps {
  menuWithStockInfo: Array<MenuWithStockInfo>;
  addToCart: (menu: MenuWithStockInfo) => void;
}

const CardContentMenu = ({
  menuWithStockInfo,
  addToCart,
}: CardContentMenuProps) => {
  return (
    <CardContent className="p-6">
      {menuWithStockInfo.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#e8d8c4] bg-white/80 px-6 py-14 text-center">
          <Coffee className="h-10 w-10 text-[#c4a484]" />
          <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
            Menu tidak ditemukan
          </p>
          <p className="max-w-xs text-xs text-[#a6896c]">
            Coba kata kunci lain atau pilih kategori yang berbeda untuk melayani
            pelanggan dengan cepat.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuWithStockInfo.map(menu => (
            <div
              key={menu.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e6d9c9] bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d6bfa1] hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6ece0]">
                <img
                  src={menu.imageUrl || '/placeholder.svg'}
                  alt={menu.name}
                  width={200}
                  height={120}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  variant={menu.isOutOfStock ? 'destructive' : 'secondary'}
                  className={`absolute top-3 left-3 border-none text-[11px] tracking-wide uppercase ${
                    menu.isOutOfStock
                      ? 'bg-[#d76666]'
                      : 'bg-white/90 text-[#6f4e37]'
                  }`}
                >
                  {menu.isOutOfStock
                    ? 'Stok habis'
                    : `${menu.remainingStock} tersedia`}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`line-clamp-2 text-sm font-semibold ${TEXT_COLORS.primary}`}
                  >
                    {menu.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-[#e9d4bd] bg-white/90 text-[10px] tracking-wide text-[#8c7158] uppercase"
                  >
                    {menu.category.name}
                  </Badge>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-semibold ${TEXT_COLORS.primary}`}
                    >
                      {formatCurrency(menu.sellingPrice)}
                    </span>
                    <span className="text-[11px] tracking-wide text-[#b08a6a] uppercase">
                      per item
                    </span>
                  </div>
                  <button
                    disabled={menu.isOutOfStock}
                    onClick={() => addToCart(menu)}
                    className={`${BUTTON_STYLES} flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm transition-transform duration-200 ${
                      menu.isOutOfStock
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:-translate-y-0.5'
                    }`}
                  >
                    {menu.isOutOfStock ? (
                      <div className="mx-auto flex items-center gap-1">
                        <X className="h-4 w-4" />
                        Stock Habis
                      </div>
                    ) : (
                      <div className="mx-auto flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Tambah
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  );
};

export default CardContentMenu;
