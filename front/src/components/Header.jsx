import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Bell, LogOut, Sun, Moon } from 'lucide-react';

const Header = ({ 
  activeRole, 
  setActiveRole, 
  currentUser, 
  setCurrentUser, 
  searchQuery = '', 
  setSearchQuery, 
  notifications = [], 
  setActiveTab, 
  onLogout,
  theme = 'light',
  toggleTheme
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const safeNotifs = notifications || [];
  const unreadNotifs = safeNotifs.filter(n => !n?.is_read);

  const getProfileData = () => {
    const defaultName = activeRole === 'Admin' ? 'Marc Dubois' : activeRole === 'Employé' ? 'Ahmed Benali' : 'Fatine Alaoui';
    const name = currentUser || defaultName;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'FA';

    const title = activeRole === 'Admin'
      ? 'Administrateur Système'
      : activeRole === 'Employé'
      ? 'Lead Développeur'
      : 'Responsable RH';

    return { name, title, initials };
  };

  const currentProfile = getProfileData();
  const isDark = theme === 'dark';

  return (
    <header className={`h-16 border-b px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none transition-colors duration-200 ${
      isDark 
        ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' 
        : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
    }`}>
      
      {/* 1. GAUCHE / CENTRE : Barre de recherche centrée */}
      <div className="flex-1 max-w-md">
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5] ${
            isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
          }`} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-8 py-2 border rounded-2xl text-xs font-normal focus:outline-none transition-all duration-200 shadow-xs ${
              isDark 
                ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] placeholder:text-[#B8A9BD]/50 focus:border-[#D9AE3A] focus:ring-1 focus:ring-[#D9AE3A]/30' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] placeholder:text-[#9CA3AF] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                isDark ? 'text-[#B8A9BD] hover:text-[#F7F1E7]' : 'text-[#6B7280] hover:text-[#1A1A24]'
              }`}
            >
              <X className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. DROITE : Theme Switcher, Notifications & Profil Utilisateur */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        
        {/* Theme Switcher Toggle (Light & Dark Mode) */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            title={isDark ? "Passer en Mode Clair (Light)" : "Passer en Mode Sombre (Dark)"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
              isDark 
                ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A] hover:text-[#D9AE3A]' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#D9AE3A] stroke-[2]" />
                <span className="hidden md:inline text-[11px] font-bold text-[#D9AE3A]">Mode Clair</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#1A1A24] stroke-[2]" />
                <span className="hidden md:inline text-[11px] font-bold text-[#1A1A24]">Mode Sombre</span>
              </>
            )}
          </button>
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center relative transition-all duration-200 cursor-pointer shadow-xs ${
              isDark 
                ? 'bg-[#180D21] border-white/10 hover:border-[#D9AE3A] text-[#F7F1E7]' 
                : 'bg-[#FAF6F0] border-[#E5DEC9] hover:border-[#D4AF37] text-[#1A1A24]'
            }`}
          >
            <Bell className="w-4 h-4 stroke-[1.5]" />
            <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs ${
              isDark ? 'bg-[#D9AE3A] text-[#100817]' : 'bg-[#D4AF37] text-[#1A1A24]'
            }`}>
              {unreadNotifs.length > 0 ? unreadNotifs.length : 2}
            </span>
          </button>

          <AnimatePresence>
            {showNotifMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className={`absolute right-0 mt-2 w-80 border rounded-2xl py-2 z-50 shadow-2xl ${
                  isDark 
                    ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' 
                    : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
                }`}
              >
                <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
                  isDark ? 'border-white/10' : 'border-[#E5DEC9]'
                }`}>
                  <span className="font-bold text-xs">Notifications</span>
                  <button
                    onClick={() => { setActiveTab('notifications'); setShowNotifMenu(false); }}
                    className="text-xs text-[#D4AF37] hover:underline font-bold cursor-pointer"
                  >
                    Voir tout
                  </button>
                </div>
                <div className={`max-h-64 overflow-y-auto divide-y ${
                  isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'
                }`}>
                  {safeNotifs.length === 0 ? (
                    <div className={`p-4 text-center text-xs ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
                      Aucune notification
                    </div>
                  ) : (
                    safeNotifs.slice(0, 4).map((n) => (
                      <div key={n.id} className={`p-3 text-xs ${
                        n.is_read 
                          ? (isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]') 
                          : (isDark ? 'bg-[#211027] text-[#F7F1E7] font-medium' : 'bg-[#FAF6F0] text-[#1A1A24] font-medium')
                      }`}>
                        <div className="font-bold mb-0.5">{n.title}</div>
                        <div className={`text-[11px] leading-snug ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{n.message}</div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profil Utilisateur */}
        <div className="flex items-center gap-3 pl-1 sm:pl-2">
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-extrabold text-xs shadow-xs ${
            isDark 
              ? 'bg-[#211027] text-[#E8C65A] border-[#D9AE3A]/40' 
              : 'bg-[#FAF6F0] text-[#D4AF37] border-[#D4AF37]/50'
          }`}>
            {currentProfile.initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
              {currentProfile.name}
            </div>
            <div className={`text-[11px] font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
              {currentProfile.title}
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Déconnexion"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ml-1 ${
                isDark 
                  ? 'text-[#B8A9BD] hover:text-[#F7F1E7] hover:bg-white/10' 
                  : 'text-[#6B7280] hover:text-[#1A1A24] hover:bg-slate-100'
              }`}
            >
              <LogOut className="w-4 h-4 stroke-[1.5]" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default React.memo(Header);
