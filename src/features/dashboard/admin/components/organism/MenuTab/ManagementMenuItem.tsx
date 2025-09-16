import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { useState } from 'react';
import EditMenuModal from '../../molecule/MenuTab/EditMenuModal';
import DeleteMenuModal from '../../molecule/MenuTab/DeleteMenuModal';
import type { BaseMenu } from '../../../types/menu';
import type { BaseCategory } from '../../../types/category';

interface IManagementMenuItemProps {
  menuItem: BaseMenu;
  categories: BaseCategory[];
}

const getStatusConfig = (isActive: boolean) => {
  if (isActive) {
    return {
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-400',
      badge:
        'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100',
    };
  }

  return {
    bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
    textColor: 'text-white',
    text: 'Tidak Aktif',
    dot: 'bg-gray-400',
    badge: 'bg-gray-50 text-gray-600 border-gray-200 ring-gray-100',
  };
};

const ManagementMenuItem = ({
  menuItem,
  categories,
}: IManagementMenuItemProps) => {
  const { Edit, Trash2, TrendingUp, Package, ShoppingCart, DollarSign } =
    lucideIcons;
  const statusConfig = getStatusConfig(menuItem.isActive);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const selling = menuItem.sellingPrice ?? 0;
  const capital = menuItem.productionCapital ?? 0;
  const profit =
    typeof menuItem.profit === 'number' ? menuItem.profit : selling - capital;
  const marginPct = selling > 0 ? (profit / selling) * 100 : 0;

  const statsData = [
    {
      label: 'Harga Jual',
      value: formatCurrency(selling),
      icon: DollarSign,
      color: 'from-[#6f4e37]/10 to-[#8b5e3c]/15',
      textColor: 'text-[#6f4e37]',
      borderColor: 'border-[#6f4e37]/20',
      iconBg: 'bg-[#6f4e37]/10',
    },
    {
      label: 'Modal',
      value: formatCurrency(capital),
      icon: Package,
      color: 'from-slate-50 to-slate-100',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-200',
      iconBg: 'bg-slate-100',
    },
    {
      label: 'Profit',
      value: formatCurrency(profit),
      secondaryValue: `${marginPct.toFixed(0)}%`,
      icon: TrendingUp,
      color:
        profit >= 0
          ? 'from-emerald-50 to-emerald-100'
          : 'from-red-50 to-red-100',
      textColor: profit >= 0 ? 'text-emerald-600' : 'text-red-600',
      borderColor: profit >= 0 ? 'border-emerald-200' : 'border-red-200',
      iconBg: profit >= 0 ? 'bg-emerald-100' : 'bg-red-100',
    },
    {
      label: 'Stok',
      value: menuItem.stock?.toLocaleString() ?? '0',
      icon: Package,
      color: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
    },
    {
      label: 'Terjual',
      value: menuItem.soldCount?.toLocaleString() ?? '0',
      icon: ShoppingCart,
      color: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
    },
  ];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6f4e37]/20 hover:shadow-xl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/2 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Mobile Layout */}
      <div className="relative block p-6 lg:hidden">
        {/* Header Section */}
        <div className="mb-6 flex items-start gap-4">
          <div className="relative flex-shrink-0">
            {menuItem.imageUrl ? (
              <img
                src={menuItem.imageUrl}
                alt={menuItem.name}
                loading="lazy"
                className="h-20 w-20 rounded-2xl object-cover shadow-lg ring-2 ring-white"
                onError={e => {
                  e.currentTarget.src = 'https://via.placeholder.com/80';
                }}
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-2 ring-white">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
            {/* Status indicator dot */}
            <div
              className={`absolute -top-2 -right-2 h-6 w-6 rounded-full ${statusConfig.dot} shadow-lg ring-2 ring-white`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 line-clamp-2 text-xl font-bold text-gray-900">
              {menuItem.name}
            </h3>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {menuItem.category.name}
              </span>
              <span
                className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ring-1 ${statusConfig.badge}`}
              >
                {statusConfig.text}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#6f4e37]/20 text-[#6f4e37] transition-all duration-200 hover:border-[#6f4e37] hover:bg-[#6f4e37] hover:text-white"
                onClick={() => setIsEditOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl border bg-gradient-to-br p-4 ${stat.color} ${stat.borderColor} transition-all duration-200 hover:shadow-md`}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`rounded-lg p-1.5 ${stat.iconBg}`}>
                  <stat.icon className="h-3.5 w-3.5 text-gray-600" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-600">
                    {stat.label}
                  </span>
                  {stat.secondaryValue && (
                    <span
                      className={`text-xs font-medium ${stat.textColor} opacity-80`}
                    >
                      ({stat.secondaryValue})
                    </span>
                  )}
                </div>
              </div>
              <div className={`text-sm font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="relative hidden p-6 lg:block">
        <div className="flex items-start gap-6">
          {/* Left side - Product info */}
          <div
            className="flex min-w-0 items-start gap-4"
            style={{ width: '320px' }}
          >
            <div className="relative flex-shrink-0">
              {menuItem.imageUrl ? (
                <img
                  src={menuItem.imageUrl}
                  alt={menuItem.name}
                  loading="lazy"
                  className="h-24 w-24 rounded-2xl object-cover shadow-lg ring-2 ring-white"
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/96';
                  }}
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-2 ring-white">
                  <Package className="h-10 w-10 text-gray-400" />
                </div>
              )}
              {/* Status indicator dot */}
              <div
                className={`absolute -top-2 -right-2 h-6 w-6 rounded-full ${statusConfig.dot} shadow-lg ring-2 ring-white`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 line-clamp-2 text-xl font-bold text-gray-900">
                {menuItem.name}
              </h3>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {menuItem.category.name}
                </span>
                <span
                  className={`inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium ring-1 ${statusConfig.badge}`}
                >
                  {statusConfig.text}
                </span>
              </div>
            </div>
          </div>

          {/* Center - Stats */}
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-3">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-xl border bg-gradient-to-br p-3 ${stat.color} ${stat.borderColor} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`rounded-lg p-1 ${stat.iconBg}`}>
                      <stat.icon className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="flex flex-1 items-center gap-1">
                      <span className="text-xs font-medium text-gray-600">
                        {stat.label}
                      </span>
                      {stat.secondaryValue && (
                        <span
                          className={`text-xs font-medium ${stat.textColor} flex-shrink-0 opacity-80`}
                        >
                          ({stat.secondaryValue})
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`truncate text-sm font-bold ${stat.textColor}`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/20 px-4 text-[#6f4e37] transition-all duration-200 hover:border-[#6f4e37] hover:bg-[#6f4e37] hover:text-white"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => setIsDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <EditMenuModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        menuItem={menuItem}
        categories={categories}
      />
      <DeleteMenuModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        menuItem={menuItem}
      />
    </div>
  );
};

export default ManagementMenuItem;
