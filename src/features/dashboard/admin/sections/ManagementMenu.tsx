import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';

import { CARD_STYLES, SHADOW_CARD_STYLE } from '@/constants/Style';
import ManagementMenuItem from '../components/ManagementMenuItem';

const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Kopi',
    price: 25000,
    cost: 8000,
    stock: 50,
    sold: 45,
    profit: 17000,
    status: 'Aktif',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Kopi',
    price: 35000,
    cost: 12000,
    stock: 45,
    sold: 38,
    profit: 23000,
    status: 'Aktif',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Croissant Butter',
    category: 'Makanan',
    price: 25000,
    cost: 10000,
    stock: 20,
    sold: 15,
    profit: 15000,
    status: 'Aktif',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop',
  },
];

const ManagementMenuSection = () => {
  const { UtensilsCrossed } = lucideIcons;
  return (
    <Card className={`${CARD_STYLES} ${SHADOW_CARD_STYLE}`}>
      <CardHeader>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-[#6f4e37]">Manajemen Menu</CardTitle>
            <CardDescription>Kelola menu, harga, dan stok</CardDescription>
          </div>
          <Button className="cursor-pointer bg-[#6f4e37] text-sm text-white hover:bg-[#5d4130]">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Tambah Menu
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          {menuItems.map(item => (
            <ManagementMenuItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementMenuSection;
