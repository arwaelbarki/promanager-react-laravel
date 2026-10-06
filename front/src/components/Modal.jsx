import React from 'react';

const Modal = ({ isOpen, onClose, title, children, theme = 'light' }) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in select-none ${
      isDark ? 'bg-[#100817]/80' : 'bg-black/40'
    }`}>
      <div className={`rounded-2xl shadow-2xl border w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        {/* Modal Header */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
          isDark ? 'bg-[#211027] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'
        }`}>
          <h3 className={`font-serif font-bold text-sm tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>{title}</h3>
          <button
            onClick={onClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-[#B8A9BD] hover:text-[#F7F1E7]' : 'hover:bg-slate-100 text-[#6B7280] hover:text-[#1A1A24]'
            }`}
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
