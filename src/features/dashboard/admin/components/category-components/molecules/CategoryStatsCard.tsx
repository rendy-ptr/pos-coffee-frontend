import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface CategoryStatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  iconBgFrom: string;
  iconBgTo: string;
  iconColor: string;
  valueColor: string;
}

const CategoryStatsCard = ({
  icon: Icon,
  value,
  label,
  iconBgFrom,
  iconBgTo,
  iconColor,
  valueColor,
}: CategoryStatsCardProps) => {
  return (
    <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full bg-gradient-to-br ${iconBgFrom} ${iconBgTo} p-2`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          <p className="text-sm text-[#8c7158]/70">{label}</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryStatsCard;
