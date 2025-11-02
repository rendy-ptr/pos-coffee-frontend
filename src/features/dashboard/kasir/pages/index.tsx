// LOCAL-IMPORTS
import TabListSection from '../components/index-components/sections/TabList';
import MenuItemContent from '../components/index-components/sections/TransaksiTab/Menu/MenuTransaksiContent';
import CartItemContent from '../components/index-components/sections/TransaksiTab/Cart/CartItemContent';
import RiwayatPesananContent from '../components/index-components/sections/RiwayatPesananContent';
import StatistikPesananContent from '../components/index-components/sections/StatistikPesananContent';
import ManagementMenuContent from '../components/index-components/sections/MenuTab/ManagementMenuContent';
import ManagementTableContent from '../components/index-components/sections/TableTab/ManagementTableContent';

// HOOKS
import { useState, useEffect } from 'react';
import { useToast } from '@/components/shared/ToastProvider';
import { useKasirStore } from '@/store/kasirStore';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS

// TYPES

const KasirDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('transaksi');
  const { addToast } = useToast();
  const { kasirData } = useKasirStore();

  useEffect(() => {
    const alreadyShown = localStorage.getItem('welcomeShown');

    if (kasirData?.name && !alreadyShown) {
      addToast(`Selamat datang, ${kasirData.name}!`, 'info', 5000);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [kasirData, addToast]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />
      <TabsContent value="transaksi">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <MenuItemContent />
          <CartItemContent />
        </div>
      </TabsContent>
      <TabsContent value="riwayat-transaksi">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <RiwayatPesananContent />
          <StatistikPesananContent />
        </div>
      </TabsContent>
      <TabsContent value="daftar-menu">
        <ManagementMenuContent />
      </TabsContent>
      <TabsContent value="kelola-meja">
        <ManagementTableContent />
      </TabsContent>
    </Tabs>
  );
};

export default KasirDashboardContainer;
