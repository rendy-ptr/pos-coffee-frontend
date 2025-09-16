import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import type { BaseCategory } from '../../../../types/category';
import EditCategoryModal from '../../../molecule/MenuBar/Category/EditCategoryModal';
import { useState } from 'react';
import DeleteCategoryModal from '../../../molecule/MenuBar/Category/DeleteCategoryModal';

interface IManagementCategoryItemProps {
  categoryItem: BaseCategory;
}

const getStatusConfig = (isActive: boolean) => {
  if (isActive) {
    return {
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-400',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }

  return {
    bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
    textColor: 'text-white',
    text: 'Tidak Aktif',
    dot: 'bg-gray-400',
    badge: 'bg-gray-50 text-gray-600 border-gray-200',
  };
};

const ManagementCategoryItem = ({
  categoryItem,
}: IManagementCategoryItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { Edit, Trash2 } = lucideIcons;

  type LucideIconKeys = keyof typeof lucideIcons;
  const IconComponent =
    lucideIcons[categoryItem.icon as LucideIconKeys] || lucideIcons.HelpCircle;
  const statusConfig = getStatusConfig(categoryItem.isActive);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6f4e37]/20 hover:shadow-lg">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/2 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Mobile Layout */}
      <div className="relative block lg:hidden">
        {/* Header with icon and status */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/15 shadow-sm ring-1 ring-[#6f4e37]/5">
                <IconComponent className="h-7 w-7 text-[#6f4e37]" />
              </div>
              {/* Status indicator dot */}
              <div
                className={`absolute -top-1 -right-1 h-4 w-4 rounded-full ${statusConfig.dot} shadow-sm ring-2 ring-white`}
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {categoryItem.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium ${statusConfig.badge}`}
              >
                {statusConfig.text}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {categoryItem.description && (
          <div className="mb-4 rounded-lg bg-gray-50/50 p-3">
            <p className="text-sm leading-relaxed text-gray-600">
              {categoryItem.description}
            </p>
          </div>
        )}

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

      {/* Desktop Layout */}
      <div className="relative hidden lg:block">
        <div className="flex items-start gap-6">
          {/* Left side - Icon and main info */}
          <div className="flex flex-1 items-start gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/15 shadow-sm ring-1 ring-[#6f4e37]/5">
                <IconComponent className="h-8 w-8 text-[#6f4e37]" />
              </div>
              {/* Status indicator dot */}
              <div
                className={`absolute -top-1 -right-1 h-5 w-5 rounded-full ${statusConfig.dot} shadow-sm ring-2 ring-white`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="truncate text-xl font-semibold text-gray-900">
                  {categoryItem.name}
                </h3>
                <span
                  className={`inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium ${statusConfig.badge}`}
                >
                  {statusConfig.text}
                </span>
              </div>

              {categoryItem.description && (
                <div className="mt-2">
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {categoryItem.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="ml-4 flex items-center gap-3">
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

      <EditCategoryModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        categoryItem={categoryItem}
      />
      <DeleteCategoryModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        categoryItem={categoryItem}
      />
    </div>
  );
};

export default ManagementCategoryItem;
