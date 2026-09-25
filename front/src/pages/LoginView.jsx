import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Users, AlertCircle } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Veuillez saisir votre adresse email professionnelle.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Format d’adresse email invalide (exemple: nom@entreprise.ma).');
      return;
    }

    if (!password || password.trim().length < 4) {
      setErrorMsg('Veuillez saisir votre mot de passe (4 caractères minimum).');
      return;
    }

    let role = 'RH';
    let name = 'Fatine Alaoui';
    const lowerEmail = email.trim().toLowerCase();

    if (lowerEmail.includes('admin')) {
      role = 'Admin';
      name = 'Marc Dubois';
    } else if (lowerEmail.includes('ahmed') || lowerEmail.includes('employe')) {
      role = 'Employé';
      name = 'Ahmed Benali';
    } else if (lowerEmail.includes('fatine') || lowerEmail.includes('rh')) {
      role = 'RH';
      name = 'Fatine Alaoui';
    } else {
      const parts = lowerEmail.split('@')[0].split('.');
      if (parts.length >= 2) {
        name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      } else {
        const raw = lowerEmail.split('@')[0];
        name = raw.charAt(0).toUpperCase() + raw.slice(1);
      }
    }

    onLogin({ role, name, email: email.trim() });
  };

  const handleQuickFill = (role, demoEmail, demoName) => {
    setEmail(demoEmail);
    setPassword('password123');
    setErrorMsg('');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 lg:p-8 font-sans select-none text-[#0F172A]">
      {/* Background Mesh Blobs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-[#0F172A]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Container Unifié Split-Screen 100% Plat sans ombres lourdes avec bordure 1px */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] shadow-2xl"
      >
        {/* PANNEAU GAUCHE : NOIR ARDOISE (#0F172A) + COMPLEX ABSTRACT VECTOR GRAPHICS */}
        <div className="md:col-span-5 bg-[#0F172A] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glowing Blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#0F766E]/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#0F766E]/20 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div variants={itemVariants} className="relative z-10 space-y-6">
            {/* Logo Vectoriel Amsoft People */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shrink-0 font-bold shadow-sm">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-white leading-none">Amsoft People</h1>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Gestion des collaborateurs</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-xl font-extrabold tracking-tight text-white leading-snug">
                Plateforme Unifiée de Gestion RH
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Centralisez la gestion des effectifs, le suivi des congés, la validation des présences et la conformité contractuelle en toute simplicité.
              </p>
            </div>

            {/* Illustration Vectorielle Abstrait Complexe : Formes entrelacées, cercles concentriques et opacités */}
            <div className="py-3 flex justify-center">
              <svg className="w-full h-36 text-[#0F766E]" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circles */}
                <circle cx="160" cy="60" r="55" stroke="currentColor" strokeWidth="1" opacity="0.1" strokeDasharray="4 4" />
                <circle cx="160" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                <circle cx="160" cy="60" r="25" fill="currentColor" opacity="0.08" />

                {/* Curved Data Waves */}
                <path d="M20 90 Q 90 20, 160 60 T 300 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
                <path d="M20 90 Q 90 20, 160 60 T 300 30 L 300 120 L 20 120 Z" fill="url(#tealGradient)" opacity="0.18" />

                {/* Interlocking Intersecting Curve */}
                <path d="M20 30 Q 110 100, 200 40 T 300 85" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.4" />

                {/* Nodes & Data Dots */}
                <circle cx="160" cy="60" r="6" fill="#0F766E" className="animate-pulse" />
                <circle cx="160" cy="60" r="10" stroke="#0F766E" strokeWidth="1" opacity="0.6" />
                <circle cx="300" cy="30" r="5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="90" cy="42" r="4" fill="#0F766E" opacity="0.8" />
                <circle cx="230" cy="46" r="4" fill="#FFFFFF" opacity="0.7" />

                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" />
                    <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Citation & Témoignage en bas du panneau bleu */}
          <motion.div variants={itemVariants} className="relative z-10 pt-4 border-t border-slate-800/80 space-y-1.5">
            <p className="text-xs italic text-slate-300 font-medium leading-relaxed">
              « Simplifiez votre quotidien RH avec une plateforme fluide, intuitive et centralisée. »
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>
              <span>Fatine Alaoui • Responsable RH</span>
            </div>
          </motion.div>
        </div>

        {/* PANNEAU DROIT : GLASSMORPHISM (bg-white/80 backdrop-blur-md) & FORMULAIRE */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between bg-white/80 backdrop-blur-md">
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Connexion à votre espace</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Veuillez renseigner vos identifiants professionnels pour accéder au portail.</p>
            </div>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-rose-50/80 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2 font-medium"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Adresse Email Professionnelle *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@entreprise.ma"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/90 border border-slate-200 rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:bg-white focus:border-[#0F766E] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#0F172A]">Mot de passe *</label>
                  <a
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert("Instructions de réinitialisation envoyées par email."); }}
                    className="text-[11px] font-semibold text-[#0F766E] hover:underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/90 border border-slate-200 rounded-xl text-xs font-mono font-medium text-[#0F172A] focus:outline-none focus:bg-white focus:border-[#0F766E] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 accent-[#0F766E] focus:ring-0 cursor-pointer"
                  />
                  <span>Se souvenir de moi sur cet appareil</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-[#0F766E]/20"
              >
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Accès Démo Rapide par rôle (Pré-remplissage propre des champs) */}
          <motion.div variants={itemVariants} className="pt-6 mt-6 border-t border-slate-100">
            <div className="text-[12px] uppercase font-semibold text-slate-400 tracking-wider mb-3">
              ACCÈS DÉMO RAPIDE PAR RÔLE :
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickFill('RH', 'fatine.alaoui@company.ma', 'Fatine Alaoui')}
                className="px-3 py-2 bg-slate-50/90 hover:bg-[#0F766E]/10 text-slate-700 hover:text-[#0F766E] border border-slate-200 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center"
              >
                Responsable RH
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Admin', 'admin@company.ma', 'Marc Dubois')}
                className="px-3 py-2 bg-slate-50/90 hover:bg-[#0F766E]/10 text-slate-700 hover:text-[#0F766E] border border-slate-200 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center"
              >
                Administrateur
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Employé', 'ahmed.benali@company.ma', 'Ahmed Benali')}
                className="px-3 py-2 bg-slate-50/90 hover:bg-[#0F766E]/10 text-slate-700 hover:text-[#0F766E] border border-slate-200 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center"
              >
                Employé
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(LoginView);
