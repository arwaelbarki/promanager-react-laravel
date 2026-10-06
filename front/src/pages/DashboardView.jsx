import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  UserPlus, 
  ArrowUpRight
} from 'lucide-react';

const DashboardView = ({ stats, currentUser, setActiveTab, onOpenNewEmployeeModal, theme = 'light' }) => {
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <div className={`relative min-h-screen font-sans select-none p-6 sm:p-8 lg:p-10 pb-16 overflow-x-hidden transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
      >
        {/* 1. EN-TÊTE SOBRE & ACTIONS */}
        <motion.div variants={sectionVariants} className={`border-b pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'border-white/10' : 'border-[#E5DEC9]'
        }`}>
          <div>
            <h1 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
              isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
            }`}>
              Tableau de Bord RH
            </h1>
            <p className={`text-xs font-medium mt-1 ${
              isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
            }`}>
              Vue d'ensemble des effectifs, présences et conformité.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('reports')}
              className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs border ${
                isDark 
                  ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A] hover:text-[#D9AE3A]' 
                  : 'bg-white border-[#E5DEC9] text-[#1A1A24] hover:bg-[#FAF6F0]'
              }`}
            >
              <Download className="w-4 h-4 stroke-[1.5]" />
              <span>Exporter Rapport</span>
            </button>
            <button
              onClick={onOpenNewEmployeeModal}
              className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 ${
                isDark 
                  ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' 
                  : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
              }`}
            >
              <UserPlus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Nouvel Employé</span>
            </button>
          </div>
        </motion.div>

        {/* 2. LIGNE UNIQUE DE MÉTRIQUES */}
        <motion.div variants={sectionVariants}>
          <div 
            className={`rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 border divide-y sm:divide-y-0 sm:divide-x shadow-xs ${
              isDark 
                ? 'bg-[#180D21] border-white/10 divide-white/10 text-[#F7F1E7]' 
                : 'bg-white border-[#E5DEC9] divide-[#E5DEC9] text-[#1A1A24]'
            }`}
          >
            
            {/* Metric 1 : Employés Actifs */}
            <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0 flex flex-col justify-between space-y-1">
              <span className={`text-xs font-semibold flex items-center gap-2 ${
                isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                Employés actifs
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono-data tracking-tight">248</span>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">+12.4%</span>
              </div>
            </div>

            {/* Metric 2 : Congés en Attente */}
            <div className="pt-2 sm:pt-0 sm:px-4 flex flex-col justify-between space-y-1">
              <span className={`text-xs font-semibold flex items-center gap-2 ${
                isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isDark ? 'bg-[#D9AE3A]' : 'bg-[#D4AF37]'}`}></span>
                Congés en attente
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono-data tracking-tight">12</span>
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  isDark ? 'text-[#E8C65A] bg-[#D9AE3A]/10 border border-[#D9AE3A]/30' : 'text-[#B06000] bg-[#FEF7E0]'
                }`}>à valider</span>
              </div>
            </div>

            {/* Metric 3 : Absences Jour */}
            <div className="pt-2 sm:pt-0 sm:px-4 flex flex-col justify-between space-y-1">
              <span className={`text-xs font-semibold flex items-center gap-2 ${
                isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#6B7280] shrink-0"></span>
                Absences jour
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono-data tracking-tight">8</span>
                <span className={`text-[11px] font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>96.8% présence</span>
              </div>
            </div>

            {/* Metric 4 : Contrats à Échéance */}
            <div className="pt-2 sm:pt-0 sm:px-4 flex flex-col justify-between space-y-1">
              <span className={`text-xs font-semibold flex items-center gap-2 ${
                isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isDark ? 'bg-[#D9AE3A]' : 'bg-[#1A1A24]'}`}></span>
                Contrats à échéance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono-data tracking-tight">5</span>
                <span className={`text-[11px] font-bold ${isDark ? 'text-[#E8C65A]' : 'text-[#1A1A24]'}`}>&lt; 30 jours</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 3. SECTION "À TRAITER EN PRIORITÉ" & GRAPHIQUE ÉPURÉ */}
        <motion.div variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* 3.1 À Traiter en Priorité */}
          <div 
            className={`lg:col-span-7 rounded-2xl border overflow-hidden flex flex-col justify-between shadow-xs ${
              isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
            }`}
          >
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-white/10 bg-[#180D21]' : 'border-[#E5DEC9] bg-white'
            }`}>
              <h2 className="text-xs sm:text-sm font-serif font-bold flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#D9AE3A]' : 'bg-[#D4AF37]'}`}></span>
                <span>À Traiter en Priorité</span>
              </h2>
              <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
                3 actions requises
              </span>
            </div>

            <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {/* Action 1 */}
              <div
                onClick={() => setActiveTab('leaves')}
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors cursor-pointer group ${
                  isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-full border font-mono-data font-bold text-xs flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#100817] border-white/10 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24]'
                  }`}>
                    12
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">Demandes de congés en attente de validation</h4>
                    <p className={`text-xs font-normal mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>8 congés payés annuels et 4 RTT soumis par l'équipe</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all shrink-0 ml-2 ${
                  isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'
                }`}>
                  <span>Traiter</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </div>
              </div>

              {/* Action 2 */}
              <div
                onClick={() => setActiveTab('contracts')}
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors cursor-pointer group ${
                  isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-full border font-mono-data font-bold text-xs flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#100817] border-white/10 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24]'
                  }`}>
                    5
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">Contrats arrivant à échéance sous 30 jours</h4>
                    <p className={`text-xs font-normal mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Fins de CDD et périodes d'essai à valider ou renouveler</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all shrink-0 ml-2 ${
                  isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'
                }`}>
                  <span>Consulter</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </div>
              </div>

              {/* Action 3 */}
              <div
                onClick={() => setActiveTab('hr_requests')}
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors cursor-pointer group ${
                  isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-full border font-mono-data font-bold text-xs flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#100817] border-white/10 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24]'
                  }`}>
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">Demandes d'attestations et pièces administratives</h4>
                    <p className={`text-xs font-normal mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Attestations de travail et fiches de paie transmises</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all shrink-0 ml-2 ${
                  isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'
                }`}>
                  <span>Émettre</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </div>
              </div>
            </div>

            <div className={`p-3 text-right border-t ${
              isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'
            }`}>
              <span className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Dernière synchronisation RH : Aujourd'hui à 09:30</span>
            </div>
          </div>

          {/* 3.2 Graphique Épuré Évolution des présences */}
          <div 
            className={`lg:col-span-5 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs ${
              isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDark ? 'border-white/10' : 'border-[#E5DEC9]'
            }`}>
              <h3 className="text-xs sm:text-sm font-serif font-bold">Évolution des présences (30 jours)</h3>
              <span className={`text-xs font-mono-data font-bold ${
                isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'
              }`}>96.8% moy.</span>
            </div>

            {/* SVG Area Chart */}
            <div className="relative pt-1">
              <svg className="w-full h-44" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDark ? "#D9AE3A" : "#D4AF37"} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={isDark ? "#D9AE3A" : "#D4AF37"} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke={isDark ? "rgba(255,255,255,0.08)" : "#E5DEC9"} strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="600" y2="90" stroke={isDark ? "rgba(255,255,255,0.08)" : "#E5DEC9"} strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="600" y2="140" stroke={isDark ? "rgba(255,255,255,0.08)" : "#E5DEC9"} strokeDasharray="4 4" />

                {/* Area Fill */}
                <path d="M0 140 Q 100 40, 200 70 T 400 30 T 600 60 L 600 170 L 0 170 Z" fill="url(#curveFill)" />

                {/* Main Trend Line */}
                <path d="M0 140 Q 100 40, 200 70 T 400 30 T 600 60" stroke={isDark ? "#D9AE3A" : "#D4AF37"} strokeWidth="2.5" strokeLinecap="round" />

                {/* Data Points */}
                <circle cx="200" cy="70" r="4" fill={isDark ? "#D9AE3A" : "#D4AF37"} stroke={isDark ? "#100817" : "#FFFFFF"} strokeWidth="2" />
                <circle cx="400" cy="30" r="4" fill={isDark ? "#D9AE3A" : "#D4AF37"} stroke={isDark ? "#100817" : "#FFFFFF"} strokeWidth="2" />
                <circle cx="600" cy="60" r="4" fill={isDark ? "#D9AE3A" : "#D4AF37"} stroke={isDark ? "#100817" : "#FFFFFF"} strokeWidth="2" />
              </svg>
            </div>

            <div className={`flex items-center justify-between text-[11px] font-mono-data pt-2 border-t ${
              isDark ? 'text-[#B8A9BD] border-white/10' : 'text-[#6B7280] border-[#E5DEC9]'
            }`}>
              <span>01 Oct</span>
              <span>08 Oct</span>
              <span>15 Oct</span>
              <span>22 Oct</span>
              <span>30 Oct</span>
            </div>
          </div>

        </motion.div>

        {/* 4. REPARTITION PAR DÉPARTEMENT SOBRE */}
        <motion.div variants={sectionVariants} className={`rounded-2xl border p-5 sm:p-6 space-y-4 shadow-xs ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isDark ? 'border-white/10' : 'border-[#E5DEC9]'
          }`}>
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
              isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
            }`}>Répartition de l'Effectif par Département</h3>
            <button
              onClick={() => setActiveTab('departments')}
              className={`text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                isDark ? 'text-[#F7F1E7] hover:text-[#D9AE3A]' : 'text-[#1A1A24] hover:text-[#D4AF37]'
              }`}
            >
              <span>Vue détaillée</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
            {[
              { name: 'Informatique & Tech', count: 78, pct: 31 },
              { name: 'Production & Opérations', count: 54, pct: 22 },
              { name: 'Commercial & Ventes', count: 42, pct: 17 },
              { name: 'Marketing & Com', count: 32, pct: 13 },
              { name: 'Finance & Compta', count: 24, pct: 10 },
            ].map((d, i) => (
              <div key={i} className={`p-3.5 border rounded-xl space-y-2 ${
                isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'
              }`}>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold truncate">{d.name}</span>
                  <span className={`font-mono-data font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{d.count}</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-[#E5DEC9]'}`}>
                  <div className={`h-full rounded-full ${isDark ? 'bg-[#D9AE3A]' : 'bg-[#D4AF37]'}`} style={{ width: `${d.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default React.memo(DashboardView);
