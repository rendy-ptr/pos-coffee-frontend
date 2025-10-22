import type { MenuWithCategory } from './menu';

export interface ICartMenuItem extends MenuWithCategory {
  quantity: number;
}
