import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { CHILDREN_SHADOW_CARD_STYLE } from '@/constants/Style';

interface IManagementMenuItemProps {
  item: {
    id: number;
    name: string;
    category: string;
    price: number;
    cost: number;
    stock: number;
    sold: number;
    profit: number;
    status: string;
    image: string;
  };
}

const getStatusConfig = (status: string) => {
  const configs = {
    Aktif: {
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-500',
      ringColor: 'ring-emerald-500/20',
    },
    'Tidak Aktif': {
      bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
      textColor: 'text-white',
      text: 'Tidak Aktif',
      dot: 'bg-gray-400',
      ringColor: 'ring-gray-400/20',
    },
  };

  return configs[status as keyof typeof configs] || configs.Aktif;
};

const ManagementMenuItem = ({ item }: IManagementMenuItemProps) => {
  const { Edit, Trash2, TrendingUp, Package, ShoppingCart } = lucideIcons;
  const statusConfig = getStatusConfig(item.status);

  return (
    <div
      className={`group rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-3 shadow-sm transition-all duration-300 hover:border-[#6f4e37]/20 hover:shadow-lg sm:p-4 md:p-5 lg:p-6 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Header with Image and Basic Info */}
        <div className="mb-4 flex items-start gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30 sm:h-20 sm:w-20 md:h-24 md:w-24"
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/96';
                }}
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md ring-2 ring-[#e6d9c9]/30 sm:h-20 sm:w-20 md:h-24 md:w-24" />
            )}
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
              {item.name}
            </h3>
            <p className="mb-2 text-xs font-medium text-[#8c7158] sm:text-sm md:text-base">
              {item.category}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#6f4e37]/20 px-3 text-xs text-[#6f4e37] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white sm:px-4 sm:text-sm"
                aria-label="Edit item"
              >
                <Edit className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 px-3 text-xs text-red-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white sm:px-4 sm:text-sm"
                aria-label="Delete item"
              >
                <Trash2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Hapus
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              Harga Jual
            </div>
            <div className="text-xs font-bold text-[#6f4e37] sm:text-sm">
              {formatCurrency(item.price ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3">
            <div className="mb-1 text-xs font-medium text-[#8c7158] sm:text-sm">
              HPP
            </div>
            <div className="text-xs font-semibold text-gray-700 sm:text-sm">
              {formatCurrency(item.cost ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100 p-2 sm:p-3">
            <div className="mb-1 text-xs font-medium text-[#8c7158] sm:text-sm">
              Profit
            </div>
            <div className="text-xs font-bold text-emerald-600 sm:text-sm">
              {formatCurrency(item.profit ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              <Package className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              Stok
            </div>
            <div className="text-xs font-semibold text-blue-600 sm:text-sm">
              {item.stock?.toLocaleString() ?? 0}
            </div>
          </div>
          <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-2 sm:p-3">
            <div className="mb-1 flex items-center text-xs font-medium text-[#8c7158] sm:text-sm">
              <ShoppingCart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              Terjual
            </div>
            <div className="text-xs font-semibold text-purple-600 sm:text-sm">
              {item.sold?.toLocaleString() ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-center gap-4 lg:gap-6 xl:gap-8">
          {/* Product Info */}
          <div className="col-span-12 flex items-center gap-4 lg:col-span-4 xl:col-span-3">
            <div className="relative flex-shrink-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30 xl:h-24 xl:w-24"
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/96';
                  }}
                />
              ) : (
                <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md ring-2 ring-[#e6d9c9]/30 xl:h-24 xl:w-24" />
              )}
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
                {item.name}
              </h3>
              <p className="text-sm font-medium text-[#8c7158] xl:text-base">
                {item.category}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7">
            <div className="grid grid-cols-5 gap-3 lg:gap-4 xl:gap-6">
              <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-3 xl:p-4">
                <div className="mb-1 text-xs font-medium text-[#8c7158] xl:text-sm">
                  Harga Jual
                </div>
                <div className="text-sm font-bold text-[#6f4e37] xl:text-base">
                  {formatCurrency(item.price ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100 p-3 xl:p-4">
                <div className="mb-1 text-xs font-medium text-[#8c7158] xl:text-sm">
                  HPP
                </div>
                <div className="text-sm font-semibold text-gray-700 xl:text-base">
                  {formatCurrency(item.cost ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 xl:p-4">
                <div className="mb-1 text-xs font-medium text-[#8c7158] xl:text-sm">
                  Profit
                </div>
                <div className="text-sm font-bold text-emerald-600 xl:text-base">
                  {formatCurrency(item.profit ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-3 xl:p-4">
                <div className="mb-1 text-xs font-medium text-[#8c7158] xl:text-sm">
                  Stok
                </div>
                <div className="text-sm font-semibold text-blue-600 xl:text-base">
                  {item.stock?.toLocaleString() ?? 0}
                </div>
              </div>

              <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-3 xl:p-4">
                <div className="mb-1 text-xs font-medium text-[#8c7158] xl:text-sm">
                  Terjual
                </div>
                <div className="text-sm font-semibold text-purple-600 xl:text-base">
                  {item.sold?.toLocaleString() ?? 0}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-12 flex items-center justify-center gap-3 lg:col-span-2 lg:justify-end xl:col-span-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/20 px-4 text-xs text-[#6f4e37] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white hover:shadow-md xl:px-6 xl:text-sm"
              aria-label="Edit item"
            >
              <Edit className="h-4 w-4 xl:mr-2" />
              <span className="hidden xl:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 px-4 text-xs text-red-600 shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-md xl:px-6 xl:text-sm"
              aria-label="Delete item"
            >
              <Trash2 className="h-4 w-4 xl:mr-2" />
              <span className="hidden xl:inline">Hapus</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementMenuItem;
