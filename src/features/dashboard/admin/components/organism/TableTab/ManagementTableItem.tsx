// ManagementTableItem.tsx
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Wrench,
} from 'lucide-react';
import type { Meja } from '../../../types/meja';

interface IManagementTableItemProps {
  mejaItem: Meja;
  onClick: (meja: Meja) => void;
}

const ManagementTableItem = ({
  mejaItem,
  onClick,
}: IManagementTableItemProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          color: 'text-green-700',
          border: 'border-green-200/60',
          icon: CheckCircle,
          label: 'Tersedia',
          gradient: 'from-green-400 to-green-600',
          statusBg: 'bg-green-50/80',
        };
      case 'occupied':
        return {
          color: 'text-blue-700',
          border: 'border-blue-200/60',
          icon: Users,
          label: 'Terisi',
          gradient: 'from-blue-400 to-blue-600',
          statusBg: 'bg-blue-50/80',
        };
      case 'reserved':
        return {
          color: 'text-purple-700',
          border: 'border-purple-200/60',
          icon: Calendar,
          label: 'Direservasi',
          gradient: 'from-purple-400 to-purple-600',
          statusBg: 'bg-purple-50/80',
        };
      case 'maintenance':
        return {
          color: 'text-red-700',
          border: 'border-red-200/60',
          icon: Wrench,
          label: 'Maintenance',
          gradient: 'from-red-400 to-red-600',
          statusBg: 'bg-red-50/80',
        };
      default:
        return {
          color: 'text-[#8c7158]',
          border: 'border-[#e6d9c9]/60',
          icon: AlertTriangle,
          label: 'Unknown',
          gradient: 'from-[#8c7158] to-[#6f4e37]',
          statusBg: 'bg-[#faf9f7]/80',
        };
    }
  };

  const statusConfig = getStatusConfig(mejaItem.status);
  const StatusIcon = statusConfig.icon;

  return (
    <button
      onClick={() => onClick(mejaItem)}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6f4e37]/30 hover:shadow-xl"
    >
      {/* Status Indicator */}
      <div className={`h-1 bg-gradient-to-r ${statusConfig.gradient}`} />

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {/* Header: Meja Number & Status */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f4e37] to-[#8b5e3c] text-base font-bold text-white shadow-lg">
              {mejaItem.number}
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-[#6f4e37]">
                Meja {mejaItem.number}
              </h3>
              <p className="text-xs text-[#8c7158]/70">{mejaItem.location}</p>
            </div>
          </div>

          <div
            className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 ${statusConfig.statusBg} ${statusConfig.border} border backdrop-blur-sm`}
          >
            <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.color}`} />
            <span className={`text-xs font-medium ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#8c7158]/80">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs">Kapasitas</span>
            </div>
            <span className="text-sm font-semibold text-[#6f4e37]">
              {mejaItem.capacity} orang
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[#8c7158]/60">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">
              Terakhir dibersihkan: {mejaItem.lastCleaned}
            </span>
          </div>
        </div>
      </div>

      {/* Coffee Theme Hover Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#6f4e37]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
};

export default ManagementTableItem;
