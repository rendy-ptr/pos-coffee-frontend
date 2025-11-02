import type { ReactNode } from 'react';

interface SettingCardProps {
  children: ReactNode;
  className?: string;
}

const SettingCard = ({ children, className }: SettingCardProps) => {
  return <div className={className}>{children}</div>;
};

export default SettingCard;
