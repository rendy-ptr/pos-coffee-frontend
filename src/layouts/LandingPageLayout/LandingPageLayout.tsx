import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/LandingPage/ui/HeroSection';
import MenuFavoriteSection from '@/sections/LandingPage/ui/MenuFavoriteSection';
import AboutSection from '@/sections/LandingPage/ui/AboutSection';
import LocationSection from '@/sections/LandingPage/ui/LocationSection';
import ServiceSection from '@/sections/LandingPage/ui/ServiceSection';
import TestimonialSection from '@/sections/LandingPage/ui/TestimonialSection';
import MemberSection from '@/sections/LandingPage/ui/MemberSection';

const LandingPageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f3e9]">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* Featured Products */}
        <MenuFavoriteSection />
        {/* About Section */}
        <AboutSection />
        {/* Location Section */}
        <LocationSection />
        {/* Services Section */}
        <ServiceSection />
        {/* Testimonials */}
        <TestimonialSection />
        {/* Member Section */}
        <MemberSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
