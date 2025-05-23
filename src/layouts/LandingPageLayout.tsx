import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import MenuFavoritSection from '@/sections/MenuFavoritSection';

const LandingPageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f3e9]">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* Featured Products */}
        <MenuFavoritSection />
      </main>
    </div>
  );
};

export default LandingPageLayout;
