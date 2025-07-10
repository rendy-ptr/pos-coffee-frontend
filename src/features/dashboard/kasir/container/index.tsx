// LOCAL-IMPORTS
import TabListSection from '../sections/TabList';
import MenuItemContent from '../sections/MenuTransaksiContent';
import CartItemContent from '../sections/CartItemContent';
import RiwayatPesananContent from '../sections/RiwayatPesananContent';
import StatistikPesananContent from '../sections/StatistikPesananContent';
import ManagementMenuContent from '../sections/ManagementMenuContent';

// HOOKS
import { useState } from 'react';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS

// TYPES

const KasirDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('transaksi');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />
      {/* Keranjang Tab */}
      <TabsContent value="transaksi">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Menu Items */}
          <MenuItemContent />
          {/* Cart */}
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
      </TabsContent>
    </Tabs>
  );
};

export default KasirDashboardContainer;
