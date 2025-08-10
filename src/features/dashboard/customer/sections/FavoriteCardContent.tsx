import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import FavoriteItemCustomer from '../components/FavoriteItemCustomer';
import { favoriteItems } from '../mocks/favorite';
import { TEXT_COLORS, CARD_STYLES, SHADOW_CARD_STYLE } from '@/constants/Style';

const FavoriteCardContentSection = () => {
  return (
    <Card className={`${CARD_STYLES} ${SHADOW_CARD_STYLE}`}>
      <CardHeader>
        <CardTitle className={TEXT_COLORS.primary}>Menu Favorit</CardTitle>
        <CardDescription>Menu yang paling sering Anda pesan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {favoriteItems.map(item => (
            <FavoriteItemCustomer key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default FavoriteCardContentSection;
