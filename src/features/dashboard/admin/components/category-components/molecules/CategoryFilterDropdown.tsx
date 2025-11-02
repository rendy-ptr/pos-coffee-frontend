import { Filter, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

interface CategoryFilterDropdownProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const CategoryFilterDropdown = ({
  options,
  selectedValue,
  onSelect,
}: CategoryFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || 'Semua';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-[#e6d9c9]/50 bg-white/80 px-4 py-2 text-sm font-medium text-[#6f4e37] backdrop-blur-sm transition-all duration-300 hover:border-[#6f4e37]/30 hover:bg-[#6f4e37]/5 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
      >
        <Filter className="h-4 w-4" />
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[160px] overflow-hidden rounded-lg border border-[#e6d9c9]/50 bg-white shadow-xl backdrop-blur-sm">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#6f4e37]/5 ${
                selectedValue === option.value
                  ? 'bg-[#6f4e37]/10 text-[#6f4e37]'
                  : 'text-[#8c7158]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;
