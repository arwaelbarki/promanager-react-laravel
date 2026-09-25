import React from 'react';

const AbsencesView = ({ absences, onOpenNewAbsenceModal }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Absences</h2>
          <p className="text-xs text-slate-500 mt-0.5">Suivi des absences non autorisées, arrêts maladie et justificatifs.</p>
        </div>
        <button
          onClick={onOpenNewAbsenceModal}
          className="btn-primary text-xs px-4 py-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Enregistrer une Absence</span>
        </button>
      </div>

      {/* Absences Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Date de l'Absence</th>
                <th className="p-4">Type d'Absence</th>
                <th className="p-4">Motif Saisi</th>
                <th className="p-4">Justificatif</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {absences.map((a) => {
                const empName = a.employee ? `${a.employee.first_name} ${a.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{empName}</td>
                    <td className="p-4 font-mono">{a.date}</td>
                    <td className="p-4 font-semibold text-slate-800">{a.type}</td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{a.reason || 'Aucun motif renseigné'}</td>
                    <td className="p-4">
                      {a.proof_document_path ? (
                        <span className="text-[#0F766E] font-semibold flex items-center gap-1 cursor-pointer">
                          <span className="material-symbols-outlined text-sm">description</span> Voir le justificatif
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Aucune pièce</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.is_justified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {a.is_justified ? 'Justifiée' : 'Non Justifiée'}
                      </span>
                    </td>
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

export default AbsencesView;
