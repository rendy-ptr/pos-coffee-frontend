import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import OrderItem from '../components/OrderItem';
const {
  Calendar,
  Search,
  Filter,
  ChevronDown,
  CreditCard,
  CheckCircle,
  Coffee,
  AlertCircle,
} = lucideIcons;

type Status = 'Selesai' | 'Sedang Dibuat';

const allOrders = [
  // Hari ini
  {
    id: 'ORD-342',
    customer: 'Budi Santoso',
    items: 3,
    total: 85000,
    status: 'Selesai' as Status,
    time: '14:30',
    cashier: 'Maria',
    date: new Date(),
  },
  {
    id: 'ORD-341',
    customer: 'Siti Rahayu',
    items: 2,
    total: 60000,
    status: 'Sedang Dibuat' as Status,
    time: '14:15',
    cashier: 'Ahmad',
    date: new Date(),
  },
  {
    id: 'ORD-340',
    customer: 'Ahmad Fauzi',
    items: 1,
    total: 35000,
    status: 'Selesai' as Status,
    time: '14:00',
    cashier: 'Maria',
    date: new Date(),
  },
  // Kemarin
  {
    id: 'ORD-339',
    customer: 'Rina Wati',
    items: 4,
    total: 120000,
    status: 'Selesai' as Status,
    time: '16:45',
    cashier: 'Ahmad',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ORD-338',
    customer: 'Joko Susanto',
    items: 2,
    total: 75000,
    status: 'Selesai' as Status,
    time: '15:20',
    cashier: 'Maria',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  // 3 hari lalu
  {
    id: 'ORD-337',
    customer: 'Dewi Sari',
    items: 5,
    total: 150000,
    status: 'Selesai' as Status,
    time: '13:10',
    cashier: 'Ahmad',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ORD-336',
    customer: 'Bambang Wijaya',
    items: 1,
    total: 25000,
    status: 'Selesai' as Status,
    time: '12:30',
    cashier: 'Maria',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  // 1 minggu lalu
  {
    id: 'ORD-335',
    customer: 'Indah Permata',
    items: 3,
    total: 95000,
    status: 'Selesai' as Status,
    time: '11:15',
    cashier: 'Ahmad',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'ORD-334',
    customer: 'Agus Pratama',
    items: 2,
    total: 65000,
    status: 'Selesai' as Status,
    time: '10:45',
    cashier: 'Maria',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  // 2 minggu lalu
  {
    id: 'ORD-333',
    customer: 'Lisa Maharani',
    items: 4,
    total: 110000,
    status: 'Selesai' as Status,
    time: '16:20',
    cashier: 'Ahmad',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  // 3 minggu lalu
  {
    id: 'ORD-332',
    customer: 'Doni Setiawan',
    items: 1,
    total: 45000,
    status: 'Selesai' as Status,
    time: '14:55',
    cashier: 'Maria',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
  // 1 bulan lalu
  {
    id: 'ORD-331',
    customer: 'Fitri Handayani',
    items: 6,
    total: 180000,
    status: 'Selesai' as Status,
    time: '13:40',
    cashier: 'Ahmad',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
];

const filterOptions = [
  { value: 'today', label: 'Hari Ini', days: 0 },
  { value: '7days', label: '7 Hari Terakhir', days: 7 },
  { value: '30days', label: '1 Bulan Terakhir', days: 30 },
];

const ManagementPesanan = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    const now = new Date();
    const filterOption = filterOptions.find(
      option => option.value === selectedFilter
    );
    const cutoffDate = filterOption
      ? new Date(now.getTime() - filterOption.days * 24 * 60 * 60 * 1000)
      : null;

    return allOrders
      .filter(order => {
        if (selectedFilter === '30days') return true;
        if (selectedFilter === 'today') {
          return order.date.toDateString() === now.toDateString();
        }
        return cutoffDate && order.date >= cutoffDate;
      })
      .filter(order =>
        searchTerm
          ? order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.cashier.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [selectedFilter, searchTerm]);

  const totalRevenue = useMemo(
    () => filteredOrders.reduce((sum, order) => sum + order.total, 0),
    [filteredOrders]
  );
  const totalItems = useMemo(
    () => filteredOrders.reduce((sum, order) => sum + order.items, 0),
    [filteredOrders]
  );
  const completedOrders = useMemo(
    () => filteredOrders.filter(order => order.status === 'Selesai').length,
    [filteredOrders]
  );
  const ongoingOrders = useMemo(
    () =>
      filteredOrders.filter(order => order.status === 'Sedang Dibuat').length,
    [filteredOrders]
  );

  const selectedFilterLabel =
    filterOptions.find(option => option.value === selectedFilter)?.label ||
    'Pilih Filter';

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        {/* Layer gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#a66a4c] opacity-70" />
        </div>

        <CardHeader className="relative z-10 overflow-visible px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3">
                <Calendar className="h-6 w-6 text-[#6f4e37]" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Seluruh Pesanan
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                  Riwayat lengkap transaksi dan pesanan
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]/60" />
                <input
                  type="text"
                  placeholder="Cari pesanan..."
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
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-2">
              <CreditCard className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6f4e37]">
                {filteredOrders.length}
              </p>
              <p className="text-sm text-[#8c7158]/70">Total Pesanan</p>
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
                {completedOrders}
              </p>
              <p className="text-sm text-[#8c7158]/70">Selesai</p>
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
                {ongoingOrders}
              </p>
              <p className="text-sm text-[#8c7158]/70">Sedang Dibuat</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-blue-500/15 to-blue-600/15 p-2">
              <Coffee className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
              <p className="text-sm text-[#8c7158]/70">Total Item</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-emerald-500/15 to-emerald-600/15 p-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">
                {formatCurrency(totalRevenue)}
              </p>
              <p className="text-sm text-[#8c7158]/70">Total Pendapatan</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Card Daftar Pesanan */}
      <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />

        <CardContent className="relative p-6">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
                <Search className="h-8 w-8 text-[#8c7158]/50" />
              </div>
              <p className="mb-2 text-lg font-semibold text-[#6f4e37]">
                Tidak ada pesanan ditemukan
              </p>
              <p className="max-w-md text-center text-sm text-[#8c7158]/70">
                Coba ubah filter waktu atau kata kunci pencarian untuk menemukan
                pesanan yang Anda cari.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementPesanan;
