export interface UploadResponse {
  imageUrl: string;
}

export interface Menu {
  id: string;
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profitMargin: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

export interface CreateMenuInput {
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profitMargin: number;
  isActive: boolean;
}
