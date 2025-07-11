import type { IVoucherItems } from '@/types/customer/voucher';

export const availableVouchers: IVoucherItems = [
  {
    id: 1,
    name: 'Diskon 10%',
    description: 'Dapatkan diskon 10% untuk pembelian berikutnya',
    code: 'DISKON10',
    expirationDate: '2025-12-31',
    available: true,
    minPurchase: 100000,
    maxDiscount: 50000,
    terms: 'Berlaku untuk pembelian di atas Rp100.000',
  },
  {
    id: 2,
    name: 'Gratis Ongkir',
    description: 'Nikmati gratis ongkir untuk pembelian berikutnya',
    code: 'ONGKIRGRATIS',
    expirationDate: '2024-11-30',
    available: true,
    minPurchase: 50000,
    maxDiscount: 20000,
    terms: 'Berlaku untuk pembelian di atas Rp50.000',
  },
  {
    id: 3,
    name: 'Diskon 20%',
    description: 'Dapatkan diskon 20% untuk pembelian berikutnya',
    code: 'DISKON20',
    expirationDate: '2024-09-30',
    available: true,
    minPurchase: 150000,
    maxDiscount: 60000,
    terms: 'Berlaku untuk pembelian di atas Rp150.000',
  },
  {
    id: 4,
    name: 'Voucher Spesial',
    description: 'Voucher spesial untuk pelanggan setia',
    code: 'SPESIAL2024',
    expirationDate: '2024-08-31',
    available: true,
    minPurchase: 300000,
    maxDiscount: 100000,
    terms: 'Untuk pelanggan dengan >5 transaksi',
  },
  {
    id: 5,
    name: 'Beli 1 Gratis 1',
    description: 'Beli 1 produk, dapatkan 1 gratis',
    code: 'BUY1GET1',
    expirationDate: '2024-10-31',
    available: false,
    minPurchase: 200000,
    maxDiscount: 0,
    terms: 'Hanya untuk produk tertentu',
  },
];
