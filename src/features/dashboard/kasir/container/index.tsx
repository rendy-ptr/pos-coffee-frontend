// LOCAL-IMPORTS
import TabListSection from '../components/sections/TabList';
import MenuItemContent from '../components/sections/TransaksiTab/Menu/MenuTransaksiContent';
import CartItemContent from '../components/sections/TransaksiTab/Cart/CartItemContent';
import RiwayatPesananContent from '../components/sections/RiwayatPesananContent';
import StatistikPesananContent from '../components/sections/StatistikPesananContent';
import ManagementMenuContent from '../components/sections/MenuTab/ManagementMenuContent';
import TableManager from '../components/sections/TableManager';

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
        {/* Riwayat Transaksi dan Statistik */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <RiwayatPesananContent />
          <StatistikPesananContent />
        </div>
      </TabsContent>
      <TabsContent value="daftar-menu">
        <ManagementMenuContent />
      </TabsContent>
      <TabsContent value="kelola-meja">
        {/* Konten untuk Kelola Meja */}
        <TableManager />
      </TabsContent>
    </Tabs>
  );
};

export default KasirDashboardContainer;
