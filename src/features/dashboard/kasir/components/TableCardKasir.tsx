// LOCAL-IMPORTS
import {
  CARD_ITEM_STYLES,
  TEXT_COLORS,
  BUTTON_STYLES,
} from '@/features/dashboard/kasir/constant/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';

// THIRD-PARTY
const { CheckCircle, Utensils, Clock, HelpCircle, TimerReset } = lucideIcons;

// TYPES
import type { ITableList } from '@/types/kasir/tablelist';
import type React from 'react';

// DEFINE PROPS INTERFACE
interface ITableCardProps {
  table: ITableList;
}

const STATUS_STYLES: Record<
  string,
  { label: string; icon: React.ReactNode; badge: string }
> = {
  available: {
    label: 'Tersedia',
    icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    badge: 'bg-green-50 text-green-700',
  },
  occupied: {
    label: 'Terpakai',
    icon: <Utensils className="h-4 w-4 text-red-500" />,
    badge: 'bg-red-50 text-red-700',
  },
  reserved: {
    label: 'Dipesan',
    icon: <Clock className="h-4 w-4 text-yellow-600" />,
    badge: 'bg-yellow-50 text-yellow-700',
  },
  unknown: {
    label: 'Tidak Diketahui',
    icon: <HelpCircle className="h-4 w-4 text-gray-500" />,
    badge: 'bg-gray-100 text-gray-600',
  },
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TableCard = ({ table }: ITableCardProps) => {
  const status = STATUS_STYLES[table.status] || STATUS_STYLES.unknown;

  const buttonLabel =
    table.status === 'available'
      ? 'Mulai Pesanan'
      : table.status === 'occupied'
        ? 'Lihat Pesanan'
        : 'Reservasi';

  return (
    <div
      className={`${CARD_ITEM_STYLES} ${status.badge} flex h-full flex-col justify-between`}
    >
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className={`${TEXT_COLORS.bold} text-base`}>{table.name}</h2>
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${status.badge}`}
          >
            {status.icon}
            <span>{status.label}</span>
          </div>
        </div>

        {/* Info */}
        <p className={`${TEXT_COLORS.secondary} text-sm`}>
          Kapasitas:{' '}
          <span className="font-semibold">{table.capacity} orang</span>
        </p>
      </div>

      {/* Button */}
      <div className="mt-4">
        <button className={`${BUTTON_STYLES} w-full py-1.5 text-sm`}>
          {buttonLabel}
        </button>
        {/* Last updated */}
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <TimerReset className="h-4 w-4" />
          <span>Update: {formatTime(table.lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
};
export default TableCard;
