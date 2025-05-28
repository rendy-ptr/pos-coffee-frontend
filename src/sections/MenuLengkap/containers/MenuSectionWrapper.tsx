import { useState } from 'react';
import { menuItems } from '../../../TEMP/menudata';
import FilterBar from './FilterBar';
import MenuGrid from './MenuGrid';

const MenuSectionWrapper = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory =
      selectedCategory === 'semua' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MenuGrid filteredMenuItems={filteredMenuItems} />
    </>
  );
};

export default MenuSectionWrapper;
