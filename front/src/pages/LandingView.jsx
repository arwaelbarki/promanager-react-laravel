import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowRight, 
  LogIn, 
  Briefcase, 
  Calendar, 
  Clock, 
  FolderOpen, 
  Sparkles, 
  FileText,
  ChevronRight
} from 'lucide-react';

const LandingView = ({ onGoToLogin, onDirectDemoLogin }) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('dashboard');

  const heroBadgeVariant = {
    hidden: { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const heroTitleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1, ease: 'easeOut' } }
  };

  const heroDescVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } }
  };

  const heroButtonsVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.3, ease: 'easeOut' } }
  };

  const heroMockupVariant = {
    hidden: { opacity: 0, scale: 0.96, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const sectionScrollVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="landing-page relative min-h-screen bg-gradient-to-b from-[#0B1B33] via-[#071120] to-[#050B14] text-white font-sans selection:bg-[#14B8A6] selection:text-white overflow-x-hidden">
      
      {/* 1. OVERLAY GRID PERSPECTIVE & BLOBS TEAL/GOLD */}
      <div className="absolute inset-0 grid-perspective pointer-events-none -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#0F766E]/25 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 2. NAVBAR GLASS-DARK */}
      <header className="sticky top-0 z-50 glass-dark border-b border-teal-500/20 px-6 sm:px-8 select-none">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white shrink-0 shadow-glow-teal">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-none">
                Amsoft People
              </span>
              <span className="text-[11px] text-teal-300/80 font-medium mt-1 block">Solution RH B2B High-Tech</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-[#14B8A6] transition-colors">Accueil</a>
            <a href="#fonctionnalites" className="hover:text-[#14B8A6] transition-colors">Fonctionnalités</a>
            <a href="#comment-ca-marche" className="hover:text-[#14B8A6] transition-colors">Comment ça marche</a>
            <a href="#apercu" className="hover:text-[#14B8A6] transition-colors">Aperçu Produit</a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(20,184,166,0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onGoToLogin}
              className="glow-border text-xs px-5 py-2.5 font-bold text-white cursor-pointer flex items-center gap-2 rounded-lg transition-all duration-300"
            >
              <span>Se connecter</span>
              <LogIn className="w-4 h-4 text-teal-300" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION SOMBRE AVEC TEXT-GRADIENT-PREMIUM ULTRA LUMINEUX & MOCKUP VISIBLE */}
      <section id="hero" className="relative pt-16 sm:pt-24 pb-24 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-10">
          
          <motion.div initial="hidden" animate="visible" variants={heroBadgeVariant} className="flex justify-center">
            <div className="glass-dark px-4 py-2 rounded-full border border-teal-500/30 text-xs font-bold text-teal-300 tracking-wider uppercase inline-flex items-center gap-2.5 shadow-glow-teal">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-ping"></span>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Logiciel RH B2B SaaS Premium</span>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={heroTitleVariant}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gradient-premium tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-[0_0_35px_rgba(20,184,166,0.35)]">
              La gestion des ressources humaines, simple et centralisée.
            </h1>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={heroDescVariant}>
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Pilotez vos effectifs, contrats, demandes de congés, pointages en temps réel et coffre-fort documentaire dans une plateforme au design épuré et ultra-performant.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={heroButtonsVariant} className="pt-2 flex items-center justify-center gap-5 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(20,184,166,0.6)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onGoToLogin}
              className="btn-primary bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0F766E] px-8 py-4 text-xs sm:text-sm font-extrabold flex items-center gap-3 text-white rounded-xl shadow-glow-teal cursor-pointer transition-all duration-300"
            >
              <span>Accéder à l'Espace RH</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: "rgba(20,184,166,0.6)" }}
              whileTap={{ scale: 0.98 }}
              href="#fonctionnalites"
              className="glass-dark text-slate-200 px-7 py-4 text-xs sm:text-sm font-bold flex items-center gap-2.5 rounded-xl border border-teal-500/30 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span>Découvrir les fonctionnalités</span>
              <ChevronRight className="w-4 h-4 text-teal-400" />
            </motion.a>
          </motion.div>

          {/* DASHBOARD MOCKUP (GLASS-DARK + GLOW-BORDER + AJUSTEMENT 4 KPI BG-WHITE/10) */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={heroMockupVariant} 
            className="pt-8 max-w-6xl mx-auto relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#14B8A6]/30 via-[#D4AF37]/20 to-[#0F766E]/30 rounded-3xl blur-2xl pointer-events-none"></div>

            <div className="relative rounded-3xl glass-dark glow-border p-6 sm:p-8 text-left shadow-glow-teal overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-teal-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></span>
                  <span className="text-xs font-mono text-slate-300 ml-3">app.amsoft-people.ma/dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold border border-teal-500/30">
                    <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
                    Système RH Temps Réel
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-8 space-y-5">
                  {/* AJUSTEMENT 4 : CARTES KPI AVEC BG-WHITE/10 ET BORDER-WHITE/15 POUR UNE VISIBILITÉ ACCRUE */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }} 
                      className="p-4 bg-white/10 border border-white/15 rounded-xl transition-all shadow-soft hover:shadow-glow-teal hover:border-teal-400/50 backdrop-blur-md"
                    >
                      <div className="text-[11px] text-slate-300 font-semibold uppercase">Effectif Total</div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl font-mono font-extrabold text-white">248</span>
                        <span className="text-xs font-bold text-emerald-400">+12%</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium mt-1">Actifs en poste</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }} 
                      className="p-4 bg-white/10 border border-white/15 rounded-xl transition-all shadow-soft hover:shadow-glow-teal hover:border-teal-400/50 backdrop-blur-md"
                    >
                      <div className="text-[11px] text-slate-300 font-semibold uppercase">Congés Attente</div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl font-mono font-extrabold text-[#14B8A6]">12</span>
                        <span className="text-xs font-bold text-[#14B8A6]">À valider</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium mt-1">Demandes reçues</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }} 
                      className="p-4 bg-white/10 border border-white/15 rounded-xl transition-all shadow-soft hover:shadow-glow-teal hover:border-teal-400/50 backdrop-blur-md"
                    >
                      <div className="text-[11px] text-slate-300 font-semibold uppercase">Absences Jour</div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl font-mono font-extrabold text-white">8</span>
                        <span className="text-xs font-bold text-slate-300 font-medium">Justifiées</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium mt-1">Maladie / Autoris.</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }} 
                      className="p-4 bg-white/10 border border-white/15 rounded-xl transition-all shadow-soft hover:shadow-glow-teal hover:border-teal-400/50 backdrop-blur-md"
                    >
                      <div className="text-[11px] text-slate-300 font-semibold uppercase">Échéances CDD</div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl font-mono font-extrabold text-[#D4AF37]">5</span>
                        <span className="text-xs font-bold text-[#D4AF37]">30 jours</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium mt-1">Fin de CDD / Essai</div>
                    </motion.div>
                  </div>

                  {/* AJUSTEMENT 4 : TABLEAU DES DEMANDES EN BG-WHITE/10 */}
                  <div className="bg-white/10 border border-white/15 rounded-xl p-5 space-y-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-white/15">
                      <span className="font-bold text-white uppercase tracking-wider text-xs">Dernières Demandes RH À Traiter</span>
                      <span className="text-xs font-semibold text-[#14B8A6]">Direct Sync</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="p-3 bg-[#0B1B33]/90 rounded-xl flex items-center justify-between border border-teal-500/20 hover:border-teal-400/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-full bg-[#14B8A6]/20 text-[#14B8A6] font-bold text-xs flex items-center justify-center border border-[#14B8A6]/40">
                            AB
                          </div>
                          <div>
                            <div className="font-bold text-white">Ahmed Benali</div>
                            <div className="text-[11px] text-slate-300 font-medium">Congé annuel • 8 jours (01/10 au 10/10)</div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-[10px] rounded-md border border-amber-500/40">
                          En attente RH
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-4">
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="p-5 bg-gradient-to-br from-[#0B1B33] to-[#050B14] text-white rounded-xl border border-teal-500/50 space-y-3 shadow-glow-teal"
                  >
                    <div className="flex items-center justify-between text-xs text-teal-300 font-semibold tracking-wider">
                      <span>MODULE POINTAGE</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-ping"></span>
                    </div>
                    <div className="font-mono text-3xl font-extrabold text-white text-gradient-premium">08:45:12</div>
                    <div className="text-xs text-slate-200 font-medium">Pointage enregistré pour 240 collaborateurs aujourd'hui</div>
                  </motion.div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. SECTION FONCTIONNALITÉS (AJUSTEMENT 2: BORDER-Y BORDER-TEAL-500/10)
         ==================================================================== */}
      <section id="fonctionnalites" className="py-24 bg-[#050B14] border-y border-teal-500/10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionScrollVariant}
          className="max-w-7xl mx-auto px-6 sm:px-8"
        >
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest">Modules &amp; Fonctionnalités RH</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tout ce dont votre service RH a besoin
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Une suite complète d'outils interconnectés pour piloter vos effectifs avec rigueur et précision.
            </p>
          </div>

          {/* Bento Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1: Large Primary Bento Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-8 glass-dark border border-teal-500/20 rounded-3xl p-7 sm:p-9 space-y-6 hover:border-teal-400/50 hover:shadow-glow-teal transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center font-bold shadow-glow-teal">
                  <Users className="w-6 h-6" />
                </div>
                {/* AJUSTEMENT 3 : BADGE MODULE CENTRAL AVEC GLASS-DARK & BORDER TEAL-500/40 */}
                <span className="px-3 py-1 glass-dark text-teal-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-500/40">
                  Module Central
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">Gestion des Collaborateurs &amp; Registre Unique</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Centralisez les dossiers individuels, coordonnées, fonctions, salaires bruts et statuts administratifs de chaque employé avec une recherche multicritères instantanée.
                </p>
              </div>

              {/* Roster Mini UI Preview */}
              <div className="p-4 bg-[#050B14]/80 border border-teal-500/20 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between font-mono text-slate-400 font-medium pb-2 border-b border-teal-500/15">
                  <span>MATRICULE • NOM</span>
                  <span>DEPARTEMENT</span>
                  <span>STATUT</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white text-xs font-bold flex items-center justify-center">AB</div>
                    <span className="font-bold text-white">Ahmed Benali</span>
                  </div>
                  <span className="text-slate-300 font-medium">Tech / Informatique</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-500/30">Actif</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center">FA</div>
                    <span className="font-bold text-white">Fatine Alaoui</span>
                  </div>
                  <span className="text-slate-300 font-medium">Ressources Humaines</span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-500/30">Actif</span>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Congés & Absences */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-4 glass-dark border border-teal-500/20 rounded-3xl p-7 sm:p-9 space-y-5 hover:border-teal-400/50 hover:shadow-glow-teal transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center font-bold mb-5 shadow-glow-teal">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">Congés, RTT &amp; Absences</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Circuit de validation des demandes de congé annuel, maladie ou exceptionnel avec calcul automatique du solde restant.
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-300">Demande en attente</span>
                </div>
                <span className="font-mono text-xs font-bold text-amber-200">CONG-2026-001</span>
              </div>
            </motion.div>

            {/* Feature 3: Pointage Temps Réel */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-4 glass-dark border border-teal-500/20 rounded-3xl p-7 space-y-5 hover:border-teal-400/50 hover:shadow-glow-teal transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center font-bold shadow-glow-teal">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">Pointage &amp; Suivi des Présences</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Enregistrement des heures d'arrivée, décompte des heures de travail et détection des retards.
              </p>
              <div className="pt-3 flex items-center justify-between text-xs font-mono border-t border-teal-500/15">
                <span className="text-slate-400">Total Cumulé :</span>
                <span className="font-bold text-[#14B8A6]">8h 30m / jour</span>
              </div>
            </motion.div>

            {/* Feature 4: Coffre-Fort Documents */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-4 glass-dark border border-teal-500/20 rounded-3xl p-7 space-y-5 hover:border-teal-400/50 hover:shadow-glow-teal transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center font-bold shadow-glow-teal">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">Documents &amp; Attestations</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Stockage sécurisé des contrats PDF, CIN, diplômes et génération d'attestations de travail en 1 clic.
              </p>
              <div className="pt-3 flex items-center justify-between text-xs border-t border-teal-500/15">
                <span className="text-slate-400 font-medium">Contrat_CDI.pdf</span>
                <span className="text-[10px] font-mono font-bold text-[#14B8A6]">Signé</span>
              </div>
            </motion.div>

            {/* Feature 5: Suivi des Contrats & Échéances */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-4 glass-dark border border-teal-500/20 rounded-3xl p-7 space-y-5 hover:border-teal-400/50 hover:shadow-glow-teal transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white flex items-center justify-center font-bold shadow-glow-teal">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">Suivi des Contrats &amp; Essais</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                Alertes automatiques pour les renouvellements de CDD et fins de périodes d'essai.
              </p>
              <div className="pt-3 flex items-center justify-between text-xs border-t border-teal-500/15">
                <span className="text-slate-400 font-medium">Alerte Remplacement</span>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37]">Dans 30 jours</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ====================================================================
          5. SECTION "COMMENT ÇA MARCHE" (AJUSTEMENT 2: BG-[#071120] & BORDER-Y BORDER-TEAL-500/10)
         ==================================================================== */}
      <section id="comment-ca-marche" className="py-24 bg-[#071120] border-y border-teal-500/10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionScrollVariant}
          className="max-w-7xl mx-auto px-6 sm:px-8"
        >
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest">Comment Ça Marche</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Déploiement simple &amp; prise en main immédiate
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Quatre étapes claires pour structurer la gestion de vos ressources humaines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Centralisez vos collaborateurs',
                desc: 'Importez les fiches de vos employés, leurs postes, départements et contrats de travail.'
              },
              {
                step: '02',
                title: 'Gérez congés & présences',
                desc: 'Permettez aux équipes de soumettre leurs demandes et suivez les pointages au quotidien.'
              },
              {
                step: '03',
                title: 'Suivez vos indicateurs RH',
                desc: 'Consultez les statistiques d\'effectif, taux de présence et solde de congés en temps réel.'
              },
              {
                step: '04',
                title: 'Organisez les documents',
                desc: 'Émettez les attestations administratives et conservez vos pièces jointes en sécurité.'
              }
            ].map((st, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-dark border border-teal-500/20 rounded-2xl p-7 space-y-4 hover:border-teal-400/50 transition-all shadow-soft hover:shadow-glow-teal"
              >
                <div className="text-3xl font-mono font-extrabold text-[#14B8A6] text-gradient-premium">{st.step}</div>
                <h3 className="font-bold text-base text-white tracking-tight">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ====================================================================
          6. PRODUCT SHOWCASE DEMO SWITCHER (AJUSTEMENT 2: BG-[#050B14] & BORDER-Y BORDER-TEAL-500/10)
         ==================================================================== */}
      <section id="apercu" className="py-24 bg-[#050B14] border-y border-teal-500/10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionScrollVariant}
          className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-[#14B8A6] uppercase tracking-widest">Démonstration Produit</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Découvrez l'interface en action
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Chaque espace est conçu pour maximiser l'efficacité des équipes RH.
            </p>
          </div>

          {/* Interactive Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { id: 'dashboard', label: 'Tableau de Bord RH' },
              { id: 'employees', label: 'Annuaire Collaborateurs' },
              { id: 'leaves', label: 'Gestion des Congés' },
              { id: 'documents', label: 'Coffre-fort Documents' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveShowcaseTab(tab.id)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeShowcaseTab === tab.id
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-glow-teal border border-teal-400/40'
                    : 'glass-dark text-slate-300 hover:text-white hover:border-teal-500/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Showcase Preview Box with Smooth Tab Transition */}
          <div className="max-w-5xl mx-auto glass-dark border border-teal-500/30 rounded-3xl p-7 sm:p-9 shadow-glow-teal text-left">
            {activeShowcaseTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-5">
                <div className="flex items-center justify-between text-xs border-b border-teal-500/20 pb-4">
                  <span className="font-bold text-white text-sm">Vue d'ensemble analytique</span>
                  <span className="text-xs text-teal-300 font-mono">Données consolidées 2026</span>
                </div>
                <div className="grid grid-cols-3 gap-5 text-center">
                  <div className="p-5 bg-[#050B14]/80 rounded-2xl border border-teal-500/20">
                    <div className="text-xs text-slate-400 font-semibold uppercase">Effectif global</div>
                    <div className="text-3xl font-mono font-extrabold text-white mt-1">248</div>
                  </div>
                  <div className="p-5 bg-[#050B14]/80 rounded-2xl border border-teal-500/20">
                    <div className="text-xs text-slate-400 font-semibold uppercase">Taux de présence</div>
                    <div className="text-3xl font-mono font-extrabold text-[#14B8A6] mt-1">96.8%</div>
                  </div>
                  <div className="p-5 bg-[#050B14]/80 rounded-2xl border border-teal-500/20">
                    <div className="text-xs text-slate-400 font-semibold uppercase">Demandes ouvertes</div>
                    <div className="text-3xl font-mono font-extrabold text-[#D4AF37] mt-1">12</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeShowcaseTab === 'employees' && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4 text-xs">
                <div className="font-bold text-white text-sm border-b border-teal-500/20 pb-3">Extrait de l'annuaire du personnel</div>
                <div className="p-4 bg-[#050B14]/80 rounded-2xl border border-teal-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white font-bold text-xs flex items-center justify-center">AB</div>
                    <div>
                      <div className="font-bold text-white text-sm">Ahmed Benali (EMP-0001)</div>
                      <div className="text-xs text-slate-400">Lead Développeur • CDI • Casablanca</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 font-bold text-xs rounded-md border border-emerald-500/30">Actif</span>
                </div>
              </motion.div>
            )}

            {activeShowcaseTab === 'leaves' && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4 text-xs">
                <div className="font-bold text-white text-sm border-b border-teal-500/20 pb-3">Module de gestion des congés</div>
                <div className="p-4 bg-[#050B14]/80 rounded-2xl border border-teal-500/20 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Congé Annuel (Repos fin de projet)</div>
                    <div className="text-xs text-slate-400 mt-0.5">Collaborateur : Ahmed Benali • 8 jours autorisés</div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/15 text-amber-300 font-bold text-xs rounded-md border border-amber-500/30">En attente</span>
                </div>
              </motion.div>
            )}

            {activeShowcaseTab === 'documents' && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4 text-xs">
                <div className="font-bold text-white text-sm border-b border-teal-500/20 pb-3">Coffre-fort documentaire sécurisé</div>
                <div className="p-4 bg-[#050B14]/80 rounded-2xl border border-teal-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#14B8A6]" />
                    <span className="font-medium text-white text-sm">Contrat_Travail_CDI_Signed.pdf</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">1.25 MB</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ====================================================================
          7. FINAL CTA BANNER & FOOTER (AJUSTEMENT 5: FOOTER AVEC DÉGRADÉ FROM-[#050B14] TO-[#0B1B33])
         ==================================================================== */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-[#050B14] text-white relative border-t border-teal-500/20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Une gestion RH plus simple, plus claire.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Accédez immédiatement à l'Espace RH Amsoft People pour piloter vos collaborateurs.
          </p>
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(20,184,166,0.6)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onGoToLogin}
              className="btn-primary bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0F766E] px-9 py-4 text-xs sm:text-sm font-extrabold inline-flex items-center gap-3 text-white rounded-xl shadow-glow-teal cursor-pointer"
            >
              <span>Accéder à l'Espace RH</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* AJUSTEMENT 5 : FOOTER AVEC DÉGRADÉ FROM-[#050B14] TO-[#0B1B33] */}
      <footer className="bg-gradient-to-b from-[#050B14] to-[#0B1B33] text-slate-400 py-8 text-xs border-t border-teal-500/10 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white font-bold">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-xs text-white font-extrabold shadow-glow-teal">A</div>
            <span className="text-sm">Amsoft People</span>
            <span className="text-slate-400 font-normal text-xs ml-2">• Solution RH B2B Premium</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            © 2026 Amsoft People. Tous droits réservés. • v2.0.0 Glass &amp; Glow Edition
          </div>
        </div>
      </footer>

    </div>
  );
};

export default React.memo(LandingView);
