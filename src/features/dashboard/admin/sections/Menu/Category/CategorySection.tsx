import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { PackagePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import ManagementCategoryItem from '../../../components/Menu/Category/ManagementCategoryItem';
import AddCategoryModal from '../../../components/Menu/Category/AddCategoryModal';
import { useCategories } from '../../../hooks/categoryHooks';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';

// ICONS
const { Package, Search, CheckCircle, AlertCircle } = lucideIcons;

const CategorySection = () => {
  const { data: categories = [], isLoading, error } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterKategoriAktif = categories.filter(k => k.isActive).length;
  const filterKategoriTidakAktif = categories.filter(k => !k.isActive).length;
  const filterKategori = categories.length;

  const searchItems = useMemo(() => {
    return categories.filter(item =>
      searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
  }, [categories, searchTerm]);

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
    return <p className="text-center text-red-500">Gagal memuat kategori</p>;
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#a66a4c] opacity-70" />
        </div>

        <CardHeader className="relative z-10 overflow-visible px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3">
                <Package className="h-6 w-6 text-[#6f4e37]" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Manajemen Kategori Menu
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                  Kelola kategori menu dengan mudah
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]/60" />
                <input
                  type="text"
                  placeholder="Cari kategori..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[#e6d9c9]/50 bg-white/80 py-2 pr-4 pl-9 text-sm backdrop-blur-sm transition-all duration-300 focus:border-[#6f4e37]/50 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
                />
              </div>

              <Button
                onClick={() => setIsDialogOpen(true)}
                className="group flex items-center gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg"
              >
                <PackagePlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Tambah Kategori
              </Button>
            </div>
          </div>
        </CardHeader>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-2">
              <Package className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6f4e37]">
                {filterKategori}
              </p>
              <p className="text-sm text-[#8c7158]/70">Total Kategori</p>
            </div>
          </div>
        </Card>

        {/* Aktif */}
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-green-500/15 to-green-600/15 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filterKategoriAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Kategori Aktif</p>
            </div>
          </div>
        </Card>

        {/* Tidak Aktif */}
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-orange-500/15 to-orange-600/15 p-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {filterKategoriTidakAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Kategori Tidak Aktif</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4 md:space-y-6">
            {searchItems.length > 0 ? (
              searchItems.map(item => (
                <ManagementCategoryItem key={item.id} item={item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
                  <Search className="h-8 w-8 text-[#8c7158]/50" />
                </div>
                <p className="mb-2 text-lg font-semibold text-[#6f4e37]">
                  Tidak ada kategori ditemukan
                </p>
                <p className="max-w-md text-center text-sm text-[#8c7158]/70">
                  Coba tambahkan atau kata kunci pencarian untuk menemukan
                  kategori yang Anda cari.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddCategoryModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default CategorySection;
