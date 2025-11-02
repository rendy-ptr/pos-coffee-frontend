import CoffeeErrorAnimation from '@/components/shared/CoffeeErrorAnimation';

interface SettingErrorStateProps {
  title?: string;
  messages?: string[];
}

const SettingErrorState = ({
  title = 'Gagal Memuat Halaman',
  messages = [
    'Terjadi kesalahan saat mengambil data.',
    'Silakan coba lagi nanti.',
  ],
}: SettingErrorStateProps) => {
  return <CoffeeErrorAnimation title={title} messages={messages} />;
};

export default SettingErrorState;
