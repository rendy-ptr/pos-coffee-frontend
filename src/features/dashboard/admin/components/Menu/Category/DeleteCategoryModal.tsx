import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteCategory } from '../../../hooks/categoryHooks';
import { useToast } from '@/components/shared/ToastProvider';
import type { Category } from '../../../types/category';

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

const DeleteCategoryModal = ({
  open,
  onClose,
  category,
}: DeleteCategoryModalProps) => {
  const { doDeleteCategory, isPending } = useDeleteCategory();
  const { addToast } = useToast();

  const handleDelete = async () => {
    if (!category) return;
    try {
      await doDeleteCategory(category.id);
      addToast('Kategori berhasil dihapus', 'success', 3000);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        addToast(err.message || 'Gagal menghapus kategori', 'error', 3000);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] shadow-xl">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-xl font-bold text-transparent">
            Hapus Kategori
          </DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data kategori yang dihapus akan
            hilang permanen dari sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 text-sm text-gray-700">
          Apakah Anda yakin ingin menghapus kategori{' '}
          <span className="font-semibold text-[#6f4e37]">
            &quot;{category?.name}&quot;
          </span>
          ?
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-[#e6d9c9]/70 text-[#6f4e37] hover:bg-[#6f4e37]/10"
          >
            Batal
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md hover:from-red-500 hover:to-red-600"
          >
            {isPending ? 'Menghapus...' : 'Ya, Hapus'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;
