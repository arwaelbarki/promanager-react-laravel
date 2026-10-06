import React, { useState } from 'react';
import { Eye, Search, UserPlus, Grid, List } from 'lucide-react';

const EmployeesView = ({ employees, departments, onSelectEmployee, onOpenNewEmployeeModal, theme = 'light' }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const [search, setSearch] = useState('');

  const isDark = theme === 'dark';

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
    <div className={`space-y-6 animate-fade-in p-6 sm:p-8 lg:p-10 pb-16 min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Page Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div>
          <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'
          }`}>
            Annuaire Collaborateurs
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>Gestion des Employés</h1>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Registre complet des effectifs, contrats et affectations par département.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className={`p-1 rounded-xl flex items-center gap-1 border shadow-xs ${
            isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? isDark ? 'bg-[#D9AE3A] text-[#100817] font-bold shadow-xs' : 'bg-[#D4AF37] text-white font-bold shadow-xs' 
                  : isDark ? 'text-[#B8A9BD] hover:text-[#F7F1E7]' : 'text-[#6B7280] hover:text-[#1A1A24]'
              }`}
              title="Vue Grille"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' 
                  ? isDark ? 'bg-[#D9AE3A] text-[#100817] font-bold shadow-xs' : 'bg-[#D4AF37] text-white font-bold shadow-xs' 
                  : isDark ? 'text-[#B8A9BD] hover:text-[#F7F1E7]' : 'text-[#6B7280] hover:text-[#1A1A24]'
              }`}
              title="Vue Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewEmployeeModal}
            className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
            }`}
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Nouvel Employé</span>
          </button>
        </div>
      </div>

      {/* Barre de filtres / recherche */}
      <div className={`p-4 rounded-2xl border shadow-xs flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
            }`} />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs border rounded-xl outline-none transition-all ${
                isDark 
                  ? 'bg-[#100817] border-white/10 text-[#F7F1E7] placeholder:text-[#B8A9BD]/50 focus:border-[#D9AE3A]' 
                  : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] placeholder:text-[#9CA3AF] focus:border-[#D4AF37]'
              }`}
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className={`px-3 py-2 text-xs border rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-[#100817] border-white/10 text-[#F7F1E7] focus:border-[#D9AE3A]' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] focus:border-[#D4AF37]'
            }`}
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
            className={`px-3 py-2 text-xs border rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-[#100817] border-white/10 text-[#F7F1E7] focus:border-[#D9AE3A]' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] focus:border-[#D4AF37]'
            }`}
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
            className={`px-3 py-2 text-xs border rounded-xl outline-none transition-all ${
              isDark 
                ? 'bg-[#100817] border-white/10 text-[#F7F1E7] focus:border-[#D9AE3A]' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] focus:border-[#D4AF37]'
            }`}
          >
            <option value="">Tous les Contrats</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Intérim">Intérim</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <span className={`text-xs font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
          Total : <span className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{filteredEmployees.length} employés</span>
        </span>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div 
              key={emp.id} 
              className={`border rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between ${
                isDark 
                  ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A]/40' 
                  : 'bg-white border-[#E5DEC9] text-[#1A1A24] hover:border-[#D4AF37]/50'
              }`}
            >
              <div>
                {/* Header : Avatar + Nom + Statut */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {emp.photo_url ? (
                      <img 
                        src={emp.photo_url} 
                        alt={`${emp.first_name} ${emp.last_name}`}
                        className={`w-12 h-12 rounded-full object-cover ring-2 ${
                          isDark ? 'ring-[#D9AE3A]/40' : 'ring-[#D4AF37]/50'
                        }`}
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full font-extrabold text-sm flex items-center justify-center ring-2 shrink-0 ${
                        isDark 
                          ? 'bg-[#211027] text-[#E8C65A] ring-[#D9AE3A]/40' 
                          : 'bg-[#FAF6F0] text-[#D4AF37] ring-[#D4AF37]/50'
                      }`}>
                        {emp.first_name?.[0]}{emp.last_name?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className={`font-bold text-sm ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
                        {emp.first_name} {emp.last_name}
                      </h3>
                      <p className={`text-[11px] font-medium mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
                        {emp.matricule} • {emp.cin || 'BE892102'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    emp.status === 'Actif' 
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                      : isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30'
                  }`}>
                    {emp.status}
                  </span>
                </div>

                {/* Détails */}
                <div className={`space-y-2 py-3 border-t ${isDark ? 'border-white/10' : 'border-[#E5DEC9]'}`}>
                  <div className="flex justify-between text-xs">
                    <span className={`font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Poste</span>
                    <span className={`font-semibold text-right ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{emp.position?.title || 'Non assigné'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={`font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Département</span>
                    <span className={`font-semibold text-right ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{emp.department?.name || 'Général'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={`font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Contrat</span>
                    <span className={`font-semibold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{emp.contract_type || 'CDI'}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => onSelectEmployee(emp.id)}
                className={`w-full mt-3 pt-3 border-t flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                  isDark 
                    ? 'border-white/10 text-[#D9AE3A] hover:text-[#E8C65A]' 
                    : 'border-[#E5DEC9] text-[#D4AF37] hover:text-[#b39023]'
                }`}
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
        <div className={`rounded-2xl border overflow-hidden shadow-xs ${
          isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
        }`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <th className="p-3.5">Employé</th>
                <th className="p-3.5">Matricule / CIN</th>
                <th className="p-3.5">Département</th>
                <th className="p-3.5">Poste</th>
                <th className="p-3.5">Contrat</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                  <td className="p-3.5 font-semibold flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center shrink-0 border ${
                      isDark ? 'bg-[#211027] text-[#E8C65A] border-[#D9AE3A]/40' : 'bg-[#FAF6F0] text-[#D4AF37] border-[#D4AF37]/40'
                    }`}>
                      {emp.first_name?.[0]}{emp.last_name?.[0]}
                    </div>
                    <span>{emp.first_name} {emp.last_name}</span>
                  </td>
                  <td className={`p-3.5 font-mono ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{emp.matricule} / {emp.cin || 'BE1234'}</td>
                  <td className="p-3.5">{emp.department?.name || 'Général'}</td>
                  <td className="p-3.5 font-medium">{emp.position?.title || 'Non assigné'}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isDark ? 'bg-[#100817] text-[#F7F1E7] border-white/10' : 'bg-[#FAF6F0] text-[#1A1A24] border-[#E5DEC9]'
                    }`}>{emp.contract_type}</span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status === 'Actif' 
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                        : isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectEmployee(emp.id)}
                      className={`font-bold text-xs cursor-pointer flex items-center gap-1 justify-end ml-auto ${
                        isDark ? 'text-[#D9AE3A] hover:text-[#E8C65A]' : 'text-[#D4AF37] hover:text-[#b39023]'
                      }`}
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
