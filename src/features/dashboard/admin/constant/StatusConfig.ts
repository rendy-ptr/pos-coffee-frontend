export const getStatusConfig = (status: string) => {
  const configs = {
    active: {
      bgColor: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-[#6f4e37]',
      ringColor: 'ring-[#6f4e37]/20',
    },
    offline: {
      bgColor: 'bg-gradient-to-r from-[#8c7158] to-[#a08b7a]',
      textColor: 'text-white',
      text: 'Offline',
      dot: 'bg-[#8c7158]',
      ringColor: 'ring-[#8c7158]/20',
    },
    sick: {
      bgColor: 'bg-gradient-to-r from-[#a66a4c] to-[#c17a5d]',
      textColor: 'text-white',
      text: 'Sakit',
      dot: 'bg-[#a66a4c]',
      ringColor: 'ring-[#a66a4c]/20',
    },
    leave: {
      bgColor: 'bg-gradient-to-r from-[#d2bba3] to-[#e6d9c9]',
      textColor: 'text-[#6f4e37]',
      text: 'Cuti',
      dot: 'bg-[#d2bba3]',
      ringColor: 'ring-[#d2bba3]/30',
    },
    permit: {
      bgColor: 'bg-gradient-to-r from-[#8b5e3c] to-[#6f4e37]',
      textColor: 'text-white',
      text: 'Izin',
      dot: 'bg-[#8b5e3c]',
      ringColor: 'ring-[#8b5e3c]/20',
    },
  };

  return configs[status as keyof typeof configs] || configs.offline;
};
