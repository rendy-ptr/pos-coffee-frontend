import { Button } from '@/components/ui/button';
import { TEXT_COLORS, BUTTON_STYLES } from '../constant/Style';
import type { FavoriteType } from '../mocks/favorite';

interface FavoriteItemCustomerProps {
  item: FavoriteType;
}

const FavoriteItemCustomer = ({ item }: FavoriteItemCustomerProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e6d9c9]">
      <img
        src={item.image || '/placeholder.svg'}
        alt={item.name}
        width={300}
        height={200}
        className="h-24 w-full object-cover md:h-32"
      />
      <div className="p-3 md:p-4">
        <h3 className={`mb-1 text-sm ${TEXT_COLORS.bold} md:text-base`}>
          {item.name}
        </h3>
        <p className={`mb-2 text-xs ${TEXT_COLORS.secondary} md:text-sm`}>
          Dipesan {item.orderCount} kali
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${TEXT_COLORS.bold} md:text-base`}>
            {item.price}
          </span>
          <Button
            size="sm"
            className={`${BUTTON_STYLES} px-2 text-xs md:px-4 md:text-sm`}
          >
            Pesan Lagi
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FavoriteItemCustomer;
