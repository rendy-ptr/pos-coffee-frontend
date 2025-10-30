import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TEXT_COLORS } from '@/constants/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { capitalize } from '@/utils/formatCapitalize';

import type { IBaseTable } from '../../../types/table';

interface CardHeaderTableTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (categoryId: string) => void;
  filterOptions: string[];
  filteredTables: IBaseTable[];
}

const CardHeaderTableTab = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filterOptions,
  filteredTables,
}: CardHeaderTableTabProps) => {
  const { Search } = lucideIcons;
  return (
    <CardHeader className="space-y-4 border-b border-[#e6d9c9] px-6 py-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className={`${TEXT_COLORS.primary} text-xl`}>
              Menu Pilihan Kasir
            </CardTitle>
            <p className="text-sm text-[#9d8169]">
              Temukan meja terbaik dan tambahkan ke keranjang pelanggan.
            </p>
          </div>
          <Badge className="hidden border-transparent bg-[#8b5e3c] py-1 text-white md:inline-flex">
            {filteredTables.length} meja tersedia
          </Badge>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#b48f6c]" />
            <Input
              placeholder="Cari nomor meja..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-11 rounded-lg border-[#e3d0b9] bg-white/90 pl-10 text-sm text-[#5b3f2c] placeholder:text-[#c2a891] focus-visible:ring-[#d2bba3]"
            />
          </div>
          <Badge className="border-transparent bg-[#f3e1cb] text-[#815636] md:hidden">
            {filteredTables.length} meja tersedia
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {filterOptions.map(status => (
            <Button
              key={status}
              variant={selectedFilter === status ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(status)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                selectedFilter === status
                  ? 'bg-[#8b5e3c] text-white shadow-sm'
                  : 'border-[#e3d0b9] text-[#5b3f2c] hover:bg-[#f7efe6]'
              }`}
            >
              {capitalize(status)}
            </Button>
          ))}
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderTableTab;
