import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMemberId } from '@/features/dashboard/kasir/hooks/kasir.hook';
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import type { CheckoutFormData } from '@/features/dashboard/kasir/schemas/checkout.schema';
import { TEXT_COLORS } from '@/constants/Style';
import type React from 'react';

const PREFIX = 'AK-';

interface MemberIdAutocompleteProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
}

export const MemberIdAutocomplete = ({
  register,
  errors,
  setValue,
}: MemberIdAutocompleteProps) => {
  const [searchTerm, setSearchTerm] = useState(PREFIX);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue('memberId', PREFIX);
  }, [setValue]);

  useEffect(() => {
    if (searchTerm.length > PREFIX.length) {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDebouncedSearchTerm('');
    }
  }, [searchTerm]);

  const { memberIds, isLoading } = useMemberId(debouncedSearchTerm);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { ref: registerRef, ...registerProps } = register('memberId');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();

    if (!value.startsWith(PREFIX)) {
      value = PREFIX + value.replace(/^AK-?/, '');
    }

    if (value.length < PREFIX.length) {
      value = PREFIX;
    }

    setSearchTerm(value);
    setValue('memberId', value);
    setValue('customerName', '');
    setShowSuggestions(value.length > PREFIX.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;

    if (
      (e.key === 'Backspace' && cursorPosition <= PREFIX.length) ||
      (e.key === 'Delete' && cursorPosition < PREFIX.length)
    ) {
      e.preventDefault();
    }

    if (
      (e.key === 'ArrowLeft' && cursorPosition <= PREFIX.length) ||
      e.key === 'Home'
    ) {
      e.preventDefault();
      input.setSelectionRange(PREFIX.length, PREFIX.length);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const length = e.target.value.length;
    if (length <= PREFIX.length) {
      e.target.setSelectionRange(PREFIX.length, PREFIX.length);
    }
    if (searchTerm.length > PREFIX.length) {
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = (memberId: string, memberName: string) => {
    setSearchTerm(memberId);
    setValue('memberId', memberId);
    setValue('customerName', memberName);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchTerm(PREFIX);
    setValue('memberId', PREFIX);
    setValue('customerName', '');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="memberId" className={`${TEXT_COLORS.primary}`}>
        Member ID
        <span className="text-[#8c7158]"> (opsional)</span>
      </Label>

      <div className="relative" ref={wrapperRef}>
        <User className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-[#8c7158]" />
        <Input
          id="memberId"
          {...registerProps}
          ref={e => {
            registerRef(e);
            inputRef.current = e;
          }}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="AK-XXXXXX"
          className="border-[#e6d9c9] pr-10 pl-10 focus:border-[#8b5e3c] focus:ring-[#8b5e3c]"
          autoComplete="off"
        />

        {searchTerm.length > PREFIX.length && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}

        {showSuggestions && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[#e6d9c9] bg-white shadow-lg">
            {isLoading ? (
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8c7158] border-t-transparent"></div>
                Mencari member...
              </div>
            ) : memberIds.length > 0 ? (
              memberIds.map(member => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() =>
                    handleSelectSuggestion(
                      member.memberId || '',
                      member.name || ''
                    )
                  }
                  className="w-full border-b border-[#e6d9c9] px-4 py-2 text-left transition-colors last:border-b-0 hover:bg-[#f5f0ea]"
                >
                  <div className="text-sm font-medium text-[#8b5e3c]">
                    {member.memberId}
                  </div>
                  <div className="text-xs text-gray-600">{member.name}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                Tidak ada member ditemukan
              </div>
            )}
          </div>
        )}
      </div>

      {errors.memberId && (
        <p className="text-xs text-red-500">{errors.memberId.message}</p>
      )}
    </div>
  );
};
