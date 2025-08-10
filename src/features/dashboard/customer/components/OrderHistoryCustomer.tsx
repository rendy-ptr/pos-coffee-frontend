import { TEXT_COLORS, CHILDREN_SHADOW_CARD_STYLE } from '@/constants/Style';
import { Badge } from '@/components/ui/badge';
import type { OrderType } from '@/types/customer/order';

interface RecentOrderItemProps {
  order: OrderType;
}
const OrderHistoryItemCustomer = ({ order }: RecentOrderItemProps) => {
  return (
    <div
      className={`rounded-lg border border-[#e6d9c9] p-3 md:p-4 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className={`font-medium ${TEXT_COLORS.primary}`}>#{order.id}</div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-xs text-green-800"
        >
          {order.status}
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
        <div>
          <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
            Items
          </div>
          <div className="text-sm font-medium md:text-base">
            {order.items.join(', ')}
          </div>
        </div>
        <div>
          <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
            Tanggal & Waktu
          </div>
          <div className="text-sm font-medium md:text-base">
            {order.date} • {order.time}
          </div>
        </div>
        <div>
          <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
            Total
          </div>
          <div className={TEXT_COLORS.bold}>{order.total}</div>
        </div>
      </div>
    </div>
  );
};
export default OrderHistoryItemCustomer;
