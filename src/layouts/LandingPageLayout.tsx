import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/sections/LandingPage/HeroSection';
import MenuFavoriteSection from '@/sections/LandingPage/MenuFavoriteSection';
import AboutSection from '@/sections/LandingPage/AboutSection';
import LocationSection from '@/sections/LandingPage/LocationSection';
import ServiceSection from '@/sections/LandingPage/ServiceSection';
import TestimonialSection from '@/sections/LandingPage/TestimonialSection';
import MemberSection from '@/sections/LandingPage/MemberSection';
import Footer from '@/components/layout/Footer';

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
