import React from 'react';

const AbsencesView = ({ absences, onOpenNewAbsenceModal, theme = 'light' }) => {
  const isDark = theme === 'dark';

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
          }`}>Gestion des Absences</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Suivi des absences non autorisées, arrêts maladie et justificatifs.
          </p>
        </div>
        <button
          onClick={onOpenNewAbsenceModal}
          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
            isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Enregistrer une Absence</span>
        </button>
      </div>

      {/* Absences Table */}
      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Date de l'Absence</th>
                <th className="p-4">Type d'Absence</th>
                <th className="p-4">Motif Saisi</th>
                <th className="p-4">Justificatif</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {absences.map((a) => {
                const empName = a.employee ? `${a.employee.first_name} ${a.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={a.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{empName}</td>
                    <td className={`p-4 font-mono ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{a.date}</td>
                    <td className="p-4 font-semibold">{a.type}</td>
                    <td className={`p-4 max-w-xs truncate ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{a.reason || 'Aucun motif renseigné'}</td>
                    <td className="p-4">
                      {a.proof_document_path ? (
                        <span className={`font-semibold flex items-center gap-1 cursor-pointer ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>
                          <span className="material-symbols-outlined text-sm">description</span> Voir le justificatif
                        </span>
                      ) : (
                        <span className={`italic ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Aucune pièce</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.is_justified ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
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
