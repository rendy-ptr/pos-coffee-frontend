// LOCAL-IMPORTS
import { lucideIcons } from '@/icon/lucide-react-icons';
import {
  CARD_STYLES,
  TEXT_COLORS,
  BUTTON_STYLES,
} from '../../../constant/Style';

// HOOKS
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useMenus } from '../../../hooks/menu.hooks';

// THIRD-PARTY
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// FUNCTIONS
import { formatCurrency } from '@/utils/formatCurrency';

// TYPES

const MenuTransaksiContent = () => {
  const { Search, Coffee, Plus, X } = lucideIcons;
  const [searchQuery, setSearchQuery] = useState('');
  const { menus } = useMenus();
  const { cart, addToCart } = useCartStore();

  const filteredMenuItems = menus.filter(menu =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuWithStockInfo = filteredMenuItems.map(menu => {
    const cartItem = cart.find(item => item.id === menu.id);
    const remainingStock = Math.max(0, menu.stock - (cartItem?.quantity ?? 0));
    const isOutOfStock = remainingStock === 0;

    return {
      ...menu,
      remainingStock,
      isOutOfStock,
    };
  });

  return (
    <div className="order-2 lg:order-1 lg:col-span-2">
      <Card className={`${CARD_STYLES} shadow-lg transition-shadow`}>
        <CardHeader className="space-y-4 border-b border-[#e6d9c9] px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle className={`${TEXT_COLORS.primary} text-xl`}>
                  Menu Pilihan Kasir
                </CardTitle>
                <p className="text-sm text-[#9d8169]">
                  Temukan menu terbaik dan tambahkan ke keranjang pelanggan.
                </p>
              </div>
              <Badge className="hidden border-transparent bg-[#8b5e3c] py-1 text-white md:inline-flex">
                {menuWithStockInfo.length} menu tersedia
              </Badge>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#b48f6c]" />
                <Input
                  placeholder="Cari menu favorit..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="h-11 rounded-lg border-[#e3d0b9] bg-white/90 pl-10 text-sm text-[#5b3f2c] placeholder:text-[#c2a891] focus-visible:ring-[#d2bba3]"
                />
              </div>
              <Badge className="border-transparent bg-[#f3e1cb] text-[#815636] md:hidden">
                {menuWithStockInfo.length} menu tersedia
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {menuWithStockInfo.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#e8d8c4] bg-white/80 px-6 py-14 text-center">
              <Coffee className="h-10 w-10 text-[#c4a484]" />
              <p className={`text-sm font-semibold ${TEXT_COLORS.primary}`}>
                Menu tidak ditemukan
              </p>
              <p className="max-w-xs text-xs text-[#a6896c]">
                Coba kata kunci lain atau jelajahi kategori menu berbeda untuk
                melayani pelanggan dengan cepat.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {menuWithStockInfo.map(menu => {
                return (
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
                        variant={
                          menu.isOutOfStock ? 'destructive' : 'secondary'
                        }
                        className={`absolute top-3 left-3 border-none text-[11px] tracking-wide uppercase ${menu.isOutOfStock ? 'bg-[#d76666]' : 'bg-white/90 text-[#6f4e37]'}`}
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
                          className={`${BUTTON_STYLES} flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm transition-transform duration-200 ${menu.isOutOfStock ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5'}`}
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default MenuTransaksiContent;
