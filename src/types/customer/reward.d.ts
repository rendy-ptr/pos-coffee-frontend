export type RewardType = {
  id: number;
  name: string;
  points: number;
  description: string;
  available: boolean;
};
export type RewardItemCustomer = RewardType[];
