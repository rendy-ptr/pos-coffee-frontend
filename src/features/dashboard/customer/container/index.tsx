// LOCAL-IMPORTS
import CardCustomerSection from '../sections/CardCustomer';
import SummaryCardSection from '../sections/SummaryCard';
import OverviewCardContentSection from '../sections/OverviewCardContent';
import TabListSection from '../sections/TabList';
import OrderHistoryContentSection from '../sections/OrderHistoryCardContent';
import FavoriteCardContentSection from '../sections/FavoriteCardContent';
import RewardCardContentSection from '../sections/RewardCardContent';
import { DashboardLoadingSkeleton } from '../components/DashboardLoadingSkeleton';

// HOOKS
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/shared/ToastProvider';
import { useCustomerStore } from '@/store/customerStore';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS
import { fetchCustomerDashboard } from '../services/api';

// TYPES
import type { ICustomerDashboardResponse } from '../types/CustomerDashboardResponse';

const CustomerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('ringkasan');
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setCustomerData } = useCustomerStore();

  const {
    data: userResponse,
    isLoading,
    error,
  } = useQuery<ICustomerDashboardResponse>({
    queryKey: ['customerDashboard'],
    queryFn: fetchCustomerDashboard,
  });

  // Tangani error dan navigasi ke login
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

  // Simpan data pelanggan ke store
  useEffect(() => {
    if (userResponse?.data) {
      setCustomerData(userResponse.data);
    }
  }, [userResponse, setCustomerData]);

  // Tampilkan toast selamat datang sekali saja per pengguna
  useEffect(() => {
    if (userResponse?.data && userResponse.message) {
      const welcomeKey = `welcome_shown_${userResponse.data.id}`;
      const hasShownWelcome = localStorage.getItem(welcomeKey);
      if (!hasShownWelcome) {
        addToast(userResponse.message, 'success', 5000);
        localStorage.setItem(welcomeKey, 'true');
      }
    }
  }, [userResponse, addToast]);

  // Tampilkan skeleton saat loading
  if (isLoading) return <DashboardLoadingSkeleton />;

  // Tampilkan pesan error jika data tidak tersedia
  if (!userResponse?.data) {
    addToast('Data pelanggan tidak tersedia.', 'error', 3000);
    navigate('/auth/login');
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-4">
      {/* Sidebar Kiri */}
      <div className="order-1 lg:order-1 lg:col-span-1">
        <CardCustomerSection />
      </div>

      {/* Konten Kanan */}
      <div className="order-2 lg:order-2 lg:col-span-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabListSection />
          <TabsContent value="ringkasan" className="space-y-4 md:space-y-6">
            <SummaryCardSection />
            <OverviewCardContentSection />
          </TabsContent>
          <TabsContent
            value="riwayat-pesanan"
            className="space-y-4 md:space-y-6"
          >
            <OrderHistoryContentSection />
          </TabsContent>
          <TabsContent value="menu-favorit" className="space-y-4 md:space-y-6">
            <FavoriteCardContentSection />
          </TabsContent>
          <TabsContent value="hadiah" className="space-y-4 md:space-y-6">
            <RewardCardContentSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboardContainer;
