import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import RecentOrderItemCustomer from '../components/RecentOrderItemCustomer';
import { recentOrders } from '../mocks/order';
import { TEXT_COLORS, CARD_STYLES } from '../constant/Style';

const OverviewCardContentSection = () => {
  return (
    <Card className={CARD_STYLES}>
      <CardHeader>
        <CardTitle className={TEXT_COLORS.primary}>Pesanan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {recentOrders.slice(0, 3).map(order => (
            <RecentOrderItemCustomer key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default OverviewCardContentSection;
