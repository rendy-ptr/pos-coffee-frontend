import { lucideIcons } from '@/icon/lucide-react-icons';

const { Coffee, Calendar, Package, Users, BookOpen, ShoppingBag } = lucideIcons;

import type { ServiceFeature } from '@/types/landingpage/service';

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    icon: Coffee,
    title: 'Brewing Bar',
    desc: 'Nikmati kopi yang diseduh dengan berbagai metode seperti V60, Chemex, Aeropress, dan French Press oleh barista ahli kami.',
  },
  {
    icon: ShoppingBag,
    title: 'Biji Kopi Retail',
    desc: 'Bawa pulang biji kopi premium kami yang baru disangrai untuk dinikmati di rumah. Tersedia dalam berbagai pilihan asal dan profil rasa.',
  },
  {
    icon: BookOpen,
    title: 'Workshop Kopi',
    desc: 'Pelajari seni menyeduh kopi dari para ahli kami. Workshop reguler untuk pemula hingga tingkat lanjut.',
  },
  {
    icon: Calendar,
    title: 'Reservasi Acara',
    desc: 'Sewa ruang kami untuk acara pribadi atau bisnis. Tersedia paket katering kopi lengkap untuk acara Anda.',
  },
  {
    icon: Package,
    title: 'Coffee Catering',
    desc: 'Bawa pengalaman kopi premium ke acara Anda. Layanan barista mobile untuk pernikahan, konferensi, dan acara perusahaan.',
  },
  {
    icon: Users,
    title: 'Kelas Cupping',
    desc: 'Kembangkan selera kopi Anda dengan sesi cupping profesional. Pelajari cara mengidentifikasi berbagai profil rasa kopi.',
  },
];
