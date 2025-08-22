import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import RecentOrderItem from '../../organism/OverviewTab/RecentOrderItem';
import KasirItem from '../../organism/OverviewTab/KasirItem';
const { CreditCard, Users } = lucideIcons;

const recentOrders = [
  {
    id: 'ORD-342',
    customer: 'Budi Santoso',
    items: 3,
    total: 85000,
    status: 'Selesai',
    time: '14:30',
    cashier: 'Maria',
  },
  {
    id: 'ORD-341',
    customer: 'Siti Rahayu',
    items: 2,
    total: 60000,
    status: 'Sedang Dibuat',
    time: '14:15',
    cashier: 'Ahmad',
  },
  {
    id: 'ORD-340',
    customer: 'Ahmad Fauzi',
    items: 1,
    total: 35000,
    status: 'Selesai',
    time: '14:00',
    cashier: 'Maria',
  },
] as const;

const staffMembers = [
  {
    id: 1,
    name: 'Maria Sari',
    role: 'Kasir',
    shift: '08:00 - 16:00',
    status: 'Aktif',
    todaySales: 1250000,
    orders: 25,
  },
  {
    id: 2,
    name: 'Ahmad Wijaya',
    role: 'Barista',
    shift: '10:00 - 18:00',
    status: 'Aktif',
    todaySales: 980000,
    orders: 18,
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    role: 'Kasir',
    shift: '16:00 - 24:00',
    status: 'Off',
    todaySales: 0,
    orders: 0,
  },
] as const;
const RecentActivityCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Recent Orders Card */}
      <Card className="main-card-group relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] p-0 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8b5e3c]/20">
        {/* Sophisticated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />

        {/* Top border accent */}
        <div className="main-card-group-hover:opacity-100 absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#a66a4c] opacity-70 transition-opacity duration-500" />

        <CardHeader className="relative rounded-t-xl border-b border-[#e6d9c9]/20 px-6 py-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="group/icon main-card-group-hover:scale-110 main-card-group-hover:shadow-lg rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3 transition-all duration-300">
              <CreditCard className="main-card-group-hover:rotate-6 h-6 w-6 text-[#6f4e37] transition-transform duration-300" />
            </div>
            <div>
              <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                Pesanan Terbaru
              </CardTitle>
              <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                Aktivitas transaksi real-time
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-6">
          <div className="space-y-5">
            {recentOrders.map(order => (
              <RecentOrderItem key={order.id} order={order} />
            ))}
          </div>
        </CardContent>

        {/* Subtle main card hover effect */}
        <div className="main-card-group-hover:opacity-100 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#6f4e37]/3 via-transparent to-[#8b5e3c]/3 opacity-0 transition-opacity duration-500" />
      </Card>

      {/* Staff Performance Card */}
      <Card className="main-card-group-2 relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] p-0 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8b5e3c]/20">
        {/* Sophisticated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />

        {/* Top border accent */}
        <div className="main-card-group-2-hover:opacity-100 absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#8b5e3c] via-[#6f4e37] to-[#c17a5d] opacity-70 transition-opacity duration-500" />

        <CardHeader className="relative rounded-t-xl border-b border-[#e6d9c9]/20 px-6 py-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="group/icon main-card-group-2-hover:scale-110 main-card-group-2-hover:shadow-lg rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3 transition-all duration-300">
              <Users className="main-card-group-2-hover:rotate-6 h-6 w-6 text-[#6f4e37] transition-transform duration-300" />
            </div>
            <div>
              <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                Performance Staff
              </CardTitle>
              <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                Kinerja tim hari ini
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-6">
          <div className="space-y-5">
            {staffMembers
              .filter(kasir => kasir.status === 'Aktif')
              .map(kasir => (
                <KasirItem key={kasir.id} kasir={kasir} />
              ))}
          </div>
        </CardContent>

        {/* Subtle main card hover effect */}
        <div className="main-card-group-2-hover:opacity-100 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#6f4e37]/3 via-transparent to-[#8b5e3c]/3 opacity-0 transition-opacity duration-500" />
      </Card>
    </div>
  );
};

export default RecentActivityCard;
