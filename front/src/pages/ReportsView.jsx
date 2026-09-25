import React from 'react';

const ReportsView = () => {
  const reportsList = [
    { title: 'Rapport Annuel des Effectifs & Masse Salariale', desc: 'Synthèse des collaborateurs, réparties par départements et type de contrat.', date: '2026', format: 'PDF / Excel' },
    { title: 'Bilan Mensuel des Congés & Absences', desc: 'Rapport complet sur les journées consommées et soldes restants.', date: 'Septembre 2026', format: 'Excel' },
    { title: 'Journal de Pointage & Assiduité', desc: 'Relevé des heures travaillées, retards enregistrés et départs anticipés.', date: 'Septembre 2026', format: 'CSV' },
    { title: 'État des Contrats de Travail & Expirations', desc: 'Liste des contrats CDI/CDD actifs et renouvellements à prévoir.', date: 'Q3 2026', format: 'PDF' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Rapports & Statistiques RH</h2>
        <p className="text-xs text-slate-500 mt-0.5">Génération et exportation des bilans (PDF, Excel, CSV).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((r, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#e6f7f4] text-[#0F766E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172033]">{r.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
                <div className="flex items-center gap-3 mt-3 text-[11px] font-mono text-slate-400">
                  <span>Période: {r.date}</span> • <span>Formats: {r.format}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Téléchargement du rapport "${r.title}" lancé.`)}
              className="btn-primary text-xs px-3.5 py-2 shrink-0"
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
