import { TEXT_COLORS } from '../constant/Style';
import type { OrderType } from '../mocks/order';

interface RecentOrderItemProps {
  order: OrderType;
}

const RecentOrderItemCustomer = ({ order }: RecentOrderItemProps) => (
  <div className="flex flex-col justify-between space-y-2 rounded-lg border border-[#e6d9c9] p-3 md:flex-row md:items-center md:space-y-0 md:p-4">
    <div className="flex-1">
      <div className={`text-sm ${TEXT_COLORS.primary} md:text-base`}>
        {order.items.join(', ')}
      </div>
      <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
        {order.date} • {order.time}
      </div>
    </div>
    <div className="flex justify-between md:block md:text-right">
      <div className={TEXT_COLORS.bold}>{order.total}</div>
      <div className={`text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
        +{order.points} poin
      </div>
    </div>
  </div>
);
export default RecentOrderItemCustomer;
