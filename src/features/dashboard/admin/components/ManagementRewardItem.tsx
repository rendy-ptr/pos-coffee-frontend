import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { CHILDREN_SHADOW_CARD_STYLE } from '@/constants/Style';

interface IManagementRewardItemProps {
  reward: {
    id: number;
    name: string;
    points?: number | null;
    description: string;
    status: 'aktif' | 'nonaktif';
    type: 'reward' | 'voucher';
    terms?: string;
    expiredAt?: string;
    secretCode?: string;
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const getStatusConfig = (status: string) => {
  const configs = {
    aktif: {
      bgColor: 'bg-emerald-500',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-400',
    },
    nonaktif: {
      bgColor: 'bg-gray-500',
      textColor: 'text-white',
      text: 'Tidak Aktif',
      dot: 'bg-gray-400',
    },
  };

  return configs[status as keyof typeof configs] || configs.aktif;
};

const getTypeConfig = (type: string) => {
  const configs = {
    reward: {
      bgColor: 'bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c]',
      textColor: 'text-white',
      text: 'Reward',
      iconBg: 'bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10',
      iconColor: 'text-[#6f4e37]',
      icon: 'Gift',
      borderColor: 'border-[#6f4e37]/20',
    },
    voucher: {
      bgColor: 'bg-gradient-to-r from-[#8b5e3c] to-[#a0744a]',
      textColor: 'text-white',
      text: 'Voucher',
      iconBg: 'bg-gradient-to-br from-[#8b5e3c]/10 to-[#a0744a]/10',
      iconColor: 'text-[#8b5e3c]',
      icon: 'Ticket',
      borderColor: 'border-[#8b5e3c]/20',
    },
  };

  return configs[type as keyof typeof configs] || configs.reward;
};

const ManagementRewardItem = ({
  reward,
  onEdit,
  onDelete,
}: IManagementRewardItemProps) => {
  const {
    Edit,
    Trash2,
    Gift,
    Ticket,
    Clock,
    AlertTriangle,
    Coffee,
    Hash,
    Copy,
  } = lucideIcons;
  const statusConfig = getStatusConfig(reward.status);
  const typeConfig = getTypeConfig(reward.type);

  const IconComponent = typeConfig.icon === 'Gift' ? Gift : Ticket;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(reward.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(reward.id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = (dateString?: string) => {
    if (!dateString) return null;
    const expireDate = new Date(dateString);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilExpiry(reward.expiredAt);
  const isExpiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;

  return (
    <div
      className={`rounded-xl border ${typeConfig.borderColor} bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:border-[#6f4e37]/30 hover:shadow-lg lg:p-6 ${CHILDREN_SHADOW_CARD_STYLE}`}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="mb-4 flex items-start gap-4">
          {/* Icon & Type */}
          <div className="flex-shrink-0">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg shadow-sm ${typeConfig.iconBg} border ${typeConfig.borderColor}`}
            >
              <IconComponent className={`h-6 w-6 ${typeConfig.iconColor}`} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            {/* Header */}
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h3 className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-base font-semibold text-transparent">
                  {reward.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ${typeConfig.bgColor} ${typeConfig.textColor}`}
                  >
                    {typeConfig.text}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                    ></div>
                    {statusConfig.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mb-3 text-sm text-[#8c7158]">{reward.description}</p>

            {/* Info Grid */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              {reward.points && (
                <div className="rounded-lg border border-amber-200/50 bg-gradient-to-br from-amber-50 to-yellow-50 p-3">
                  <div className="flex items-center gap-1 text-xs text-amber-700">
                    <Coffee className="h-3 w-3" />
                    Poin Diperlukan
                  </div>
                  <div className="mt-1 font-semibold text-amber-800">
                    {reward.points.toLocaleString()}
                  </div>
                </div>
              )}

              {reward.secretCode && (
                <div className="rounded-lg border border-[#6f4e37]/30 bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10 p-3">
                  <div className="flex items-center gap-1 text-xs text-[#6f4e37]">
                    <Hash className="h-3 w-3" />
                    Kode Voucher
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#6f4e37]">
                      {reward.secretCode}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(reward.secretCode || '')
                      }
                      className="text-[#6f4e37]/60 transition-colors hover:text-[#6f4e37]"
                      title="Copy kode"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}

              {reward.expiredAt && (
                <div
                  className={`rounded-lg border p-3 ${
                    isExpiringSoon
                      ? 'border-red-200/50 bg-gradient-to-br from-red-50 to-orange-50'
                      : 'border-[#6f4e37]/20 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5'
                  } ${reward.secretCode ? 'col-span-2' : ''}`}
                >
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      isExpiringSoon ? 'text-red-700' : 'text-[#8c7158]'
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {isExpiringSoon ? 'Berakhir' : 'Berlaku hingga'}
                  </div>
                  <div
                    className={`mt-1 font-semibold ${
                      isExpiringSoon ? 'text-red-800' : 'text-[#6f4e37]'
                    }`}
                  >
                    {isExpiringSoon
                      ? `${daysLeft} hari lagi`
                      : formatDate(reward.expiredAt)}
                  </div>
                </div>
              )}
            </div>

            {/* Terms (if exists) */}
            {reward.terms && (
              <div className="mb-4 rounded-lg border border-[#6f4e37]/20 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-3">
                <div className="mb-1 text-xs font-medium text-[#6f4e37]">
                  Syarat & Ketentuan:
                </div>
                <div className="text-xs text-[#8c7158]">{reward.terms}</div>
              </div>
            )}

            {/* Expiry Warning */}
            {isExpiringSoon && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-medium text-amber-800">
                  Reward akan berakhir dalam {daysLeft} hari
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#6f4e37]/30 text-sm text-[#6f4e37] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white"
                onClick={handleEdit}
              >
                <Edit className="mr-1.5 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-red-200 text-red-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white"
                onClick={handleDelete}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-start gap-6">
          {/* Main Info */}
          <div className="col-span-5 flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-lg shadow-sm ${typeConfig.iconBg} border ${typeConfig.borderColor}`}
              >
                <IconComponent className={`h-7 w-7 ${typeConfig.iconColor}`} />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-lg font-semibold text-transparent">
                  {reward.name}
                </h3>
                <div className="ml-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm ${typeConfig.bgColor} ${typeConfig.textColor}`}
                  >
                    {typeConfig.text}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium shadow-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                    ></div>
                    {statusConfig.text}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#8c7158]">{reward.description}</p>

              {/* Points & Expiry Info */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                {reward.points && (
                  <div className="flex items-center gap-1.5 text-[#6f4e37]">
                    <Coffee className="h-4 w-4 text-amber-600" />
                    <span className="font-medium">
                      {reward.points.toLocaleString()} poin
                    </span>
                  </div>
                )}

                {reward.secretCode && (
                  <div className="flex items-center gap-1.5 text-[#6f4e37]">
                    <Hash className="h-4 w-4" />
                    <span className="rounded bg-[#6f4e37]/10 px-2 py-1 font-mono text-sm font-medium">
                      {reward.secretCode}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(reward.secretCode || '')
                      }
                      className="text-[#6f4e37]/60 transition-colors hover:text-[#6f4e37]"
                      title="Copy kode"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {reward.expiredAt && (
                  <div
                    className={`flex items-center gap-1.5 ${isExpiringSoon ? 'text-red-600' : 'text-[#8c7158]'}`}
                  >
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">
                      {isExpiringSoon
                        ? `${daysLeft} hari lagi`
                        : formatDate(reward.expiredAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="col-span-4">
            {reward.terms ? (
              <div className="rounded-lg border border-[#6f4e37]/20 bg-gradient-to-br from-[#6f4e37]/5 to-[#8b5e3c]/5 p-4">
                <div className="mb-2 text-sm font-medium text-[#6f4e37]">
                  Syarat & Ketentuan:
                </div>
                <div className="text-sm text-[#8c7158]">{reward.terms}</div>
              </div>
            ) : (
              <div className="text-center text-sm text-[#8c7158]/60">
                Tidak ada syarat khusus
              </div>
            )}

            {/* Expiry Warning */}
            {isExpiringSoon && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  Berakhir dalam {daysLeft} hari
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="col-span-3 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/30 text-sm text-[#6f4e37] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white hover:shadow-md"
              onClick={handleEdit}
            >
              <Edit className="mr-1.5 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:shadow-md"
              onClick={handleDelete}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementRewardItem;
