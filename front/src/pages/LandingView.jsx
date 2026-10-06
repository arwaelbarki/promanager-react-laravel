import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  LogIn, 
  Briefcase, 
  Calendar, 
  Clock, 
  FolderOpen, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Star,
  Building2,
  Search,
  LayoutGrid,
  Sun,
  User,
  Sparkles,
  Award,
  FileText,
  Check,
  ArrowUpRight,
  Play,
  Globe,
  Menu,
  X,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const LandingView = ({ onGoToLogin }) => {
  const [emailInput, setEmailInput] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingCycle, setPricingCycle] = useState('annual'); // 'monthly' | 'annual'

  // Mouse tilt effect state for Hero product composition
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 8;
    const y = (clientY / innerHeight - 0.5) * 8;
    setTilt({ x, y });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (onGoToLogin) onGoToLogin();
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.06
      }
    }
  };

  return (
    <div 
      className="landing-page relative min-h-screen bg-[#100817] text-[#F7F1E7] font-sans selection:bg-[#D9AE3A] selection:text-[#100817] overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. NAVBAR FIXE EN HAUT ET RAFFINÉE */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled 
            ? 'bg-[#100817]/85 backdrop-blur-[18px] border-b border-white/[0.08] shadow-2xl py-3.5' 
            : 'bg-transparent py-5 sm:py-6 border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo à gauche : "A" dans un carré arrondi + Amsoft People + sous-titre */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Carré arrondi avec la lettre "A" */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#211027] to-[#100817] border border-[#D9AE3A]/40 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#D9AE3A] transition-colors duration-300 font-serif font-bold text-lg text-[#E8C65A]">
              A
            </div>
            <div>
              <span className="font-serif font-bold text-base text-[#F7F1E7] tracking-tight block leading-none">
                Amsoft People
              </span>
              <span className="font-mono-data text-[10px] text-[#B8A9BD] mt-1 block tracking-[0.18em] uppercase">
                RH MAROC • PAIE &amp; CNSS
              </span>
            </div>
          </div>

          {/* Navigation au centre : Accueil, Aperçu, Modules, Méthode, Avis DRH, Tarification */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#B8A9BD]">
            <a href="#hero" className="nav-link-item hover:text-[#F7F1E7]">Accueil</a>
            <a href="#apercu" className="nav-link-item hover:text-[#F7F1E7]">Aperçu</a>
            <a href="#modules" className="nav-link-item hover:text-[#F7F1E7]">Modules</a>
            <a href="#methode" className="nav-link-item hover:text-[#F7F1E7]">Méthode</a>
            <a href="#avis" className="nav-link-item hover:text-[#F7F1E7]">Avis DRH</a>
            <a href="#tarifs" className="nav-link-item hover:text-[#F7F1E7]">Tarification</a>
          </nav>

          {/* Bouton à droite : "Connexion" avec flèche, fond jaune/doré, texte noir */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onGoToLogin}
              className="px-4.5 py-2 text-xs font-bold text-[#100817] bg-[#D9AE3A] hover:bg-[#E8C65A] rounded-xl border border-[#D9AE3A]/40 transition-all duration-300 cursor-pointer shadow-sm shadow-[#D9AE3A]/10 flex items-center gap-1.5 active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Connexion</span>
            </button>
          </div>

          {/* Bouton Menu Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F7F1E7] p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Menu Mobile Overlay Plein Écran */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#100817] text-[#F7F1E7] pt-24 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="space-y-6 font-serif text-2xl">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Accueil</a>
              <a href="#apercu" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Aperçu</a>
              <a href="#modules" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Modules</a>
              <a href="#methode" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Méthode</a>
              <a href="#avis" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Avis DRH</a>
              <a href="#tarifs" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10">Tarification</a>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => { setMobileMenuOpen(false); onGoToLogin(); }}
                className="w-full py-3.5 bg-[#D9AE3A] text-[#100817] font-bold rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 stroke-[2.2]" />
                Connexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SECTION HERO — FOND AVEC RÉSEAU GÉOMÉTRIQUE ABSTRAIT DISCRET */}
      <section 
        id="hero" 
        className="relative text-[#F7F1E7] pt-20 sm:pt-24 pb-20 px-6 sm:px-8 overflow-hidden border-b border-white/[0.08]"
        style={{ background: 'linear-gradient(180deg, #100817 0%, #1C0F24 100%)' }}
      >
        {/* Lignes Géométriques Abstraites Discrètes en Fond (Profondeur Visuelle) */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden select-none">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200 L300 50 L600 400 L900 150 L1300 500" stroke="#D9AE3A" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M100 700 L450 300 L800 650 L1150 250" stroke="#E8C65A" strokeWidth="1" />
            <circle cx="300" cy="50" r="4" fill="#D9AE3A" />
            <circle cx="600" cy="400" r="5" fill="#E8C65A" />
            <circle cx="900" cy="150" r="4" fill="#D9AE3A" />
            <circle cx="450" cy="300" r="5" fill="#E8C65A" />
            <polygon points="600,400 900,150 800,650" stroke="#D9AE3A" strokeWidth="0.75" />
            <polygon points="300,50 600,400 450,300" stroke="#D9AE3A" strokeWidth="0.75" />
          </svg>
        </div>

        {/* Lumières d'ambiance radiales subtiles */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#D9AE3A]/[0.05] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#2B1535]/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center relative z-10">
          
          {/* SECTION HERO (GAUCHE) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 space-y-9 text-left"
          >
            
            {/* Pastille (Badge) : Conçu à Casablanca • Conforme au Droit du Travail Marocain */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#160B1D]/80 border border-[rgba(217,174,58,0.22)] rounded-full text-[11px] font-mono-data text-[#E8C65A] tracking-wider uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D9AE3A] animate-pulse"></span>
                <span>Conçu à Casablanca • Conforme au Droit du Travail Marocain</span>
              </div>
            </motion.div>

            {/* Titre principal : "La gestion RH, intelligente & centralisée." */}
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-[2.75rem] sm:text-5xl lg:text-[5.5rem] font-extrabold tracking-[-0.045em] leading-[0.95]"
            >
              <span className="text-white">La gestion RH,</span> <br />
              <span className="font-serif italic font-normal text-[#E8C65A]">intelligente &amp;</span>{' '}
              <span className="relative inline-block text-white">
                centralisée.
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 w-full h-[2.5px] bg-[#D9AE3A] origin-left"
                />
              </span>
            </motion.h1>

            {/* Paragraphe descriptif avec contraste et luminosité renforcés (text-gray-200 / text-[#E2D9E7]) */}
            <motion.p variants={fadeInUp} className="text-[#E2D9E7] text-base sm:text-lg leading-[1.7] max-w-[620px] font-medium opacity-95">
              Pilotez vos effectifs, contrats, congés, pointages et paie conforme (CNSS, AMO, IR, CIMR) avec un outil sobre, rigoureux et pensé pour les entreprises au Maroc.
            </motion.p>

            {/* Formulaire & SECTION CTA (Hiérarchie visuelle différenciée pour le prospect) */}
            <motion.div variants={fadeInUp} className="space-y-4 pt-1">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Saisissez votre email professionnel..."
                    className="w-full bg-white/[0.025] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-[#F7F1E7] placeholder:text-[#B8A9BD]/50 focus:outline-none focus:border-[#D9AE3A]/65 focus:ring-4 focus:ring-[#D9AE3A]/8 transition-all duration-300"
                  />
                </div>
                {/* Bouton "Accéder à l'espace RH" (Style distinctif d'or précieux avec contour renforcé) */}
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#211027]/90 hover:bg-[#D9AE3A] text-[#E8C65A] hover:text-[#100817] border-2 border-[#D9AE3A] font-extrabold text-xs rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-[#D9AE3A]/15 flex items-center justify-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 shrink-0 backdrop-blur-md"
                >
                  <span>Accéder à l'espace RH</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              {/* Ligne de réassurance discrète */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-data text-[#B8A9BD]/60 pt-1">
                <span>✓ Conçu pour les entreprises marocaines</span>
                <span>·</span>
                <span>✓ Déploiement accompagné</span>
                <span>·</span>
                <span>✓ Données centralisées</span>
              </div>
            </motion.div>

          </motion.div>

          {/* SECTION HERO (DROITE) - MOCKUP INTERACTIF */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative pt-4 pb-8"
            style={{
              transform: `perspective(1600px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            {/* Douce lueur dorée derrière le mockup */}
            <div className="absolute -inset-6 bg-[#D9AE3A]/[0.08] rounded-3xl blur-3xl pointer-events-none"></div>

            {/* CONTAINER COMPOSITION PRODUIT */}
            <div className="relative">
              
              {/* Carte principale simulant un tableau de bord */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-[#24122F] border border-[rgba(217,174,58,0.16)] rounded-2xl p-5 sm:p-6 shadow-[0_35px_90px_rgba(0,0,0,0.38)] relative overflow-hidden text-left"
              >
                {/* En-tête : 3 points (rouge, jaune, vert) + "Tableau de Bord Paie & CNSS" */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 font-serif font-bold text-xs text-[#F7F1E7]">Tableau de Bord Paie &amp; CNSS</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono-data font-semibold border border-emerald-500/30">
                    CNSS Conforme
                  </span>
                </div>

                {/* Subtitle / Badge "MOIS EN COURS • OCTOBRE 2026" */}
                <div className="text-xs font-mono-data text-[#E2D9E7] mb-4 font-semibold tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9AE3A]"></span>
                  <span>MOIS EN COURS • OCTOBRE 2026</span>
                </div>

                {/* Deux blocs de données : "EFFECTIF ACTIF" (248 salariés) et "MASSE SALARIALE" (1 420 000 MAD) */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="bg-[#100817]/70 p-3.5 rounded-xl border border-white/[0.06]">
                    <span className="text-[10px] text-[#B8A9BD] block font-mono-data uppercase tracking-wider">EFFECTIF ACTIF</span>
                    <span className="font-mono-data text-xl font-bold text-[#F7F1E7] mt-0.5 block">248 salariés</span>
                  </div>
                  <div className="bg-[#100817]/70 p-3.5 rounded-xl border border-white/[0.06]">
                    <span className="text-[10px] text-[#B8A9BD] block font-mono-data uppercase tracking-wider">MASSE SALARIALE</span>
                    <span className="font-mono-data text-xl font-bold text-[#E8C65A] mt-0.5 block">1 420 000 MAD</span>
                  </div>
                </div>

                {/* Mini Graphique d'Assiduité */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <div className="flex justify-between items-center text-[10px] font-mono-data text-[#B8A9BD] mb-1.5">
                    <span>Présences Mensuelles</span>
                    <span className="text-[#E8C65A]">96.8% moy.</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D9AE3A] to-[#E8C65A] rounded-full w-[96.8%]"></div>
                  </div>
                </div>
              </motion.div>

              {/* Carte flottante en dessous : "Youssef El Amrani", "Congé Payé - 5 jours (Casablanca)", bouton "Valider" jaune */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-4 sm:-left-8 z-30 w-[88%] sm:w-[290px] bg-[#F7F1E7] text-[#100817] border border-[rgba(217,174,58,0.3)] rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-md text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#211027] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      YA
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#100817]">Youssef El Amrani</div>
                      <div className="text-[10px] text-[#6E6375] font-medium mt-0.5">Congé Payé - 5 jours (Casablanca)</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1.5 rounded-xl bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817] text-[10px] font-extrabold cursor-pointer transition-colors shadow-xs shrink-0 ml-2">
                    Valider ✓
                  </span>
                </div>
              </motion.div>

              {/* Badge d'alerte flottant en haut à droite : Icône d'avertissement, "3 contrats CDD expirent", "Examiner sous 30j" */}
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-5 -right-3 sm:-right-6 z-30 bg-[#211027]/95 text-[#F7F1E7] border border-white/10 rounded-xl px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md flex items-center gap-3 text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[#B8A9BD] text-[11px] block leading-tight">3 contrats CDD expirent</span>
                  <span className="text-[#E8C65A] font-mono-data text-[10px] font-bold">Examiner sous 30j →</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. BANDE DE CONFIANCE & SIGNAUX CONFORMITÉ MAROC */}
      <section className="py-7 bg-[#100817] border-b border-white/[0.08] select-none text-[#B8A9BD]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-between gap-6 text-xs font-mono-data">
          <div className="flex items-center gap-2 text-[#F7F1E7]">
            <ShieldCheck className="w-4 h-4 text-[#D9AE3A]" />
            <span className="font-bold tracking-wider">CONFORMITÉ MAROCAINE CERTIFIÉE</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 opacity-80">
            <span>CNSS (Teledeclarations.ma)</span>
            <span>•</span>
            <span>Code du Travail Marocain</span>
            <span>•</span>
            <span>Impôt sur le Revenu (IR)</span>
            <span>•</span>
            <span>AMO &amp; CIMR</span>
          </div>
        </div>
      </section>

      {/* 4. APERÇU MODULES — BENTO GRID ASYMÉTRIQUE (Fond Crème #F7F1E7) */}
      <section id="modules" className="py-28 bg-[#F7F1E7] text-[#100817] border-b border-[#E5DEC9]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16"
        >
          <div className="text-left max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#D9AE3A] uppercase tracking-wider font-mono-data">
              MODULES RH HAUTE PRÉCISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#100817] tracking-tight">
              Une architecture pensée pour le travail réel
            </h2>
            <p className="text-sm sm:text-base text-[#6E6375] font-normal leading-relaxed">
              Fini les grilles génériques. Chaque module répond à une obligation légale ou administrative spécifique au Maroc.
            </p>
          </div>

          {/* BENTO GRID (Composition 5 cartes asymétriques) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* CARTE BENTO 1 (Majeure - 7 cols) : Registre Unique & Dossiers */}
            <div className="md:col-span-7 bg-[#100817] text-[#F7F1E7] rounded-2xl p-8 border border-white/10 flex flex-col justify-between group hover:border-[#D9AE3A]/50 transition-all duration-300 relative overflow-hidden shadow-xl text-left">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#211027] border border-white/10 text-[#E8C65A] flex items-center justify-center font-bold font-mono-data">
                  01
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F7F1E7]">
                  Registre Unique &amp; Dossiers Collaborateurs
                </h3>
                <p className="text-xs text-[#B8A9BD] leading-relaxed max-w-lg">
                  Suivi des contrats CDI, CDD, ANAPEC, CIN, affectations par département, salaire de base et historique des cotisations CNSS en un endroit centralisé.
                </p>
              </div>

              {/* Mini Demo Registre */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-[11px] font-mono-data">
                <div className="p-3 bg-[#211027] rounded-xl border border-white/5">
                  <span className="text-[#B8A9BD] block text-[10px]">Contrats CDI</span>
                  <span className="text-[#E8C65A] font-bold text-xs mt-0.5 block">198 actifs</span>
                </div>
                <div className="p-3 bg-[#211027] rounded-xl border border-white/5">
                  <span className="text-[#B8A9BD] block text-[10px]">ANAPEC / CDD</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">50 actifs</span>
                </div>
                <div className="p-3 bg-[#211027] rounded-xl border border-white/5">
                  <span className="text-[#B8A9BD] block text-[10px]">Statut CNSS</span>
                  <span className="text-emerald-400 font-bold text-xs mt-0.5 block">100% à jour</span>
                </div>
              </div>
            </div>

            {/* CARTE BENTO 2 (5 cols) : Congés & Solde */}
            <div className="md:col-span-5 bg-white border border-[#E5DEC9] rounded-2xl p-8 flex flex-col justify-between group hover:border-[#100817]/30 transition-all duration-300 shadow-sm text-left">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E7] text-[#100817] flex items-center justify-center font-bold font-mono-data">
                  02
                </div>
                <h3 className="font-serif text-xl font-bold text-[#100817]">
                  Congés &amp; Solde en Temps Réel
                </h3>
                <p className="text-xs text-[#6E6375] leading-relaxed">
                  Décompte automatique des 1.5 jours par mois selon le Code du travail marocain avec validation en 1-clic.
                </p>
              </div>

              {/* Calendrier Mini Interactive State */}
              <div className="mt-6 p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E5DEC9] flex items-center justify-between text-xs font-mono-data">
                <span className="font-bold text-[#100817]">OCTOBRE 2026</span>
                <span className="px-2.5 py-1 bg-[#D9AE3A] text-[#100817] font-bold rounded-lg text-[11px]">5j validés</span>
              </div>
            </div>

            {/* CARTE BENTO 3 (4 cols) : Pointage & Assiduité */}
            <div className="md:col-span-4 bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-4 group hover:border-[#100817]/30 transition-all duration-300 shadow-sm text-left">
              <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] text-[#100817] flex items-center justify-center font-bold text-xs font-mono-data">
                03
              </div>
              <h4 className="font-serif font-bold text-lg text-[#100817]">Pointage &amp; Présences</h4>
              <p className="text-xs text-[#6E6375] leading-relaxed">
                Graphique interactif d'assiduité mensuelle et export des retards pour la paie.
              </p>
              <div className="pt-2">
                <svg className="w-full h-10" viewBox="0 0 200 40" fill="none">
                  <path d="M0 30 Q 50 10, 100 20 T 200 15" stroke="#2F8F83" strokeWidth="2.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* CARTE BENTO 4 (4 cols) : Contrats & Alertes CDD */}
            <div className="md:col-span-4 bg-white border border-[#E5DEC9] rounded-2xl p-6 space-y-4 group hover:border-[#100817]/30 transition-all duration-300 shadow-sm text-left">
              <div className="w-9 h-9 rounded-xl bg-[#F7F1E7] text-rose-600 flex items-center justify-center font-bold text-xs font-mono-data">
                04
              </div>
              <h4 className="font-serif font-bold text-lg text-[#100817]">Alertes Échéances CDD</h4>
              <p className="text-xs text-[#6E6375] leading-relaxed">
                Notification automatique 30 jours avant terme des périodes d'essai ou renouvellements.
              </p>
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-rose-200 text-[11px] font-mono-data text-rose-700 flex items-center justify-between">
                <span>Fin d'essai : Amine Tazi</span>
                <span className="font-bold">In 12j</span>
              </div>
            </div>

            {/* CARTE BENTO 5 (4 cols) : Paie & Télé-déclarations */}
            <div className="md:col-span-4 bg-[#211027] text-[#F7F1E7] rounded-2xl p-6 space-y-4 border border-white/10 group hover:border-[#D9AE3A]/50 transition-all duration-300 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#100817] text-[#E8C65A] flex items-center justify-center font-bold text-xs font-mono-data">
                05
              </div>
              <h4 className="font-serif font-bold text-lg text-[#F7F1E7]">Bulletins de Paie MAD</h4>
              <p className="text-xs text-[#B8A9BD] leading-relaxed">
                Édition des fiches de paie avec calcul automatique de l'IR et cotisations sociales.
              </p>
              <div className="text-[11px] font-mono-data text-[#D9AE3A] font-bold">
                Export Damancom Prêt →
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 5. MÉTHODE — STORYTELLING STICKY (Fond Dark Ink #100817) */}
      <section id="methode" className="py-28 bg-[#100817] text-[#F7F1E7] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          <div className="text-left max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#D9AE3A] uppercase tracking-wider font-mono-data">
              LA MÉTHODE AMSOFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F1E7]">
              Trois phases vers une sérénité RH totale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Étape 01 */}
            <div className="bg-[#211027] border border-white/10 rounded-2xl p-8 space-y-4 text-left hover:border-[#D9AE3A]/40 transition-all duration-300">
              <div className="text-4xl font-serif font-bold text-[#D9AE3A]">01</div>
              <h3 className="font-serif font-bold text-xl text-[#F7F1E7]">Digitaliser l'existant</h3>
              <p className="text-xs text-[#B8A9BD] leading-relaxed">
                Importation de votre liste d'effectifs, contrats de travail et historique des soldes de congés sans perte de données.
              </p>
            </div>

            {/* Étape 02 */}
            <div className="bg-[#211027] border border-white/10 rounded-2xl p-8 space-y-4 text-left hover:border-[#D9AE3A]/40 transition-all duration-300">
              <div className="text-4xl font-serif font-bold text-[#D9AE3A]">02</div>
              <h3 className="font-serif font-bold text-xl text-[#F7F1E7]">Automatiser le quotidien</h3>
              <p className="text-xs text-[#B8A9BD] leading-relaxed">
                Validation des congés en 1-clic, alertes automatiques et gestion des absences zéro papier.
              </p>
            </div>

            {/* Étape 03 */}
            <div className="bg-[#211027] border border-white/10 rounded-2xl p-8 space-y-4 text-left hover:border-[#D9AE3A]/40 transition-all duration-300">
              <div className="text-4xl font-serif font-bold text-[#D9AE3A]">03</div>
              <h3 className="font-serif font-bold text-xl text-[#F7F1E7]">Générer la paie</h3>
              <p className="text-xs text-[#B8A9BD] leading-relaxed">
                Édition des fiches de paie certifiées en Dirhams et télé-déclarations CNSS conformes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. AVIS DRH — FORMAT ÉDITORIAL & ARCHES (Fond Crème #FAF6F0) */}
      <section id="avis" className="py-28 bg-[#FAF6F0] text-[#100817] border-b border-[#E5DEC9]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12 text-center">
          
          <span className="text-xs font-bold text-[#D9AE3A] uppercase tracking-wider font-mono-data">
            TÉMOIGNAGES DRH
          </span>

          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-8 sm:p-14 space-y-8 relative shadow-sm">
            <blockquote className="font-serif italic text-xl sm:text-3xl text-[#100817] leading-relaxed max-w-3xl mx-auto">
              « Amsoft People a apporté une rigueur et une élégance absolues à notre gestion des 250 collaborateurs. La conformité CNSS et l'édition des bulletins se font désormais sans le moindre stress. »
            </blockquote>

            <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t border-[#E5DEC9]">
              <div className="w-14 h-16 arch-top bg-[#211027] text-[#E8C65A] font-bold text-sm flex items-center justify-center">
                FA
              </div>
              <div>
                <div className="font-serif font-bold text-base text-[#100817]">Fatine Alaoui</div>
                <div className="text-xs font-mono-data text-[#6E6375]">Directrice RH · Groupe Atlas (Casablanca)</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TARIFICATION — 3 OFFRES EN MAD */}
      <section id="tarifs" className="py-28 bg-[#F7F1E7] text-[#100817] border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#D9AE3A] uppercase tracking-wider font-mono-data">
              TARIFICATION TRANSPARENTE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#100817]">
              Un prix clair, calibré pour votre entreprise
            </h2>

            {/* Toggle Mensuel / Annuel */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-[#FAF6F0] border border-[#E5DEC9] rounded-full text-xs font-mono-data">
              <button
                onClick={() => setPricingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  pricingCycle === 'monthly' ? 'bg-[#211027] text-white shadow' : 'text-[#6E6375]'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setPricingCycle('annual')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  pricingCycle === 'annual' ? 'bg-[#211027] text-white shadow' : 'text-[#6E6375]'
                }`}
              >
                Annuel (-20%)
              </button>
            </div>
          </div>

          {/* 3 OFFRES PRICING */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">
            
            {/* Offre 1 : Standard */}
            <div className="bg-white border border-[#E5DEC9] rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#100817]">Standard</h3>
                <p className="text-xs text-[#6E6375]">Pour les PME jusqu'à 30 salariés.</p>
                <div className="text-3xl font-mono-data font-bold text-[#100817]">
                  {pricingCycle === 'annual' ? '29 MAD' : '35 MAD'}
                  <span className="text-xs font-normal text-[#6E6375]"> / employé / mois</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-[#100817]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Registre des effectifs</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Congés &amp; Absences</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Conforme Code du travail</li>
              </ul>
              <button onClick={onGoToLogin} className="w-full py-3 bg-[#FAF6F0] hover:bg-[#211027] hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer">
                Commencer
              </button>
            </div>

            {/* Offre 2 : Business Pro (Recommandée) */}
            <div className="bg-[#211027] text-[#F7F1E7] border-2 border-[#D9AE3A] rounded-2xl p-8 flex flex-col justify-between space-y-6 relative shadow-2xl">
              <span className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#D9AE3A] text-[#100817] font-mono-data text-[10px] font-extrabold uppercase rounded-full tracking-wider shadow-sm">
                LE CHOIX DES DRH
              </span>
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#F7F1E7]">Business Pro</h3>
                <p className="text-xs text-[#B8A9BD]">De 30 à 200 salariés avec paie.</p>
                <div className="text-3xl font-mono-data font-bold text-[#E8C65A]">
                  {pricingCycle === 'annual' ? '49 MAD' : '59 MAD'}
                  <span className="text-xs font-normal text-[#B8A9BD]"> / employé / mois</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-[#F7F1E7]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Tout du plan Standard</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Édition bulletins de paie MAD</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Module CNSS &amp; Teledeclarations</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Support prioritaire Casablanca</li>
              </ul>
              <button onClick={onGoToLogin} className="w-full py-3.5 bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817] font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md">
                Demander un essai gratuit
              </button>
            </div>

            {/* Offre 3 : Enterprise */}
            <div className="bg-white border border-[#E5DEC9] rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#100817]">Enterprise</h3>
                <p className="text-xs text-[#6E6375]">Grands comptes 200+ salariés.</p>
                <div className="text-3xl font-mono-data font-bold text-[#100817]">
                  Sur mesure
                </div>
              </div>
              <ul className="space-y-3 text-xs text-[#100817]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Multi-sociétés &amp; Filiales</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Connecteur ERP / Paie sur mesure</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D9AE3A]" /> Account Manager dédié</li>
              </ul>
              <button onClick={onGoToLogin} className="w-full py-3 bg-[#FAF6F0] hover:bg-[#211027] hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer">
                Contacter l'équipe
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CTA FINAL & FOOTER (Fond Dark Ink #100817) */}
      <footer className="bg-[#100817] text-[#B8A9BD] pt-28 pb-14 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          {/* CTA Final */}
          <div className="text-center space-y-8 max-w-3xl mx-auto border-b border-white/10 pb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F7F1E7] leading-tight">
              Donnez à votre entreprise la rigueur RH qu'elle mérite.
            </h2>
            <div className="pt-2">
              <button
                onClick={onGoToLogin}
                className="px-8 py-4 bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817] font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-[#D9AE3A]/10 inline-flex items-center gap-2 active:scale-95"
              >
                <span>Accéder à la plateforme Amsoft People</span>
                <LogIn className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono-data text-left">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#211027] border border-[#D9AE3A]/40 flex items-center justify-center font-serif font-bold text-xs text-[#E8C65A]">
                  A
                </div>
                <span className="font-serif font-bold text-sm text-[#F7F1E7]">Amsoft People</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#B8A9BD]/80">
                Plateforme RH Tout-en-Un pour le marché marocain. Paie, CNSS &amp; Administration des effectifs.
              </p>
            </div>

            <div>
              <div className="font-bold text-[#F7F1E7] uppercase tracking-wider mb-3 text-[11px]">Navigation</div>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#hero" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#modules" className="hover:text-white transition-colors">Modules RH</a></li>
                <li><a href="#methode" className="hover:text-white transition-colors">Méthode</a></li>
                <li><a href="#tarifs" className="hover:text-white transition-colors">Tarification</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-[#F7F1E7] uppercase tracking-wider mb-3 text-[11px]">Conformité</div>
              <ul className="space-y-2 text-[11px]">
                <li>CNSS &amp; Teledeclarations.ma</li>
                <li>Impôt sur le Revenu (IR)</li>
                <li>AMO &amp; CIMR</li>
                <li>Code du Travail Marocain</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-[#F7F1E7] uppercase tracking-wider mb-3 text-[11px]">Langue &amp; Statut</div>
              <div className="space-y-3 text-[11px]">
                <div className="flex items-center gap-2 text-[#F7F1E7]">
                  <Globe className="w-3.5 h-3.5 text-[#D9AE3A]" />
                  <span>[FR] Français · (العربية قريباً)</span>
                </div>
                <div className="p-2.5 bg-[#211027] rounded-xl border border-white/5 text-[10px] text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Systèmes Opérationnels 99.9%</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono-data text-[#B8A9BD]/60">
            <div>© 2026 Amsoft People. Domaine : app.amsoft-people.ma</div>
            <div>Direction Artistique : Précision Chaleureuse · Casablanca</div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default React.memo(LandingView);
