import { TESTIMONIALS } from '@/constants/testimonial';
import TestimonialCard from '@/features/landing/components/TestimonialCard';

const TestimonialSection = () => {
  return (
    <section id="testimoni" className="bg-[#f8f3e9] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#6f4e37] sm:text-4xl">
              Apa Kata Pelanggan
            </h2>
            <p className="max-w-[700px] text-[#8c7158] md:text-xl">
              Pengalaman pelanggan kami yang menikmati kopi dan suasana di Aroma
              Kopi
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
