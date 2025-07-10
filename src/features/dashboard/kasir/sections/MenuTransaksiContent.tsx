// LOCAL-IMPORTS
import { lucideIcons } from '@/icon/lucide-react-icons';
import { CARD_STYLES, TEXT_COLORS, BUTTON_STYLES } from '../constant/Style';
import { menuItems } from '../mocks/MenuItem';

// HOOKS
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

// THIRD-PARTY
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// FUNCTIONS
import { formatCurrency } from '@/utils/formatCurrency';

// TYPES

const MenuTransaksiContent = () => {
  const { Search } = lucideIcons;
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCartStore();

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="order-2 lg:order-1 lg:col-span-2">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <CardTitle className={TEXT_COLORS.primary}>Menu Items</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[#8c7158]" />
              <Input
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {filteredMenuItems.map(item => (
              <div
                key={item.id}
                className="w-full rounded-lg border border-[#e6d9c9] bg-white p-2 text-left shadow-md transition-shadow hover:shadow-lg md:p-3"
              >
                <img
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  width={200}
                  height={120}
                  className="mb-2 h-16 w-full rounded object-cover md:h-20"
                />
                <h3
                  className={`text-xs font-medium ${TEXT_COLORS.primary} md:text-sm`}
                >
                  {item.name}
                </h3>
                <p className={`text-xs ${TEXT_COLORS.secondary}`}>
                  {item.category}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-xs md:text-sm ${TEXT_COLORS.bold}`}>
                    {formatCurrency(item.price)}
                  </span>
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    disabled={item.stock === 0}
                    onClick={() => addToCart(item)}
                    className={`${BUTTON_STYLES} px-3 py-1 text-xs ${item.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {item.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default MenuTransaksiContent;
