import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';
import { todayStats } from '../mocks/todayStats';
import { CARD_STYLES, CARD_ITEM_STYLES, TEXT_COLORS } from '../constant/Style';

const StatistikPesananContent = () => {
  return (
    <div className="lg:col-span-1">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <CardTitle className={TEXT_COLORS.primary}>
            Statistik Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-[#e6d9c9]/30 p-3 text-center md:p-4">
            <div
              className={`text-lg font-bold ${TEXT_COLORS.primary} md:text-2xl`}
            >
              {formatCurrency(todayStats.totalSales)}
            </div>
            <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
              Total Penjualan
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className={`text-center ${CARD_ITEM_STYLES}`}>
              <div
                className={`text-base font-bold ${TEXT_COLORS.primary} md:text-lg`}
              >
                {todayStats.totalOrders}
              </div>
              <div className={`text-xs ${TEXT_COLORS.secondary}`}>
                Total Pesanan
              </div>
            </div>
            <div className={`text-center ${CARD_ITEM_STYLES}`}>
              <div
                className={`text-base font-bold ${TEXT_COLORS.primary} md:text-lg`}
              >
                {formatCurrency(todayStats.avgOrderValue)}
              </div>
              <div className={`text-xs ${TEXT_COLORS.secondary}`}>
                Rata-rata
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default StatistikPesananContent;
