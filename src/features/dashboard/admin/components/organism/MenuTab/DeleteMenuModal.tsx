import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteMenu } from '../../../hooks/menu.hook';
import { useToast } from '@/components/shared/ToastProvider';
import type { BaseMenu } from '../../../types/menu';
import { COLOR } from '@/constants/Style';
import { AxiosError } from 'axios';

const { BUTTON_CANCEL } = COLOR;

interface DeleteMenuModalProps {
  open: boolean;
  onClose: () => void;
  menuItem: BaseMenu;
}

const DeleteMenuModal = ({ open, onClose, menuItem }: DeleteMenuModalProps) => {
  const { doDeleteMenu, isPending: isLoadingDelete } = useDeleteMenu();
  const { addToast } = useToast();

  const getLoadingMessage = () => {
    if (isLoadingDelete) return 'Menghapus menu...';
    return 'Loading...';
  };

  const isLoading = isLoadingDelete || false;

  const handleDelete = async () => {
    try {
      const response = await doDeleteMenu(menuItem.id);

      if (response.success) {
        addToast(response.message || 'Menu berhasil dihapus', 'success', 3000);
        onClose();
      } else {
        addToast(response.message || 'Gagal menghapus menu', 'error', 3000);
      }
    } catch (err) {
      let message = 'Gagal menghapus menu';

      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message || message;
      }

      addToast(message, 'error', 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white to-[#faf9f7] shadow-xl">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-xl font-bold text-transparent">
            Hapus Menu
          </DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data menu yang dihapus akan
            hilang permanen dari sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 text-sm text-gray-700">
          Apakah Anda yakin ingin menghapus menu{' '}
          <span className="font-semibold text-[#6f4e37]">
            &quot;{menuItem.name}&quot;
          </span>
          ?
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className={`h-12 ${BUTTON_CANCEL} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Batalkan
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            className={`h-12 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md hover:from-red-500 hover:to-red-600 ${isLoading ? 'opacity-90' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{getLoadingMessage()}</span>
              </div>
            ) : (
              <>
                <span className="text-white">Hapus Menu</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMenuModal;
