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
      className={`group rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:border-[#6f4e37]/20 hover:shadow-lg md:p-6 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Header with Image and Basic Info */}
        <div className="mb-6 flex items-start gap-4">
          <div className="relative">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-18 w-18 flex-shrink-0 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30"
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/72';
                }}
              />
            ) : (
              <div className="h-18 w-18 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md ring-2 ring-[#e6d9c9]/30" />
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
            <h3 className="mb-1 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-bold text-transparent">
              {item.name}
            </h3>
            <p className="mb-3 text-sm font-medium text-[#8c7158]">
              {item.category}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#6f4e37]/20 px-4 text-xs text-[#6f4e37] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white"
                aria-label="Edit item"
              >
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 px-4 text-xs text-red-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white"
                aria-label="Delete item"
              >
                <Trash2 className="mr-2 h-3 w-3" />
                Hapus
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-3">
            <div className="mb-2 flex items-center text-xs font-medium text-[#8c7158]">
              <TrendingUp className="mr-1 h-3 w-3" />
              Harga Jual
            </div>
            <div className="text-sm font-bold text-[#6f4e37]">
              {formatCurrency(item.price ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100 p-3">
            <div className="mb-2 text-xs font-medium text-[#8c7158]">HPP</div>
            <div className="text-sm font-semibold text-gray-700">
              {formatCurrency(item.cost ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3">
            <div className="mb-2 text-xs font-medium text-[#8c7158]">
              Profit
            </div>
            <div className="text-sm font-bold text-emerald-600">
              {formatCurrency(item.profit ?? 0)}
            </div>
          </div>
          <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-3">
            <div className="mb-2 flex items-center text-xs font-medium text-[#8c7158]">
              <Package className="mr-1 h-3 w-3" />
              Stok
            </div>
            <div className="text-sm font-semibold text-blue-600">
              {item.stock?.toLocaleString() ?? 0}
            </div>
          </div>
          <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-3">
            <div className="mb-2 flex items-center text-xs font-medium text-[#8c7158]">
              <ShoppingCart className="mr-1 h-3 w-3" />
              Terjual
            </div>
            <div className="text-sm font-semibold text-purple-600">
              {item.sold?.toLocaleString() ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-center gap-3 xl:gap-6">
          {/* Product Info */}
          <div className="col-span-12 flex items-center gap-4 lg:col-span-4 xl:col-span-4">
            <div className="relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover shadow-md ring-2 ring-[#e6d9c9]/30 lg:h-20 lg:w-20"
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/80';
                  }}
                />
              ) : (
                <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md ring-2 ring-[#e6d9c9]/30 lg:h-20 lg:w-20" />
              )}
              {/* Status Badge */}
              <div
                className={`absolute -top-1 -right-1 rounded-full px-2 py-1 text-xs font-medium shadow-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                <div
                  className={`mr-1 inline-block h-2 w-2 rounded-full ${statusConfig.dot}`}
                ></div>
                {statusConfig.text}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-base font-bold text-transparent lg:text-lg">
                {item.name}
              </h3>
              <p className="text-sm font-medium text-[#8c7158] lg:text-base">
                {item.category}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-5 gap-3 lg:gap-4">
              <div className="rounded-lg border border-[#6f4e37]/10 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-3">
                <div className="mb-1 text-xs font-medium text-[#8c7158]">
                  Harga Jual
                </div>
                <div className="text-xs font-bold text-[#6f4e37] lg:text-sm">
                  {formatCurrency(item.price ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100 p-3">
                <div className="mb-1 text-xs font-medium text-[#8c7158]">
                  HPP
                </div>
                <div className="text-xs font-semibold text-gray-700 lg:text-sm">
                  {formatCurrency(item.cost ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3">
                <div className="mb-1 text-xs font-medium text-[#8c7158]">
                  Profit
                </div>
                <div className="text-xs font-bold text-emerald-600 lg:text-sm">
                  {formatCurrency(item.profit ?? 0)}
                </div>
              </div>

              <div className="rounded-lg border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-3">
                <div className="mb-1 text-xs font-medium text-[#8c7158]">
                  Stok
                </div>
                <div className="text-xs font-semibold text-blue-600 lg:text-sm">
                  {item.stock?.toLocaleString() ?? 0}
                </div>
              </div>

              <div className="rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-50 to-purple-100 p-3">
                <div className="mb-1 text-xs font-medium text-[#8c7158]">
                  Terjual
                </div>
                <div className="text-xs font-semibold text-purple-600 lg:text-sm">
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
              className="border-[#6f4e37]/20 px-4 text-xs text-[#6f4e37] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white hover:shadow-md lg:px-6 lg:text-sm"
              aria-label="Edit item"
            >
              <Edit className="h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 px-4 text-xs text-red-600 shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-md lg:px-6 lg:text-sm"
              aria-label="Delete item"
            >
              <Trash2 className="h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Hapus</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementMenuItem;
