export interface CreateCategoryInput {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
}

export interface BaseCategory {
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
