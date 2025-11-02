import { lucideIcons } from '@/icon/lucide-react-icons';
import MetricCard from '@/components/shared/MetricCard';
import { useCustomerStore } from '@/store/customerStore';

const SummaryCardSection = () => {
  const { Star, Coffee, Heart } = lucideIcons;
  const { customerData } = useCustomerStore();
  if (!customerData) return null;

  const cardConfigs = [
    {
      title: 'Poin Loyalty',
      value: customerData.customerProfile.loyaltyPoints,
      subtext: '+73 poin minggu ini',
      Icon: Star,
      gradient: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
      iconBg: 'bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10',
      iconColor: 'text-[#6f4e37]',
    },
    {
      title: 'Total Pesanan',
      value: 0,
      subtext: '+3 pesanan bulan ini',
      Icon: Coffee,
      gradient: 'bg-gradient-to-r from-[#8c7158] to-[#a08b7a]',
      iconBg: 'bg-gradient-to-br from-[#8c7158]/10 to-[#a08b7a]/10',
      iconColor: 'text-[#8c7158]',
    },
    {
      title: 'Menu Favorit',
      value: 'testing',
      subtext: 'Dipesan 12 kali',
      Icon: Heart,
      gradient: 'bg-gradient-to-r from-[#a66a4c] to-[#c17a5d]',
      iconBg: 'bg-gradient-to-br from-[#a66a4c]/10 to-[#c17a5d]/10',
      iconColor: 'text-[#a66a4c]',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
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
  );
};
export default SummaryCardSection;
