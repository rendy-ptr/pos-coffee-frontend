import type React from 'react';

interface Customer {
  id: string;
  name: string;
}

interface CustomerAvatarProps {
  customer: Customer;
  size?: 'sm' | 'md' | 'lg';
}

// Constants
const COLORS = {
  primary: '#6f4e37',
  primaryLight: '#8c7158',
  border: '#e6d9c9',
  background: '#ffffff',
} as const;

const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  customer,
  size = 'md',
}) => {
  const getAvatarUrl = (name: string): string => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6f4e37&color=fff&size=128&bold=true`;
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    size: 'sm' | 'md' | 'lg'
  ) => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentElement;
    const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
    if (parent) {
      parent.innerHTML = `
        <div class="flex items-center justify-center w-full h-full bg-[${COLORS.primary}] rounded-full">
          <svg class="${iconSizes[size]} text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      `;
    }
  };

  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const indicatorSizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };
  const positionClasses = {
    sm: 'bottom-0 right-0',
    md: 'bottom-0.5 right-0.5',
    lg: 'bottom-0.5 right-0.5',
  };

  const isOnline = true;

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} overflow-hidden rounded-full ring-2 ring-[${COLORS.primary}]/10 shadow-sm`}
      >
        <img
          src={getAvatarUrl(customer.name)}
          alt={`${customer.name} avatar`}
          className="h-full w-full object-cover"
          onError={e => handleImageError(e, size)}
        />
      </div>
      {isOnline && (
        <div className={`absolute ${positionClasses[size]} z-10`}>
          <div className="relative">
            <div
              className={`${indicatorSizeClasses[size]} rounded-full border-2 border-white bg-green-500 shadow-sm`}
            />
            <div
              className={`absolute inset-0 ${indicatorSizeClasses[size]} animate-ping rounded-full bg-green-400 opacity-75`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAvatar;
