import { lucideIcons } from '@/icon/lucide-react-icons';
import CategoryStatsCard from '../molecules/CategoryStatsCard';

const { Package, CheckCircle, AlertCircle } = lucideIcons;

interface CategoryStatsProps {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

const CategoryStats = ({
  totalCount,
  activeCount,
  inactiveCount,
}: CategoryStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CategoryStatsCard
        icon={Package}
        value={totalCount}
        label="Total Kategori"
        iconBgFrom="from-[#6f4e37]/15"
        iconBgTo="to-[#8b5e3c]/15"
        iconColor="text-[#6f4e37]"
        valueColor="text-[#6f4e37]"
      />

      <CategoryStatsCard
        icon={CheckCircle}
        value={activeCount}
        label="Kategori Aktif"
        iconBgFrom="from-green-500/15"
        iconBgTo="to-green-600/15"
        iconColor="text-green-600"
        valueColor="text-green-600"
      />

      <CategoryStatsCard
        icon={AlertCircle}
        value={inactiveCount}
        label="Kategori Tidak Aktif"
        iconBgFrom="from-orange-500/15"
        iconBgTo="to-orange-600/15"
        iconColor="text-orange-600"
        valueColor="text-orange-600"
      />
    </div>
  );
};

export default CategoryStats;
