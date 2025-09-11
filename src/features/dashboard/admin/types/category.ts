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
