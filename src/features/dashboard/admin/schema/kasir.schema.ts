import { z } from 'zod';

export const CreateKasirSchema = z.object({
  name: z.string().min(1, 'Nama kasir wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6).optional(),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  profilePicture: z.string().optional(),
  shiftStart: z.string().min(1, 'Waktu mulai shift wajib diisi'),
  shiftEnd: z.string().min(1, 'Waktu selesai shift wajib diisi'),
  isActive: z.coerce.boolean(),
});
export type CreateKasirInputPayload = z.infer<typeof CreateKasirSchema>;

export const editKasirSchema = CreateKasirSchema.partial();
export type UpdateKasirInputPayload = z.infer<typeof editKasirSchema>;

// export interface CreateKasirInput {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   profilePicture?: string | null;
//   shiftStart: string;
//   shiftEnd: string;
//   isActive: boolean;
// }
