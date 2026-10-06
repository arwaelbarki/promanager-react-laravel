import React, { useState } from 'react';

const ContractsView = ({ contracts, onOpenNewContractModal, theme = 'light' }) => {
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const isDark = theme === 'dark';

  const filteredContracts = contracts.filter(c => {
    const typeMatch = !filterType || c.contract_type === filterType;
    const statusMatch = !filterStatus || c.status === filterStatus;
    return typeMatch && statusMatch;
  });

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
          }`}>Gestion des Contrats de Travail</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Suivi des engagements contractuels, périodes d'essai et fins de contrat.
          </p>
        </div>
        <button
          onClick={onOpenNewContractModal}
          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
            isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nouveau Contrat</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`p-4 rounded-2xl border shadow-xs flex flex-wrap gap-4 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`px-3 py-2 border rounded-xl text-xs outline-hidden ${
            isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7] focus:border-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] focus:border-[#D4AF37]'
          }`}
        >
          <option value="">Tous les Types (CDI, CDD, Stage...)</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Intérim">Intérim</option>
          <option value="Freelance">Freelance</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-3 py-2 border rounded-xl text-xs outline-hidden ${
            isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7] focus:border-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] focus:border-[#D4AF37]'
          }`}
        >
          <option value="">Tous les Statuts</option>
          <option value="Actif">Actif</option>
          <option value="Expiré">Expiré</option>
          <option value="Résilié">Résilié</option>
        </select>
      </div>

      {/* Contracts Table */}
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
                <th className="p-4">Type de Contrat</th>
                <th className="p-4">Date de Début</th>
                <th className="p-4">Date d'Expiration</th>
                <th className="p-4">Salaire Mensuel</th>
                <th className="p-4">Période d'essai</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {filteredContracts.map((c) => {
                const empName = c.employee ? `${c.employee.first_name} ${c.employee.last_name}` : 'Collaborateur';
                const isExpiringSoon = c.end_date && new Date(c.end_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                return (
                  <tr key={c.id} className={`transition-colors ${
                    isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'
                  } ${isExpiringSoon ? (isDark ? 'bg-[#D9AE3A]/5' : 'bg-[#FEF7E0]') : ''}`}>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{empName}</td>
                    <td className={`p-4 font-semibold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{c.contract_type}</td>
                    <td className="p-4">{c.start_date}</td>
                    <td className="p-4 font-mono font-medium">
                      {c.end_date ? (
                        <span className={isExpiringSoon ? (isDark ? 'text-[#E8C65A] font-bold' : 'text-[#B06000] font-bold') : ''}>
                          {c.end_date} {isExpiringSoon && '⚠️ (Expire bientôt)'}
                        </span>
                      ) : (
                        <span className={isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}>Indéterminée (CDI)</span>
                      )}
                    </td>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{c.salary} MAD</td>
                    <td className={`p-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{c.trial_period_months} mois</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Actif' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        isDark ? 'text-[#B8A9BD] hover:text-[#D9AE3A] hover:bg-white/5' : 'text-[#6B7280] hover:text-[#D4AF37] hover:bg-slate-100'
                      }`}>
                        <span className="material-symbols-outlined text-base">download</span>
                      </button>
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

export default ContractsView;
