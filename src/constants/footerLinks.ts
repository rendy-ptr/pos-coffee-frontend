import { lucideIcons } from '@/icon/lucide-react-icons';
import type { LucideIcon } from 'lucide-react';
const { Instagram, Facebook, Twitter } = lucideIcons;

type FooterLink = {
  to: string;
  icon: LucideIcon;
  label: string;
};

export const FOOTER_LINKS: FooterLink[] = [
  { to: '#', icon: Instagram, label: 'Instagram' },
  { to: '#', icon: Facebook, label: 'Facebook' },
  { to: '#', icon: Twitter, label: 'Twitter' },
];
