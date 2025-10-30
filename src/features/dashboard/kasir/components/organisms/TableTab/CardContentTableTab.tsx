import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatDateForDisplay } from '@/utils/formatDate';

import type { IBaseTable } from '../../../types/table';
import { CardContent } from '@/components/ui/card';

interface ICardContentTableTabProps {
  filteredItems: IBaseTable[];
  onClick: (table: IBaseTable) => void;
}

const CardContentTableTab = ({
  filteredItems,
  onClick,
}: ICardContentTableTabProps) => {
  const { CheckCircle, Users, Calendar, Wrench, AlertTriangle, Search } =
    lucideIcons;
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'text-green-700',
          border: 'border-green-200/60',
          icon: CheckCircle,
          label: 'Tersedia',
          gradient: 'from-green-400 to-green-600',
          statusBg: 'bg-green-50/80',
        };
      case 'OCCUPIED':
        return {
          color: 'text-blue-700',
          border: 'border-blue-200/60',
          icon: Users,
          label: 'Terisi',
          gradient: 'from-blue-400 to-blue-600',
          statusBg: 'bg-blue-50/80',
        };
      case 'RESERVED':
        return {
          color: 'text-purple-700',
          border: 'border-purple-200/60',
          icon: Calendar,
          label: 'Direservasi',
          gradient: 'from-purple-400 to-purple-600',
          statusBg: 'bg-purple-50/80',
        };
      case 'MAINTENANCE':
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

  return (
    <CardContent className="p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(tableItem => {
            const statusConfig = getStatusConfig(tableItem.status);
            const StatusIcon = statusConfig.icon;
            return (
              <>
                <button
                  onClick={() => onClick(tableItem)}
                  className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6f4e37]/30 hover:shadow-xl"
                >
                  {/* Status Indicator */}
                  <div
                    className={`h-1 bg-gradient-to-r ${statusConfig.gradient}`}
                  />

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    {/* Header: Meja Number & Status */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f4e37] to-[#8b5e3c] text-base font-bold text-white shadow-lg">
                          {tableItem.number}
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-semibold text-[#6f4e37]">
                            Meja {tableItem.number}
                          </h3>
                          <p className="text-xs text-[#8c7158]/70">
                            {tableItem.location}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 ${statusConfig.statusBg} ${statusConfig.border} border backdrop-blur-sm`}
                      >
                        <StatusIcon
                          className={`h-3.5 w-3.5 ${statusConfig.color}`}
                        />
                        <span
                          className={`text-xs font-medium ${statusConfig.color}`}
                        >
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
                          {tableItem.capacity} orang
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-[#8c7158]/60">
                        <span className="text-xs">
                          Terakhir dibersihkan:
                          {formatDateForDisplay(tableItem.lastCleaned)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coffee Theme Hover Effect */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#6f4e37]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center">
            <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
              <Search className="h-8 w-8 text-[#8c7158]/50" />
            </div>
            <p className="mb-2 text-lg font-semibold text-[#6f4e37]">
              Tidak ada meja ditemukan
            </p>
            <p className="max-w-md text-center text-sm text-[#8c7158]/70">
              Coba ubah filter atau kata kunci pencarian untuk menemukan meja
              yang Anda cari.
            </p>
          </div>
        )}
      </div>
    </CardContent>
  );
};
export default CardContentTableTab;
