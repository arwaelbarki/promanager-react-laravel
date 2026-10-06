import React, { useState } from 'react';

const HrRequestsView = ({ hrRequests, activeRole, onOpenRequestModal, onUpdateHrRequestStatus, theme = 'light' }) => {
  const [filterStatus, setFilterStatus] = useState('');

  const isDark = theme === 'dark';

  const filteredRequests = hrRequests.filter(r => !filterStatus || r.status === filterStatus);

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>Gestion des Demandes RH</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Traitement des demandes d'attestation, fiches de paie et documents administratifs.
          </p>
        </div>
        <button
          onClick={onOpenRequestModal}
          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
            isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nouvelle Demande RH</span>
        </button>
      </div>

      {/* Requests Table */}
      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <th className="p-4">Référence</th>
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Type de Demande</th>
                <th className="p-4">Date Soumission</th>
                <th className="p-4">Statut</th>
                {(activeRole === 'RH' || activeRole === 'Admin') && <th className="p-4 text-right">Action RH</th>}
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {filteredRequests.map((r) => {
                const empName = r.employee ? `${r.employee.first_name} ${r.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={r.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                    <td className={`p-4 font-mono font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{r.reference}</td>
                    <td className={`p-4 font-semibold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{empName}</td>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{r.type}</td>
                    <td className={`p-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{r.request_date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'Acceptée' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                        r.status === 'Nouvelle' ? isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30' :
                        'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    {(activeRole === 'RH' || activeRole === 'Admin') && (
                      <td className="p-4 text-right">
                        {r.status !== 'Acceptée' ? (
                          <button
                            onClick={() => onUpdateHrRequestStatus(r.id, 'Acceptée', 'Document généré et transmis')}
                            className={`px-2.5 py-1 font-extrabold rounded-lg text-[11px] transition-all cursor-pointer ${
                              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
                            }`}
                          >
                            Traiter & Accorder
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px]">✓ Traitée</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrRequestsView;
