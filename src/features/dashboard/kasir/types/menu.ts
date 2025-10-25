export interface MenuWithCategory {
  id: string;
  imageUrl: string;
  name: string;
  sellingPrice: number;
  stock: number;
  category: {
    id: string;
    name: string;
    description: string | null;
    icon: string;
  };
}

export interface MenuWithStockInfo extends MenuWithCategory {
  remainingStock: number;
  isOutOfStock: boolean;
}
