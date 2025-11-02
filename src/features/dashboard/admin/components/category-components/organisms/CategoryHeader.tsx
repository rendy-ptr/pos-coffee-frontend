import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Package, PackagePlus } from 'lucide-react';
import { COLOR } from '@/constants/Style';
import CategorySearchInput from '../molecules/CategorySearchInput';
import CategoryFilterDropdown from '../molecules/CategoryFilterDropdown';
import type { FilterOption } from '../molecules/CategoryFilterDropdown';

const { BUTTON_HOVER_ICON, ICON_TRANSITION } = COLOR;

interface CategoryHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterOptions: FilterOption[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  onAddClick: () => void;
}

const CategoryHeader = ({
  searchTerm,
  onSearchChange,
  filterOptions,
  selectedFilter,
  onFilterChange,
  onAddClick,
}: CategoryHeaderProps) => {
  return (
    <div className="relative rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#a66a4c] opacity-70" />
      </div>

      <CardHeader className="relative z-10 overflow-visible px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title Section */}
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3">
              <Package className="h-6 w-6 text-[#6f4e37]" />
            </div>
            <div>
              <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-bold tracking-tight text-transparent lg:text-2xl">
                Manajemen Kategori Menu
              </CardTitle>
              <p className="mt-1 text-xs font-medium text-[#8c7158]/80 lg:text-sm">
                Kelola kategori menu dengan mudah
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CategorySearchInput
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Cari kategori..."
            />

            <div className="flex justify-end gap-2 lg:justify-start">
              <CategoryFilterDropdown
                options={filterOptions}
                selectedValue={selectedFilter}
                onSelect={onFilterChange}
              />
              <Button
                onClick={onAddClick}
                className={`flex items-center gap-2 ${BUTTON_HOVER_ICON}`}
              >
                <PackagePlus className={`h-4 w-4 ${ICON_TRANSITION}`} />
                Tambah Kategori
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};

export default CategoryHeader;
