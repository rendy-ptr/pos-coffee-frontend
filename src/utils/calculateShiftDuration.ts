export const calculateShiftDuration = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return '0 jam';

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  let startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;

  // Handle shift yang melewati tengah malam
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Tambah 24 jam
  }

  const durationMinutes = endMinutes - startMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (minutes === 0) {
    return `${hours} jam`;
  } else {
    return `${hours} jam ${minutes} menit`;
  }
};
