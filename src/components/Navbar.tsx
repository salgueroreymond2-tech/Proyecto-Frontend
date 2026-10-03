import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import {
  Bell,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  SlidersHorizontal,
  Edit3,
  LogOut,
  Sun,
  Moon,
  Eye,
  ChevronDown,
  ChevronLeft,
  Menu,
  Dumbbell,
  Trophy,
  BadgeDollarSign,
  Users,
} from './Icon';
import { ASSET_PATHS } from '../config/assets';
import { TeamBadge } from './TeamBadge';

interface NavbarProps {
  onOpenAdmin: () => void;
  onNavigateHome?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToAdmin?: () => void;
  onToggleTheme?: () => void;
  colorMode?: 'dark' | 'light';
  publicMode?: boolean;
  showPublicLogin?: boolean;
  showUserProfile?: boolean;
  showQuinielaTools?: boolean;
  isAdminRoute?: boolean;
  publicNavigation?: {
    sports: { id: string; label: string; path: string; accent: string }[];
    services: { id: string; label: string; detail: string; path: string; icon: 'trophy' | 'payment' | 'community' }[];
  };
  onNavigateToPath?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onNavigateHome,
  onNavigateToLogin,
  onNavigateToProfile,
  onNavigateToAdmin,
  onToggleTheme,
  colorMode = 'dark',
  publicMode = false,
  showPublicLogin = true,
  showUserProfile = true,
  showQuinielaTools = true,
  isAdminRoute = false,
  publicNavigation,
  onNavigateToPath,
}) => {
  const {
    isMuted,
    toggleMute,
    currentUser,
    isLoggedIn,
    setShowAuthModal,
    setShowRulesModal,
    simulateAllRemaining,
    resetTournament,
    fillRandomPredictionsAll,
    logoutUser,
  } = useTournament();

  const [showSimMenu, setShowSimMenu] = useState(false);
  const [daltonismoMode, setDaltonismoMode] = useState(() => typeof document !== 'undefined' && document.documentElement.style.filter.includes('grayscale'));
  
  const toggleDaltonismo = () => {
    if (daltonismoMode) {
      document.documentElement.style.filter = '';
      setDaltonismoMode(false);
    } else {
      document.documentElement.style.filter = 'grayscale(100%) contrast(1.2)';
      setDaltonismoMode(true);
    }
  };
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [publicMenuOpen, setPublicMenuOpen] = useState<'sports' | 'services' | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const serviceIcons = {
    trophy: Trophy,
    payment: BadgeDollarSign,
    community: Users,
  };

  const handleBack = () => {
    const path = location.pathname;
    
    // Si estamos dentro de un torneo (predicciones, ranking, grand-prix, etc.)
    const tournamentInnerMatch = path.match(/^\/tournaments\/([^\/]+)\/(.+)$/);
    if (tournamentInnerMatch) {
      navigate(`/tournaments/${tournamentInnerMatch[1]}`);
      return;
    }
    
    // Si estamos en la vista de un torneo, ir a los deportes
    if (path.match(/^\/tournaments\/[^\/]+$/)) {
      navigate('/sports');
      return;
    }
    
    // Si estamos viendo un deporte especifico, volver a deportes
    if (path.match(/^\/sports\/[^\/]+$/)) {
      navigate('/sports');
      return;
    }
    
    // Si estamos dentro del dashboard (ej. /dashboard/calendario), volver al dashboard principal
    if (path.match(/^\/dashboard\/.+$/)) {
      navigate('/dashboard');
      return;
    }

    // Para rutas como /admin/algo -> /admin
    if (path.match(/^\/admin\/.+$/)) {
      navigate('/admin');
      return;
    }
    
    // Si estamos en dashboard o profile, volver a home o a la raiz
    if (path === '/dashboard' || path === '/sports') {
      onNavigateHome ? onNavigateHome() : navigate('/');
      return;
    }

    // Fallback general
    onNavigateHome ? onNavigateHome() : navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#140b16]/95 backdrop-blur-md border-b border-[#3c313e]/60 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          {!isHomePage && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA7301]"
              aria-label="Volver atras"
              title="Atras"
            >
              <ChevronLeft className="h-5 w-5 text-[#EA7301]" aria-hidden="true" />
            </button>
          )}
          {isHomePage ? (
            <div className="flex items-center gap-2.5 rounded-xl text-left cursor-default">
              <img
                src={ASSET_PATHS.logos.brand.kas}
                alt="King Arthur Sports"
                className="h-14 w-14 rounded-xl object-cover border border-[#EA7301]/60 shadow-md"
              />
              <div className="hidden sm:block leading-none">
                <span className="block text-xl font-heading font-black tracking-wide text-[#EA7301]">
                  KAS
                </span>
                <span className="block text-[10px] font-mono tracking-[0.24em] text-white/70">
                  KING ARTHUR SPORTS
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  navigate('/dashboard');
                } else {
                  onNavigateHome?.();
                }
              }}
              className="flex items-center gap-2.5 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA7301] hover:opacity-80 transition-opacity"
              aria-label={isLoggedIn ? "Ir al dashboard" : "Ir a la pagina principal"}
            >
              <img
                src={ASSET_PATHS.logos.brand.kas}
                alt="King Arthur Sports"
                className="h-14 w-14 rounded-xl object-cover border border-[#EA7301]/60 shadow-md"
              />
              <div className="hidden sm:block leading-none">
                <span className="block text-xl font-heading font-black tracking-wide text-[#EA7301]">
                  KAS
                </span>
                <span className="block text-[10px] font-mono tracking-[0.24em] text-white/70">
                  KING ARTHUR SPORTS
                </span>
              </div>
            </button>
          )}
        </div>

        {publicMode ? (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <button type="button" onClick={() => setPublicMenuOpen((value) => value === 'services' ? null : 'services')} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-heading font-bold text-white hover:border-[#EA7301]/60 hover:bg-white/10">
                  KAS <ChevronDown className="h-4 w-4" />
                </button>
                {publicMenuOpen === 'services' && publicNavigation && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#3c313e] bg-[#19101c] p-2 shadow-2xl">
                    {publicNavigation.services.map((service) => {
                      const Icon = serviceIcons[service.icon];
                      return <div key={service.id} className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left cursor-default">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#EA7301]" aria-hidden="true" />
                        <span><span className="block text-sm font-bold text-white">{service.label}</span><span className="mt-0.5 block text-xs text-white/60">{service.detail}</span></span>
                      </div>;
                    })}
                  </div>
                )}
              </div>
              <div className="relative">
                <button type="button" onClick={() => setPublicMenuOpen((value) => value === 'sports' ? null : 'sports')} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-heading font-bold text-white hover:border-[#EA7301]/60 hover:bg-white/10">
                  <Dumbbell className="h-4 w-4 text-[#EA7301]" aria-hidden="true" /> Deportes <ChevronDown className="h-4 w-4" />
                </button>
                {publicMenuOpen === 'sports' && publicNavigation && (
                  <div className="absolute right-0 mt-2 grid w-80 grid-cols-2 gap-1 rounded-xl border border-[#3c313e] bg-[#19101c] p-2 shadow-2xl">
                    {publicNavigation.sports.map((sport) => <button key={sport.id} type="button" onClick={() => { onNavigateToPath?.(sport.path); setPublicMenuOpen(null); }} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold text-white hover:bg-white/10">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sport.accent }} />{sport.label}
                    </button>)}
                  </div>
                )}
              </div>
            </div>
            <div className="relative md:hidden">
              <button type="button" onClick={() => setPublicMenuOpen((value) => value === 'services' ? null : 'services')} className="rounded-xl border border-white/15 bg-white/5 p-2.5 text-white" aria-label="Abrir navegacion">
                <Menu className="h-4 w-4 text-[#EA7301]" aria-hidden="true" />
              </button>
              {publicMenuOpen === 'services' && publicNavigation && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#3c313e] bg-[#19101c] p-2 shadow-2xl">
                  <p className="px-3 py-2 text-[10px] font-mono text-white/50">SERVICIOS</p>
                  {publicNavigation.services.map((service) => <div key={service.id} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-white cursor-default">{service.label}</div>)}
                  <p className="mt-2 px-3 py-2 text-[10px] font-mono text-white/50">DEPORTES</p>
                  {publicNavigation.sports.map((sport) => <button key={sport.id} type="button" onClick={() => { onNavigateToPath?.(sport.path); setPublicMenuOpen(null); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold text-white hover:bg-white/10"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: sport.accent }} />{sport.label}</button>)}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={toggleDaltonismo}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors"
              aria-label="Alternar modo daltonismo"
              title="Modo daltonismo (Alto Contraste)"
            >
              <Eye className={`w-4 h-4 ${daltonismoMode ? 'text-[#00f0ff]' : 'text-zinc-400'}`} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors"
              aria-label={colorMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {colorMode === 'dark' ? <Sun className="w-4 h-4 text-[#EA7301]" aria-hidden="true" /> : <Moon className="w-4 h-4 text-[#EA7301]" aria-hidden="true" />}
            </button>

            {showPublicLogin && <button
              onClick={onNavigateToLogin}
              className="rounded-xl bg-[#EA7301] px-4 py-2.5 text-sm font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400 transition-colors"
            >
              Login
            </button>}
          </div>
        ) : (
        /* Right Actions */
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDaltonismo}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            aria-label="Alternar modo daltonismo"
            title="Modo daltonismo (Alto Contraste)"
          >
            <Eye className={`w-4 h-4 ${daltonismoMode ? 'text-[#00f0ff]' : 'text-[#EA7301]'}`} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            aria-label={colorMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {colorMode === 'dark' ? <Sun className="w-4 h-4 text-[#EA7301]" aria-hidden="true" /> : <Moon className="w-4 h-4 text-[#EA7301]" aria-hidden="true" />}
          </button>

          {/* Quiniela Specific Tools */}
          {showQuinielaTools && (
            <>
              {/* Rules info */}
          <button
            onClick={() => setShowRulesModal(true)}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            title="Formato de Clasificación"
          >
            <Info className="w-4 h-4 text-[#ecb1ff]" />
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00f0ff]" aria-hidden="true" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors relative"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#bf00ff] ring-2 ring-[#140b16] animate-pulse"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1e1321] border border-[#bf00ff]/40 rounded-lg shadow-2xl p-3 z-50 text-xs">
                <div className="font-heading font-bold text-sm text-[#eeddee] mb-2 flex items-center justify-between">
                  <span>Notificaciones</span>
                  <span className="text-[10px] text-[#bf00ff]">3 nuevas</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-[#261c28] border-l-2 border-[#bf00ff]">
                    <p className="font-semibold text-white">¡Racha de 7 aciertos!</p>
                    <p className="text-[11px] text-[#d5c0d7]">Tu multiplicador aumentó a 1.5x.</p>
                  </div>
                  <div className="p-2 rounded bg-[#261c28] border-l-2 border-[#00f0ff]">
                    <p className="font-semibold text-white">El Clásico Nacional en vivo</p>
                    <p className="flex items-center gap-1.5 text-[11px] text-[#d5c0d7]">
                      <TeamBadge teamId="sap" size="xs" />
                      <span>Saprissa 2 - 1 Alajuelense</span>
                      <TeamBadge teamId="lda" size="xs" />
                      <span>(Min 64)</span>
                    </p>
                  </div>
                  <div className="p-2 rounded bg-[#261c28] border-l-2 border-emerald-400">
                    <p className="font-semibold text-white">Top 5% Alcanzado</p>
                    <p className="text-[11px] text-[#d5c0d7]">¡Estás en la 3ª posición de Costa Rica!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
            </>
          )}

          {isLoggedIn && showUserProfile && (
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => {
                  logoutUser();
                  if (onNavigateToLogin) {
                    onNavigateToLogin();
                  } else {
                    navigate('/');
                  }
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 text-red-400 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline text-sm font-bold font-heading">Salir</span>
              </button>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 pl-2 pr-3 text-[#d5c0d7] hover:text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA7301] cursor-pointer"
                title="Mi Cuenta"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-md object-cover border border-white/20"
                />
                <span className="text-sm font-bold font-heading hidden sm:inline">
                  {currentUser.username}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1e1321] border border-[#bf00ff]/50 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-[#3c313e] mb-1">
                    <div className="text-xs font-heading font-bold text-white truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#d5c0d7] truncate">
                      {currentUser.username}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      if (onNavigateToProfile) {
                        onNavigateToProfile();
                      } else {
                        setShowAuthModal(true);
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-left rounded-lg hover:bg-[#3c313e] text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-[#bf00ff]" aria-hidden="true" />
                    <span>Editar Perfil</span>
                  </button>

                  {(currentUser.role === 'admin' || currentUser.isAdmin) && (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigateToAdmin?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-left rounded-lg hover:bg-[#3c313e] text-amber-300 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-amber-300" aria-hidden="true" />
                      <span>Panel de Administrador</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logoutUser();
                      setUserMenuOpen(false);
                      if (onNavigateToLogin) {
                        onNavigateToLogin();
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-left rounded-lg hover:bg-red-950/60 text-red-400 transition-colors cursor-pointer border-t border-[#3c313e] mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4 text-red-400" aria-hidden="true" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
        )}
      </div>
    </header>
  );
};
