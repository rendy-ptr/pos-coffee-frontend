import { useState, useEffect } from 'react';
import { menuItems } from '../../../TEMP/menudata';
import FilterBar from '../components/FilterBar';
import MenuGrid from '../components/MenuGrid';
import NavbarMenuLengkap from '../components/NavbarMenuLengkap';
import HeroMenuLengkap from '../components/HeroMenuLengkap';
import Footer from '@/components/shared/Footer';

const MenuLengkapContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory =
      selectedCategory === 'semua' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <main>
        <NavbarMenuLengkap />
        <HeroMenuLengkap />
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <MenuGrid filteredMenuItems={filteredMenuItems} />
      </main>
      <Footer />
    </div>
  );
};

export default MenuLengkapContainer;
