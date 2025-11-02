import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

interface SettingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  className?: string;
}

const SettingInput = forwardRef<HTMLInputElement, SettingInputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div>
        <input ref={ref} className={className} {...props} />
        {error && (
          <p className="mt-1.5 text-xs text-red-600">{error.message}</p>
        )}
      </div>
    );
  }
);

SettingInput.displayName = 'SettingInput';

export default SettingInput;
