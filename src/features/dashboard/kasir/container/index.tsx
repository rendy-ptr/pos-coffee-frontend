// LOCAL-IMPORTS
import TabListSection from '../sections/TabList';
import MenuItemContent from '../sections/MenuTransaksiContent';
import CartItemContent from '../sections/CartItemContent';
import RiwayatPesananContent from '../sections/RiwayatPesananContent';
import StatistikPesananContent from '../sections/StatistikPesananContent';
import ManagementMenuContent from '../sections/ManagementMenuContent';
import TableManager from '../sections/TableManager';

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/shared/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useKasirStore } from '@/store/kasirStore';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS
import { fetchKasirDashboard } from '../services/api';

// TYPES

const KasirDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('transaksi');
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { setKasirData } = useKasirStore();

  const {
    data: kasirResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['kasirDashboard'],
    queryFn: fetchKasirDashboard,
  });

  useEffect(() => {
    if (kasirResponse && kasirResponse.data) {
      setKasirData(kasirResponse.data);
      localStorage.setItem(`isOnline_${kasirResponse.data.id}`, 'true');
    }
  }, [kasirResponse, setKasirData]);

  useEffect(() => {
    if (error) {
      addToast(
        error.message || 'Terjadi kesalahan saat memuat data.',
        'error',
        3000
      );
      navigate('/auth/login');
    }
  }, [error, navigate, addToast]);

  useEffect(() => {
    if (kasirResponse?.data && kasirResponse.message) {
      const welcomeKey = `welcome_shown_${kasirResponse.data.id}`;
      const hasShownWelcome = localStorage.getItem(welcomeKey);
      if (!hasShownWelcome) {
        addToast(kasirResponse.message, 'success', 5000);
        localStorage.setItem(welcomeKey, 'true');
      }
    }
  }, [kasirResponse, addToast]);

  if (isLoading || !kasirResponse) return <div>Loading...</div>;

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
        <TableManager />
      </TabsContent>
    </Tabs>
  );
};

export default KasirDashboardContainer;
