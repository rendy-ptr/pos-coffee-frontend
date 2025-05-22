import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';

const LandingPageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f3e9]">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  );
};

export default LandingPageLayout;
