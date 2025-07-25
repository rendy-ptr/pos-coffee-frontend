import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import VoucherItemCustomer from '../components/VoucherItemCustomer';
import { availableVouchers } from '../mocks/voucher';
import { TEXT_COLORS, CARD_STYLES } from '../constant/Style';

const AllVoucherContent = () => {
  return (
    <Card className={CARD_STYLES}>
      <CardHeader>
        <CardTitle className={TEXT_COLORS.primary}>
          Klaim Voucher Yang Tersedia
        </CardTitle>
        <CardDescription>
          Klaim voucher yang tersedia untuk mendapatkan diskon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {availableVouchers.map(voucher => (
            <VoucherItemCustomer key={voucher.id} voucher={voucher} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default AllVoucherContent;
