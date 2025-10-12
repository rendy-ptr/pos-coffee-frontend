import { z } from 'zod';

// Schema untuk update profile di frontend
export const updateAdminProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nama minimal 2 karakter')
      .max(100, 'Nama maksimal 100 karakter')
      .optional()
      .or(z.literal('')),

    email: z
      .string()
      .trim()
      .email('Format email tidak valid')
      .optional()
      .or(z.literal('')),

    phone: z
      .string()
      .trim()
      .regex(
        /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/,
        'Nomor HP tidak valid. Gunakan format 08xxxx atau +628xxxx'
      )
      .optional()
      .or(z.literal('')),

    profilePicture: z
      .string()
      .url('URL gambar tidak valid')
      .optional()
      .or(z.literal('')),

    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // Jika user isi salah satu field password, pastikan semua diisi
    const isChangingPassword =
      data.currentPassword || data.newPassword || data.confirmPassword;

    if (isChangingPassword) {
      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currentPassword'],
          message: 'Masukkan password saat ini.',
        });
      }
      if (!data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['newPassword'],
          message: 'Masukkan password baru.',
        });
      }
      if (!data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: 'Konfirmasi password wajib diisi.',
        });
      }

      if (
        data.newPassword &&
        data.currentPassword &&
        data.newPassword === data.currentPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['newPassword'],
          message: 'Password baru harus berbeda dari password saat ini.',
        });
      }

      if (
        data.newPassword &&
        data.confirmPassword &&
        data.newPassword !== data.confirmPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: 'Konfirmasi password tidak cocok.',
        });
      }
    }
  });

export type UpdateAdminProfileSchemaPayload = z.infer<
  typeof updateAdminProfileSchema
>;
