import {
  CARD_STYLES,
  TEXT_COLORS,
  SHADOW_CARD_STYLE,
  CHILDREN_SHADOW_CARD_STYLE,
} from '@/constants/Style';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatCurrency';

const recentOrders = [
  {
    id: 'ORD-342',
    customer: 'Budi Santoso',
    items: 3,
    total: 85000,
    status: 'Selesai',
    time: '14:30',
    cashier: 'Maria',
  },
  {
    id: 'ORD-341',
    customer: 'Siti Rahayu',
    items: 2,
    total: 60000,
    status: 'Sedang Dibuat',
    time: '14:15',
    cashier: 'Ahmad',
  },
  {
    id: 'ORD-340',
    customer: 'Ahmad Fauzi',
    items: 1,
    total: 35000,
    status: 'Selesai',
    time: '14:00',
    cashier: 'Maria',
  },
];

const staffMembers = [
  {
    id: 1,
    name: 'Maria Sari',
    role: 'Kasir',
    shift: '08:00 - 16:00',
    status: 'Aktif',
    todaySales: 1250000,
    orders: 25,
  },
  {
    id: 2,
    name: 'Ahmad Wijaya',
    role: 'Barista',
    shift: '10:00 - 18:00',
    status: 'Aktif',
    todaySales: 980000,
    orders: 18,
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    role: 'Kasir',
    shift: '16:00 - 24:00',
    status: 'Off',
    todaySales: 0,
    orders: 0,
  },
];

const RecentActivityCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <div className={`${CARD_STYLES} rounded-lg ${SHADOW_CARD_STYLE}`}>
        <div className="p-6">
          <h3 className={`mb-4 text-lg font-semibold ${TEXT_COLORS.primary}`}>
            Pesanan Terbaru
          </h3>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-3 md:space-y-4">
            {recentOrders.map(order => (
              <div
                key={order.id}
                className={`flex flex-col justify-between space-y-2 rounded-lg border border-[#e6d9c9] p-3 ${CHILDREN_SHADOW_CARD_STYLE} md:flex-row md:items-center md:space-y-0`}
              >
                <div>
                  <div
                    className={`text-sm font-medium md:text-base ${TEXT_COLORS.primary}`}
                  >
                    #{order.id}
                  </div>
                  <div
                    className={`text-xs md:text-sm ${TEXT_COLORS.secondary}`}
                  >
                    {order.customer} • {order.time}
                  </div>
                  <div className={`text-xs ${TEXT_COLORS.secondary}`}>
                    Kasir: {order.cashier}
                  </div>
                </div>
                <div className="flex justify-between md:block md:text-right">
                  <div className={TEXT_COLORS.bold}>
                    {formatCurrency(order.total)}
                  </div>
                  <Badge
                    variant={
                      order.status === 'Selesai' ? 'secondary' : 'default'
                    }
                    className={`text-xs ${
                      order.status === 'Selesai'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CARD_STYLES} rounded-lg ${SHADOW_CARD_STYLE}`}>
        <div className="p-6">
          <h3 className={`mb-4 text-lg font-semibold ${TEXT_COLORS.primary}`}>
            Performance Staff
          </h3>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-3 md:space-y-4">
            {staffMembers
              .filter(staff => staff.status === 'Aktif')
              .map(staff => (
                <div
                  key={staff.id}
                  className={`flex flex-col justify-between space-y-2 rounded-lg border border-[#e6d9c9] p-3 ${CHILDREN_SHADOW_CARD_STYLE} md:flex-row md:items-center md:space-y-0`}
                >
                  <div>
                    <div
                      className={`text-sm font-medium md:text-base ${TEXT_COLORS.primary}`}
                    >
                      {staff.name}
                    </div>
                    <div
                      className={`text-xs md:text-sm ${TEXT_COLORS.secondary}`}
                    >
                      {staff.role} • {staff.shift}
                    </div>
                  </div>
                  <div className="flex justify-between md:block md:text-right">
                    <div className={TEXT_COLORS.bold}>
                      {formatCurrency(staff.todaySales)}
                    </div>
                    <div
                      className={`text-xs md:text-sm ${TEXT_COLORS.secondary}`}
                    >
                      {staff.orders} pesanan
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
