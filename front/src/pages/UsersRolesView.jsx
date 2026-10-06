import React from 'react';

const UsersRolesView = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  const usersList = [
    { id: 1, name: 'Fatine Alaoui', email: 'fatine.alaoui@company.ma', role: 'RH', status: 'Actif', lastLogin: 'Aujourd\'hui 09:12' },
    { id: 2, name: 'Administrateur Système', email: 'admin@company.ma', role: 'Admin', status: 'Actif', lastLogin: 'Aujourd\'hui 08:30' },
    { id: 3, name: 'Ahmed Benali', email: 'ahmed.benali@company.ma', role: 'Employé', status: 'Actif', lastLogin: 'Hier 17:30' },
    { id: 4, name: 'Karim Tazi', email: 'karim.tazi@company.ma', role: 'Employé', status: 'Actif', lastLogin: '02/09/2026' },
  ];

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-[#E5DEC9]'}`}>
        <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
          isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
        }`}>Utilisateurs & Matrice des Rôles</h2>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Contrôle des accès sécurisé (Admin, Responsable RH, Employé).</p>
      </div>

      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
            }`}>
              <th className="p-4">Utilisateur</th>
              <th className="p-4">Adresse Email</th>
              <th className="p-4">Rôle Attribué</th>
              <th className="p-4">Dernière Connexion</th>
              <th className="p-4">Statut Compte</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
            {usersList.map((u) => (
              <tr key={u.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{u.name}</td>
                <td className={`p-4 font-mono ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{u.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    u.role === 'Admin' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                    u.role === 'RH' ? isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30' :
                    'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className={`p-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{u.lastLogin}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-[10px]">
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
