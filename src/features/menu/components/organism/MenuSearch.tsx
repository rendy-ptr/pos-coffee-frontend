import { lucideIcons } from '@/icon/lucide-react-icons';
const { Search, X } = lucideIcons;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuSearch = ({ value, onChange }: SearchInputProps) => {
  const clearSearch = () => onChange('');

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
        <Search className="h-5 w-5 text-[#8c7158]" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Ketik nama menu, kategori, atau kata kunci..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-14 w-full rounded-2xl border-2 border-[#e6d9c9]/50 bg-white/90 pr-12 pl-12 text-lg font-medium text-[#6f4e37] shadow-lg shadow-[#6f4e37]/5 backdrop-blur-sm transition-all duration-300 ease-out placeholder:font-normal placeholder:text-[#8c7158]/70 hover:border-[#d4c3b0]/70 hover:shadow-lg focus:border-[#d4c3b0] focus:bg-white focus:shadow-xl focus:ring-4 focus:shadow-[#6f4e37]/10 focus:ring-[#e6d9c9]/30 focus:outline-none"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 z-10 flex items-center pr-4 text-[#8c7158] transition-colors duration-200 hover:text-[#6f4e37]"
          aria-label="Hapus pencarian"
        >
          <div className="rounded-full p-1 transition-colors hover:bg-[#e6d9c9]/30">
            <X className="h-4 w-4" />
          </div>
        </button>
      )}
    </div>
  );
};

export default MenuSearch;
