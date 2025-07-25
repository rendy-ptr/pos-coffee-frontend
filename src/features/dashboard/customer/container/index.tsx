// LOCAL-IMPORTS
import CardCustomerSection from '../sections/CardCustomer';
import SummaryCardSection from '../sections/SummaryCard';
import OverviewCardContentSection from '../sections/OverviewCardContent';
import TabListSection from '../sections/TabList';
import OrderHistoryContentSection from '../sections/OrderHistoryCardContent';
import FavoriteCardContentSection from '../sections/FavoriteCardContent';
import RewardCardContentSection from '../sections/RewardCardContent';
import VoucherCardContentSection from '../sections/VoucherCardContent';

// HOOKS
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// THIRD-PARTY
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AllVoucherContent from '../sections/AllVoucherContent';

// FUNCTIONS

// TYPES
interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
  profile: {
    loyaltyPoints: number;
  };
}

const CustomerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/dashboard/customer',
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message || 'Gagal memuat dashboard');
          navigate('/auth/login');
        }
      } catch (err) {
        setError('Terjadi kesalahan server');
        console.error('Error dashboard:', err);
        navigate('/auth/login');
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-4">
      {/* Sidebar Kiri */}
      <div className="order-1 lg:order-1 lg:col-span-1">
        <CardCustomerSection name={user.name} />
      </div>

      {/* Konten Kanan */}
      <div className="order-2 lg:order-2 lg:col-span-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabListSection />
          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <SummaryCardSection />
            <OverviewCardContentSection />
          </TabsContent>
          <TabsContent value="orders" className="space-y-4 md:space-y-6">
            <OrderHistoryContentSection />
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4 md:space-y-6">
            <FavoriteCardContentSection />
          </TabsContent>
          <TabsContent value="rewards" className="space-y-4 md:space-y-6">
            <RewardCardContentSection />
          </TabsContent>
          <TabsContent value="vouchers" className="space-y-4 md:space-y-6">
            <VoucherCardContentSection />
          </TabsContent>
          <TabsContent value="promotions" className="space-y-4 md:space-y-6">
            <AllVoucherContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboardContainer;
