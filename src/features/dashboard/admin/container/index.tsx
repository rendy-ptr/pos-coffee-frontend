import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import TabListSection from '../components/sections/TabList/TabList';
import SummaryCardSection from '../components/sections/OverviewTab/SummaryCard';
import RecentActivityCard from '../components/sections/OverviewTab/RecentActivityCard';
import ManagementMenuSection from '../components/sections/MenuTab/ManagementMenu';
import ManagementKasirSection from '../components/sections/KasirTab/ManagementKasir';
import ManagementPesanan from '../components/sections/OverviewTab/ManagementPesanan';
import ManagementReward from '../components/sections/RewardTab/ManagementReward';

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
