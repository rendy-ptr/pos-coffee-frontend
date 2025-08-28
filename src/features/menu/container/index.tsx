import { useState, useEffect } from 'react';
import { FOOTER_LINKS } from '@/constants/footerLinks';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import SearchFilterMenu from '../components/sections/Search & Filter Menu';
import MenuGrid from '../components/sections/MenuGrid';
import { usePublicMenus } from '../hooks/menu.hook';
import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';

const UserMenuUI = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: menuItems = [], isLoading, error } = usePublicMenus();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory =
      selectedCategory === 'semua' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <CoffeeLoadingAnimation
        title="Loading Menu"
        messages={[
          'Mengambil data Menu',
          'Memproses informasi',
          'Mempersiapkan tampilan',
        ]}
      />
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Gagal memuat menu</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] to-[#f5f0e8]">
      <Navbar variant="subpage" />

      {/* Search & Filter dengan light variant */}
      <SearchFilterMenu
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Menu Grid dengan card premium */}
      <MenuGrid filteredMenuItems={filteredMenuItems} />

      {/* Footer */}
      <Footer variant="light" links={FOOTER_LINKS} />
    </div>
  );
};

export default UserMenuUI;
