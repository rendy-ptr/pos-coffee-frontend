import { Button } from '@/components/ui/button';
import { HERO_FEATURES } from '@/contants/heroFeatures';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';

const HeroSection = () => {
  const containerRef = useHeroAnimation();
  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#2c1810]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop"
          alt="Coffee beans background"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="space-y-6 text-center md:text-left">
            {/* Initial state: opacity-0, translate-y-12 */}
            <div className="hero-welcome inline-block translate-y-12 rounded-full bg-[#e6d9c9] px-4 py-1 opacity-0">
              <span className="font-medium text-[#6f4e37]">
                Selamat Datang di Aroma Kopi
              </span>
            </div>
            <h1 className="hero-title translate-y-12 text-4xl leading-tight font-bold text-white opacity-0 md:text-5xl lg:text-6xl">
              Rasakan Kenikmatan{' '}
              <span className="text-[#e6d9c9]">Kopi Asli Indonesia</span>
            </h1>
            <p className="hero-desc translate-y-12 text-lg text-white/80 opacity-0 md:text-xl">
              Biji kopi pilihan dari petani lokal, disangrai dengan sempurna,
              dan disajikan dengan cinta oleh barista profesional kami.
            </p>
            <div className="hero-buttons flex translate-y-12 flex-wrap justify-center gap-4 opacity-0 md:justify-start">
              <Button className="cursor-pointer rounded-full bg-[#e6d9c9] px-8 py-6 text-lg text-[#6f4e37] hover:bg-[#d5c4b0]">
                Lihat Menu
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-[#e6d9c9] bg-transparent px-8 py-6 text-lg text-[#e6d9c9] hover:bg-[#e6d9c9]/10"
              >
                Reservasi
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="hero-circle-1 absolute -top-10 -right-10 h-40 w-40 scale-75 rounded-full bg-[#e6d9c9] opacity-0"></div>
            <div className="hero-circle-2 absolute -bottom-10 -left-10 h-60 w-60 scale-75 rounded-full bg-[#e6d9c9] opacity-0"></div>
            {/* Initial state: opacity-0, scale and rotation set in gsap */}
            <div className="hero-image relative z-10 rotate-3 transform overflow-hidden rounded-2xl border-8 border-[#e6d9c9]/30 opacity-0 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop"
                alt="Coffee cup"
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 rounded-xl border border-[#e6d9c9]/20 bg-[#2c1810]/80 px-4 py-6 backdrop-blur-sm md:grid-cols-4 md:gap-8 md:px-8">
          {HERO_FEATURES.map((item, index) => (
            <div
              key={index}
              className="hero-feature flex translate-y-12 flex-col items-center p-2 text-center opacity-0"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e6d9c9]/20">
                <item.icon className="h-6 w-6 text-[#e6d9c9]" />
              </div>
              <h3 className="font-medium text-[#e6d9c9]">{item.title}</h3>
              <p className="text-sm text-[#e6d9c9]/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-[#f8f3e9] to-transparent"></div>
    </section>
  );
};

export default HeroSection;
