import CardCustomer from '../components/CardCustomer';
import MainContentCustomer from '../layout/MainContentCustomer';
import MetricCard from '../components/MetricCardCustomer';
import RecentOrderItemCustomer from '../components/RecentOrderItemCustomer';
import { CARD_STYLES, TEXT_COLORS } from '../constant/Style';
import { customerData } from '../mocks/customer';
import { recentOrders } from '../mocks/order';
import { availableRewards } from '../mocks/reward';
import { favoriteItems } from '../mocks/favorite';
import { availableVouchers } from '../mocks/voucher';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import OrderHistoryItemCustomer from '../components/OrderHistoryCustomer';
import FavoriteItemCustomer from '../components/FavoriteItemCustomer';
import RewardItemCustomer from '../components/RewardItemCustomer';
import VoucherItemCustomer from '../components/VoucherItemCustomer';

const CustomerDashboardContainer = () => {
  const { Star, Coffee, Heart } = lucideIcons;
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-4">
      <CardCustomer />
      <MainContentCustomer>
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <MetricCard
              title="Poin Loyalty"
              value={customerData.loyaltyPoints}
              subtext="+73 poin minggu ini"
              Icon={Star}
              iconColor="text-yellow-500"
            />
            <MetricCard
              title="Total Pesanan"
              value={customerData.totalOrders}
              subtext="+3 pesanan bulan ini"
              Icon={Coffee}
              iconColor="text-[#6f4e37]"
            />
            <MetricCard
              title="Menu Favorit"
              value={customerData.favoriteOrder}
              subtext="Dipesan 12 kali"
              Icon={Heart}
              iconColor="text-red-500"
            />
          </div>
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Pesanan Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {recentOrders.slice(0, 3).map(order => (
                  <RecentOrderItemCustomer key={order.id} order={order} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4 md:space-y-6">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Riwayat Pesanan
              </CardTitle>
              <CardDescription>
                Semua pesanan Anda di Aroma Kopi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {recentOrders.map(order => (
                  <OrderHistoryItemCustomer key={order.id} order={order} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-4 md:space-y-6">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Menu Favorit
              </CardTitle>
              <CardDescription>
                Menu yang paling sering Anda pesan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                {favoriteItems.map(item => (
                  <FavoriteItemCustomer key={item.id} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4 md:space-y-6">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Tukar Poin Reward
              </CardTitle>
              <CardDescription>
                Gunakan poin loyalty Anda untuk mendapatkan reward menarik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {availableRewards.map(reward => (
                  <RewardItemCustomer
                    key={reward.id}
                    reward={reward}
                    loyaltyPoints={customerData.loyaltyPoints}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Rewards Tab */}
        <TabsContent value="vouchers" className="space-y-4 md:space-y-6">
          <Card className={CARD_STYLES}>
            <CardHeader>
              <CardTitle className={TEXT_COLORS.primary}>
                Gunakan Voucher yang Tersedia
              </CardTitle>
              <CardDescription>
                Gunakan voucher yang tersedia untuk mendapatkan diskon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {availableVouchers.map(voucher => (
                  <VoucherItemCustomer key={voucher.id} voucher={voucher} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </MainContentCustomer>
    </div>
  );
};
export default CustomerDashboardContainer;
