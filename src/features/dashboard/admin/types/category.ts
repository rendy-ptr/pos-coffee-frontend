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

export interface CreateCategoryInput {
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
