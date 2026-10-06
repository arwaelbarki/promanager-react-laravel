import React from 'react';

const DepartmentsPositionsView = ({ departments, positions, onOpenNewDeptModal, onOpenNewPosModal, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Departments Section */}
      <div className="space-y-4">
        <div className={`flex items-center justify-between border-b pb-4 ${
          isDark ? 'border-white/10' : 'border-[#E5DEC9]'
        }`}>
          <div>
            <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
              isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
            }`}>Départements d'Entreprise</h2>
            <p className={`text-xs ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Structure organisationnelle et responsables de pôles.</p>
          </div>
          <button
            onClick={onOpenNewDeptModal}
            className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nouveau Département</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((d) => (
            <div key={d.id} className={`p-5 rounded-2xl border shadow-xs transition-all ${
              isDark 
                ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A]/40' 
                : 'bg-white border-[#E5DEC9] text-[#1A1A24] hover:border-[#D4AF37]/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold ${
                  isDark ? 'bg-[#211027] border-[#D9AE3A]/40 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#D4AF37]/40 text-[#D4AF37]'
                }`}>
                  <span className="material-symbols-outlined text-2xl">domain</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full border font-bold text-xs ${
                  isDark ? 'bg-[#100817] border-white/10 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#D4AF37]'
                }`}>
                  {d.employees_count || d.employee_count || 0} employés
                </span>
              </div>
              <h3 className={`font-bold text-base ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{d.name}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{d.description || 'Département opérationnel'}</p>
              <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
                isDark ? 'border-white/10 text-[#B8A9BD]' : 'border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <span>Responsable : <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>{d.manager_name || 'Direction'}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positions Section */}
      <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-[#E5DEC9]'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-serif font-bold tracking-tight ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Postes & Grille Salariale</h2>
            <p className={`text-xs ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Postes configurés et plages salariales.</p>
          </div>
          <button
            onClick={onOpenNewPosModal}
            className={`border font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              isDark 
                ? 'bg-[#180D21] border-white/10 hover:border-[#D9AE3A] text-[#F7F1E7] hover:text-[#D9AE3A]' 
                : 'bg-white border-[#E5DEC9] hover:border-[#D4AF37] text-[#1A1A24] hover:text-[#D4AF37]'
            }`}
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nouveau Poste</span>
          </button>
        </div>

        <div className={`rounded-2xl border shadow-xs overflow-hidden ${
          isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
        }`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <th className="p-4">Intitulé du Poste</th>
                <th className="p-4">Département</th>
                <th className="p-4">Niveau Requis</th>
                <th className="p-4">Plage Salariale (MAD)</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {positions.map((p) => (
                <tr key={p.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                  <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{p.title}</td>
                  <td className={`p-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{p.department?.name || 'Général'}</td>
                  <td className={`p-4 font-semibold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{p.level}</td>
                  <td className={`p-4 font-mono font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{p.min_salary} - {p.max_salary} MAD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPositionsView;
