import { lucideIcons } from '@/icon/lucide-react-icons';
import { Button } from '@/components/ui/button';
import {
  TEXT_COLORS,
  BUTTON_STYLES,
  CHILDREN_SHADOW_CARD_STYLE,
} from '@/constants/Style';
import type { RewardType } from '@/types/customer/reward';

interface RewardItemCustomerProps {
  reward: RewardType;
  loyaltyPoints: number;
}

const RewardItemCustomer = ({
  reward,
  loyaltyPoints,
}: RewardItemCustomerProps) => {
  const { Star } = lucideIcons;
  return (
    <div
      className={`rounded-lg border border-[#e6d9c9] p-3 md:p-4 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className={`text-sm ${TEXT_COLORS.bold} md:text-base`}>
          {reward.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 md:h-4 md:w-4" />
          <span className={`text-sm ${TEXT_COLORS.bold} md:text-base`}>
            {reward.points}
          </span>
        </div>
      </div>
      <p className={`mb-3 text-xs ${TEXT_COLORS.secondary} md:mb-4 md:text-sm`}>
        {reward.description}
      </p>
      <Button
        className={`w-full text-xs md:text-sm ${
          reward.available && loyaltyPoints >= reward.points
            ? `${BUTTON_STYLES} px-2 md:px-4`
            : 'cursor-not-allowed bg-gray-300'
        }`}
        disabled={!reward.available || loyaltyPoints < reward.points}
      >
        {reward.available && loyaltyPoints >= reward.points
          ? 'Tukar Sekarang'
          : loyaltyPoints < reward.points
            ? `Butuh ${reward.points - loyaltyPoints} poin lagi`
            : 'Tidak Tersedia'}
      </Button>
    </div>
  );
};
export default RewardItemCustomer;
