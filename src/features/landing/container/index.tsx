import Navbar from '@/components/shared/Navbar';
import HeroSection from '../sections/HeroSection';
import MenuFavoriteSection from '../sections/MenuFavoriteSection';
import AboutSection from '../sections/AboutSection';
import LocationSection from '../sections/LocationSection';
import ServiceSection from '../sections/ServiceSection';
import TestimonialSection from '../sections/TestimonialSection';
import MemberSection from '../sections/MemberSection';
import Footer from '@/components/shared/Footer';

const LandingPageContainer = () => {
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

export default LandingPageContainer;
