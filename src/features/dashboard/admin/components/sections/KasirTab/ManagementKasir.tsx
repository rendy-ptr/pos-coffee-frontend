import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Button } from '@/components/ui/button';
import ManagementKasirItem from '../../organism/KasirTab/ManagementKasirItem';
import AddKasirModal from '../../organism/KasirTab/AddKasirModal';
import { useGetKasirs } from '../../../hooks/kasirHooks';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';
const {
  Users,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} = lucideIcons;

// const kasirMembers = [
//   {
//     id: 1,
//     name: 'Maria Sari',
//     role: 'Kasir',
//     shift: '08:00 - 16:00',
//     status: 'active',
//     avatar: '/avatars/maria.jpg',
//     todaySales: 1250000,
//     todayOrders: 25,
//     allOrders: 100,
//   },
//   {
//     id: 2,
//     name: 'Ahmad Wijaya',
//     role: 'Kasir',
//     shift: '10:00 - 18:00',
//     status: 'active',
//     avatar: '/avatars/ahmad.jpg',
//     todaySales: 980000,
//     todayOrders: 18,
//     allOrders: 100,
//   },
//   {
//     id: 3,
//     name: 'Dewi Lestari',
//     role: 'Kasir',
//     shift: '16:00 - 24:00',
//     status: 'nonactive',
//     avatar: '/avatars/dewi.jpg',
//     todaySales: 0,
//     todayOrders: 0,
//     allOrders: 0,
//   },
// ] as const;

const filterOptions = [
  { value: 'semua', label: 'Semua' },
  { value: 'aktif', label: 'Kasir Aktif' },
  { value: 'non-aktif', label: 'Kasir Nonaktif' },
];

const ManagementKasir = () => {
  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: Kasirs = [], isLoading, error } = useGetKasirs();

  const selectedFilterLabel = useMemo(() => {
    const selected = filterOptions.find(
      option => option.value === selectedFilter
    );
    return selected ? selected.label : 'Semua';
  }, [selectedFilter]);

  const filterKasirAktif = Kasirs.filter(kasir => kasir.isActive).length;
  const filterKasirNonAktif = Kasirs.filter(kasir => !kasir.isActive).length;
  const filterKasirSemua = Kasirs.length;

  const filteredKasir = useMemo(() => {
    return Kasirs.filter(kasir => {
      const matchesSearch = searchTerm
        ? kasir.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesFilter =
        selectedFilter === 'semua'
          ? true
          : selectedFilter === 'aktif'
            ? kasir.isActive === true
            : kasir.isActive === false;

      return matchesSearch && matchesFilter;
    });
  }, [selectedFilter, searchTerm, Kasirs]);

  if (isLoading) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Informasi Kasir"
        messages={[
          'Mengambil data Kasir',
          'Memproses informasi',
          'Mempersiapkan tampilan',
        ]}
      />
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Gagal memuat menu</p>;
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
                <Users className="h-6 w-6 text-[#6f4e37]" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Manajemen Kasir
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                  Kelola kasir dengan mudah
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]/60" />
                <input
                  type="text"
                  placeholder="Cari nama kasir..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[#e6d9c9]/50 bg-white/80 py-2 pr-4 pl-9 text-sm backdrop-blur-sm transition-all duration-300 focus:border-[#6f4e37]/50 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 lg:justify-start">
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 rounded-lg border border-[#e6d9c9]/50 bg-white/80 px-4 py-2 text-sm font-medium text-[#6f4e37] backdrop-blur-sm transition-all duration-300 hover:border-[#6f4e37]/30 hover:bg-[#6f4e37]/5 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
                  >
                    <Filter className="h-4 w-4" />
                    <span>{selectedFilterLabel}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[160px] overflow-hidden rounded-lg border border-[#e6d9c9]/50 bg-white shadow-xl backdrop-blur-sm">
                      {filterOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedFilter(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#6f4e37]/5 ${
                            selectedFilter === option.value
                              ? 'bg-[#6f4e37]/10 text-[#6f4e37]'
                              : 'text-[#8c7158]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  className="group flex items-center gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <UserPlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Tambah Kasir
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-2">
              <Users className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6f4e37]">
                {filterKasirSemua}
              </p>
              <p className="text-sm text-[#8c7158]/70">Total Kasir</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-green-500/15 to-green-600/15 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filterKasirAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Kasir Aktif</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-orange-500/15 to-orange-600/15 p-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {filterKasirNonAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Kasir Tidak Aktif</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Card Daftar Pesanan */}
      <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4 md:space-y-6">
            {filteredKasir.length > 0 ? (
              filteredKasir.map(kasir => (
                <ManagementKasirItem key={kasir.id} kasirItem={kasir} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
                  <Search className="h-8 w-8 text-[#8c7158]/50" />
                </div>
                <p className="mb-2 text-lg font-semibold text-[#6f4e37]">
                  Tidak ada menu ditemukan
                </p>
                <p className="max-w-md text-center text-sm text-[#8c7158]/70">
                  Coba ubah filter atau kata kunci pencarian untuk menemukan
                  menu yang Anda cari.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <AddKasirModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ManagementKasir;
