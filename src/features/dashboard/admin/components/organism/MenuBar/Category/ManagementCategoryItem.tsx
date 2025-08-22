import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';
import type { Category } from '../../../../types/category';
import EditCategoryModal from './EditCategoryModal';
import { useState } from 'react';
import DeleteCategoryModal from './DeleteCategoryModal';

interface IManagementCategoryItemProps {
  item: Category;
}

const getStatusConfig = (isActive: boolean) => {
  if (isActive) {
    return {
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      text: 'Aktif',
      dot: 'bg-emerald-500',
      ringColor: 'ring-emerald-500/20',
    };
  }

  return {
    bgColor: 'bg-gradient-to-r from-gray-400 to-gray-500',
    textColor: 'text-white',
    text: 'Tidak Aktif',
    dot: 'bg-gray-400',
    ringColor: 'ring-gray-400/20',
  };
};

const ManagementCategoryItem = ({ item }: IManagementCategoryItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { Edit, Trash2 } = lucideIcons;

  type LucideIconKeys = keyof typeof lucideIcons;
  const IconComponent =
    lucideIcons[item.icon as LucideIconKeys] || lucideIcons.HelpCircle;
  const statusConfig = getStatusConfig(item.isActive);

  return (
    <div className="group rounded-xl border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:border-[#6f4e37]/30 hover:shadow-md">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          {/* Left: icon & info */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10 shadow-sm">
              <IconComponent className="h-6 w-6 text-[#6f4e37]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#6f4e37]">{item.name}</h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                <span
                  className={`mr-1 inline-block h-2 w-2 rounded-full ${statusConfig.dot}`}
                ></span>
                {statusConfig.text}
              </span>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/20 text-[#6f4e37] hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white"
              onClick={() => setIsDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 items-center gap-4 lg:gap-6">
          {/* Left: icon & info */}
          <div className="col-span-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#6f4e37]/10 to-[#8b5e3c]/10 shadow-sm">
              <IconComponent className="h-7 w-7 text-[#6f4e37]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#6f4e37]">
                {item.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                <span
                  className={`mr-1 inline-block h-2 w-2 rounded-full ${statusConfig.dot}`}
                ></span>
                {statusConfig.text}
              </span>
            </div>
          </div>

          {/* Right: actions */}
          <div className="col-span-6 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6f4e37]/20 px-4 text-sm text-[#6f4e37] hover:border-transparent hover:bg-gradient-to-r hover:from-[#6f4e37] hover:to-[#8b5e3c] hover:text-white"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white"
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
        category={item}
      />
      <DeleteCategoryModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        category={item}
      />
    </div>
  );
};

export default ManagementCategoryItem;
