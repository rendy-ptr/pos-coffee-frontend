import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Nama pelanggan minimal 2 karakter'),
  memberId: z
    .string()
    .transform(val => (val === 'AK-' ? undefined : val))
    .optional()
    .refine(
      val => !val || /^AK-\d+$/.test(val),
      'Format Member ID harus AK-[angka]'
    ),
  orderType: z.enum(['DINE_IN', 'TAKEAWAY'], {
    required_error: 'Pilih jenis pesanan',
  }),
  tableId: z.string().optional(),
  paymentMethod: z.enum(['CASH', 'CARD', 'E_WALLET'], {
    required_error: 'Pilih metode pembayaran',
  }),
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
