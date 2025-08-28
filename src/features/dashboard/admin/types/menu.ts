import type { Category } from '../types/category';

export interface Menu {
  id: string;
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profit: number;
  soldCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  category: Category;
}

export interface CreateMenuInput {
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profit: number;
  isActive: boolean;
}

export interface UpdateMenuInput {
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profit: number;
  isActive: boolean;
}
