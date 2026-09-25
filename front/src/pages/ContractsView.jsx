import React, { useState } from 'react';

const ContractsView = ({ contracts, onOpenNewContractModal }) => {
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredContracts = contracts.filter(c => {
    const typeMatch = !filterType || c.contract_type === filterType;
    const statusMatch = !filterStatus || c.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Contrats de Travail</h2>
          <p className="text-xs text-slate-500 mt-0.5">Suivi des engagements contractuels, périodes d'essai et fins de contrat.</p>
        </div>
        <button
          onClick={onOpenNewContractModal}
          className="btn-primary text-xs px-4 py-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nouveau Contrat</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-blue-500 outline-hidden"
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
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-blue-500 outline-hidden"
        >
          <option value="">Tous les Statuts</option>
          <option value="Actif">Actif</option>
          <option value="Expiré">Expiré</option>
          <option value="Résilié">Résilié</option>
        </select>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredContracts.map((c) => {
                const empName = c.employee ? `${c.employee.first_name} ${c.employee.last_name}` : 'Collaborateur';
                const isExpiringSoon = c.end_date && new Date(c.end_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                return (
                  <tr key={c.id} className={`hover:bg-slate-50/80 transition-colors ${isExpiringSoon ? 'bg-amber-50/30' : ''}`}>
                    <td className="p-4 font-bold text-slate-900">{empName}</td>
                    <td className="p-4 font-semibold text-[#0F766E]">{c.contract_type}</td>
                    <td className="p-4">{c.start_date}</td>
                    <td className="p-4 font-mono font-medium">
                      {c.end_date ? (
                        <span className={isExpiringSoon ? 'text-rose-600 font-bold' : ''}>
                          {c.end_date} {isExpiringSoon && '⚠️ (Expire bientôt)'}
                        </span>
                      ) : (
                        <span className="text-slate-400">Indéterminée (CDI)</span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-emerald-600">{c.salary} MAD</td>
                    <td className="p-4 text-slate-500">{c.trial_period_months} mois</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Actif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
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
