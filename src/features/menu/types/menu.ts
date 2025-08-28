export interface PublicMenu {
  id: string;
  name: string;
  soldCount: number;
  categoryId: string;
  imageUrl: string;
  sellingPrice: number;
  stock: number;
  category: {
    name: string;
  };
}
