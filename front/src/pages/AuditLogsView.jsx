import React from 'react';

const AuditLogsView = ({ auditLogs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Journalisation des Actions (Audit Logs)</h2>
        <p className="text-xs text-slate-500 mt-0.5">Traçabilité complète des opérations (utilisateur, module, action, date, adresse IP).</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="p-4">Horodatage</th>
              <th className="p-4">Utilisateur</th>
              <th className="p-4">Rôle</th>
              <th className="p-4">Action</th>
              <th className="p-4">Module</th>
              <th className="p-4">Cible / Élément</th>
              <th className="p-4">Adresse IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                <td className="p-4 font-bold text-slate-900">{log.user_name}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">{log.role}</span>
                </td>
                <td className="p-4 font-semibold text-blue-600">{log.action}</td>
                <td className="p-4 font-medium text-slate-800">{log.module}</td>
                <td className="p-4 font-mono text-slate-600">{log.target_item}</td>
                <td className="p-4 font-mono text-slate-400">{log.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsView;
