import React from 'react';

const UsersRolesView = () => {
  const usersList = [
    { id: 1, name: 'Fatine Alaoui', email: 'fatine.alaoui@company.ma', role: 'RH', status: 'Actif', lastLogin: 'Aujourd\'hui 09:12' },
    { id: 2, name: 'Administrateur Système', email: 'admin@company.ma', role: 'Admin', status: 'Actif', lastLogin: 'Aujourd\'hui 08:30' },
    { id: 3, name: 'Ahmed Benali', email: 'ahmed.benali@company.ma', role: 'Employé', status: 'Actif', lastLogin: 'Hier 17:30' },
    { id: 4, name: 'Karim Tazi', email: 'karim.tazi@company.ma', role: 'Employé', status: 'Actif', lastLogin: '02/09/2026' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Utilisateurs & Matrice des Rôles</h2>
        <p className="text-xs text-slate-500 mt-0.5">Contrôle des accès sécurisé (Admin, Responsable RH, Employé).</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="p-4">Utilisateur</th>
              <th className="p-4">Adresse Email</th>
              <th className="p-4">Rôle Attribué</th>
              <th className="p-4">Dernière Connexion</th>
              <th className="p-4">Statut Compte</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-900">{u.name}</td>
                <td className="p-4 font-mono text-slate-600">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    u.role === 'Admin' ? 'bg-slate-100 text-slate-800 border border-slate-300' :
                    u.role === 'RH' ? 'bg-[#e6f7f4] text-[#0F766E] border border-[#0F766E]/20' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{u.lastLogin}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersRolesView;
