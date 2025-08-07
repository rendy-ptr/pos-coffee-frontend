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

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';

// FUNCTIONS
import { fetchCustomerDashboard } from '../services/api';

// TYPES

const CustomerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('ringkasan');
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    data: userResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customerDashboard'],
    queryFn: fetchCustomerDashboard,
  });

  useEffect(() => {
    if (error) {
      navigate('/auth/login');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (userResponse && userResponse.message && !hasShownWelcome) {
      addToast(userResponse.message, 'success', 5000);
      setHasShownWelcome(true);
    }
  }, [userResponse, hasShownWelcome, addToast]);

  if (isLoading || !userResponse) return <DashboardLoadingSkeleton />;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-4">
      {/* Sidebar Kiri */}
      <div className="order-1 lg:order-1 lg:col-span-1">
        <CardCustomerSection
          name={userResponse.data.name}
          loyaltyPoints={userResponse.data.loyaltyPoints}
        />
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
