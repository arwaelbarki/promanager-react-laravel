import React from 'react';

const NotificationsView = ({ notifications, onMarkRead }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Centre de Notifications</h2>
          <p className="text-xs text-slate-500 mt-0.5">Alertes automatiques (demandes de congés, alertes de contrats, nouveaux documents).</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 flex items-start justify-between gap-4 transition-colors ${n.is_read ? 'bg-white' : 'bg-blue-50/40'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                n.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                <span className="material-symbols-outlined text-2xl">
                  {n.type === 'warning' ? 'warning' : n.type === 'success' ? 'check_circle' : 'notifications'}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                <span className="text-[11px] text-slate-400 block mt-1">Reçu récemment</span>
              </div>
            </div>

            {!n.is_read && (
              <button
                onClick={() => onMarkRead(n.id)}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs rounded-lg transition-all cursor-pointer shrink-0"
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
