import NavMenuLengkap from '@/sections/MenuLengkap/NavMenuLengkap';
import HeroMenu from '@/sections/MenuLengkap/HeroMenu';
import MenuSectionWrapper from '@/sections/MenuLengkap/MenuSectionWrapper';
import Footer from '@/components/layout/Footer';

const MenuLengkapLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <NavMenuLengkap />
      <HeroMenu />
      <MenuSectionWrapper />
      <Footer />
    </div>
  );
};

export default MenuLengkapLayout;
