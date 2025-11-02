import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { useCustomerStore } from '@/store/customerStore';
import { CARD_STYLES, TEXT_COLORS, SHADOW_CARD_STYLE } from '@/constants/Style';

const CardCustomerSection = () => {
  const { User } = lucideIcons;
  const { customerData } = useCustomerStore();
  if (!customerData) return null;
  return (
    <div className="order-1 lg:order-1 lg:col-span-1">
      <Card className={`${CARD_STYLES} ${SHADOW_CARD_STYLE}`}>
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#8b5e3c] md:h-20 md:w-20">
            <User className="h-8 w-8 text-white md:h-10 md:w-10" />
          </div>
          <CardTitle className={`text-lg md:text-xl ${TEXT_COLORS.primary}`}>
            {customerData.name}
          </CardTitle>
          <CardDescription className={`text-sm ${TEXT_COLORS.secondary}`}>
            Member Sejak{' '}
            {customerData.createdAt
              ? new Date(customerData.createdAt).getFullYear()
              : 'N/A'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:block md:space-y-4">
            <div className="text-center">
              <div className={`text-xl md:text-2xl ${TEXT_COLORS.bold}`}>
                {customerData.customerProfile.loyaltyPoints}
              </div>
              <div className={`text-xs md:text-sm ${TEXT_COLORS.secondary}`}>
                Poin Loyalty
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-lg font-semibold md:text-lg ${TEXT_COLORS.primary}`}
              >
                {0}
              </div>
              <div className={`text-xs md:text-sm ${TEXT_COLORS.secondary}`}>
                Total Pesanan
              </div>
            </div>
          </div>
          <div className="border-t border-[#e6d9c9] pt-4">
            <div className={`mb-1 text-xs md:text-sm ${TEXT_COLORS.secondary}`}>
              Reward Berikutnya:
            </div>
            <div
              className={`text-xs font-medium md:text-sm ${TEXT_COLORS.primary}`}
            >
              {0}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CardCustomerSection;
