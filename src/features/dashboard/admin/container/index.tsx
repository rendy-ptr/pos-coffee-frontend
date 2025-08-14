// LOCAL-IMPORTS
import TabListSection from '../sections/TabList';
import SummaryCardSection from '../sections/SummaryCard';
import RecentActivityCard from '../sections/RecentActivityCard';
import ManagementMenuSection from '../sections/ManagementMenu';
import ManagementKasirSection from '../sections/ManagementKasir';
// import M from '../sections/m';

// HOOKS
import { useState } from 'react';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ManagementPesanan from '../sections/ManagementPesanan';

// FUNCTIONS

// TYPES

const AdminDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-4 md:space-y-6">
        {/* Stats Cards */}
        <SummaryCardSection />
        {/* Recent Activity */}
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
        {/* <ManagementKasirSection /> */}
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardContainer;
