import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { lucideIcons } from '@/icon/lucide-react-icons';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  Icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  iconBg?: string;
}

const MetricCard = ({
  title,
  value,
  subtext,
  Icon,
  gradient,
  iconBg,
  iconColor,
}: MetricCardProps) => {
  const { TrendingUp } = lucideIcons;
  return (
    <Card className="group relative overflow-hidden rounded-xl border-[#e6d9c9] bg-gradient-to-br from-white to-[#faf9f7] p-0 shadow-md transition-all duration-300 hover:border-[#6f4e37]/30 hover:shadow-lg hover:shadow-[#8b5e3c]/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/5 via-white/50 to-[#d2bba3]/5 opacity-60" />

      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 p-4 pb-2 md:p-6 md:pb-3">
        <CardTitle className="text-sm font-medium text-[#8c7158] transition-colors duration-300 group-hover:text-[#6f4e37]">
          {title}
        </CardTitle>
        <div
          className={`rounded-full p-2.5 ${iconBg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
        >
          <Icon
            className={`h-4 w-4 ${iconColor} transition-transform duration-300`}
          />
        </div>
      </CardHeader>

      <CardContent className="relative px-4 pb-4 md:px-6 md:pb-6">
        <div
          className={`text-2xl font-bold ${gradient} mb-2 bg-clip-text text-transparent transition-all duration-300 md:text-3xl`}
        >
          {value}
        </div>
        <div className="flex items-center gap-1">
          <div className="inline-flex items-center rounded-full border border-[#e6d9c9]/50 bg-gradient-to-r from-[#e6d9c9]/30 to-[#d2bba3]/40 px-2 py-1 text-xs font-medium text-[#6f4e37]">
            <TrendingUp className="mr-1 h-3 w-3" />
            {subtext}
          </div>
        </div>
      </CardContent>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
};

export default MetricCard;
