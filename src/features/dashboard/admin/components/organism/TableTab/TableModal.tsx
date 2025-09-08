import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Users,
  Wrench,
  Edit,
  Trash2,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock Meja type for demonstration
import type { Meja } from '../../../types/meja';

interface ITableModalProps {
  isOpen: boolean;
  onClose: () => void;
  mejaItem: Meja | null;
}

const TableModal = ({ isOpen, onClose, mejaItem }: ITableModalProps) => {
  if (!mejaItem) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          color: 'text-emerald-600',
          bg: 'bg-emerald-50/80',
          border: 'border-emerald-200',
          icon: CheckCircle,
          label: 'Tersedia',
          gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
          glowColor: 'shadow-emerald-500/25',
          ringColor: 'ring-emerald-200',
          pulse: 'animate-pulse',
          description: 'Meja siap untuk digunakan',
        };
      case 'occupied':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50/80',
          border: 'border-blue-200',
          icon: Users,
          label: 'Terisi',
          gradient: 'from-blue-400 via-blue-500 to-blue-600',
          glowColor: 'shadow-blue-500/25',
          ringColor: 'ring-blue-200',
          pulse: '',
          description: 'Sedang digunakan pelanggan',
        };
      case 'reserved':
        return {
          color: 'text-purple-600',
          bg: 'bg-purple-50/80',
          border: 'border-purple-200',
          icon: Calendar,
          label: 'Direservasi',
          gradient: 'from-purple-400 via-purple-500 to-purple-600',
          glowColor: 'shadow-purple-500/25',
          ringColor: 'ring-purple-200',
          pulse: '',
          description: 'Telah dibooking pelanggan',
        };
      case 'maintenance':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50/80',
          border: 'border-red-200',
          icon: Wrench,
          label: 'Maintenance',
          gradient: 'from-red-400 via-red-500 to-red-600',
          glowColor: 'shadow-red-500/25',
          ringColor: 'ring-red-200',
          pulse: 'animate-pulse',
          description: 'Sedang dalam perbaikan',
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-50/80',
          border: 'border-gray-200',
          icon: AlertTriangle,
          label: 'Unknown',
          gradient: 'from-gray-400 via-gray-500 to-gray-600',
          glowColor: 'shadow-gray-500/25',
          ringColor: 'ring-gray-200',
          pulse: '',
          description: 'Status tidak diketahui',
        };
    }
  };

  const statusConfig = getStatusConfig(mejaItem.status);
  const StatusIcon = statusConfig.icon;

  const detailItems = [
    {
      icon: Users,
      label: 'Kapasitas',
      value: `${mejaItem.capacity} orang`,
      description: 'Maksimal tamu',
    },
    {
      icon: User,
      label: 'Tamu saat ini',
      value: `${mejaItem.currentGuests} orang`,
      description: 'Sedang menempati',
    },
    {
      icon: Clock,
      label: 'Terakhir dibersihkan',
      value: mejaItem.lastCleaned,
      description: 'Kebersihan meja',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl">
        {/* Animated Header with Gradient and Sparkles */}
        <div className="relative overflow-hidden">
          <div
            className={`h-2 bg-gradient-to-r ${statusConfig.gradient} ${statusConfig.pulse}`}
          />

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className={`absolute h-3 w-3 animate-bounce text-white/30`}
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 p-6">
          <DialogHeader className="space-y-0 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {/* Enhanced Table Number with Multiple Glows */}
                <div className="group relative">
                  {/* Outer glow */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${statusConfig.gradient} rounded-3xl opacity-20 blur-xl transition-opacity group-hover:opacity-30`}
                  />
                  {/* Inner glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${statusConfig.gradient} rounded-2xl opacity-30 blur-sm`}
                  />
                  {/* Main element */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6f4e37] via-[#8b5e3c] to-[#5d4130] text-2xl font-bold text-white shadow-xl ring-2 ring-white/20">
                    <span className="relative z-10">{mejaItem.number}</span>
                    {/* Inner shine */}
                    <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                </div>

                <div className="space-y-1">
                  <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
                    Meja {mejaItem.number}
                  </DialogTitle>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-gray-600">
                      {mejaItem.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Premium Status Badge */}
          <div
            className={`group relative mb-6 overflow-hidden rounded-xl ${statusConfig.bg} ${statusConfig.border} border backdrop-blur-sm transition-all duration-500 hover:shadow-lg ${statusConfig.glowColor}`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 translate-x-[-100%] -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]" />

            <div className="relative flex items-center space-x-4 p-4">
              <div className="relative">
                <StatusIcon
                  className={`h-7 w-7 ${statusConfig.color} drop-shadow-sm`}
                />
                {statusConfig.pulse && (
                  <div
                    className={`absolute inset-0 h-7 w-7 ${statusConfig.color} rounded-full opacity-30 ${statusConfig.pulse}`}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-lg font-bold ${statusConfig.color} mb-1`}>
                  {statusConfig.label}
                </div>
                <div className="text-sm text-gray-600">
                  {statusConfig.description}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Details Grid */}
          <div className="mb-6 space-y-3">
            {detailItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-amber-200 hover:shadow-md hover:shadow-amber-100/50"
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-100/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 p-2 transition-colors group-hover:from-amber-200 group-hover:to-amber-100">
                      <item.icon className="h-5 w-5 text-amber-700 transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 transition-colors group-hover:text-gray-800">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 transition-transform group-hover:scale-105">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Reservation Info */}
          {mejaItem.status === 'reserved' && mejaItem.reservedBy && (
            <div className="via-purple-25/60 mb-6 transform overflow-hidden rounded-xl border border-purple-200/60 bg-gradient-to-br from-purple-50/80 to-white/40 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/20">
              {/* Animated background */}
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-400/5 via-purple-500/10 to-purple-600/5" />

              <div className="relative p-5">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="rounded-full bg-gradient-to-br from-purple-500 to-purple-600 p-2 shadow-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">
                    Informasi Reservasi
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-purple-100/60 p-3 backdrop-blur-sm">
                    <span className="font-medium text-purple-700">
                      Nama Pemesan
                    </span>
                    <span className="font-bold text-purple-900">
                      {mejaItem.reservedBy}
                    </span>
                  </div>
                  {mejaItem.reservedTime && (
                    <div className="flex items-center justify-between rounded-lg bg-purple-100/60 p-3 backdrop-blur-sm">
                      <span className="font-medium text-purple-700">
                        Waktu Reservasi
                      </span>
                      <span className="font-bold text-purple-900">
                        {mejaItem.reservedTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Premium Action Buttons */}
          <div className="flex space-x-3">
            <button className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#5d4130] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]">
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

              <div className="relative flex items-center justify-center space-x-2">
                <Edit className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>Edit Meja</span>
              </div>
            </button>

            <button className="group relative overflow-hidden rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 px-4 py-4 font-bold text-red-700 transition-all duration-300 hover:scale-[1.02] hover:border-red-300 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]">
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

              <Trash2 className="relative h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Info Footer */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Info className="h-3 w-3" />
            <span>Klik diluar modal untuk menutup</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TableModal;
