import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CARD_STYLES, TEXT_COLORS } from '../constant/Style';
import type { LucideIcon } from 'lucide-react';

type MetricCardProps = {
  title: string;
  value: string | number;
  subtext: string;
  Icon: LucideIcon;
  iconColor?: string;
};

const MetricCard = ({
  title,
  value,
  subtext,
  Icon,
  iconColor,
}: MetricCardProps) => (
  <Card className={CARD_STYLES}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${iconColor}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-xl ${TEXT_COLORS.bold} md:text-2xl`}>{value}</div>
      <p className={`text-xs ${TEXT_COLORS.secondary}`}>{subtext}</p>
    </CardContent>
  </Card>
);
export default MetricCard;
