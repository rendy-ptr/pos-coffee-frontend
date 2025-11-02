import CoffeeLoadingAnimation from '@/components/shared/CoffeeLoadingAnimation';

interface SettingLoadingStateProps {
  title?: string;
  messages?: string[];
}

const SettingLoadingState = ({
  title = 'Loading Admin Profile',
  messages = [
    'Mengambil data Admin',
    'Memproses informasi',
    'Mempersiapkan tampilan',
  ],
}: SettingLoadingStateProps) => {
  return <CoffeeLoadingAnimation title={title} messages={messages} />;
};

export default SettingLoadingState;
