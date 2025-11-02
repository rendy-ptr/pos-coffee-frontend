import { Search } from 'lucide-react';

interface CategoryEmptyStateProps {
  title?: string;
  description?: string;
}

const CategoryEmptyState = ({
  title = 'Tidak ada kategori ditemukan',
  description = 'Coba tambahkan atau kata kunci pencarian untuk menemukan kategori yang Anda cari.',
}: CategoryEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
        <Search className="h-8 w-8 text-[#8c7158]/50" />
      </div>
      <p className="mb-2 text-lg font-semibold text-[#6f4e37]">{title}</p>
      <p className="max-w-md text-center text-sm text-[#8c7158]/70">
        {description}
      </p>
    </div>
  );
};

export default CategoryEmptyState;
