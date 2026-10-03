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
    <div className="relative min-h-screen bg-theme-primary text-theme-primary font-sans select-none p-6 sm:p-8 pb-16 overflow-x-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-12 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* 1. HEADER INSTITUTIONNEL & ACCUEIL AVEC THEME UTILITIES */}
        <motion.div variants={sectionVariants} className="border-b border-theme pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-glow-teal"></span>
              <span>Amsoft People • Pilotage des Ressources Humaines</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
              Bonjour, <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 bg-clip-text text-transparent">{firstName}</span>
            </h1>
            <p className="text-xs text-theme-secondary font-medium mt-1 leading-relaxed">
              Voici les éléments prioritaires qui nécessitent votre attention aujourd'hui.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('reports')}
              className="bg-theme-card border border-theme text-theme-primary hover:border-teal-400 text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Rapport RH</span>
            </button>
            <button
              onClick={onOpenNewEmployeeModal}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-glow-teal hover:scale-105 transition-all text-xs px-5 py-2.5 rounded-xl font-bold cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Ajouter un employé</span>
            </button>
          </div>
        </motion.div>

        {/* 2. SECTION « À TRAITER EN PRIORITÉ » (TABLEAU DES DEMANDES AVEC THEME CARDS) */}
        <motion.div variants={sectionVariants} className="space-y-4">
          <div className="flex items-center justify-between border-b border-theme pb-2.5">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 shadow-glow-teal"></span>
              <span>À traiter en priorité</span>
            </h2>
            <span className="text-xs font-medium text-theme-muted">
              3 éléments en attente de décision
            </span>
          </div>

          {/* Cartes à traiter unifiées avec bg-theme-card & border-theme */}
          <div className="bg-theme-card border border-theme rounded-xl divide-y divide-slate-100 dark:divide-teal-500/10 shadow-soft backdrop-blur-md overflow-hidden">
            {/* Tâche 1: Congés */}
            <div
              onClick={() => setActiveTab('leaves')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer rounded-lg"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg font-bold text-xs font-mono">
                  12
                </span>
                <div>
                  <span className="text-xs font-bold text-theme-primary block leading-tight">Demandes de congés en attente</span>
                  <span className="text-[11px] text-theme-secondary leading-relaxed">Congés payés et RTT nécessitant une décision RH</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 shrink-0 ml-4">
                <span>Voir les demandes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tâche 2: Contrats */}
            <div
              onClick={() => setActiveTab('contracts')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer rounded-lg"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg font-bold text-xs font-mono">
                  5
                </span>
                <div>
                  <span className="text-xs font-bold text-theme-primary block leading-tight">Contrats arrivant à échéance</span>
                  <span className="text-[11px] text-theme-secondary leading-relaxed">Périodes d'essai et fins de CDD dans les 30 prochains jours</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 shrink-0 ml-4">
                <span>Voir les contrats</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>

            {/* Tâche 3: Demandes RH */}
            <div
              onClick={() => setActiveTab('hr_requests')}
              className="group p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer rounded-lg"
            >
              <div className="flex items-center gap-5">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg font-bold text-xs font-mono">
                  3
                </span>
                <div>
                  <span className="text-xs font-bold text-theme-primary block leading-tight">Demandes administratives RH</span>
                  <span className="text-[11px] text-theme-secondary leading-relaxed">Attestations de travail et documents administratifs demandés</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 shrink-0 ml-4">
                <span>Traiter les demandes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. VUE RH GLOBALE (CARTES PUR BLANC AVEC BARRE D'ACCENT LATÉRALE) */}
        <motion.div variants={sectionVariants} className="space-y-4 pt-2">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
            Vue RH Globale
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Carte 1 : Employés Actifs */}
            <div className="relative bg-white border border-slate-200 rounded-xl p-5 overflow-hidden hover:shadow-md hover:border-teal-200 transition-all duration-200">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-teal-400"></div>
              <div className="flex items-start justify-between mb-3 pl-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Employés Actifs</span>
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-teal-600" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#0B1B33] font-mono pl-2">248</div>
              <div className="flex items-center gap-2 mt-3 pl-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"></div>
                </div>
                <span className="text-[10px] font-bold text-teal-600">+12%</span>
              </div>
            </div>

            {/* Carte 2 : Congés en Attente */}
            <div className="relative bg-white border border-slate-200 rounded-xl p-5 overflow-hidden hover:shadow-md hover:border-amber-200 transition-all duration-200">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-amber-400"></div>
              <div className="flex items-start justify-between mb-3 pl-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Congés en Attente</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#0B1B33] font-mono pl-2">12</div>
              <div className="text-[11px] text-slate-500 mt-2 font-medium pl-2">Demandes reçues</div>
            </div>

            {/* Carte 3 : Absences Aujourd'hui */}
            <div className="relative bg-white border border-slate-200 rounded-xl p-5 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-400 to-slate-300"></div>
              <div className="flex items-start justify-between mb-3 pl-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Absences Aujourd'hui</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-slate-600" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#0B1B33] font-mono pl-2">8</div>
              <div className="text-[11px] text-slate-500 mt-2 font-medium pl-2">Maladie / Autoris.</div>
            </div>

            {/* Carte 4 : Contrats à Échéance */}
            <div className="relative bg-white border border-slate-200 rounded-xl p-5 overflow-hidden hover:shadow-md hover:border-amber-200 transition-all duration-200">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-400"></div>
              <div className="flex items-start justify-between mb-3 pl-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contrats à Échéance</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-amber-600 font-mono pl-2">5</div>
              <div className="text-[11px] text-slate-500 mt-2 font-medium pl-2">Dans les 30 jours</div>
            </div>

          </div>
        </motion.div>

        {/* 4. SITUATION DES EFFECTIFS (RÉPARTITION PAR DÉPARTEMENT & CONTRAT AVEC BG-THEME-CARD) */}
        <motion.div variants={sectionVariants} className="space-y-4 pt-2">
          <div className="border-b border-theme pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Situation des Effectifs
            </h2>
            <span className="text-xs font-mono text-theme-muted">Total : 248 collaborateurs</span>
          </div>

          <div className="bg-theme-card border border-theme rounded-xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 shadow-soft backdrop-blur-md">
            {/* Bloc Gauche : Répartition par département */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-bold text-xs text-teal-400 uppercase tracking-wide">
                Répartition par département
              </h3>
              <div className="space-y-4 pt-1">
                {[
                  { name: 'Informatique & Tech', count: 78, pct: 31 },
                  { name: 'Production & Opérations', count: 54, pct: 22 },
                  { name: 'Commercial & Ventes', count: 42, pct: 17 },
                  { name: 'Marketing & Communication', count: 32, pct: 13 },
                  { name: 'Finance & Comptabilité', count: 24, pct: 10 },
                ].map((dept, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-theme-secondary font-medium">
                      <span>{dept.name}</span>
                      <span className="font-mono text-theme-primary font-bold">
                        {dept.count} <span className="text-theme-muted text-[10px] font-normal">({dept.pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-theme-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400 shadow-glow-teal rounded-full transition-all duration-500" 
                        style={{ width: `${dept.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ligne de séparation fine et Bloc Droit : Répartition par contrat */}
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-theme pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-bold text-xs text-teal-400 uppercase tracking-wide">
                  Répartition par contrat
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { label: 'CDI', count: 168, pct: '68%', color: 'bg-teal-400' },
                    { label: 'CDD', count: 45, pct: '18%', color: 'bg-amber-400' },
                    { label: 'Stage', count: 20, pct: '8%', color: 'bg-slate-400' },
                    { label: 'Freelance / Intérim', count: 15, pct: '6%', color: 'bg-slate-600' },
                  ].map((c, i) => (
                    <div key={i} className="py-2.5 px-4 bg-theme-card border border-theme rounded-lg flex items-center justify-between hover:border-teal-400 transition-all">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${c.color} shadow-glow-teal`}></span>
                        <span className="font-semibold text-theme-secondary">{c.label}</span>
                      </div>
                      <span className="font-mono font-bold text-teal-400">
                        {c.count} <span className="text-theme-muted text-[10px] font-normal">({c.pct})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 text-right">
                <button
                  onClick={() => setActiveTab('contracts')}
                  className="text-xs font-semibold text-teal-400 hover:underline cursor-pointer flex items-center gap-1 justify-end"
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
