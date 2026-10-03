import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Check, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ activeRole, setActiveRole, currentUser, setCurrentUser, searchQuery, setSearchQuery, notifications, setActiveTab, onLogout }) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const unreadNotifs = notifications.filter(n => !n.is_read);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    localStorage.setItem('hr_active_role', role);
    let defaultName = 'Fatine Alaoui';
    if (role === 'Admin') defaultName = 'Marc Dubois';
    if (role === 'Employé') defaultName = 'Ahmed Benali';
    if (setCurrentUser) {
      setCurrentUser(defaultName);
      localStorage.setItem('hr_active_user', defaultName);
    }
    setShowRoleMenu(false);
    if (role === 'Employé') {
      setActiveTab('employee_space');
    } else {
      setActiveTab('dashboard');
    }
  };

  const getProfileData = () => {
    const defaultName = activeRole === 'Admin' ? 'Marc Dubois' : activeRole === 'Employé' ? 'Ahmed Benali' : 'Fatine Alaoui';
    const name = currentUser || defaultName;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'US';

    const title = activeRole === 'Admin'
      ? 'Administrateur Système'
      : activeRole === 'Employé'
      ? 'Lead Développeur'
      : 'Responsable RH';

    return { name, title, initials };
  };

  const currentProfile = getProfileData();

  return (
    <header className="h-16 bg-theme-sidebar border-b border-theme backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Search Bar with Theme Utility Classes */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {searchExpanded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex items-center"
            >
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Recherche générale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setSearchExpanded(false)}
                className="w-64 sm:w-80 pl-9 pr-8 py-2 bg-theme-card border border-theme text-theme-primary placeholder:text-theme-muted rounded-lg text-xs font-medium focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSearchExpanded(false); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={() => setSearchExpanded(true)}
              className="px-3.5 py-2 rounded-lg bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-teal-400 transition-all duration-200 cursor-pointer flex items-center gap-2"
              title="Rechercher"
            >
              <Search className="w-4 h-4 text-teal-400" />
              <span className="text-xs text-theme-secondary hidden sm:inline font-medium">Rechercher dans Amsoft...</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* DARK / LIGHT MODE TOGGLE BUTTON */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-theme-card border border-theme hover:border-teal-400 transition-all cursor-pointer flex items-center justify-center"
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-teal-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
        </button>

        {/* Role Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-theme-card border border-theme hover:border-teal-400 rounded-lg text-xs font-medium text-theme-secondary transition-all duration-200 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-glow-teal"></span>
            <span>Rôle : <strong className="text-theme-primary font-bold">{activeRole}</strong></span>
            <ChevronDown className="w-4 h-4 text-theme-muted" />
          </button>

          <AnimatePresence>
            {showRoleMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-theme-card border border-theme rounded-xl shadow-glow-teal py-2 z-50"
              >
                <div className="px-3.5 py-1 text-[11px] font-bold text-theme-muted uppercase tracking-wider">Changer de rôle</div>
                <button
                  onClick={() => handleRoleChange('RH')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-500/10 cursor-pointer ${activeRole === 'RH' ? 'text-teal-300 font-bold bg-teal-500/20' : 'text-theme-secondary'}`}
                >
                  <span>Responsable RH</span>
                  {activeRole === 'RH' && <Check className="w-4 h-4 text-teal-400" />}
                </button>
                <button
                  onClick={() => handleRoleChange('Admin')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-500/10 cursor-pointer ${activeRole === 'Admin' ? 'text-teal-300 font-bold bg-teal-500/20' : 'text-theme-secondary'}`}
                >
                  <span>Administrateur</span>
                  {activeRole === 'Admin' && <Check className="w-4 h-4 text-teal-400" />}
                </button>
                <button
                  onClick={() => handleRoleChange('Employé')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-500/10 cursor-pointer ${activeRole === 'Employé' ? 'text-teal-300 font-bold bg-teal-500/20' : 'text-theme-secondary'}`}
                >
                  <span>Espace Employé</span>
                  {activeRole === 'Employé' && <Check className="w-4 h-4 text-teal-400" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="w-9 h-9 rounded-lg border border-theme bg-theme-card hover:border-teal-400 flex items-center justify-center text-theme-secondary relative transition-all duration-200 cursor-pointer"
          >
            <Bell className="w-4 h-4 text-theme-secondary" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse shadow-glow-teal">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-theme-card border border-theme rounded-xl shadow-glow-teal py-2 z-50"
              >
                <div className="px-4 py-2.5 border-b border-theme flex items-center justify-between">
                  <span className="font-bold text-xs text-theme-primary">Notifications ({unreadNotifs.length})</span>
                  <button
                    onClick={() => { setActiveTab('notifications'); setShowNotifMenu(false); }}
                    className="text-xs text-teal-400 hover:underline font-semibold cursor-pointer"
                  >
                    Voir tout
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-theme">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-theme-muted">Aucune notification</div>
                  ) : (
                    notifications.slice(0, 4).map((n) => (
                      <div key={n.id} className={`p-3 text-xs ${n.is_read ? 'text-theme-muted' : 'bg-teal-500/10 text-theme-secondary font-medium'}`}>
                        <div className="font-bold text-theme-primary mb-0.5">{n.title}</div>
                        <div className="text-theme-secondary text-[11px] leading-snug">{n.message}</div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-theme">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-extrabold text-xs ring-2 ring-teal-500/40 shadow-glow-teal">
            {currentProfile.initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-bold text-xs text-theme-primary">
              {currentProfile.name}
            </div>
            <div className="text-teal-400 text-xs font-medium mt-0.5">
              {currentProfile.title}
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Déconnexion"
              className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-lg transition-all cursor-pointer ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
