import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import TabListSection from '../sections/TabList';

import type { MenuItem } from '@/types/kasir/menuitem';
type CartItem = MenuItem & { quantity: number };

import MenuItemContent from '../sections/MenuItemContent';
import CartItemContent from '../sections/CartItemContent';
import RiwayatPesananContent from '../sections/RiwayatPesananContent';
import StatistikPesananContent from '../sections/StatistikPesananContent';

const KasirDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('keranjang');
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabListSection />
      {/* Keranjang Tab */}
      <TabsContent value="keranjang">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Menu Items */}
          <MenuItemContent cart={cart} setCart={setCart} />
          {/* Cart */}
          <CartItemContent cart={cart} setCart={setCart} />
        </div>
      </TabsContent>
      <TabsContent value="riwayat-pesanan">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <RiwayatPesananContent />
          <StatistikPesananContent />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default KasirDashboardContainer;
