import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { MENU_CATEGORIES } from '@/constants/menuFavorites';

type FilterBarProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) => {
  const { Search } = lucideIcons;
  const allCategories = [{ id: 'semua', label: 'Semua' }, ...MENU_CATEGORIES];
  return (
    <section className="border-b border-[#e6d9c9] bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#8c7158]" />
            <Input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border-[#e6d9c9] pl-10 focus:border-[#6f4e37] focus:ring-[#6f4e37]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? 'default' : 'outline'
                }
                size="sm"
                className={`${
                  selectedCategory === category.id
                    ? 'cursor-pointer bg-[#6f4e37] text-white hover:bg-[#5d4130]'
                    : 'cursor-pointer border-[#6f4e37] text-[#6f4e37] hover:bg-[#6f4e37] hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
