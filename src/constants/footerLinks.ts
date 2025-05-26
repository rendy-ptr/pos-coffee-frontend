import { lucideIcons } from '@/icon/lucide-react-icons';
const { Instagram, Facebook, Twitter } = lucideIcons;

import type { FooterLink } from '@/types/footer';

export const FOOTER_LINKS: FooterLink[] = [
  { to: '#', icon: Instagram, label: 'Instagram' },
  { to: '#', icon: Facebook, label: 'Facebook' },
  { to: '#', icon: Twitter, label: 'Twitter' },
];
