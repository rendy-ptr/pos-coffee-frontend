import { z } from 'zod';

export const createMenuSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string().min(1, 'Nama menu wajib diisi'),
  categoryId: z.string().min(1, 'Kategori wajib dipilih'),
  stock: z.coerce.number().int().nonnegative(),
  productionCapital: z.coerce.number().nonnegative(),
  sellingPrice: z.coerce.number().nonnegative(),
  profit: z.coerce.number(),
  isActive: z.coerce.boolean(),
});

export type CreateMenuInputPayload = z.infer<typeof createMenuSchema>;

// export interface CreateMenuInput {
//   imageUrl: string;
//   name: string;
//   categoryId: string;
//   stock: number;
//   productionCapital: number;
//   sellingPrice: number;
//   profit: number;
//   isActive: boolean;
// }
