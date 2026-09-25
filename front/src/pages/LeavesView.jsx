import React, { useState } from 'react';

const LeavesView = ({ leaves, activeRole, onOpenLeaveModal, onUpdateLeaveStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [processLeaveId, setProcessLeaveId] = useState(null);
  const [hrComment, setHrComment] = useState('');

  const filteredLeaves = leaves.filter(l => !selectedStatus || l.status === selectedStatus);

  const handleApprove = (id) => {
    onUpdateLeaveStatus(id, 'Acceptée', hrComment || 'Demande validée par le service RH');
    setProcessLeaveId(null);
    setHrComment('');
  };

  const handleReject = (id) => {
    onUpdateLeaveStatus(id, 'Refusée', hrComment || 'Demande refusée pour raisons de service');
    setProcessLeaveId(null);
    setHrComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Congés</h2>
          <p className="text-xs text-slate-500 mt-0.5">Traitement des demandes, validation et suivi des soldes.</p>
        </div>
        <button
          onClick={onOpenLeaveModal}
          className="btn-primary text-xs px-4 py-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Demander un Congé</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
        <span className="text-xs font-semibold text-slate-500">Filtrer par Statut :</span>
        <div className="flex items-center gap-2">
          {['', 'En attente', 'Acceptée', 'Refusée'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st ? 'bg-[#0F766E] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === '' ? 'Tous' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leaves Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Référence</th>
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Type de Congé</th>
                <th className="p-4">Période</th>
                <th className="p-4">Durée</th>
                <th className="p-4">Statut</th>
                {(activeRole === 'RH' || activeRole === 'Admin') && <th className="p-4 text-right">Actions RH</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLeaves.map((l) => {
                const empName = l.employee ? `${l.employee.first_name} ${l.employee.last_name}` : 'Collaborateur';
                const leaveTypeName = l.leave_type?.name || 'Congé';

                return (
                  <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{l.reference}</td>
                    <td className="p-4 font-semibold text-slate-900">{empName}</td>
                    <td className="p-4">{leaveTypeName}</td>
                    <td className="p-4 text-slate-600">Du {l.start_date} au {l.end_date}</td>
                    <td className="p-4 font-bold text-[#0F766E]">{l.total_days} jours</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'Acceptée' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        l.status === 'En attente' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {l.status}
                      </span>
                    </td>

                    {(activeRole === 'RH' || activeRole === 'Admin') && (
                      <td className="p-4 text-right space-x-2">
                        {l.status === 'En attente' ? (
                          <>
                            <button
                              onClick={() => handleApprove(l.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-all cursor-pointer"
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => handleReject(l.id)}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] transition-all cursor-pointer"
                            >
                              Refuser
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Traité</span>
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

export default LeavesView;
