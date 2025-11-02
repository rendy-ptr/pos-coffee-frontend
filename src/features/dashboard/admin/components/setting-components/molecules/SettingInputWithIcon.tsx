import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import type React from 'react';

interface SettingInputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  error?: FieldError;
  className?: string;
}

const SettingInputWithIcon = forwardRef<
  HTMLInputElement,
  SettingInputWithIconProps
>(({ icon, error, className, ...props }, ref) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#8c7158]">
        {icon}
      </div>
      <input ref={ref} className={className} {...props} />
      {error && <p className="mt-1.5 text-xs text-red-600">{error.message}</p>}
    </div>
  );
});

SettingInputWithIcon.displayName = 'SettingInputWithIcon';

export default SettingInputWithIcon;
