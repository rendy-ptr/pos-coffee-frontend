import React, { createContext, useContext, useState, useEffect } from 'react';
import { toastController } from '@/utils/toastController';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
  isExiting: boolean;
}

interface ToastContextType {
  addToast: (message: string, type: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [startTimes, setStartTimes] = useState<{ [key: string]: number }>({});

  const addToast = (message: string, type: Toast['type'], duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [
      ...prev,
      { id, message, type, duration, isExiting: false },
    ]);
    setProgress(prev => ({ ...prev, [id]: 100 }));
    setStartTimes(prev => ({ ...prev, [id]: Date.now() }));
  };

  const removeToast = (id: string) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, isExiting: true } : toast
      )
    );
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
      setProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[id];
        return newProgress;
      });
      setStartTimes(prev => {
        const newStartTimes = { ...prev };
        delete newStartTimes[id];
        return newStartTimes;
      });
    }, 400);
  };

  // 🔹 sinkronkan dengan toastController
  useEffect(() => {
    toastController.setHandler(addToast);
  }, []);

  useEffect(() => {
    if (toasts.length > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = { ...prev };
          toasts.forEach(toast => {
            if (!toast.isExiting) {
              const elapsed = Date.now() - startTimes[toast.id];
              const remaining = Math.max(0, toast.duration - elapsed);
              newProgress[toast.id] = (remaining / toast.duration) * 100;

              if (elapsed >= toast.duration) {
                removeToast(toast.id);
              }
            }
          });
          return newProgress;
        });
      }, 16);
      return () => clearInterval(interval);
    }
  }, [toasts, startTimes]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-8 right-8 z-50 w-full max-w-[20rem] space-y-4 sm:max-w-[24rem]">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-4 rounded-2xl border border-[#e6d9c9]/50 bg-white/70 p-5 shadow-2xl backdrop-blur-md transition-all duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${toast.type === 'success' ? 'bg-[#f0e9e1]/70' : toast.type === 'error' ? 'bg-[#fff1f1]/70' : 'bg-[#e6f3fa]/70'} ${toast.isExiting ? 'animate-toast-out' : 'animate-toast-in'} `}
            style={{
              animation: toast.isExiting
                ? 'toastOut 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
                : 'toastIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <svg
                  className="h-5 w-5 text-[#8b5e3c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg
                  className="h-5 w-5 text-[#8b5e3c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg
                  className="h-5 w-5 text-[#8b5e3c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20h.01"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-base leading-tight font-medium text-[#6f4e37]">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 cursor-pointer text-sm font-medium text-[#8c7158] transition-colors duration-200 hover:text-[#6f4e37]"
            >
              ✕
            </button>
            <div className="absolute right-2 bottom-2 left-2 h-1.5 overflow-hidden rounded-full bg-[#e6d9c9]/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b5e3c] to-[#a66a4c] transition-all duration-[16ms] ease-linear"
                style={{ width: `${progress[toast.id] || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes toastIn {
            from {
              transform: translateX(80%) scale(0.9);
              opacity: 0;
              filter: blur(1.5px);
            }
            to {
              transform: translateX(0) scale(1);
              opacity: 1;
              filter: blur(0);
            }
          }
          @keyframes toastOut {
            from {
              transform: translateY(0) scale(1);
              opacity: 1;
              filter: blur(0);
            }
            to {
              transform: translateY(-40px) scale(0.9);
              opacity: 0;
              filter: blur(1.5px);
            }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
