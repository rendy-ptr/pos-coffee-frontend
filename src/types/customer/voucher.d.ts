export type VoucherType = {
  id: number;
  name: string;
  description: string;
  code: string;
  expirationDate: string;
  available: boolean;
  minPurchase: number;
  maxDiscount: number;
  terms: string;
};

export type VoucherItemCustomer = VoucherType[];
