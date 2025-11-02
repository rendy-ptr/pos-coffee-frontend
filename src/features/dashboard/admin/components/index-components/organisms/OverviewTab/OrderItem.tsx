import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
const { CheckCircle, AlertCircle, User, Clock, CreditCard, Coffee } =
  lucideIcons;
import type { LucideIcon } from 'lucide-react';

type Status = 'Selesai' | 'Sedang Dibuat';

const configs: Record<
  Status,
  {
    bgColor: string;
    textColor: string;
    text: string;
    dot: string;
    Icon: LucideIcon;
    borderColor: string;
  }
> = {
  Selesai: {
    bgColor: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
    textColor: 'text-white',
    text: 'Selesai',
    dot: 'bg-[#6f4e37]',
    Icon: CheckCircle,
    borderColor: 'border-[#6f4e37]/20',
  },
  'Sedang Dibuat': {
    bgColor: 'bg-gradient-to-r from-[#a66a4c] to-[#c17a5d]',
    textColor: 'text-white',
    text: 'Sedang Dibuat',
    dot: 'bg-[#a66a4c]',
    Icon: AlertCircle,
    borderColor: 'border-[#a66a4c]/20',
  },
};

interface OrderItemProps {
  order: {
    id: string;
    customer: string;
    items: number;
    total: number;
    time: string;
    cashier: string;
    status: Status;
    date: Date;
  };
}

const OrderItem = ({ order }: OrderItemProps) => {
  const statusConfig = configs[order.status] || configs['Selesai'];
  const StatusIcon = statusConfig.Icon;

  const formatDate = (date: Date) => {
    const today = new Date();
    const orderDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hari ini';
    if (diffDays === 2) return 'Kemarin';
    if (diffDays <= 7) return `${diffDays - 1} hari lalu`;
    if (diffDays <= 30) return `${Math.ceil((diffDays - 1) / 7)} minggu lalu`;
    return orderDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="order-item-group relative overflow-hidden rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6f4e37]/30 hover:shadow-lg hover:shadow-[#8b5e3c]/15">
      <div className="order-item-group-hover:opacity-100 absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/8 via-transparent to-[#d2bba3]/8 opacity-0 transition-opacity duration-300" />
      <div
        className={`absolute top-0 left-0 h-full w-1 rounded-r-full transition-all duration-300 ${statusConfig.bgColor} order-item-group-hover:opacity-100 order-item-group-hover:w-1.5 opacity-60`}
      />

      <div className="relative flex flex-col justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-0">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <div className="group/icon order-item-group-hover:scale-110 order-item-group-hover:shadow-md rounded-lg bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10 p-2 transition-all duration-300">
              <CreditCard className="order-item-group-hover:rotate-6 h-4 w-4 text-[#6f4e37] transition-transform duration-300" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-bold text-transparent">
                #{order.id}
              </span>
              <div className="text-xs font-medium text-[#8c7158]/70">
                {formatDate(order.date)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="order-item-group-hover:text-[#5d4130] flex items-center gap-2 text-base font-semibold text-[#6f4e37] transition-colors duration-300">
              <div className="rounded-full bg-[#6f4e37]/10 p-1">
                <User className="h-3 w-3" />
              </div>
              {order.customer}
            </div>
            <div className="flex items-center gap-4 text-sm text-[#8c7158]">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="font-medium">{order.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Coffee className="h-3 w-3" />
                <span>Kasir: {order.cashier}</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#e6d9c9]/30 px-2 py-1 text-xs font-medium text-[#6f4e37]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#6f4e37]"></div>
              {order.items} item{order.items > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center lg:gap-3">
          <div className="text-right">
            <div className="order-item-group-hover:scale-105 mb-1 text-2xl font-bold text-[#6f4e37] transition-all duration-300">
              {formatCurrency(order.total)}
            </div>
            <div className="text-xs font-medium text-[#8c7158]/70">
              Total Pembayaran
            </div>
          </div>

          <div
            className={`order-item-group-hover:shadow-md order-item-group-hover:scale-105 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 ${statusConfig.bgColor} ${statusConfig.textColor}`}
            role="status"
            aria-label={`Status pesanan: ${statusConfig.text}`}
          >
            <div
              className={`h-2 w-2 animate-pulse rounded-full ${statusConfig.dot}`}
            ></div>
            <StatusIcon className="h-4 w-4" />
            <span className="font-semibold">{statusConfig.text}</span>
          </div>
        </div>
      </div>

      <div className="order-item-group-hover:opacity-100 absolute inset-0 rounded-xl bg-gradient-to-br from-[#6f4e37]/5 via-transparent to-[#8b5e3c]/5 opacity-0 transition-all duration-300" />
      <div className="order-item-group-hover:translate-x-full absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
    </div>
  );
};

export default OrderItem;
