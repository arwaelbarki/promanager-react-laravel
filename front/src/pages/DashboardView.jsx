import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  UserPlus, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  Users, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

const DashboardView = ({ stats, currentUser, setActiveTab, onOpenNewEmployeeModal }) => {
  const firstName = currentUser ? currentUser.split(' ')[0] : 'Fatine';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#0F172A] font-sans select-none p-6 sm:p-8 pb-16">
      {/* Blobs de couleur Sarcelle et Noir Ardoise très floutés (filter: blur(100px)) en arrière-plan */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-12 right-1/4 w-96 h-96 bg-[#0F172A]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* 1. HEADER INSTITUTIONNEL & ACCUEIL */}
        <motion.div variants={sectionVariants} className="border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-[#0F766E] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse"></span>
              <span>Amsoft People • Pilotage des Ressources Humaines</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Bonjour, {firstName}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Voici les éléments prioritaires qui nécessitent votre attention aujourd'hui.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('reports')}
              className="btn-secondary text-xs px-4 py-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Rapport RH</span>
            </button>
            <button
              onClick={onOpenNewEmployeeModal}
              className="btn-primary text-xs px-4 py-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-[#0F766E]/20 cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Ajouter un employé</span>
            </button>
          </div>
        </motion.div>

        {/* 2. SECTION « À TRAITER EN PRIORITÉ » (Dynamisée avec survol hover:-translate-y-0.5 et flèche animée) */}
        <motion.div variants={sectionVariants} className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
            <h2 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
              <span>À traiter en priorité</span>
            </h2>
            <span className="text-[11px] font-medium text-slate-400">
              3 éléments en attente de décision
            </span>
          </div>

          {/* Surface unifiée avec micro-interactions sur les lignes */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl divide-y divide-slate-100 shadow-xs">
            {/* Tâche 1: Congés */}
            <div
              onClick={() => setActiveTab('leaves')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-md font-bold text-xs font-mono">
                  12
                </span>
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block leading-tight">Demandes de congés en attente</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed">Congés payés et RTT nécessitant une décision RH</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] shrink-0 ml-4">
                <span>Voir les demandes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tâche 2: Contrats */}
            <div
              onClick={() => setActiveTab('contracts')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-[#0F172A]/10 text-[#0F172A] border border-[#0F172A]/20 rounded-md font-bold text-xs font-mono">
                  5
                </span>
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block leading-tight">Contrats arrivant à échéance</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed">Périodes d'essai et fins de CDD dans les 30 prochains jours</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] shrink-0 ml-4">
                <span>Voir les contrats</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tâche 3: Demandes RH */}
            <div
              onClick={() => setActiveTab('hr_requests')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-bold text-xs font-mono">
                  3
                </span>
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block leading-tight">Demandes administratives RH</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed">Attestations de travail et documents administratifs demandés</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] shrink-0 ml-4">
                <span>Traiter les demandes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. VUE RH GLOBALE AVEC MINI-GRAPHIQUES (SPARKLINES) */}
        <motion.div variants={sectionVariants} className="space-y-4 pt-2">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
            Vue RH Globale
          </div>
          <div className="p-8 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 shadow-xs">
            {/* Stat 1: Employés Actifs */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500">Employés actifs</span>
                <div className="text-3xl font-extrabold text-[#0F172A] font-mono mt-2">248</div>
              </div>
              <div className="hidden sm:block">
                <svg className="w-16 h-8 text-[#0F766E]" viewBox="0 0 60 30" fill="none">
                  <path d="M0 25 Q15 20, 30 12 T60 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M0 25 Q15 20, 30 12 T60 4 L60 30 L0 30 Z" fill="url(#sparklineTeal)" opacity="0.1" />
                  <defs>
                    <linearGradient id="sparklineTeal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F766E" />
                      <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Stat 2: Congés en attente */}
            <div className="flex items-center justify-between md:pl-8 pt-4 md:pt-0">
              <div>
                <span className="text-xs font-medium text-slate-500">Congés en attente</span>
                <div className="text-3xl font-extrabold text-[#0F766E] font-mono mt-2">12</div>
              </div>
              <div className="hidden sm:block">
                <svg className="w-16 h-8 text-[#0F766E]" viewBox="0 0 60 30" fill="none">
                  <path d="M0 8 Q15 22, 30 10 T60 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* Stat 3: Absences aujourd'hui */}
            <div className="flex items-center justify-between md:pl-8 pt-4 md:pt-0">
              <div>
                <span className="text-xs font-medium text-slate-500">Absences aujourd'hui</span>
                <div className="text-3xl font-extrabold text-[#0F172A] font-mono mt-2">8</div>
              </div>
              <div className="hidden sm:block">
                <svg className="w-16 h-8 text-slate-400" viewBox="0 0 60 30" fill="none">
                  <path d="M0 15 Q15 10, 30 20 T60 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* Stat 4: Contrats à échéance */}
            <div className="flex items-center justify-between md:pl-8 pt-4 md:pt-0">
              <div>
                <span className="text-xs font-medium text-slate-500">Contrats à échéance</span>
                <div className="text-3xl font-extrabold text-slate-700 font-mono mt-2">5</div>
              </div>
              <div className="hidden sm:block">
                <svg className="w-16 h-8 text-slate-400" viewBox="0 0 60 30" fill="none">
                  <path d="M0 26 Q15 14, 30 18 T60 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. SITUATION DES EFFECTIFS (Grande zone unifiée — SANS cartes séparées & SANS photos Unsplash) */}
        <motion.div variants={sectionVariants} className="space-y-4 pt-2">
          <div className="border-b border-slate-200/80 pb-2.5 flex items-center justify-between">
            <h2 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
              Situation des Effectifs
            </h2>
            <span className="text-[11px] font-mono text-slate-400">Total : 248 collaborateurs</span>
          </div>

          {/* UNE SEULE GRANDE ZONE UNIFIÉE avec 1px divider central */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 shadow-xs">
            {/* Bloc Gauche : Répartition par département */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-bold text-[12px] text-slate-500 uppercase tracking-wider">
                Répartition par département
              </h3>
              <div className="space-y-4 pt-1">
                {[
                  { name: 'Informatique & Tech', count: 78, pct: 31, color: 'bg-[#0F766E]' },
                  { name: 'Production & Opérations', count: 54, pct: 22, color: 'bg-[#0F172A]' },
                  { name: 'Commercial & Ventes', count: 42, pct: 17, color: 'bg-slate-700' },
                  { name: 'Marketing & Communication', count: 32, pct: 13, color: 'bg-slate-500' },
                  { name: 'Finance & Comptabilité', count: 24, pct: 10, color: 'bg-slate-300' },
                ].map((dept, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-medium">{dept.name}</span>
                      <span className="font-mono text-[#0F172A] font-bold">
                        {dept.count} <span className="text-slate-400 text-[10px] font-normal">({dept.pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${dept.color} rounded-full transition-all duration-500`} style={{ width: `${dept.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ligne de séparation fine et Bloc Droit : Répartition par contrat */}
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-bold text-[12px] text-slate-500 uppercase tracking-wider">
                  Répartition par contrat
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { label: 'CDI', count: 168, pct: '68%', color: 'bg-[#0F766E]' },
                    { label: 'CDD', count: 45, pct: '18%', color: 'bg-[#0F172A]' },
                    { label: 'Stage', count: 20, pct: '8%', color: 'bg-slate-500' },
                    { label: 'Freelance / Intérim', count: 15, pct: '6%', color: 'bg-slate-300' },
                  ].map((c, i) => (
                    <div key={i} className="py-2.5 px-4 bg-slate-50/70 border border-slate-200/60 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${c.color}`}></span>
                        <span className="font-semibold text-slate-700">{c.label}</span>
                      </div>
                      <span className="font-mono font-bold text-[#0F172A]">
                        {c.count} <span className="text-slate-400 text-[10px] font-normal">({c.pct})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 text-right">
                <button
                  onClick={() => setActiveTab('contracts')}
                  className="text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer flex items-center gap-1 justify-end"
                >
                  <span>Consulter tous les contrats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(DashboardView);
