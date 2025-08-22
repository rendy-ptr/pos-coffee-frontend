import { lucideIcons } from '@/icon/lucide-react-icons';
import MetricCard from '@/components/shared/MetricCard';
import { DASHBOARD_MOCKS } from '../../../mocks/dashboardMocks';

const SummaryCardSection = () => {
  const { DollarSign, Package, Users, TrendingUp } = lucideIcons;
  const cardConfigs = [
    {
      title: 'Total Revenue',
      value: DASHBOARD_MOCKS.totalRevenue,
      subtext: '+12.5% dari bulan lalu',
      Icon: DollarSign,
      gradient: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
      iconBg: 'bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10',
      iconColor: 'text-[#6f4e37]',
    },
    {
      title: 'Total Pesanan',
      value: DASHBOARD_MOCKS.totalOrders,
      subtext: '+23 dari kemarin',
      Icon: Package,
      gradient: 'bg-gradient-to-r from-[#8c7158] to-[#a08b7a]',
      iconBg: 'bg-gradient-to-br from-[#8c7158]/10 to-[#a08b7a]/10',
      iconColor: 'text-[#8c7158]',
    },
    {
      title: 'Total Customer Member',
      value: DASHBOARD_MOCKS.totalCustomers,
      subtext: '+12 member baru',
      Icon: Users,
      gradient: 'bg-gradient-to-r from-[#a66a4c] to-[#c17a5d]',
      iconBg: 'bg-gradient-to-br from-[#a66a4c]/10 to-[#c17a5d]/10',
      iconColor: 'text-[#a66a4c]',
    },
    {
      title: 'Rata-rata Harian',
      value: DASHBOARD_MOCKS.dailyAverage,
      subtext: '+8% dari minggu lalu',
      Icon: TrendingUp,
      gradient: 'bg-gradient-to-r from-[#8b5e3c] to-[#6f4e37]',
      iconBg: 'bg-gradient-to-br from-[#8b5e3c]/10 to-[#6f4e37]/10',
      iconColor: 'text-[#8b5e3c]',
    },
  ];

  return (
    <div className="w-full">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {cardConfigs.map((config, index) => (
          <MetricCard
            key={index}
            title={config.title}
            value={config.value}
            subtext={config.subtext}
            Icon={config.Icon}
            gradient={config.gradient}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryCardSection;
