export interface CreateCategoryInput {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

export interface UpdateCategoryInput {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
}
