import React from 'react';

const ReportsView = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  const reportsList = [
    { title: 'Rapport Annuel des Effectifs & Masse Salariale', desc: 'Synthèse des collaborateurs, réparties par départements et type de contrat.', date: '2026', format: 'PDF / Excel' },
    { title: 'Bilan Mensuel des Congés & Absences', desc: 'Rapport complet sur les journées consommées et soldes restants.', date: 'Septembre 2026', format: 'Excel' },
    { title: 'Journal de Pointage & Assiduité', desc: 'Relevé des heures travaillées, retards enregistrés et départs anticipés.', date: 'Septembre 2026', format: 'CSV' },
    { title: 'État des Contrats de Travail & Expirations', desc: 'Liste des contrats CDI/CDD actifs et renouvellements à prévoir.', date: 'Q3 2026', format: 'PDF' },
  ];

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-[#E5DEC9]'}`}>
        <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
          isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
        }`}>Rapports & Statistiques RH</h2>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Génération et exportation des bilans (PDF, Excel, CSV).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((r, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border shadow-xs transition-all flex items-start justify-between gap-4 ${
            isDark 
              ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A]/40' 
              : 'bg-white border-[#E5DEC9] text-[#1A1A24] hover:border-[#D4AF37]/50'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                isDark ? 'bg-[#211027] border-[#D9AE3A]/40 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#D4AF37]/40 text-[#D4AF37]'
              }`}>
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <div>
                <h3 className={`font-bold text-sm ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{r.title}</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{r.desc}</p>
                <div className={`flex items-center gap-3 mt-3 text-[11px] font-mono ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
                  <span>Période: <strong className={isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}>{r.date}</strong></span> • <span>Formats: {r.format}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Téléchargement du rapport "${r.title}" lancé.`)}
              className={`font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md ${
                isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Générer</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
