import {
  CHILDREN_SHADOW_CARD_STYLE,
  TEXT_COLORS,
  CARD_STYLES,
  SHADOW_CARD_STYLE,
} from '@/constants/Style';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { getStatusConfig } from '@/features/dashboard/admin/constant/StatusConfig';
import type React from 'react';

interface StaffCardProps {
  staff: {
    id: number;
    name: string;
    role: string;
    shift: string;
    status: string;
    avatar?: string;
    todaySales?: number;
    orders?: number;
    clockIn?: string | null;
    lastActivity?: string | null;
    leaveType?: string;
    leaveReason?: string;
    leaveDate?: string;
    expectedReturn?: string;
    performance?: number;
  };
}

const StaffCard = ({ staff }: StaffCardProps) => {
  const { Clock, TrendingUp, Calendar } = lucideIcons;

  const statusConfig = getStatusConfig(staff.status);
  const isOnLeave = ['sick', 'leave', 'permit'].includes(staff.status);
  const isActive = staff.status === 'active';

  return (
    <div className="group relative">
      {/* Hover glow effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#6f4e37]/20 to-[#8b5e3c]/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>

      <div
        className={`relative ${CARD_STYLES} rounded-xl p-5 ${CHILDREN_SHADOW_CARD_STYLE} transition-all duration-300 group-hover:border-[#6f4e37]/40 hover:shadow-xl`}
      >
        {/* Header with Avatar and Status */}
        <div className="mb-4 flex items-start gap-4">
          <div className="relative">
            {/* Avatar with ring */}
            <div
              className={`h-14 w-14 rounded-full ring-4 ${statusConfig.ringColor} overflow-hidden`}
            >
              <img
                src={staff.avatar}
                alt={staff.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={e => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}&background=6f4e37&color=fff&size=128`;
                }}
              />
            </div>

            {/* Status indicator dot */}
            <div
              className={`absolute -right-0.5 -bottom-0.5 h-5 w-5 ${statusConfig.dot} rounded-full border-2 border-white shadow-sm`}
            ></div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between">
              <h4
                className={`text-lg font-bold ${TEXT_COLORS.primary} truncate transition-colors group-hover:text-[#8b5e3c]`}
              >
                {staff.name}
              </h4>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.textColor} shadow-sm`}
              >
                {statusConfig.text}
              </div>
            </div>

            <div
              className={`flex items-center gap-2 text-sm ${TEXT_COLORS.secondary} mb-2`}
            >
              <span className="font-medium">{staff.role}</span>
              <span className="h-1 w-1 rounded-full bg-[#8c7158]"></span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {staff.shift}
              </span>
            </div>

            {/* Clock in info for active users */}
            {isActive && staff.clockIn && (
              <div
                className={`flex items-center gap-4 text-xs ${TEXT_COLORS.secondary}`}
              >
                <span>
                  Masuk:{' '}
                  <span className="font-medium text-[#6f4e37]">
                    {staff.clockIn}
                  </span>
                </span>
                <span>
                  Terakhir:{' '}
                  <span className="font-medium">{staff.lastActivity}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content based on status */}
        {isOnLeave ? (
          // Leave Information
          <div className="rounded-lg border border-[#e6d9c9] bg-gradient-to-br from-[#e6d9c9]/30 to-[#d2bba3]/20 p-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 ${statusConfig.bgColor} rounded-lg shadow-sm`}
              >
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div
                  className={`text-sm font-semibold ${TEXT_COLORS.primary} mb-1`}
                >
                  {staff.leaveReason}
                </div>
                <div className={`text-xs ${TEXT_COLORS.secondary}`}>
                  Kembali:{' '}
                  <span className={`font-medium ${TEXT_COLORS.primary}`}>
                    {staff.expectedReturn
                      ? new Date(staff.expectedReturn).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Performance Stats
          <div className="space-y-4">
            {/* Sales and Orders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#e6d9c9] bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/5 p-4">
                <div
                  className={`text-xs font-medium ${TEXT_COLORS.secondary} mb-1 tracking-wide uppercase`}
                >
                  Penjualan Hari Ini
                </div>
                <div className={`text-xl font-bold ${TEXT_COLORS.primary}`}>
                  {formatCurrency(staff.todaySales ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-[#e6d9c9] bg-gradient-to-br from-[#8c7158]/10 to-[#a08b7a]/5 p-4">
                <div
                  className={`text-xs font-medium ${TEXT_COLORS.secondary} mb-1 tracking-wide uppercase`}
                >
                  Total Pesanan
                </div>
                <div className={`text-xl font-bold ${TEXT_COLORS.primary}`}>
                  {staff.orders ?? 0}
                </div>
              </div>
            </div>

            {/* Performance bar - only for active users */}
            {isActive && (
              <div className="rounded-lg border border-[#e6d9c9] bg-gradient-to-br from-[#d2bba3]/20 to-[#e6d9c9]/10 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-4 w-4 ${TEXT_COLORS.primary}`} />
                    <span
                      className={`text-xs font-medium ${TEXT_COLORS.secondary} tracking-wide uppercase`}
                    >
                      Performa
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${TEXT_COLORS.primary}`}>
                    {staff.performance ?? 0}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-[#e6d9c9]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] shadow-sm transition-all duration-1000"
                    style={{ width: `${staff.performance ?? 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface KasirCardProps {
  title: string;
  staffList: {
    staff: {
      id: number;
      name: string;
      role: string;
      shift: string;
      status: string;
      avatar?: string;
      todaySales?: number;
      orders?: number;
      clockIn?: string | null;
      lastActivity?: string | null;
      leaveType?: string;
      leaveReason?: string;
      leaveDate?: string;
      expectedReturn?: string;
      performance?: number;
    };
  }[];
  showAddButton?: boolean;
  onAddClick?: () => void;
  icon?: React.ReactNode;
  headerColor?: string;
  addButtonText?: string;
}

const KasirCard = ({
  title,
  staffList,
  showAddButton = false,
  onAddClick,
  icon,
  headerColor = 'from-[#6f4e37] to-[#5d4130]',
  addButtonText = 'Tambah',
}: KasirCardProps) => {
  const { UserPlus } = lucideIcons;

  return (
    <div className="group relative">
      {/* Card glow effect */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#6f4e37]/10 to-[#8b5e3c]/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>

      <div
        className={`relative ${CARD_STYLES} rounded-2xl ${SHADOW_CARD_STYLE} overflow-hidden transition-all duration-300 group-hover:border-[#6f4e37]/30 hover:shadow-2xl`}
      >
        {/* Enhanced Header */}
        <div className={`bg-gradient-to-r ${headerColor} p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {icon && (
                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">{title}</h3>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                    {staffList.length} Orang
                  </div>
                </div>
              </div>
            </div>

            {showAddButton && (
              <Button
                onClick={onAddClick}
                className="border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
                variant="outline"
                size="sm"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {staffList.length > 0 ? (
            <div className="space-y-4">
              {staffList.map(({ staff }) => (
                <StaffCard key={staff.id} staff={staff} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6d9c9]/50 to-[#d2bba3]/30">
                <UserPlus className={`h-8 w-8 ${TEXT_COLORS.secondary}`} />
              </div>
              <div
                className={`text-lg font-semibold ${TEXT_COLORS.primary} mb-2`}
              >
                Belum Ada Data
              </div>
              <div className={`text-sm ${TEXT_COLORS.secondary}`}>
                {addButtonText} untuk memulai
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KasirCard;
