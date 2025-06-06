import { lucideIcons } from '@/icon/lucide-react-icons';

const BenefitRegister = () => {
  const { Check } = lucideIcons;
  return (
    <div className="mt-8 rounded-lg bg-[#e6d9c9]/30 p-4">
      <h3 className="mb-3 font-semibold text-[#6f4e37]">
        Keuntungan Menjadi Member:
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#6f4e37]" />
          <span className="text-sm text-[#8c7158]">
            Promo eksklusif setiap bulan
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#6f4e37]" />
          <span className="text-sm text-[#8c7158]">
            Poin reward setiap pembelian
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#6f4e37]" />
          <span className="text-sm text-[#8c7158]">
            Akses prioritas ke workshop kopi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#6f4e37]" />
          <span className="text-sm text-[#8c7158]">Notifikasi menu baru</span>
        </div>
      </div>
    </div>
  );
};
export default BenefitRegister;
