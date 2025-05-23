import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/sections/HeroSection';
import MenuFavoritSection from '@/sections/MenuFavoritSection';
import AboutSection from '@/sections/AboutSection';
import LocationSection from '@/sections/LocationSection';
import ServiceSection from '@/sections/ServiceSection';
import TestimonialSection from '@/sections/TestimonialSection';
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
        <MenuFavoritSection />
        {/* About Section */}
        <AboutSection />
        {/* Location Section */}
        <LocationSection />
        {/* Services Section */}
        <ServiceSection />
        {/* Testimonials */}
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
