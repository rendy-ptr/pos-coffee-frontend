import { lucideIcons } from '@/icon/lucide-react-icons';
import MetricCard from '@/components/shared/MetricCard';
import { DASHBOARD_MOCKS } from '../mocks/dashboardMocks';

const SummaryCardSection = () => {
  const { DollarSign, Package, Users, TrendingUp } = lucideIcons;
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-4 md:gap-6">
      <MetricCard
        title="Total Revenue"
        value={DASHBOARD_MOCKS.totalRevenue}
        subtext="+12.5% dari bulan lalu"
        Icon={DollarSign}
      />
      <MetricCard
        title="Total Pesanan"
        value={DASHBOARD_MOCKS.totalOrders}
        subtext="+23 dari kemarin"
        Icon={Package}
      />
      <MetricCard
        title="Total Customer"
        value={DASHBOARD_MOCKS.totalCustomers}
        subtext="+12 member baru"
        Icon={Users}
      />
      <MetricCard
        title="Rata-rata Harian"
        value={DASHBOARD_MOCKS.dailyAverage}
        subtext="+8% dari minggu lalu"
        Icon={TrendingUp}
      />
    </div>
  );
};
export default SummaryCardSection;
