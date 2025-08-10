// LOCAL-IMPORTS
import TabListSection from '../sections/TabList';
import SummaryCardSection from '../sections/SummaryCard';

// HOOKS
import { useState } from 'react';

// THIRD-PARTY

import { Tabs, TabsContent } from '@/components/ui/tabs';
import RecentActivityCard from '../sections/RecentActivityCard';

// FUNCTIONS

// TYPES

const AdminDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  //   const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    </Tabs>
  );
};

export default AdminDashboardContainer;
