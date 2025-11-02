import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  CARD_STYLES,
  TEXT_COLORS,
  CARD_ITEM_STYLES,
} from '../../../constant/Style';
import { recentOrders } from '../../../mocks/RecentOrders';

const RiwayatPesananContent = () => {
  return (
    <div className="lg:col-span-2">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <CardTitle className={TEXT_COLORS.primary}>
            Pesanan Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className={`text-left ${CARD_ITEM_STYLES}`}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-base font-bold text-[#6f4e37] sm:text-sm">
                      #{order.id}
                    </span>
                    <Badge
                      variant={
                        order.status === 'Selesai' ? 'secondary' : 'default'
                      }
                      className={`text-sm sm:text-xs ${
                        order.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-[#8c7158] sm:text-xs">
                    {order.time}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div>
                    <span className="text-sm text-[#8c7158] sm:text-xs">
                      Customer:
                    </span>
                    <p className="text-base font-medium sm:text-sm">
                      {order.customer}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-[#8c7158] sm:text-xs">
                      Items:
                    </span>
                    <p className="text-base font-medium sm:text-sm">
                      {order.items} item
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-[#8c7158] sm:text-xs">
                      Total:
                    </span>
                    <p className="text-base font-bold text-[#6f4e37] sm:text-sm">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiwayatPesananContent;
