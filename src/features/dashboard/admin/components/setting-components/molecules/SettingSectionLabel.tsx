import type React from 'react';

interface SettingSectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SettingSectionLabel = ({
  children,
  className,
}: SettingSectionLabelProps) => {
  return <h3 className={className}>{children}</h3>;
};

export default SettingSectionLabel;
