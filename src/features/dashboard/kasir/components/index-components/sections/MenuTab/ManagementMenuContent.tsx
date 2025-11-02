import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { CARD_STYLES } from '../../../../constant/Style';
import { useMenus } from '../../../../hooks/menu.hooks';
import { useCategories } from '../../../../hooks/category.hook';
import CardHeaderMenuTab from '../../organisms/MenuTab/CardHeaderMenuTab';
import CardContentMenuTab from '../../organisms/MenuTab/CardContentMenuTab';

const ManagementMenuContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { menus } = useMenus();
  const { categories } = useCategories();

  const filteredMenuItems = menus
    .filter(menu => menu.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(menu =>
      selectedCategory === 'All' ? true : menu.category.id === selectedCategory
    );

  return (
    <Card className={`${CARD_STYLES} shadow-lg transition-shadow`}>
      <CardHeaderMenuTab
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        filteredMenuItems={filteredMenuItems}
      />
      <CardContentMenuTab filteredMenuItems={filteredMenuItems} />
    </Card>
  );
};

export default ManagementMenuContent;
