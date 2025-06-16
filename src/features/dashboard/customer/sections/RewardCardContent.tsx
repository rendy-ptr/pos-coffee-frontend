import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import RewardItemCustomer from '../components/RewardItemCustomer';
import { availableRewards } from '../mocks/reward';
import { customerData } from '../mocks/customer';
import { TEXT_COLORS, CARD_STYLES } from '../constant/Style';

const RewardCardContentSection = () => {
  return (
    <Card className={CARD_STYLES}>
      <CardHeader>
        <CardTitle className={TEXT_COLORS.primary}>Tukar Poin Reward</CardTitle>
        <CardDescription>
          Gunakan poin loyalty Anda untuk mendapatkan reward menarik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {availableRewards.map(reward => (
            <RewardItemCustomer
              key={reward.id}
              reward={reward}
              loyaltyPoints={customerData.loyaltyPoints}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RewardCardContentSection;
