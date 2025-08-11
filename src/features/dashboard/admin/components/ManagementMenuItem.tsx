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

const ManagementMenuItem = ({ item }: IManagementMenuItemProps) => {
  const { Edit, Trash2 } = lucideIcons;

  return (
    <div
      className={`rounded-lg border border-[#e6d9c9] p-4 md:p-6 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Header with Image and Basic Info */}
        <div className="mb-4 flex items-start gap-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
              onError={e => {
                e.currentTarget.src = 'https://via.placeholder.com/64';
              }}
            />
          ) : (
            <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200" />
          )}

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 text-base leading-tight font-bold text-[#6f4e37]">
              {item.name}
            </h3>
            <p className="mb-2 text-sm text-[#8c7158]">{item.category}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="px-3 text-xs"
                aria-label="Edit item"
              >
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 text-xs text-red-500 hover:text-red-700"
                aria-label="Delete item"
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Hapus
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <div>
            <div className="mb-1 text-xs text-[#8c7158]">Harga Jual</div>
            <div className="text-sm font-semibold break-words text-[#6f4e37]">
              {formatCurrency(item.price ?? 0)}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-[#8c7158]">HPP</div>
            <div className="text-sm font-medium break-words">
              {formatCurrency(item.cost ?? 0)}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-[#8c7158]">Profit</div>
            <div className="text-sm font-semibold break-words text-green-600">
              {formatCurrency(item.profit ?? 0)}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-[#8c7158]">Stok</div>
            <div className="text-sm font-medium">
              {item.stock?.toLocaleString() ?? 0}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-[#8c7158]">Terjual</div>
            <div className="text-sm font-medium">
              {item.sold?.toLocaleString() ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-center gap-3 xl:gap-6">
          {/* Product Info - responsive columns */}
          <div className="col-span-12 flex items-center gap-3 lg:col-span-4 xl:col-span-4">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 flex-shrink-0 rounded-md object-cover lg:h-16 lg:w-16"
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/64';
                }}
              />
            ) : (
              <div className="h-14 w-14 flex-shrink-0 rounded-md bg-gray-200 lg:h-16 lg:w-16" />
            )}

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-sm leading-tight font-bold break-words text-[#6f4e37] lg:text-base">
                {item.name}
              </h3>
              <p className="text-xs break-words text-[#8c7158] lg:text-sm">
                {item.category}
              </p>
            </div>
          </div>

          {/* Stats Grid for tablet/desktop */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-5 gap-2 lg:gap-4">
              <div>
                <div className="mb-1 text-xs text-[#8c7158]">Harga Jual</div>
                <div className="text-xs font-semibold break-words text-[#6f4e37] lg:text-sm">
                  {formatCurrency(item.price ?? 0)}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#8c7158]">HPP</div>
                <div className="text-xs font-medium break-words lg:text-sm">
                  {formatCurrency(item.cost ?? 0)}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#8c7158]">Profit</div>
                <div className="text-xs font-semibold break-words text-green-600 lg:text-sm">
                  {formatCurrency(item.profit ?? 0)}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#8c7158]">Stok</div>
                <div className="text-xs font-medium lg:text-sm">
                  {item.stock?.toLocaleString() ?? 0}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#8c7158]">Terjual</div>
                <div className="text-xs font-medium lg:text-sm">
                  {item.sold?.toLocaleString() ?? 0}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-12 flex items-center justify-center gap-2 lg:col-span-2 lg:justify-end xl:col-span-2">
            <Button
              variant="outline"
              size="sm"
              className="px-3 text-xs lg:px-4 lg:text-sm"
              aria-label="Edit item"
            >
              <Edit className="h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3 text-xs text-red-500 hover:text-red-700 lg:px-4 lg:text-sm"
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
