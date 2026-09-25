import React, { useState } from 'react';

const HrRequestsView = ({ hrRequests, activeRole, onOpenRequestModal, onUpdateHrRequestStatus }) => {
  const [filterStatus, setFilterStatus] = useState('');

  const filteredRequests = hrRequests.filter(r => !filterStatus || r.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Demandes RH</h2>
          <p className="text-xs text-slate-500 mt-0.5">Traitement des demandes d'attestation, fiches de paie et documents administratifs.</p>
        </div>
        <button
          onClick={onOpenRequestModal}
          className="btn-primary text-xs px-4 py-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nouvelle Demande RH</span>
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Référence</th>
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Type de Demande</th>
                <th className="p-4">Date Soumission</th>
                <th className="p-4">Statut</th>
                {(activeRole === 'RH' || activeRole === 'Admin') && <th className="p-4 text-right">Action RH</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredRequests.map((r) => {
                const empName = r.employee ? `${r.employee.first_name} ${r.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{r.reference}</td>
                    <td className="p-4 font-semibold text-slate-900">{empName}</td>
                    <td className="p-4 font-bold text-[#0F766E]">{r.type}</td>
                    <td className="p-4">{r.request_date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'Acceptée' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        r.status === 'Nouvelle' ? 'bg-[#e6f7f4] text-[#0F766E] border border-[#0F766E]/20' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    {(activeRole === 'RH' || activeRole === 'Admin') && (
                      <td className="p-4 text-right">
                        {r.status !== 'Acceptée' ? (
                          <button
                            onClick={() => onUpdateHrRequestStatus(r.id, 'Acceptée', 'Document généré et transmis')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-all cursor-pointer"
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
