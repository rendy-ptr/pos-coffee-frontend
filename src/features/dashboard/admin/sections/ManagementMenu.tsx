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
    <Card
      className={`${CARD_STYLES} ${SHADOW_CARD_STYLE} border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] p-0`}
    >
      <CardHeader className="rounded-t-xl border-b border-[#e6d9c9]/20 px-6 py-4 transition-all duration-300">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#6f4e37]/20 p-2">
              <UtensilsCrossed className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                Manajemen Menu
              </CardTitle>
              <CardDescription className="mt-1 text-sm font-medium text-[#8c7158]/80">
                Kelola menu, harga, dan stok dengan mudah
              </CardDescription>
            </div>
          </div>
          <Button className="group flex items-center gap-2 rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg">
            <UtensilsCrossed className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Tambah Menu
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 md:space-y-6">
          {menuItems.map(item => (
            <ManagementMenuItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementMenuSection;
