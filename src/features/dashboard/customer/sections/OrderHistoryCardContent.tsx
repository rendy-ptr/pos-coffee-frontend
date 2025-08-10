import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import OrderHistoryItemCustomer from '../components/OrderHistoryCustomer';
import { recentOrders } from '../mocks/order';
import { TEXT_COLORS, CARD_STYLES, SHADOW_CARD_STYLE } from '@/constants/Style';

const OrderHistoryContentSection = () => {
  return (
    <Card className={`${CARD_STYLES} ${SHADOW_CARD_STYLE}`}>
      <CardHeader>
        <CardTitle className={TEXT_COLORS.primary}>Riwayat Pesanan</CardTitle>
        <CardDescription>Semua pesanan Anda di Aroma Kopi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {recentOrders.map(order => (
            <OrderHistoryItemCustomer key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderHistoryContentSection;
