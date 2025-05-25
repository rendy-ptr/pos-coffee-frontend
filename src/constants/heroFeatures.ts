import type { LucideIcon } from 'lucide-react';
import { lucideIcons } from '@/icon/lucide-react-icons';

const { Coffee, Clock, MapPin, Phone } = lucideIcons;

type HeroFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const HERO_FEATURES: HeroFeature[] = [
  { icon: Coffee, title: 'Kopi Premium', desc: 'Biji kopi pilihan' },
  { icon: Clock, title: 'Jam Buka', desc: '07:00 - 22:00' },
  { icon: MapPin, title: 'Lokasi', desc: 'Pusat Kota' },
  { icon: Phone, title: 'Reservasi', desc: '+62 123 4567' },
];
