import React, { useState } from 'react';
import { Eye, Search, UserPlus, Grid, List } from 'lucide-react';

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
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
            Annuaire Collaborateurs
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1B33] tracking-tight">Gestion des Employés</h1>
          <p className="text-xs text-slate-500 mt-0.5">Registre complet des effectifs, contrats et affectations par département.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-teal-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vue Grille"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-teal-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vue Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewEmployeeModal}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-glow-teal hover:scale-105 transition-all text-xs px-4 py-2.5 rounded-xl font-bold cursor-pointer flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Nouvel Employé</span>
          </button>
        </div>
      </div>

      {/* Barre de filtres / recherche moderne */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-teal-400 outline-none transition-all"
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
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-teal-400 outline-none transition-all"
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
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:border-teal-400 outline-none transition-all"
          >
            <option value="">Tous les Contrats</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Intérim">Intérim</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <span className="text-xs font-medium text-slate-500">
          Total : <span className="font-bold text-[#0B1B33]">{filteredEmployees.length} employés</span>
        </span>
      </div>

      {/* Grid View : Cartes individuelles */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div 
              key={emp.id} 
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header : Avatar + Nom + Statut */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {emp.photo_url ? (
                      <img 
                        src={emp.photo_url} 
                        alt={`${emp.first_name} ${emp.last_name}`}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center ring-2 ring-teal-100 shrink-0">
                        {emp.first_name?.[0]}{emp.last_name?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-sm text-[#0B1B33]">
                        {emp.first_name} {emp.last_name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {emp.matricule} • {emp.cin || 'BE892102'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    emp.status === 'Actif' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {emp.status}
                  </span>
                </div>

                {/* Détails */}
                <div className="space-y-2 py-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Poste</span>
                    <span className="text-slate-900 font-semibold text-right">{emp.position?.title || 'Non assigné'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Département</span>
                    <span className="text-slate-900 font-semibold text-right">{emp.department?.name || 'Général'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Contrat</span>
                    <span className="text-slate-900 font-semibold">{emp.contract_type || 'CDI'}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => onSelectEmployee(emp.id)}
                className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Consulter la fiche</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-3.5">Employé</th>
                <th className="p-3.5">Matricule / CIN</th>
                <th className="p-3.5">Département</th>
                <th className="p-3.5">Poste</th>
                <th className="p-3.5">Contrat</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center ring-1 ring-teal-100 shrink-0">
                      {emp.first_name?.[0]}{emp.last_name?.[0]}
                    </div>
                    <span>{emp.first_name} {emp.last_name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500">{emp.matricule} / {emp.cin || 'BE1234'}</td>
                  <td className="p-3.5">{emp.department?.name || 'Général'}</td>
                  <td className="p-3.5 font-medium">{emp.position?.title || 'Non assigné'}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">{emp.contract_type}</span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status === 'Actif' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectEmployee(emp.id)}
                      className="text-teal-700 hover:text-teal-800 font-bold text-xs cursor-pointer flex items-center gap-1 justify-end ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter</span>
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

