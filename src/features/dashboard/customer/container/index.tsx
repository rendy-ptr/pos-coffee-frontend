// LOCAL-IMPORTS
import CardCustomerSection from '../sections/CardCustomer';
import SummaryCardSection from '../sections/SummaryCard';
import OverviewCardContentSection from '../sections/OverviewCardContent';
import TabListSection from '../sections/TabList';
import OrderHistoryContentSection from '../sections/OrderHistoryCardContent';
import FavoriteCardContentSection from '../sections/FavoriteCardContent';
import RewardCardContentSection from '../sections/RewardCardContent';

// HOOKS
import { useState, useEffect } from 'react';
import { useToast } from '@/components/shared/ToastProvider';
import { useCustomerStore } from '@/store/customerStore';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS

// TYPES

const CustomerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('ringkasan');
  const { customerData } = useCustomerStore();
  const { addToast } = useToast();

  useEffect(() => {
    const alreadyShown = localStorage.getItem('welcomeShown');

    if (customerData?.name && !alreadyShown) {
      addToast(`Selamat datang, ${customerData.name}!`, 'info', 5000);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [customerData, addToast]);

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
          <TabsContent value="ringkasan" className="space-y-4 md:space-y-6">
            <SummaryCardSection />
            <OverviewCardContentSection />
          </TabsContent>
          <TabsContent
            value="riwayat-pesanan"
            className="space-y-4 md:space-y-6"
          >
            <OrderHistoryContentSection />
          </TabsContent>
          <TabsContent value="menu-favorit" className="space-y-4 md:space-y-6">
            <FavoriteCardContentSection />
          </TabsContent>
          <TabsContent value="hadiah" className="space-y-4 md:space-y-6">
            <RewardCardContentSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboardContainer;
