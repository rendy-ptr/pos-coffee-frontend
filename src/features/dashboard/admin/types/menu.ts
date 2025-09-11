import type { BaseCategory } from '../types/category';

export interface BaseMenu {
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
  category: BaseCategory;
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
