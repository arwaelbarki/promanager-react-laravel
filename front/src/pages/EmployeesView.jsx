import React, { useState } from 'react';

const EmployeesView = ({ employees, departments, onSelectEmployee, onOpenNewEmployeeModal }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const [search, setSearch] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const nameMatch = `${emp.first_name} ${emp.last_name} ${emp.matricule} ${emp.cin} ${emp.email}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const deptMatch = !selectedDept || emp.department_id == selectedDept;
    const statusMatch = !selectedStatus || emp.status === selectedStatus;
    const contractMatch = !selectedContract || emp.contract_type === selectedContract;

    return nameMatch && deptMatch && statusMatch && contractMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Annuaire Collaborateurs
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Employés</h1>
          <p className="text-xs text-slate-500 mt-0.5">Registre complet des effectifs, contrats et affectations par département.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">format_list_bulleted</span>
            </button>
          </div>

          <button
            onClick={onOpenNewEmployeeModal}
            className="btn-primary"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>+ Nouvel Employé</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none z-10">search</span>
          <input
            type="text"
            placeholder="Nom, matricule, CIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-9"
          />
        </div>

        {/* Department Filter */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="input-field"
        >
          <option value="">Tous les Départements</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field"
        >
          <option value="">Tous les Statuts</option>
          <option value="Actif">Actif</option>
          <option value="En congé">En congé</option>
          <option value="Suspendu">Suspendu</option>
          <option value="Démissionnaire">Démissionnaire</option>
        </select>

        {/* Contract Type Filter */}
        <select
          value={selectedContract}
          onChange={(e) => setSelectedContract(e.target.value)}
          className="input-field"
        >
          <option value="">Tous les Contrats</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Intérim">Intérim</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="card-saas p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    {emp.photo_url ? (
                      <img
                        src={emp.photo_url}
                        alt={`${emp.first_name} ${emp.last_name}`}
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 text-[#0F766E] font-bold text-xs flex items-center justify-center border border-[#0F766E]/20 shrink-0">
                        {emp.first_name?.[0]}{emp.last_name?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#0F766E] transition-colors">
                        {emp.first_name} {emp.last_name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">{emp.matricule} • {emp.cin || 'CIN'}</span>
                    </div>
                  </div>
                  <span className={`badge-status ${
                    emp.status === 'Actif' ? 'badge-status-active' :
                    emp.status === 'En congé' ? 'badge-status-pending' :
                    'badge-status-neutral'
                  }`}>
                    {emp.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Poste :</span>
                    <span className="font-medium text-slate-800">{emp.position?.title || 'Non assigné'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Département :</span>
                    <span className="font-medium text-slate-800">{emp.department?.name || 'Général'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Contrat :</span>
                    <span className="badge-status badge-status-info text-[10px]">{emp.contract_type}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectEmployee(emp.id)}
                  className="btn-secondary w-full text-xs py-1.5"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>Consulter la Fiche</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="table-saas">
            <thead>
              <tr>
                <th>Employé</th>
                <th>Matricule / CIN</th>
                <th>Département</th>
                <th>Poste</th>
                <th>Contrat</th>
                <th>Statut</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td className="font-semibold text-slate-900 flex items-center gap-3">
                    <img src={emp.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="" className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                    <span>{emp.first_name} {emp.last_name}</span>
                  </td>
                  <td className="font-mono text-slate-500">{emp.matricule} / {emp.cin || 'BE1234'}</td>
                  <td>{emp.department?.name || 'Général'}</td>
                  <td className="font-medium">{emp.position?.title || 'Non assigné'}</td>
                  <td>
                    <span className="badge-status badge-status-info text-[10px]">{emp.contract_type}</span>
                  </td>
                  <td>
                    <span className={`badge-status ${
                      emp.status === 'Actif' ? 'badge-status-active' : 'badge-status-pending'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => onSelectEmployee(emp.id)}
                      className="btn-outline py-1 px-2.5 text-xs"
                    >
                      Consulter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(EmployeesView);
