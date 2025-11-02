import { Search } from 'lucide-react';

interface CategorySearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CategorySearchInput = ({
  value,
  onChange,
  placeholder = 'Cari kategori...',
}: CategorySearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]/60" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#e6d9c9]/50 bg-white/80 py-2 pr-4 pl-9 text-sm backdrop-blur-sm transition-all duration-300 focus:border-[#6f4e37]/50 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
      />
    </div>
  );
};

export default CategorySearchInput;
