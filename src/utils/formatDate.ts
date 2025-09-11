// @/utils/formatDate.ts
/**
 * Konversi ISO UTC string ke format datetime-local (untuk input HTML).
 * Output: 'YYYY-MM-DDTHH:mm' (misalnya, '2025-09-08T04:00').
 */
export const formatDateTimeLocal = (
  isoString: string | null | undefined
): string | undefined => {
  if (!isoString) return undefined;

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return undefined;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Konversi datetime-local (lokal WIB) ke ISO UTC untuk backend.
 * Input: 'YYYY-MM-DDTHH:mm' (misalnya, '2025-09-08T04:00').
 * Output: ISO UTC (misalnya, '2025-09-07T21:00:00.000Z' untuk WIB UTC+7).
 */
export const parseDateTimeLocalToISO = (
  localString: string | null | undefined
): string | undefined => {
  if (!localString) return undefined;

  const date = new Date(localString);
  if (isNaN(date.getTime())) return undefined;

  return date.toISOString();
};

/**
 * Format ISO UTC untuk display readable di UI (non-input).
 * Output: 'DD/MM/YYYY HH:mm WIB' (misalnya, '08/09/2025 04:00 WIB').
 */
export const formatDateForDisplay = (
  isoString: string | null | undefined,
  options: { includeTime?: boolean } = { includeTime: true }
): string => {
  if (!isoString) return 'Belum diset';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'Tanggal tidak valid';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (options.includeTime) {
    return `${day}/${month}/${year} ${hours}:${minutes} WIB`;
  }
  return `${day}/${month}/${year}`;
};
