import React, { useState } from 'react';

const LeavesView = ({ leaves, activeRole, onOpenLeaveModal, onUpdateLeaveStatus, theme = 'light' }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [hrComment, setHrComment] = useState('');

  const isDark = theme === 'dark';

  const filteredLeaves = leaves.filter(l => !selectedStatus || l.status === selectedStatus);

  const handleApprove = (id) => {
    onUpdateLeaveStatus(id, 'Acceptée', hrComment || 'Demande validée par le service RH');
    setHrComment('');
  };

  const handleReject = (id) => {
    onUpdateLeaveStatus(id, 'Refusée', hrComment || 'Demande refusée pour raisons de service');
    setHrComment('');
  };

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
          }`}>Gestion des Congés</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Traitement des demandes, validation et suivi des soldes.
          </p>
        </div>
        <button
          onClick={onOpenLeaveModal}
          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
            isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Demander un Congé</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`p-4 rounded-2xl border shadow-xs flex items-center gap-4 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Filtrer par Statut :</span>
        <div className="flex items-center gap-2">
          {['', 'En attente', 'Acceptée', 'Refusée'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st 
                  ? isDark ? 'bg-[#D9AE3A] text-[#100817] font-extrabold shadow-xs' : 'bg-[#D4AF37] text-white font-extrabold shadow-xs'
                  : isDark ? 'bg-[#100817] text-[#B8A9BD] hover:text-[#F7F1E7] border border-white/10' : 'bg-[#FAF6F0] text-[#6B7280] hover:text-[#1A1A24] border border-[#E5DEC9]'
              }`}
            >
              {st === '' ? 'Tous' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leaves Table */}
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
                <th className="p-4">Type de Congé</th>
                <th className="p-4">Période</th>
                <th className="p-4">Durée</th>
                <th className="p-4">Statut</th>
                {(activeRole === 'RH' || activeRole === 'Admin') && <th className="p-4 text-right">Actions RH</th>}
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {filteredLeaves.map((l) => {
                const empName = l.employee ? `${l.employee.first_name} ${l.employee.last_name}` : 'Collaborateur';
                const leaveTypeName = l.leave_type?.name || 'Congé';

                return (
                  <tr key={l.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                    <td className={`p-4 font-mono font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{l.reference}</td>
                    <td className={`p-4 font-semibold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{empName}</td>
                    <td className="p-4">{leaveTypeName}</td>
                    <td className={`p-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Du {l.start_date} au {l.end_date}</td>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{l.total_days} jours</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'Acceptée' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                        l.status === 'En attente' ? isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30' :
                        'bg-rose-500/10 text-rose-600 border border-rose-500/20'
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
                              className={`px-2.5 py-1 font-extrabold rounded-lg text-[11px] transition-all cursor-pointer ${
                                isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
                              }`}
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => handleReject(l.id)}
                              className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-[11px] transition-all cursor-pointer"
                            >
                              Refuser
                            </button>
                          </>
                        ) : (
                          <span className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Traité</span>
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
