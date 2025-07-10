import CardCustomerSection from '../sections/CardCustomer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import SummaryCardSection from '../sections/SummaryCard';
import { useState } from 'react';
import OverviewCardContentSection from '../sections/OverviewCardContent';
import TabListSection from '../sections/TabList';
import OrderHistoryContentSection from '../sections/OrderHistoryCardContent';
import FavoriteCardContentSection from '../sections/FavoriteCardContent';
import RewardCardContentSection from '../sections/RewardCardContent';
import VoucherCardContentSection from '../sections/VoucherCardContent';

const CustomerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-4">
      {/* Sidebar Kiri */}
      <div className="order-1 lg:order-1 lg:col-span-1">
        <CardCustomerSection />
      </div>

      {/* Konten Kanan */}
      <div className="order-2 lg:order-2 lg:col-span-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabListSection />
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <SummaryCardSection />
            <OverviewCardContentSection />
          </TabsContent>
          <TabsContent value="orders" className="space-y-4 md:space-y-6">
            <OrderHistoryContentSection />
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4 md:space-y-6">
            <FavoriteCardContentSection />
          </TabsContent>
          <TabsContent value="rewards" className="space-y-4 md:space-y-6">
            <RewardCardContentSection />
          </TabsContent>
          <TabsContent value="vouchers" className="space-y-4 md:space-y-6">
            <VoucherCardContentSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboardContainer;
