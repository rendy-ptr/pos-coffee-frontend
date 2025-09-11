import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Icon kategori wajib diisi'),
  isActive: z.boolean({
    required_error: 'Status wajib dipilih',
    invalid_type_error: 'Status wajib dipilih',
  }),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateCategoryInputPayload = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInputPayload = z.infer<typeof updateCategorySchema>;
