import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  LogIn, 
  Briefcase, 
  Calendar, 
  Clock, 
  FolderOpen, 
  FileCheck, 
  CheckCircle2, 
  Sparkles, 
  Check,
  TrendingUp,
  UserPlus
} from 'lucide-react';

const LandingView = ({ onGoToLogin }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#0F172A] font-sans selection:bg-[#0F766E] selection:text-white overflow-x-hidden">
      {/* 1. BACKGROUND MESH GRADIENT & SUBTLE GRID PATTERN */}
      <div className="absolute inset-0 bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none -z-10"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[480px] bg-gradient-to-b from-[#0F766E]/20 via-[#0F172A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* 2. GLASSMORPHIC NAVBAR STICKY */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-6 sm:px-8 select-none">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base text-[#0F172A] tracking-tight block leading-none">
                Amsoft People
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Gestion des collaborateurs</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#accueil" className="hover:text-[#0F766E] transition-colors">Accueil</a>
            <a href="#fonctionnalites" className="hover:text-[#0F766E] transition-colors">Fonctionnalités</a>
            <a href="#a-propos" className="hover:text-[#0F766E] transition-colors">À propos</a>
            <a href="#aide" className="hover:text-[#0F766E] transition-colors">Aide</a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGoToLogin}
              className="btn-secondary text-xs px-4 py-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>Se connecter</span>
              <LogIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION VERTICALE AVEC HERO MOCKUP 3D PERSPECTIVE & DISCRET MESH */}
      <section id="accueil" className="pt-16 pb-20 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-full text-xs font-bold text-[#0F766E] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plateforme RH Épurée &amp; Unifiée</span>
            </div>
          </motion.div>

          {/* Titre Inter 800 Extra-Bold */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto">
              La gestion des ressources humaines, <br className="hidden sm:inline" /> simple et centralisée.
            </h1>
          </motion.div>

          {/* Sous-titre */}
          <motion.div variants={itemVariants}>
            <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Gérez l'ensemble de vos collaborateurs, contrats, demandes de congés, suivis de présences et documents RH depuis un espace unique, moderne et sécurisé.
            </p>
          </motion.div>

          {/* Bouton CTA Principal Sarcelle */}
          <motion.div variants={itemVariants} className="pt-2 flex justify-center">
            <button
              onClick={onGoToLogin}
              className="btn-primary px-8 py-3.5 text-sm font-semibold flex items-center gap-2.5 shadow-lg shadow-[#0F766E]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Accéder à l'Espace RH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* HERO MOCKUP INTERFACE FLOTTANTE AVEC PERSPECTIVE 3D & PERSPECTIVE 1000px */}
          <motion.div
            variants={itemVariants}
            className="pt-8 max-w-4xl mx-auto"
          >
            <div className="relative group [perspective:1000px]">
              {/* Backlight Glow Halo behind mockup */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0F766E]/30 to-[#0F172A]/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

              {/* Floating Mockup Container with 3D Perspective */}
              <div 
                className="relative rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-7 shadow-2xl transition-transform duration-700 ease-out transform group-hover:rotate-x-0 group-hover:scale-[1.01] text-left"
                style={{ transform: 'perspective(1000px) rotateX(2deg)' }}
              >
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="text-[11px] font-mono text-slate-400 ml-2">app.amsoft-people.ma/dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
                    <span className="font-mono text-[10px] text-slate-500">Espace RH Actif</span>
                  </div>
                </div>

                {/* Dashboard View Preview Component */}
                <div className="space-y-5 select-none">
                  {/* Top Bar Greeting */}
                  <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#0F766E] tracking-wider">Dashboard RH</div>
                      <div className="text-base font-extrabold text-[#0F172A]">Bonjour, Fatine</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-[#0F766E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs">
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>+ Ajouter un employé</span>
                      </span>
                    </div>
                  </div>

                  {/* Task List Mockup */}
                  <div className="border border-slate-200/80 rounded-xl divide-y divide-slate-100 bg-white">
                    <div className="p-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 bg-[#0F766E]/10 text-[#0F766E] rounded font-bold font-mono text-[11px]">12</span>
                        <span className="font-bold text-[#0F172A]">12 Demandes de congés en attente</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0F766E]" />
                    </div>
                    <div className="p-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 bg-[#0F172A]/10 text-[#0F172A] rounded font-bold font-mono text-[11px]">5</span>
                        <span className="font-bold text-[#0F172A]">5 Contrats à échéance dans 30 jours</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0F766E]" />
                    </div>
                  </div>

                  {/* Metrics Row Mockup with Sparklines */}
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-500 font-medium">Employés</div>
                        <div className="text-base font-mono font-extrabold text-[#0F172A]">248</div>
                      </div>
                      <svg className="w-10 h-5 text-[#0F766E]" viewBox="0 0 40 20" fill="none">
                        <path d="M0 15 Q10 12, 20 8 T40 2" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-500 font-medium">Congés</div>
                        <div className="text-base font-mono font-extrabold text-[#0F766E]">12</div>
                      </div>
                      <svg className="w-10 h-5 text-[#0F766E]" viewBox="0 0 40 20" fill="none">
                        <path d="M0 5 Q10 15, 20 8 T40 12" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-500 font-medium">Absences</div>
                        <div className="text-base font-mono font-extrabold text-[#0F172A]">8</div>
                      </div>
                      <svg className="w-10 h-5 text-slate-400" viewBox="0 0 40 20" fill="none">
                        <path d="M0 10 Q10 8, 20 14 T40 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-500 font-medium">Échéances</div>
                        <div className="text-base font-mono font-extrabold text-slate-700">5</div>
                      </div>
                      <svg className="w-10 h-5 text-slate-400" viewBox="0 0 40 20" fill="none">
                        <path d="M0 18 Q10 10, 20 12 T40 4" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. SECTION FONCTIONNALITÉS (Grille de 3 colonnes) */}
      <section id="fonctionnalites" className="py-20 bg-white/60 backdrop-blur-md border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-[12px] font-bold text-[#0F766E] uppercase tracking-wider">Modules RH Essentiels</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Une gestion centralisée &amp; fluide
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Tous vos outils de pilotage RH regroupés dans une interface unifiée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: 'Gestion des Employés',
                desc: 'Dossiers individuels des collaborateurs, informations personnelles, coordonnées et suivi de statut.'
              },
              {
                icon: Briefcase,
                title: 'Suivi des Contrats',
                desc: 'Gestion des CDI, CDD, périodes d\'essai et rappels automatiques des fins de contrat.'
              },
              {
                icon: Calendar,
                title: 'Congés & RTT',
                desc: 'Soumission des demandes en ligne et circuit de validation rapide pour les responsables RH.'
              },
              {
                icon: Clock,
                title: 'Suivi des Absences',
                desc: 'Enregistrement des arrêt maladies, absences justifiées et suivi des autorisations.'
              },
              {
                icon: FileCheck,
                title: 'Présences & Pointages',
                desc: 'Suivi des heures de présence, pointages quotidiens et décompte de la durée effective.'
              },
              {
                icon: FolderOpen,
                title: 'Documents & Demandes',
                desc: 'Gestion documentaire sécurisée et délivrance rapide d\'attestations administratives.'
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-8 space-y-4 hover:border-[#0F766E]/40 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5 text-[#0F766E]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0F172A] tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. À PROPOS / PRÉSENTATION INSTITUTIONNELLE */}
      <section id="a-propos" className="py-20 max-w-5xl mx-auto px-6 sm:px-8">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">À propos d'Amsoft People</h2>
            <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Un outil conçu pour simplifier le travail RH quotidien</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Amsoft People est la solution interne de gestion des collaborateurs conçue pour offrir aux responsables RH et aux équipes de direction une visibilité claire, fiable et centralisée sur l'ensemble des effectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-3 text-slate-700 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />
              <span>Visualisation claire &amp; synthétique</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />
              <span>Traitement rapide des demandes</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />
              <span>Sécurité &amp; confidentialité des données</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AIDE & SUPPORT */}
      <section id="aide" className="py-16 bg-white/80 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Besoin d'assistance pour vous connecter ?</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Si vous rencontrez des difficultés d'accès ou souhaitez obtenir vos identifiants, contactez votre administrateur RH.
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToLogin}
              className="btn-secondary text-xs px-6 py-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Accéder au formulaire de connexion
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER SOBRE NOIR ARDOISE */}
      <footer className="bg-[#0F172A] text-slate-400 py-8 text-xs border-t border-slate-800 select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-6 h-6 rounded bg-[#0F766E] flex items-center justify-center text-xs">A</span>
            <span>Amsoft People</span>
            <span className="text-slate-400 font-normal text-[11px] ml-2">• Gestion des collaborateurs</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            © 2026 Amsoft People. Tous droits réservés. • Système RH v1.0.0
          </div>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(LandingView);
