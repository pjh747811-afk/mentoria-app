import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto transition-all animate-bounce">
      <div className="bg-[#2d3133] text-[#eff1f3] px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="material-symbols-outlined text-[#89f5e7] text-[20px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span className="text-xs sm:text-sm font-medium leading-snug truncate sm:whitespace-normal">
            {message}
          </span>
        </div>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="p-1 text-[#eff1f3]/80 hover:text-white shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
