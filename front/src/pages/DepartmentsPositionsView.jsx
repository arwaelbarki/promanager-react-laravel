import React from 'react';

const DepartmentsPositionsView = ({ departments, positions, onOpenNewDeptModal, onOpenNewPosModal }) => {
  return (
    <div className="space-y-6">
      {/* Departments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Départements d'Entreprise</h2>
            <p className="text-xs text-slate-500">Structure organisationnelle et responsables de pôles.</p>
          </div>
          <button
            onClick={onOpenNewDeptModal}
            className="btn-primary text-xs px-4 py-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nouveau Département</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((d) => (
            <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7f4] text-[#0F766E] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">domain</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-xs text-slate-700">
                  {d.employees_count || d.employee_count || 0} employés
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900">{d.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{d.description || 'Département opérationnel'}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>Responsable : <strong>{d.manager_name || 'Direction'}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positions Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Postes & Grille Salariale</h2>
            <p className="text-xs text-slate-500">Postes configurés et plages salariales.</p>
          </div>
          <button
            onClick={onOpenNewPosModal}
            className="btn-secondary text-xs px-4 py-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nouveau Poste</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Intitulé du Poste</th>
                <th className="p-4">Département</th>
                <th className="p-4">Niveau Requise</th>
                <th className="p-4">Plage Salariale (MAD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {positions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{p.title}</td>
                  <td className="p-4">{p.department?.name || 'Général'}</td>
                  <td className="p-4 font-semibold text-[#0F766E]">{p.level}</td>
                  <td className="p-4 font-mono font-bold text-emerald-600">{p.min_salary} - {p.max_salary} MAD</td>
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
