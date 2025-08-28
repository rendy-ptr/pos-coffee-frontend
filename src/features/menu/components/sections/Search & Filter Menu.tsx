import MenuFilter from '../organism/MenuFilter';
import MenuSearch from '../organism/MenuSearch';

interface SearchFilterMenuProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

const SearchFilterMenu = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: SearchFilterMenuProps) => {
  return (
    <section className="border-b border-[#e6d9c9]/30 bg-gradient-to-b from-[#f8f3e9] to-[#f0e8dc] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-[#6f4e37]">
              Temukan Menu Favorit
            </h2>
            <p className="text-sm text-[#8c7158]">
              Cari dan filter menu sesuai selera Anda
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <MenuSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Filter Categories */}
          <MenuFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchFilterMenu;
