// LOCAL-IMPORTS
import { CARD_STYLES } from '../../../../constant/Style';

// COMPONENTS
import CardHeaderMenu from '../../../organisms/TransaksiTab/Menu/CardHeaderMenu';
import CardContentMenu from '../../../organisms/TransaksiTab/Menu/CardContentMenu';

// HOOKS
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useMenus } from '../../../../hooks/menu.hooks';
import { useCategories } from '../../../../hooks/category.hook';

// THIRD-PARTY
import { Card } from '@/components/ui/card';

// FUNCTIONS

const MenuTransaksiContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { menus } = useMenus();
  const { cart, addToCart } = useCartStore();
  const { categories } = useCategories();

  const filteredMenuItems = menus
    .filter(menu => menu.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(menu =>
      selectedCategory === 'All' ? true : menu.category.id === selectedCategory
    );

  const menuWithStockInfo = filteredMenuItems.map(menu => {
    const cartItem = cart.find(item => item.id === menu.id);
    const remainingStock = Math.max(0, menu.stock - (cartItem?.quantity ?? 0));
    const isOutOfStock = remainingStock === 0;

    return {
      ...menu,
      remainingStock,
      isOutOfStock,
    };
  });

  return (
    <div className="order-2 lg:order-1 lg:col-span-2">
      <Card className={`${CARD_STYLES} shadow-lg transition-shadow`}>
        <CardHeaderMenu
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          menuWithStockInfo={menuWithStockInfo}
        />
        <CardContentMenu
          menuWithStockInfo={menuWithStockInfo}
          addToCart={addToCart}
        />
      </Card>
    </div>
  );
};
export default MenuTransaksiContent;
