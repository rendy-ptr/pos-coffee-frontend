import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import TabListSection from '../components/tablist-components/sections/TabList/TabList';
import SummaryCardSection from '../components/index-components/sections/OverviewTab/SummaryCard';
import RecentActivityCard from '../components/index-components/sections/OverviewTab/RecentActivityCard';
import ManagementMenuSection from '../components/index-components/sections/MenuTab/ManagementMenu';
import ManagementKasirSection from '../components/index-components/sections/KasirTab/ManagementKasir';
import ManagementPesanan from '../components/index-components/sections/OverviewTab/ManagementPesanan';
import ManagementReward from '../components/index-components/sections/RewardTab/ManagementReward';

import { useToast } from '@/components/shared/ToastProvider';
import { useAdminStore } from '@/store/adminStore';
import ManagementTableSection from '../components/index-components/sections/TableTab/ManagementTable';
import ManagementReport from '../components/index-components/sections/ReportTab/ManagementReport';

const AdminDashboardIndex = () => {
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

      <TabsContent value="meja" className="space-y-4 md:space-y-6">
        <ManagementTableSection />
      </TabsContent>

      <TabsContent value="reward" className="space-y-4 md:space-y-6">
        <ManagementReward />
      </TabsContent>

      <TabsContent value="pesanan" className="space-y-4 md:space-y-6">
        <ManagementPesanan />
      </TabsContent>

      <TabsContent value="laporan" className="space-y-4 md:space-y-6">
        <ManagementReport />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardIndex;
