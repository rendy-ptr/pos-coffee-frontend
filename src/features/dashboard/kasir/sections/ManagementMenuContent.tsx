import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { menuItems } from '../mocks/MenuItem';
import {
  CARD_STYLES,
  CARD_ITEM_STYLES,
  TEXT_COLORS,
  BUTTON_STYLES,
} from '../constant/Style';
import clsx from 'clsx';
import { lucideIcons } from '@/icon/lucide-react-icons';

const ManagementMenuContent = () => {
  const { Search } = lucideIcons;
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchName = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === 'all' || item.category === categoryFilter;
    return matchName && matchCategory;
  });

  return (
    <Card className={CARD_STYLES}>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <CardTitle className={TEXT_COLORS.primary}>Daftar Menu</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[#8c7158]" />
            <Input
              type="text"
              placeholder="Cari menu..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tab kategori di bawah judul */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={clsx(
                `${BUTTON_STYLES} px-2 py-1 text-xs`,
                categoryFilter === category
                  ? 'bg-[#6f4e37] text-white'
                  : 'bg-[#eaddd2] text-[#6f4e37] hover:bg-[#d7c1b2]'
              )}
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-4 ${CARD_ITEM_STYLES}`}
            >
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex flex-col justify-between">
                <h3
                  className={`text-base font-semibold ${TEXT_COLORS.primary}`}
                >
                  {item.name}
                </h3>
                <p className={`text-sm ${TEXT_COLORS.secondary}`}>
                  {item.category}
                </p>
                <p className={`text-sm font-bold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(item.price)}
                </p>
                <p className={`mt-1 text-xs ${TEXT_COLORS.secondary}`}>
                  Stok: <span className="font-semibold">{item.stock}</span>
                </p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center text-sm text-gray-500">
              Menu tidak ditemukan.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementMenuContent;
