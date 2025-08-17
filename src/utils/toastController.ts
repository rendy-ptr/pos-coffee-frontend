type ToastType = 'success' | 'error' | 'info';

class ToastController {
  private _addToast:
    | ((message: string, type: ToastType, duration?: number) => void)
    | null = null;

  setHandler(
    fn: (message: string, type: ToastType, duration?: number) => void
  ) {
    this._addToast = fn;
  }

  addToast(message: string, type: ToastType, duration?: number) {
    if (this._addToast) {
      this._addToast(message, type, duration);
    } else {
      console.warn('Toast handler belum siap, panggil dalam React tree');
    }
  }
}

export const toastController = new ToastController();
