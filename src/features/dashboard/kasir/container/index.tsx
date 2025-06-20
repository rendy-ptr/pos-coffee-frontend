import { Tabs } from '@/components/ui/tabs';
import { useState } from 'react';
import TabListSection from '../sections/TabList';

const KasirDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('keranjang');
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />
    </Tabs>
  );
};
export default KasirDashboardContainer;
