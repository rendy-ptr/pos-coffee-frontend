import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { customerData } from '../mocks/customer';

interface CardCustomerSectionProps {
  name: string;
}

const CardCustomerSection = ({ name }: CardCustomerSectionProps) => {
  const { User } = lucideIcons;
  return (
    <div className="order-1 lg:order-1 lg:col-span-1">
      <Card className="border border-[#e6d9c9] bg-white shadow-md">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#8b5e3c] md:h-20 md:w-20">
            <User className="h-8 w-8 text-white md:h-10 md:w-10" />
          </div>
          <CardTitle className="text-lg text-[#6f4e37] md:text-xl">
            {name}
          </CardTitle>
          <CardDescription className="text-sm">
            Member sejak {customerData.memberSince}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:block md:space-y-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#6f4e37] md:text-2xl">
                {customerData.loyaltyPoints}
              </div>
              <div className="text-xs text-[#8c7158] md:text-sm">
                Poin Loyalty
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[#6f4e37] md:text-lg">
                {customerData.totalOrders}
              </div>
              <div className="text-xs text-[#8c7158] md:text-sm">
                Total Pesanan
              </div>
            </div>
          </div>
          <div className="border-t border-[#e6d9c9] pt-4">
            <div className="mb-1 text-xs text-[#8c7158] md:text-sm">
              Reward Berikutnya:
            </div>
            <div className="text-xs font-medium text-[#6f4e37] md:text-sm">
              {customerData.nextReward}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CardCustomerSection;
