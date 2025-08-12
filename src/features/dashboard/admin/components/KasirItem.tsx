import { formatCurrency } from '@/utils/formatCurrency';
import { lucideIcons } from '@/icon/lucide-react-icons';

const { Coffee, Clock, Users, TrendingUp } = lucideIcons;

const configs = {
  Aktif: {
    bgColor: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
    textColor: 'text-white',
    text: 'Aktif',
    dot: 'bg-[#6f4e37]',
  },
  Off: {
    bgColor: 'bg-gradient-to-r from-[#8c7158] to-[#a08b7a]',
    textColor: 'text-white',
    text: 'Off',
    dot: 'bg-[#8c7158]',
  },
};

type KasirStatus = keyof typeof configs;

const getKasirStatusConfig = (status: KasirStatus) => {
  return configs[status] || configs['Off'];
};

interface KasirItemProps {
  kasir: {
    id: number;
    name: string;
    role: string;
    shift: string;
    todaySales: number;
    orders: number;
    status: KasirStatus;
  };
}

const KasirItem = ({ kasir }: KasirItemProps) => {
  const statusConfig = getKasirStatusConfig(kasir.status);

  return (
    <div className="staff-item-group relative overflow-hidden rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6f4e37]/30 hover:shadow-lg hover:shadow-[#8b5e3c]/15">
      {/* Animated background pattern */}
      <div className="staff-item-group-hover:opacity-100 absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/8 via-transparent to-[#d2bba3]/8 opacity-0 transition-opacity duration-300" />

      {/* Left border accent */}
      <div
        className={`absolute top-0 left-0 h-full w-1 rounded-r-full transition-all duration-300 ${statusConfig.bgColor} staff-item-group-hover:opacity-100 staff-item-group-hover:w-1.5 opacity-60`}
      />

      <div className="relative flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-4">
            <div className="group/avatar relative">
              <div className="staff-item-group-hover:scale-110 staff-item-group-hover:shadow-lg rounded-full bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10 p-3 transition-all duration-300">
                <Users className="staff-item-group-hover:rotate-12 h-5 w-5 text-[#6f4e37] transition-transform duration-300" />
              </div>
              {/* Status indicator dot */}
              <div
                className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${statusConfig.dot} staff-item-group-hover:scale-125 transition-all duration-300`}
              ></div>
            </div>
            <div>
              <h4 className="staff-item-group-hover:from-[#5d4130] staff-item-group-hover:to-[#7a5033] bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-bold text-transparent transition-all duration-300">
                {kasir.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-[#8c7158]">
                <div className="rounded-full bg-[#8c7158]/10 p-1">
                  <Coffee className="h-3 w-3" />
                </div>
                <span className="font-medium">{kasir.role}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#8c7158]">
            <div className="rounded-full bg-[#6f4e37]/10 p-1">
              <Clock className="h-3 w-3" />
            </div>
            <span className="font-medium">Shift: {kasir.shift}</span>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-end md:gap-3">
          <div className="text-right">
            <div className="staff-item-group-hover:scale-105 text-2xl font-bold text-[#6f4e37] transition-all duration-300">
              {formatCurrency(kasir.todaySales)}
            </div>
            <div className="mb-2 text-xs font-medium text-[#8c7158]/70">
              Penjualan Hari Ini
            </div>
            <div className="flex items-center justify-end gap-2 text-sm font-medium text-[#8c7158]">
              <div className="rounded-full bg-[#8b5e3c]/10 p-1">
                <TrendingUp className="h-3 w-3" />
              </div>
              <span>{kasir.orders} pesanan</span>
            </div>
          </div>

          <div
            className={`staff-item-group-hover:shadow-md staff-item-group-hover:scale-105 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 ${statusConfig.bgColor} ${statusConfig.textColor} md:mt-0`}
          >
            <div
              className={`h-2 w-2 animate-pulse rounded-full ${statusConfig.dot}`}
            ></div>
            <span className="font-semibold">{statusConfig.text}</span>
          </div>
        </div>
      </div>

      {/* Sophisticated hover effect overlay */}
      <div className="staff-item-group-hover:opacity-100 absolute inset-0 rounded-xl bg-gradient-to-br from-[#6f4e37]/5 via-transparent to-[#8b5e3c]/5 opacity-0 transition-all duration-300" />

      {/* Subtle shimmer effect */}
      <div className="staff-item-group-hover:translate-x-full absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
    </div>
  );
};

export default KasirItem;
