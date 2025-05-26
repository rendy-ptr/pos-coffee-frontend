import type { Testimonial } from '@/types/landingpage/testimonial';

const TestimonialCard = ({ name, comment, rating }: Testimonial) => (
  <div className="rounded-lg border border-[#d5c4b0] bg-white p-6 shadow-sm">
    <div className="space-y-4">
      <p className="text-[#8c7158]">“{comment}”</p>
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#6f4e37]">{name}</span>
        <div className="flex">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5 fill-current text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
