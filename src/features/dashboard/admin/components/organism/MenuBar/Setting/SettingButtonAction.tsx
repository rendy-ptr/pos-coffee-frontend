import { Button } from '@/components/ui/button';
import { lucideIcons } from '@/icon/lucide-react-icons';

const { Save } = lucideIcons;

interface ISettingButtonActionProps {
  isLoading: boolean;
  resetForm: () => void;
  getLoadingMessage: () => string;
}

const SettingButtonAction = ({
  isLoading,
  resetForm,
  getLoadingMessage,
}: ISettingButtonActionProps) => {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-[#e6d9c9]/70 bg-gradient-to-r from-white/95 via-[#fdf5ec]/95 to-white p-5 shadow-[0_24px_48px_-32px_rgba(111,78,55,0.4)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3ece3] text-[#6f4e37] shadow-sm">
          <Save className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#5d4130]">
            Simpan semua perubahan yang sudah Anda lakukan
          </p>
          <p className="text-xs text-[#8c7158]">
            Perubahan akan langsung diterapkan setelah disimpan.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center sm:gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={isLoading}
          className="h-11 rounded-xl border border-[#e6d9c9]/70 bg-white px-5 text-sm font-semibold text-[#5d4130] shadow-sm transition hover:border-[#6f4e37] hover:bg-[#f3ece3]"
        >
          Reset Form
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-6 text-sm font-semibold text-white shadow-sm transition hover:from-[#5b3f2d] hover:to-[#7a5033] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>{getLoadingMessage()}</span>
            </div>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingButtonAction;
