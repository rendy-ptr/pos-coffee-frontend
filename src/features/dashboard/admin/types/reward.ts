export interface BaseRewards {
  id: string;
  title: string;
  type: 'REWARD' | 'VOUCHER';
  description?: string;
  isActive: boolean;
  points?: number;
  code?: string;
  expiryDate?: string;
  conditions?: string;
  createdAt: string;
  updatedAt: string;
  createById: string;
}
