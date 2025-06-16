import { lucideIcons } from '@/icon/lucide-react-icons';
import MetricCard from '../components/MetricCardCustomer';
import { customerData } from '../mocks/customer';

const SummaryCardSection = () => {
  const { Star, Coffee, Heart } = lucideIcons;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      <MetricCard
        title="Poin Loyalty"
        value={customerData.loyaltyPoints}
        subtext="+73 poin minggu ini"
        Icon={Star}
        iconColor="text-yellow-500"
      />
      <MetricCard
        title="Total Pesanan"
        value={customerData.totalOrders}
        subtext="+3 pesanan bulan ini"
        Icon={Coffee}
        iconColor="text-[#6f4e37]"
      />
      <MetricCard
        title="Menu Favorit"
        value={customerData.favoriteOrder}
        subtext="Dipesan 12 kali"
        Icon={Heart}
        iconColor="text-red-500"
      />
    </div>
  );
};
export default SummaryCardSection;
