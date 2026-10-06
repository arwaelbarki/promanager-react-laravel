import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Users, AlertCircle } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('fatine.alaoui@company.ma');
  const [password, setPassword] = useState('password123');
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

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4 lg:p-8 font-sans select-none text-[#1A1A24]">
      {/* Outer Split-Screen Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px] shadow-xl"
      >
        {/* PANNEAU GAUCHE : Deep Plum / Prune Sombre comme sur l'image 2 */}
        <div 
          className="md:col-span-5 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden bg-[#24132B] border-r border-[#E5DEC9]"
        >
          <div className="relative z-10 space-y-6">
            {/* Logo Amsoft People avec badge carré doré */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center shrink-0 font-extrabold shadow-sm font-serif text-xl">
                A
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-tight text-white leading-none font-serif">Amsoft People</h1>
                <p className="text-[11px] text-[#D4C3DD] font-normal mt-1">Gestion des collaborateurs</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-2xl font-serif font-extrabold tracking-tight text-white leading-snug">
                Bienvenue sur votre espace RH
              </h2>
              <p className="text-xs text-[#D4C3DD] leading-relaxed font-normal">
                Accédez à la plateforme centralisée pour gérer vos collaborateurs, suivre les congés et piloter la conformité contractuelle.
              </p>
            </div>

            {/* Illustration abstraite */}
            <div className="py-6 flex justify-center">
              <svg className="w-full h-28 text-[#D4AF37]" viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="25" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                <rect x="85" y="40" width="28" height="28" rx="6" fill="currentColor" opacity="0.18" />
                <circle cx="170" cy="45" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
                <circle cx="230" cy="52" r="14" fill="currentColor" opacity="0.3" />
                <path d="M30 68 Q 140 10, 240 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
                <circle cx="140" cy="35" r="4.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Footer Citation */}
          <div className="relative z-10 pt-4 border-t border-white/15 space-y-1">
            <p className="text-xs italic text-[#D4C3DD] font-normal leading-relaxed">
              « Une gestion RH claire, moderne et intuitive. »
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-[#D4AF37]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              <span>Fatine Alaoui • Responsable RH</span>
            </div>
          </div>
        </div>

        {/* PANNEAU DROIT : FORMULAIRE EN BLANC PUR (#FFFFFF) */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-extrabold text-[#1A1A24] tracking-tight">Connexion à votre espace</h3>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed font-normal">Saisissez vos identifiants pour accéder à l'application.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Email */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A24] mb-1.5">Adresse Email Professionnelle *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none z-10 stroke-[1.5]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fatine.alaoui@company.ma"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs font-normal text-[#1A1A24] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 shadow-xs"
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1A1A24]">Mot de passe *</label>
                  <a
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert("Instructions de réinitialisation envoyées par email."); }}
                    className="text-[11px] font-bold text-[#1A1A24] hover:text-[#D4AF37] underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none z-10 stroke-[1.5]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs font-mono-data font-normal text-[#1A1A24] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-200 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1A1A24] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.5]" /> : <Eye className="w-4 h-4 stroke-[1.5]" />}
                  </button>
                </div>
              </div>

              {/* Checkbox: Se souvenir de moi */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D1D5DB] accent-[#D4AF37] cursor-pointer"
                  />
                  <span>Se souvenir de moi</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.2]" />
              </button>
            </form>
          </div>

          {/* Accès Démo Rapide */}
          <div className="pt-6 mt-6 border-t border-[#E5E7EB]">
            <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider mb-2.5">
              Accès démo rapide :
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('RH', 'fatine.alaoui@company.ma', 'Fatine Alaoui')}
                className="px-2.5 py-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#1A1A24] border border-[#E5E7EB] rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-center truncate shadow-xs"
              >
                Responsable RH
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Admin', 'admin@company.ma', 'Marc Dubois')}
                className="px-2.5 py-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#1A1A24] border border-[#E5E7EB] rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-center truncate shadow-xs"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('Employé', 'ahmed.benali@company.ma', 'Ahmed Benali')}
                className="px-2.5 py-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#1A1A24] border border-[#E5E7EB] rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-center truncate shadow-xs"
              >
                Employé
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(LoginView);
