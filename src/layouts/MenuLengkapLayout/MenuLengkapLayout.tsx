import Footer from '@/components/layout/Footer';
import NavMenuLengkap from '@/sections/MenuLengkap/ui/NavMenuLengkap';
import HeroMenu from '@/sections/MenuLengkap/ui/HeroMenu';
import MenuSectionWrapper from '@/sections/MenuLengkap/containers/MenuSectionWrapper';

const MenuLengkapLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      {/* Main Content */}
      <main>
        <NavMenuLengkap />
        <HeroMenu />
        <MenuSectionWrapper />
      </main>
      <Footer />
    </div>
  );
};

export default MenuLengkapLayout;
