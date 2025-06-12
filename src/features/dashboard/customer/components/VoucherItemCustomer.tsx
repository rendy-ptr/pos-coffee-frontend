import { useState } from 'react';
import { lucideIcons } from '@/icon/lucide-react-icons';
import type { VoucherType } from '@/types/customer/voucher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VoucherItemCustomerProps {
  voucher: VoucherType;
}

const VoucherItemCustomer = ({ voucher }: VoucherItemCustomerProps) => {
  const { Gift, Copy } = lucideIcons;
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(voucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Gagal menyalin kode:', err);
    }
  };

  return (
    <div className="rounded-2xl border border-[#e6d9c9] bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#6f4e37] md:text-base">
          {voucher.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-yellow-600 md:text-sm">
          <Gift className="h-4 w-4" />
          {voucher.maxDiscount > 0 &&
            `Hingga Rp${voucher.maxDiscount.toLocaleString()}`}
        </div>
      </div>

      <p className="mb-2 text-xs text-[#8c7158] md:text-sm">
        {voucher.description}
      </p>
      <p className="mb-2 text-[11px] text-[#b29a87] md:text-xs">
        {voucher.terms}
      </p>
      <p className="mb-4 text-[11px] text-gray-400 italic md:text-xs">
        Berlaku hingga: {voucher.expirationDate}
      </p>

      {showCode && (
        <div className="mb-3 flex items-center gap-2">
          <Input
            readOnly
            value={voucher.code}
            className="text-center font-mono text-sm text-[#6f4e37]"
          />
          <Button
            type="button"
            onClick={handleCopy}
            disabled={copied}
            size="sm"
            className="cursor-pointer bg-[#6f4e37] px-2 text-white hover:bg-[#5d4130]"
          >
            {copied ? 'Disalin!' : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowCode(prev => !prev)}
        className={`w-full cursor-pointer px-3 py-2 text-xs font-medium md:text-sm ${
          voucher.available
            ? 'bg-[#6f4e37] text-white hover:bg-[#5d4130]'
            : 'cursor-not-allowed bg-gray-200 text-gray-500'
        } rounded-lg transition`}
        disabled={!voucher.available}
      >
        {voucher.available
          ? showCode
            ? 'Sembunyikan Kode'
            : 'Lihat Kode'
          : 'Tidak Tersedia'}
      </Button>
    </div>
  );
};

export default VoucherItemCustomer;
