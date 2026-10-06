import React from 'react';

const NotificationsView = ({ notifications, onMarkRead, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <div className={`flex items-center justify-between border-b pb-5 ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>Centre de Notifications</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Alertes automatiques (demandes de congés, alertes de contrats, nouveaux documents).</p>
        </div>
      </div>

      <div className={`rounded-2xl border shadow-xs divide-y overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 divide-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] divide-[#E5DEC9] text-[#1A1A24]'
      }`}>
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 flex items-start justify-between gap-4 transition-colors ${
            n.is_read 
              ? isDark ? 'bg-[#180D21]' : 'bg-white'
              : isDark ? 'bg-[#211027]' : 'bg-[#FAF6F0]'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                n.type === 'warning' ? isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border-[#D4AF37]/30' :
                n.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                isDark ? 'bg-[#D9AE3A]/10 text-[#D9AE3A] border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#D4AF37] border-[#D4AF37]/30'
              }`}>
                <span className="material-symbols-outlined text-2xl">
                  {n.type === 'warning' ? 'warning' : n.type === 'success' ? 'check_circle' : 'notifications'}
                </span>
              </div>
              <div>
                <h4 className={`font-bold text-sm ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{n.title}</h4>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{n.message}</p>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-[#B8A9BD]/70' : 'text-[#9CA3AF]'}`}>Reçu récemment</span>
              </div>
            </div>

            {!n.is_read && (
              <button
                onClick={() => onMarkRead(n.id)}
                className={`px-3 py-1 border font-bold text-xs rounded-lg transition-all cursor-pointer shrink-0 ${
                  isDark ? 'bg-[#100817] hover:bg-white/5 text-[#D9AE3A] border-[#D9AE3A]/40' : 'bg-[#FAF6F0] hover:bg-slate-100 text-[#D4AF37] border-[#D4AF37]/40'
                }`}
              >
                Marquer comme lue
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
