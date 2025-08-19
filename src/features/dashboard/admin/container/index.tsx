import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import TabListSection from '../sections/TabList';
import SummaryCardSection from '../sections/SummaryCard';
import RecentActivityCard from '../sections/RecentActivityCard';
import ManagementMenuSection from '../sections/ManagementMenu';
import ManagementKasirSection from '../sections/ManagementKasir';
import ManagementPesanan from '../sections/ManagementPesanan';
import ManagementReward from '../sections/ManagementReward';

import { useToast } from '@/components/shared/ToastProvider';
import { useAdminStore } from '@/store/adminStore';

const AdminDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { adminData } = useAdminStore();
  const { addToast } = useToast();

  useEffect(() => {
    const alreadyShown = localStorage.getItem('welcomeShown');

    if (adminData?.name && !alreadyShown) {
      addToast(`Selamat datang, ${adminData.name}!`, 'info', 5000);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [adminData, addToast]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-4 md:space-y-6">
        <SummaryCardSection />
        <RecentActivityCard />
      </TabsContent>

      <TabsContent value="menu" className="space-y-4 md:space-y-6">
        <ManagementMenuSection />
      </TabsContent>

      <TabsContent value="kasir" className="space-y-4 md:space-y-6">
        <ManagementKasirSection />
      </TabsContent>

      <TabsContent value="pesanan" className="space-y-4 md:space-y-6">
        <ManagementPesanan />
      </TabsContent>

      <TabsContent value="reward" className="space-y-4 md:space-y-6">
        <ManagementReward />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardContainer;
