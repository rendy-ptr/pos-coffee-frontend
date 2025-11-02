import { useState } from 'react';
import {
  useFetchCategories,
  useCategoryFilter,
  FILTER_OPTIONS,
} from '../../../hooks/category.hook';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
import CategoryHeader from '../organisms/CategoryHeader';
import CategoryStats from '../organisms/CategoryStats';
import CategoryList from '../organisms/CategoryList';
import AddCategoryModal from '../molecules/AddCategoryModal';
import CoffeeErrorAnimation from '@/components/shared/CoffeeErrorAnimation';

const CategorySection = () => {
  const { categories, isLoading, error } = useFetchCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    filteredCategories,
    stats,
  } = useCategoryFilter(categories);

  if (isLoading) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Kategori"
        messages={[
          'Mengambil data kategori',
          'Memproses informasi',
          'Mempersiapkan tampilan',
        ]}
      />
    );
  }

  if (error) {
    return (
      <CoffeeErrorAnimation
        title="Gagal Memuat Kategori"
        messages={[
          'Terjadi kesalahan saat mengambil data kategori.',
          'Silakan coba lagi nanti.',
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <CategoryHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterOptions={FILTER_OPTIONS}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onAddClick={() => setIsDialogOpen(true)}
      />

      <CategoryStats
        totalCount={stats.total}
        activeCount={stats.active}
        inactiveCount={stats.inactive}
      />

      <CategoryList categories={filteredCategories} />

      <AddCategoryModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default CategorySection;
