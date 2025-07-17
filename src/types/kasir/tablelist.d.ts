export interface ITableList {
  id: number;
  name: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  lastUpdated: string;
}
