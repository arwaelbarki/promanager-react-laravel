import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Check, Bell, LogOut } from 'lucide-react';

const Header = ({ activeRole, setActiveRole, currentUser, setCurrentUser, searchQuery, setSearchQuery, notifications, setActiveTab, onLogout }) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

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
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Simple discrete search glass icon trigger */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {searchExpanded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex items-center"
            >
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Recherche générale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setSearchExpanded(false)}
                className="w-64 sm:w-80 pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:bg-white focus:border-[#0F766E] transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSearchExpanded(false); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={() => setSearchExpanded(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-50 transition-all duration-200 cursor-pointer flex items-center gap-2"
              title="Rechercher"
            >
              <Search className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400 hidden sm:inline font-medium">Rechercher</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Role Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-[#0F172A] transition-all duration-200 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
            <span>Rôle : <strong className="text-[#0F172A] font-bold">{activeRole}</strong></span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <AnimatePresence>
            {showRoleMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl shadow-none py-2 z-50"
              >
                <div className="px-3.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Changer de rôle</div>
                <button
                  onClick={() => handleRoleChange('RH')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${activeRole === 'RH' ? 'text-[#0F766E] font-bold bg-[#0F766E]/10' : 'text-slate-700'}`}
                >
                  <span>Responsable RH</span>
                  {activeRole === 'RH' && <Check className="w-4 h-4 text-[#0F766E]" />}
                </button>
                <button
                  onClick={() => handleRoleChange('Admin')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${activeRole === 'Admin' ? 'text-[#0F766E] font-bold bg-[#0F766E]/10' : 'text-slate-700'}`}
                >
                  <span>Administrateur</span>
                  {activeRole === 'Admin' && <Check className="w-4 h-4 text-[#0F766E]" />}
                </button>
                <button
                  onClick={() => handleRoleChange('Employé')}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${activeRole === 'Employé' ? 'text-[#0F766E] font-bold bg-[#0F766E]/10' : 'text-slate-700'}`}
                >
                  <span>Espace Employé</span>
                  {activeRole === 'Employé' && <Check className="w-4 h-4 text-[#0F766E]" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 relative transition-all duration-200 cursor-pointer"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#0F766E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
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
                className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl shadow-none py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F172A]">Notifications ({unreadNotifs.length})</span>
                  <button
                    onClick={() => { setActiveTab('notifications'); setShowNotifMenu(false); }}
                    className="text-xs text-[#0F766E] hover:underline font-semibold cursor-pointer"
                  >
                    Voir tout
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">Aucune notification</div>
                  ) : (
                    notifications.slice(0, 4).map((n) => (
                      <div key={n.id} className={`p-3 text-xs ${n.is_read ? 'bg-white text-slate-500' : 'bg-[#0F766E]/5 text-slate-800 font-medium'}`}>
                        <div className="font-semibold text-[#0F172A] mb-0.5">{n.title}</div>
                        <div className="text-slate-600 text-[11px] leading-snug">{n.message}</div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile vector avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200/80">
          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs border border-slate-200 shadow-xs">
            {currentProfile.initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-bold text-xs text-[#0F172A]">
              {currentProfile.name}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {currentProfile.title}
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Déconnexion"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer ml-1"
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
