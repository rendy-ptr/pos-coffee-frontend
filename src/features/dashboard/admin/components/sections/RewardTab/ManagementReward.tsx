import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Button } from '@/components/ui/button';
import ManagementRewardItem from '../../organism/RewardTab/ManagementRewardItem';
const {
  Tickets,
  TicketPlus,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} = lucideIcons;

const filterOptions = [
  { value: 'semua', label: 'Semua' },
  { value: 'reward-aktif', label: 'Reward Aktif' },
  { value: 'reward-non-aktif', label: 'Reward Nonaktif' },
  { value: 'voucher-aktif', label: 'Voucher Aktif' },
  { value: 'voucher-non-aktif', label: 'Voucher Nonaktif' },
];

const availableRewards = [
  {
    id: 1,
    name: 'Free Croissant',
    points: 300,
    description: 'Croissant gratis pilihan Anda',
    status: 'aktif',
    type: 'reward',
  },
  {
    id: 2,
    name: 'Diskon 20%',
    points: 500,
    description: 'Diskon 20% untuk semua menu',
    status: 'aktif',
    type: 'reward',
  },
  {
    id: 3,
    name: 'Free Coffee',
    points: 800,
    description: 'Kopi gratis pilihan Anda',
    status: 'aktif',
    type: 'reward',
  },
  {
    id: 4,
    name: 'VIP Workshop',
    points: 1500,
    description: 'Akses workshop kopi eksklusif',
    status: 'aktif',
    type: 'reward',
  },
  {
    id: 5,
    name: 'Discount New Customer',
    description: 'Diskon 50% untuk pelanggan baru',
    status: 'aktif',
    type: 'voucher',
    points: null,
    terms: 'Hanya berlaku untuk pembelian pertama.',
    expiredAt: '2025-09-01',
    secretCode: 'NEW50',
  },
  {
    id: 6,
    name: 'Discount Buy 1 Get 1',
    description: 'Beli satu menu, dapat satu gratis',
    status: 'aktif',
    type: 'voucher',
    points: null,
    terms: 'Berlaku untuk menu minuman ukuran reguler.',
    expiredAt: '2025-08-30',
    secretCode: 'BOGO2025',
  },
] as const;

const ManagementReward = () => {
  const filterReward = availableRewards.filter(
    reward => reward.type === 'reward'
  ).length;
  const filterVoucher = availableRewards.filter(
    reward => reward.type === 'voucher'
  ).length;

  const filterRewardAktif = availableRewards.filter(
    reward => reward.status === 'aktif' && reward.type === 'reward'
  ).length;
  const filterRewardNonAktif = availableRewards.filter(
    reward => reward.status !== 'aktif' && reward.type === 'reward'
  ).length;
  const filterVoucherAktif = availableRewards.filter(
    v => v.status === 'aktif' && v.type === 'voucher'
  ).length;
  const filterVoucherNonAktif = availableRewards.filter(
    v => v.status !== 'aktif' && v.type === 'voucher'
  ).length;

  const handleEdit = (id: number) => {
    console.log('Edit reward with ID:', id);
    // Implementasi logic edit
  };

  const handleDelete = (id: number) => {
    console.log('Delete reward with ID:', id);
    // Implementasi logic delete
  };

  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredData = useMemo(() => {
    return availableRewards.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if (selectedFilter === 'semua') {
        return matchesSearch;
      }

      if (selectedFilter === 'reward-aktif') {
        return (
          matchesSearch && item.status === 'aktif' && item.type === 'reward'
        );
      }

      if (selectedFilter === 'reward-non-aktif') {
        return (
          matchesSearch && item.status !== 'aktif' && item.type === 'reward'
        );
      }

      if (selectedFilter === 'voucher-aktif') {
        return (
          matchesSearch && item.status === 'aktif' && item.type === 'voucher'
        );
      }

      if (selectedFilter === 'voucher-non-aktif') {
        return (
          matchesSearch && item.status !== 'aktif' && item.type === 'voucher'
        );
      }

      return false;
    });
  }, [selectedFilter, searchTerm]);

  const selectedFilterLabel =
    filterOptions.find(option => option.value === selectedFilter)?.label ||
    'Pilih Filter';

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
                <Tickets className="h-6 w-6 text-[#6f4e37]" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Manajemen Reward Hadiah & Voucher
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                  Kelola voucher dengan mudah
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

              <div className="flex justify-end lg:justify-start">
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
              </div>
              <Button className="group flex items-center gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg">
                <TicketPlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Tambah Rewards/Vouchers
              </Button>
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-2">
              <Tickets className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6f4e37]">
                {filterReward + filterVoucher}
              </p>
              <p className="text-sm text-[#8c7158]/70">
                {filterReward} Reward & {filterVoucher} Voucher
              </p>
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
                {filterRewardAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Reward Aktif</p>
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
                {filterRewardNonAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Reward Tidak Aktif</p>
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
                {filterVoucherAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Voucher Aktif</p>
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
                {filterVoucherNonAktif}
              </p>
              <p className="text-sm text-[#8c7158]/70">Voucher Tidak Aktif</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Card Daftar Pesanan */}
      <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4 md:space-y-6">
            {filteredData.length > 0 ? (
              filteredData.map(reward => (
                <ManagementRewardItem
                  key={reward.id}
                  reward={reward}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
    </div>
  );
};

export default ManagementReward;
