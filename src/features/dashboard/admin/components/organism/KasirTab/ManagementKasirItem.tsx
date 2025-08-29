import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { CHILDREN_SHADOW_CARD_STYLE } from '@/constants/Style';
import type { Kasir } from '../../../types/kasir';

interface IManagementKasirItemProps {
  kasir: Kasir;
}

const getStatusConfig = (isActive: boolean) => {
  if (isActive) {
    return {
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-400',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }

  return {
    bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
    textColor: 'text-white',
    text: 'Tidak Aktif',
    dot: 'bg-gray-400',
    badge: 'bg-gray-50 text-gray-600 border-gray-200',
  };
};

const ManagementKasirItem = ({ kasir }: IManagementKasirItemProps) => {
  const { Edit, Trash2, Clock, RefreshCcw } = lucideIcons;
  const statusConfig = getStatusConfig(kasir.isActive);

  return (
    <div
      className={`group rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-3 shadow-sm transition-all duration-300 hover:border-[#6f4e37]/20 hover:shadow-lg sm:p-4 md:p-5 lg:p-6 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Header with Avatar and Basic Info */}
        <div className="mb-4 flex items-start gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={
                kasir.profilePicture ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(kasir.name)}&background=6f4e37&color=fff&size=128&bold=true`
              }
              alt={kasir.name}
              className="h-16 w-16 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30 sm:h-20 sm:w-20 md:h-24 md:w-24"
              onError={e => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(kasir.name)}&background=6f4e37&color=fff&size=128&bold=true`;
              }}
            />
            {/* Status Badge */}
            <div
              className={`absolute -top-2 -right-2 rounded-full px-2 py-1 text-xs font-medium shadow-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}
            >
              <div
                className={`mr-1 inline-block h-2 w-2 rounded-full ${statusConfig.dot}`}
              ></div>
              {statusConfig.text}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-base font-bold text-transparent sm:text-lg md:text-xl">
              {kasir.name}
            </h3>
            <p className="mb-1 text-xs font-medium text-[#8c7158] sm:text-sm md:text-base">
              {kasir.role.toLocaleLowerCase()}
            </p>
            <div className="mb-2 flex items-center text-xs text-[#8c7158] sm:text-sm">
              <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              {kasir.kasirProfile.shiftStart} - {kasir.kasirProfile.shiftEnd}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#6f4e37]/20 px-3 text-xs text-[#6f4e37] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white sm:px-4 sm:text-sm"
                aria-label="Edit kasir"
              >
                <Edit className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 px-3 text-xs text-red-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white sm:px-4 sm:text-sm"
                aria-label="Delete kasir"
              >
                <Trash2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Hapus
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg"
                aria-label="Delete kasir"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              Penjualan Hari Ini
            </div>
            <div className="text-xs font-bold text-[#6f4e37] sm:text-sm">
              {formatCurrency(kasir.kasirProfile.todaySales ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              Order Hari Ini
            </div>
            <div className="text-xs font-semibold text-blue-600 sm:text-sm">
              {kasir.kasirProfile.todayOrder.toLocaleString() ?? 0}
            </div>
          </div>
          <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              Total Order
            </div>
            <div className="text-xs font-semibold text-purple-600 sm:text-sm">
              {kasir.kasirProfile.totalOrder.toLocaleString() ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-center gap-4 lg:gap-6 xl:gap-8">
          {/* Kasir Info */}
          <div className="col-span-12 flex items-center gap-4 lg:col-span-4 xl:col-span-4">
            <div className="relative flex-shrink-0">
              <img
                src={
                  kasir.profilePicture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(kasir.name)}&background=6f4e37&color=fff&size=128&bold=true`
                }
                alt={kasir.name}
                className="h-20 w-20 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30 xl:h-24 xl:w-24"
                onError={e => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(kasir.name)}&background=6f4e37&color=fff&size=128&bold=true`;
                }}
              />
              {/* Status Badge */}
              <div
                className={`absolute -top-2 -right-2 rounded-full px-2 py-1 text-xs font-medium shadow-sm ${statusConfig.bgColor} ${statusConfig.textColor} xl:text-sm`}
              >
                <div
                  className={`mr-1 inline-block h-2 w-2 rounded-full ${statusConfig.dot}`}
                ></div>
                {statusConfig.text}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-bold text-transparent xl:text-xl">
                {kasir.name}
              </h3>
              <p className="mb-1 text-sm font-medium text-[#8c7158] xl:text-base">
                {kasir.role}
              </p>
              <div className="flex items-center text-sm text-[#8c7158] xl:text-base">
                <Clock className="mr-1 h-4 w-4" />
                {kasir.kasirProfile.shiftStart} - {kasir.kasirProfile.shiftEnd}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5">
            <div className="grid grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
              <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-3 xl:p-4">
                <div className="mb-1 flex items-center text-xs font-medium whitespace-nowrap text-[#8c7158] xl:text-sm">
                  Penjualan Hari Ini
                </div>
                <div className="text-sm font-bold text-[#6f4e37] xl:text-base">
                  {formatCurrency(kasir.kasirProfile.todaySales ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-3 xl:p-4">
                <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] xl:text-sm">
                  Order Hari Ini
                </div>
                <div className="text-sm font-semibold text-blue-600 xl:text-base">
                  {kasir.kasirProfile.todayOrder?.toLocaleString() ?? 0}
                </div>
              </div>

              <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-3 xl:p-4">
                <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] xl:text-sm">
                  Total Order
                </div>
                <div className="text-sm font-semibold text-purple-600 xl:text-base">
                  {kasir.kasirProfile.totalOrder?.toLocaleString() ?? 0}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="gap-4:col-span-3 col-span-12 flex w-full items-center justify-between xl:col-span-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/20 px-4 text-xs text-[#6f4e37] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white hover:shadow-md xl:px-6 xl:text-sm"
              aria-label="Edit kasir"
            >
              <Edit className="h-4 w-4 xl:mr-2" />
              <span className="hidden xl:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 px-4 text-xs text-red-600 shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-md xl:px-6 xl:text-sm"
              aria-label="Delete kasir"
            >
              <Trash2 className="h-4 w-4 xl:mr-2" />
              <span className="hidden xl:inline">Hapus</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg"
              aria-label="Delete kasir"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementKasirItem;
