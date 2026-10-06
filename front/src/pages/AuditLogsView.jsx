import React from 'react';

const AuditLogsView = ({ auditLogs, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-[#E5DEC9]'}`}>
        <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
          isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
        }`}>Journalisation des Actions (Audit Logs)</h2>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Traçabilité complète des opérations (utilisateur, module, action, date, adresse IP).</p>
      </div>

      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
            }`}>
              <th className="p-4">Horodatage</th>
              <th className="p-4">Utilisateur</th>
              <th className="p-4">Rôle</th>
              <th className="p-4">Action</th>
              <th className="p-4">Module</th>
              <th className="p-4">Cible / Élément</th>
              <th className="p-4">Adresse IP</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
            {auditLogs.map((log) => (
              <tr key={log.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                <td className={`p-4 font-mono ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{new Date(log.created_at).toLocaleString()}</td>
                <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{log.user_name}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded border font-bold text-[10px] ${
                    isDark ? 'bg-[#100817] text-[#D9AE3A] border-white/10' : 'bg-[#FAF6F0] text-[#D4AF37] border-[#E5DEC9]'
                  }`}>{log.role}</span>
                </td>
                <td className={`p-4 font-semibold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{log.action}</td>
                <td className={`p-4 font-medium ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{log.module}</td>
                <td className={`p-4 font-mono ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{log.target_item}</td>
                <td className={`p-4 font-mono ${isDark ? 'text-[#B8A9BD]/60' : 'text-[#9CA3AF]'}`}>{log.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsView;
