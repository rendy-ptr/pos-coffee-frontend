import { SERVICE_FEATURES } from '@/constants/serviceFeatures';

const ServiceSection = () => {
  return (
    <section id="layanan" className="bg-[#e6d9c9] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-[#6f4e37] sm:text-4xl">
              Layanan Kami
            </h2>
            <p className="max-w-[700px] text-[#8c7158] md:text-xl">
              Berbagai layanan premium untuk pengalaman kopi terbaik Anda
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FEATURES.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#d5c4b0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f3e9]">
                <item.icon className="h-7 w-7 text-[#6f4e37]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#6f4e37]">
                {item.title}
              </h3>
              <p className="text-[#8c7158]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
