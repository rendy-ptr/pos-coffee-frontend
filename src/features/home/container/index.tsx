import Navbar from '@/components/shared/Navbar';
import HeroSection from '../components/sections/HeroSection';
import MenuFavoriteSection from '../components/sections/MenuFavoriteSection';
import AboutSection from '../components/sections/AboutSection';
import LocationSection from '../components/sections/LocationSection';
import ServiceSection from '../components/sections/ServiceSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import MemberSection from '../components/sections/MemberSection';
import Footer from '@/components/shared/Footer';
import { FOOTER_LINKS } from '@/constants/footerLinks';

const LandingPageContainer = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f3e9]">
      <Navbar variant="landing" />
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
      <Footer variant="light" links={FOOTER_LINKS} />
    </div>
  );
};

export default LandingPageContainer;
