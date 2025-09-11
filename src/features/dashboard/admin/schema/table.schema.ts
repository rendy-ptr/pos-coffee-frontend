import { z } from 'zod';

export const TableStatusEnum = z.enum([
  'AVAILABLE',
  'OCCUPIED',
  'RESERVED',
  'MAINTENANCE',
]);

export const TableLocationEnum = z.enum(['INDOOR', 'OUTDOOR']);

export const createTableSchema = z.object({
  number: z.number().int().min(1, 'Nomor meja minimal 1'),
  capacity: z.number().int().min(1, 'Kapasitas minimal 1'),
  location: TableLocationEnum,
});

export const editTableSchema = z
  .object({
    number: z.number().min(1).optional(),
    capacity: z.number().min(1).optional(),
    status: z
      .enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE'])
      .optional(),
    location: z.enum(['INDOOR', 'OUTDOOR']).optional(),
    currentGuests: z.number().min(0).max(20).optional(),
    lastCleaned: z
      .string()
      .refine(
        val => {
          if (!val) return true;
          const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
          return datetimeLocalRegex.test(val) || !isNaN(Date.parse(val));
        },
        {
          message: 'Format tanggal dan waktu tidak valid',
        }
      )
      .optional(),
    reservedBy: z
      .string()
      .optional()
      .refine(
        val => {
          if (!val) return true;
          const nameRegex = /^[A-Za-z\s\-'\u00C0-\u017F]+$/;
          return nameRegex.test(val);
        },
        {
          message:
            'Nama hanya boleh berisi huruf, spasi, tanda hubung, atau apostrof',
        }
      )
      .transform(val => (val ? val.trim() : undefined)),
    reservedTime: z
      .string()
      .refine(
        val => {
          if (!val) return true;
          const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
          return datetimeLocalRegex.test(val) || !isNaN(Date.parse(val));
        },
        { message: 'Format tanggal dan waktu tidak valid untuk reservedTime' }
      )
      .optional(),
  })
  .refine(
    data => {
      if (data.status === 'RESERVED') {
        return data.reservedBy && data.reservedTime;
      }
      return true;
    },
    {
      message: 'reservedBy dan reservedTime wajib diisi jika status RESERVED',
      path: ['reservedBy'],
    }
  );

export type EditTableFormData = z.infer<typeof editTableSchema>;
export type CreateTableFormData = z.infer<typeof createTableSchema>;
