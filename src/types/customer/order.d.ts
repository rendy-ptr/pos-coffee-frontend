export type OrderType = {
  id: string;
  date: string;
  time: string;
  items: string[];
  total: string;
  status: string;
  points: number;
};

export type OrdersItemType = OrderType[];
