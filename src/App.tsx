import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Lock,
  Mail,
  Shield,
  Trophy,
  Users,
} from 'lucide-react';
import { TournamentProvider, useTournament } from './context/TournamentContext';
import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { RankingView } from './components/RankingView';
import { PlayoffsView } from './components/PlayoffsView';
import { SocialView } from './components/SocialView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { ScorerVoteModal } from './components/ScorerVoteModal';
import { ChampionModal } from './components/ChampionModal';
import { AuthModal } from './components/AuthModal';
import { RulesModal } from './components/RulesModal';
import { AdminMatchModal } from './components/AdminMatchModal';
import { AdminView } from './components/AdminView';
import { getTeamById } from './data/teams';
import { getSportEvents, type NormalizedSportEvent } from './services/sportsApi';

type Sport = {
  id: string;
  name: string;
  text: string;
  tournaments: number;
  activeEvents: number;
  accent: string;
  image: string;
};

const sports: Sport[] = [
  { id: 'football', name: 'Futbol', text: 'Jornadas, marcadores, rankings y finales.', tournaments: 8, activeEvents: 42, accent: '#EA7301', image: '/sports/football.jpg' },
  { id: 'tennis', name: 'Tenis', text: 'Rondas, sets y prestigio por torneo.', tournaments: 7, activeEvents: 18, accent: '#46D369', image: '/sports/tennis.jpg' },
  { id: 'basketball', name: 'Baloncesto', text: 'NBA con ganador, marcador y diferencia.', tournaments: 1, activeEvents: 14, accent: '#F97316', image: '/sports/basketball.jpg' },
  { id: 'baseball', name: 'Beisbol', text: 'MLB con carreras y ganador por juego.', tournaments: 1, activeEvents: 12, accent: '#38BDF8', image: '/sports/baseball.jpg' },
  { id: 'american-football', name: 'Futbol Americano', text: 'NFL con picks por semana y playoffs.', tournaments: 1, activeEvents: 16, accent: '#A78BFA', image: '/sports/american-football.jpg' },
  { id: 'mma', name: 'UFC / MMA', text: 'Ganador, metodo y round por cartelera.', tournaments: 1, activeEvents: 9, accent: '#EF4444', image: '/sports/mma.jpg' },
];

const footballTournaments = [
  { id: 'cr-apertura-2026', name: 'Campeonato Nacional de Costa Rica', season: 'Apertura 2026', status: 'Activo', price: '$9.99', enabled: true },
  { id: 'champions-league', name: 'UEFA Champions League', season: '2026-2027', status: 'Preparacion', price: '$14.99', enabled: false },
  { id: 'premier-league', name: 'Premier League', season: '2026-2027', status: 'Preparacion', price: '$12.99', enabled: false },
  { id: 'laliga', name: 'LaLiga', season: '2026-2027', status: 'Preparacion', price: '$12.99', enabled: false },
  { id: 'serie-a', name: 'Serie A', season: '2026-2027', status: 'Preparacion', price: '$11.99', enabled: false },
  { id: 'bundesliga', name: 'Bundesliga', season: '2026-2027', status: 'Preparacion', price: '$11.99', enabled: false },
  { id: 'primeira-liga', name: 'Primeira Liga', season: '2026-2027', status: 'Preparacion', price: '$9.99', enabled: false },
  { id: 'europa-league', name: 'UEFA Europa League', season: '2026-2027', status: 'Preparacion', price: '$10.99', enabled: false },
];

const sportDashboards = {
  tennis: {
    eyebrow: 'TENIS',
    title: 'Circuito de tenis',
    description: 'Predice ganadores, sets y resultados por ronda en torneos individuales.',
    prediction: 'Ganador, sets y marcador de sets',
    featured: 'Wimbledon',
    events: ['Carlos Alcaraz vs Jannik Sinner', 'Iga Swiatek vs Aryna Sabalenka', 'Coco Gauff vs Elena Rybakina'],
    tournaments: [
      { name: 'Australian Open', season: '2027', status: 'Preparacion', price: '$9.99' },
      { name: 'Roland Garros', season: '2027', status: 'Preparacion', price: '$9.99' },
      { name: 'Wimbledon', season: '2027', status: 'Preparacion', price: '$12.99' },
      { name: 'US Open', season: '2027', status: 'Preparacion', price: '$11.99' },
      { name: 'ATP Masters', season: '2027', status: 'Activo', price: '$8.99' },
      { name: 'WTA Masters', season: '2027', status: 'Activo', price: '$8.99' },
      { name: 'Copa del Cafe de Costa Rica', season: '2027', status: 'Local', price: '$4.99' },
    ],
  },
  basketball: {
    eyebrow: 'BALONCESTO',
    title: 'Dashboard NBA',
    description: 'Quinielas de temporada regular, playoffs y finales con marcador y diferencia.',
    prediction: 'Ganador, marcador y diferencia',
    featured: 'NBA 2026-2027',
    events: ['Boston Celtics vs Los Angeles Lakers', 'Denver Nuggets vs Dallas Mavericks', 'Golden State Warriors vs Phoenix Suns'],
    tournaments: [
      { name: 'NBA Temporada Regular', season: '2026-2027', status: 'Activo', price: '$12.99' },
      { name: 'NBA Playoffs', season: '2027', status: 'Preparacion', price: '$14.99' },
      { name: 'NBA Finals', season: '2027', status: 'Premium', price: '$9.99' },
    ],
  },
  baseball: {
    eyebrow: 'BEISBOL',
    title: 'Dashboard MLB',
    description: 'Pronostica carreras, ganador y series completas de MLB.',
    prediction: 'Carreras y ganador',
    featured: 'MLB 2027',
    events: ['New York Yankees vs Boston Red Sox', 'Los Angeles Dodgers vs San Diego Padres', 'Houston Astros vs Texas Rangers'],
    tournaments: [
      { name: 'MLB Temporada Regular', season: '2027', status: 'Activo', price: '$11.99' },
      { name: 'MLB Postseason', season: '2027', status: 'Preparacion', price: '$13.99' },
      { name: 'World Series', season: '2027', status: 'Premium', price: '$9.99' },
    ],
  },
  'american-football': {
    eyebrow: 'FUTBOL AMERICANO',
    title: 'Dashboard NFL',
    description: 'Picks por semana, marcadores proyectados, playoffs y Super Bowl.',
    prediction: 'Puntuacion y ganador',
    featured: 'NFL 2026-2027',
    events: ['Kansas City Chiefs vs Buffalo Bills', 'Dallas Cowboys vs Philadelphia Eagles', 'San Francisco 49ers vs Seattle Seahawks'],
    tournaments: [
      { name: 'NFL Temporada Regular', season: '2026-2027', status: 'Activo', price: '$12.99' },
      { name: 'NFL Playoffs', season: '2027', status: 'Preparacion', price: '$14.99' },
      { name: 'Super Bowl', season: '2027', status: 'Premium', price: '$9.99' },
    ],
  },
  mma: {
    eyebrow: 'UFC / MMA',
    title: 'Dashboard UFC',
    description: 'Carteleras por evento con ganador, metodo de victoria y round.',
    prediction: 'Ganador, metodo y round',
    featured: 'UFC Fight Night',
    events: ['Main Event: Fighter A vs Fighter B', 'Co-Main: Contender A vs Contender B', 'Title Bout: Champion vs Challenger'],
    tournaments: [
      { name: 'UFC Fight Night', season: '2027', status: 'Activo', price: '$7.99' },
      { name: 'UFC PPV Series', season: '2027', status: 'Activo', price: '$12.99' },
      { name: 'UFC Championship Events', season: '2027', status: 'Premium', price: '$14.99' },
    ],
  },
} satisfies Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  prediction: string;
  featured: string;
  events: string[];
  tournaments: { name: string; season: string; status: string; price: string }[];
}>;

const navPathByTab: Record<NavTab, string> = {
  dashboard: '/tournaments/cr-apertura-2026/predictions',
  ranking: '/tournaments/cr-apertura-2026/ranking',
  playoffs: '/tournaments/cr-apertura-2026/playoffs',
  social: '/tournaments/cr-apertura-2026/forum',
  profile: '/profile',
  admin: '/admin',
  login: '/login',
};

function toTournamentId(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getTournamentAccessPath(id: string) {
  return id === 'cr-apertura-2026' ? '/tournaments/cr-apertura-2026/login' : `/tournaments/${id}/membership`;
}

function findTournamentSummary(tournamentId: string) {
  const football = footballTournaments.find((item) => item.id === tournamentId);
  if (football) return { ...football, sportId: 'football', sportName: 'Futbol' };

  for (const sport of sports) {
    const dashboard = sportDashboards[sport.id];
    const tournament = dashboard?.tournaments.find((item) => toTournamentId(item.name) === tournamentId);
    if (tournament) return { id: tournamentId, ...tournament, enabled: false, sportId: sport.id, sportName: sport.name };
  }

  return undefined;
}

function KasShell() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('kas_color_mode');
    return saved === 'light' ? 'light' : 'dark';
  });
  const { setActiveScorerMatchId, currentUser, isLoggedIn } = useTournament();
  const [previewTeamId, setPreviewTeamId] = useState(currentUser.favoriteTeamId);
  const navigate = useNavigate();
  const location = useLocation();
  const themeTeamId = isLoggedIn ? currentUser.favoriteTeamId : previewTeamId;
  const favoriteTeam = getTeamById(themeTeamId);
  const loginThemeTeam = themeTeamId === 'csh' ? getTeamById('esc') : favoriteTeam;
  const activeThemeTeam = themeTeamId === 'csh' ? getTeamById('esc') : favoriteTeam;
  const usesTeamTheme = isLoggedIn && (location.pathname.includes('/tournaments/cr-apertura-2026') || location.pathname === '/profile');
  const usesLoginTeamTheme = !isLoggedIn && location.pathname === '/login';
  const isAdmin = isLoggedIn && (currentUser.role === 'admin' || currentUser.isAdmin === true);
  const activeTab = getActiveTab(location.pathname);
  const isKasPublic = location.pathname === '/' || location.pathname === '/dashboard' || location.pathname.startsWith('/sports');
  const showBottomNav = location.pathname.includes('/tournaments/cr-apertura-2026') || location.pathname === '/profile' || location.pathname.startsWith('/admin');

  useEffect(() => {
    localStorage.setItem('kas_color_mode', colorMode);
  }, [colorMode]);

  return (
    <div
      data-team-theme={usesTeamTheme ? themeTeamId : undefined}
      data-login-theme={usesLoginTeamTheme ? themeTeamId : undefined}
      data-color-mode={colorMode}
      className="min-h-screen bg-transparent text-[#eeddee] flex flex-col selection:bg-[#EA7301] selection:text-white"
      style={usesTeamTheme || usesLoginTeamTheme ? {
        '--theme-primary': (usesLoginTeamTheme ? loginThemeTeam : activeThemeTeam)?.primaryColor || '#341439',
        '--theme-secondary': (usesLoginTeamTheme ? loginThemeTeam : activeThemeTeam)?.accentColor || '#EA7301',
      } as React.CSSProperties : undefined}
    >
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
        onNavigateHome={() => navigate('/')}
        onNavigateToLogin={() => navigate('/login')}
        onNavigateToProfile={() => navigate('/profile')}
        onNavigateToAdmin={() => navigate('/admin')}
        onToggleTheme={() => setColorMode((mode) => mode === 'dark' ? 'light' : 'dark')}
        colorMode={colorMode}
        publicMode={isKasPublic}
        showUserProfile={location.pathname !== '/login'}
        showSimulator={isLoggedIn && !isAdmin && location.pathname.includes('/tournaments/cr-apertura-2026')}
      />

      <main className={isKasPublic ? 'flex-1 w-full' : 'flex-1 w-full max-w-4xl mx-auto pt-3 px-2 sm:px-4'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<KasLoginPage onSuccess={() => navigate('/dashboard')} />} />
          <Route path="/register" element={<KasLoginPage onSuccess={() => navigate('/dashboard')} isRegisterDefault />} />
          <Route path="/dashboard" element={<SportsDashboard />} />
          <Route path="/sports" element={<SportsDashboard />} />
          <Route path="/sports/football" element={<FootballDashboard />} />
          <Route path="/sports/:sportId" element={<SportPlaceholder />} />
          <Route path="/tournaments/:tournamentId/membership" element={<TournamentMembershipLogin />} />
          <Route path="/tournaments/:tournamentId" element={<TournamentDashboard />} />
          <Route path="/tournaments/cr-apertura-2026/login" element={<LoginPage onSuccess={() => navigate('/tournaments/cr-apertura-2026/predictions')} onFavoriteTeamPreview={setPreviewTeamId} />} />
          <Route path="/tournaments/:tournamentId/predictions" element={<CostaRicaOnly><DashboardView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} onOpenAdmin={() => setAdminModalOpen(true)} /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/ranking" element={<CostaRicaOnly><RankingView /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/playoffs" element={<CostaRicaOnly><PlayoffsView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/forum" element={<CostaRicaOnly><SocialView /></CostaRicaOnly>} />
          <Route path="/profile" element={<ProfileView onOpenLogin={() => navigate('/sports/football')} />} />
          <Route path="/admin/*" element={isAdmin ? <AdminView /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showBottomNav && (
        <BottomNav activeTab={activeTab} setActiveTab={(tab) => navigate(navPathByTab[tab])} isAdmin={isAdmin && activeTab === 'admin'} />
      )}

      {isKasPublic && <PublicFooter />}

      <ScorerVoteModal />
      <ChampionModal />
      <AuthModal />
      <RulesModal />
      <AdminMatchModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </div>
  );
}

function getActiveTab(pathname: string): NavTab {
  if (pathname.includes('/ranking')) return 'ranking';
  if (pathname.includes('/playoffs')) return 'playoffs';
  if (pathname.includes('/forum')) return 'social';
  if (pathname === '/profile') return 'profile';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname === '/login') return 'login';
  return 'dashboard';
}

function HomePage() {
  return (
    <div className="pb-16">
      <section className="min-h-[78vh] px-4 py-8 sm:py-12 flex items-center kas-sport-hero" style={{ '--sport-accent': '#EA7301' } as React.CSSProperties}>
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-mono tracking-[0.35em] text-[#EA7301]">SPORTTECH ECOSYSTEM</p>
              <h1 className="text-5xl sm:text-7xl font-heading font-black text-white leading-none mt-3">KING ARTHUR SPORTS</h1>
              <p className="mt-4 max-w-xl text-[#F7F7F7]/80 text-lg">KAS convierte cada torneo en una experiencia pay-per-tournament con quinielas, prestigio, ranking y comunidad.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-[#EA7301] px-5 py-3 font-heading font-bold text-black hover:bg-orange-400">
                Iniciar sesion <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sports" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-heading font-bold text-white hover:bg-white/10">
                Ver deportes
              </Link>
            </div>
          </div>
          <SportsCarousel />
        </div>
      </section>

      <SectionGrid />
    </div>
  );
}

function SportsCarousel() {
  const [active, setActive] = useState(0);
  const slide = sports[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % sports.length), 4800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto rounded-2xl border border-white/15 bg-[#140b16]/80 p-4 shadow-2xl backdrop-blur w-full max-w-xl">
      <div
        key={slide.id}
        className="min-h-[360px] rounded-xl p-6 flex flex-col justify-end kas-slide-visual overflow-hidden"
        style={{
          '--sport-accent': slide.accent,
          '--sport-image': `url(${slide.image})`,
        } as React.CSSProperties}
      >
        <div className="max-w-xl">
          <p className="text-sm font-mono tracking-[0.28em] text-white/70">DEPORTE DESTACADO</p>
          <h2 className="mt-2 text-5xl font-heading font-black text-white leading-none">{slide.name}</h2>
          <p className="mt-3 text-base text-white/82">{slide.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to={`/sports/${slide.id}`} className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-[#EA7301] transition-colors">
              Explorar deporte <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-mono text-white/75">
              {slide.tournaments} torneos · {slide.activeEvents} eventos
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <button aria-label="Anterior" onClick={() => setActive((active - 1 + sports.length) % sports.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft /></button>
        <div className="flex items-center justify-center gap-2">
          {sports.map((item, index) => (
            <button key={item.id} aria-label={item.name} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? 'w-10 bg-[#EA7301]' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
        <button aria-label="Siguiente" onClick={() => setActive((active + 1) % sports.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronRight /></button>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
        <div key={slide.id} className="h-full bg-[#EA7301] kas-carousel-progress" />
      </div>
    </div>
  );
}

function SectionGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="grid sm:grid-cols-3 gap-4">
        <InfoCard className="kas-dark-card" icon={<Trophy />} title="Torneos activos" text="Campeonato Nacional listo como torneo base." />
        <InfoCard className="kas-dark-card" icon={<BadgeDollarSign />} title="Pay-Per-Tournament" text="Compra acceso por torneo, sin forzar paquetes globales." />
        <InfoCard className="kas-dark-card" icon={<Users />} title="Comunidad" text="Foro, ranking y prestigio por competicion." />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport) => (
          <Link key={sport.id} to={`/sports/${sport.id}`} className="kas-dark-card rounded-xl border border-white/10 bg-[#19101c] p-5 hover:border-[#EA7301]/70 transition-colors">
            <div className="flex items-center justify-between">
              <Dumbbell className="w-7 h-7" style={{ color: sport.accent }} />
              <span className="text-xs font-mono text-white/60">{sport.tournaments} torneos</span>
            </div>
            <h3 className="mt-5 text-2xl font-heading font-black text-white">{sport.name}</h3>
            <p className="mt-1 text-sm text-white/65">{sport.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text, className = '' }: { icon: React.ReactNode; title: string; text: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[#19101c] p-5 ${className}`}>
      <div className="text-[#EA7301]">{icon}</div>
      <h3 className="mt-4 font-heading text-xl font-black text-white">{title}</h3>
      <p className="text-sm text-white/65">{text}</p>
    </div>
  );
}

function KasLoginPage({ onSuccess, isRegisterDefault = false }: { onSuccess: () => void; isRegisterDefault?: boolean }) {
  const { loginUser } = useTournament();
  const [isRegister, setIsRegister] = useState(isRegisterDefault);
  const [email, setEmail] = useState('raymond@kas.com');
  const [password, setPassword] = useState('kas2026');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginUser(email.trim().toLowerCase() === 'admin@kas.com');
    onSuccess();
  };

  return (
    <div className="min-h-[82vh] px-4 py-10 flex items-center justify-center kas-login-bg">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
        <section className="space-y-5">
          <p className="text-sm font-mono tracking-[0.35em] text-[#EA7301]">SPORTTECH ECOSYSTEM</p>
          <h1 className="text-5xl sm:text-6xl font-heading font-black text-white leading-none">KING ARTHUR SPORTS</h1>
          <p className="max-w-xl text-[#F7F7F7]/75 text-lg">
            Accede a tu dashboard KAS para gestionar deportes, membresias pay-per-tournament, prestigio global y torneos activos.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            <Metric label="Modelo" value="PPT" />
            <Metric label="Deportes" value="6" />
            <Metric label="Prestigio" value="KAS" />
          </div>
        </section>

        <section className="rounded-2xl border border-[#EA7301]/50 bg-[#19101c] p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <p className="text-xs font-mono text-[#EA7301]">{isRegister ? 'CREAR CUENTA' : 'LOGIN DE PLATAFORMA'}</p>
            <h2 className="text-3xl font-heading font-black text-white">Acceso KAS</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/25 p-1 mb-5">
            <button type="button" onClick={() => setIsRegister(false)} className={`rounded-lg py-2 text-xs font-heading font-bold ${!isRegister ? 'bg-[#EA7301] text-black' : 'text-white/65'}`}>
              Iniciar sesion
            </button>
            <button type="button" onClick={() => setIsRegister(true)} className={`rounded-lg py-2 text-xs font-heading font-bold ${isRegister ? 'bg-[#EA7301] text-black' : 'text-white/65'}`}>
              Crear cuenta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Correo</span>
              <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-black">
                <Mail className="w-4 h-4 text-zinc-500" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="w-full bg-transparent text-sm font-medium outline-none" />
              </span>
            </label>

            <label className="block space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Contrasena</span>
              <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-black">
                <Lock className="w-4 h-4 text-zinc-500" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="w-full bg-transparent text-sm font-medium outline-none" />
              </span>
            </label>

            <button type="submit" className="w-full rounded-xl bg-[#EA7301] py-3.5 font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400">
              {isRegister ? 'Crear cuenta KAS' : 'Iniciar sesion'}
            </button>
          </form>

          <Link to="/tournaments/cr-apertura-2026/login" className="mt-4 block text-center text-xs font-mono text-[#d5c0d7] hover:text-[#EA7301]">
            Acceso especifico a Quiniela Futbol Costa Rica
          </Link>
        </section>
      </div>
    </div>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logos/kas-logo.png"
            alt="King Arthur Sports"
            className="h-12 w-12 rounded-xl object-cover border border-[#EA7301]/50"
          />
          <div>
            <p className="font-heading text-xl font-black text-white">KING ARTHUR SPORTS</p>
            <p className="text-xs font-mono tracking-[0.2em] text-[#EA7301]">SPORTTECH ECOSYSTEM</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/65">
          <Link to="/sports" className="hover:text-[#EA7301]">Deportes</Link>
          <Link to="/memberships" className="hover:text-[#EA7301]">Membresias</Link>
          <Link to="/login" className="hover:text-[#EA7301]">Login</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 text-xs text-white/40">
        © 2026 King Arthur Sports. Pay-per-tournament, rankings y comunidad deportiva.
      </div>
    </footer>
  );
}

function LoginPage({ onSuccess, onFavoriteTeamPreview }: { onSuccess: () => void; onFavoriteTeamPreview: (teamId: string) => void }) {
  return <LoginView onLoginSuccess={onSuccess} onFavoriteTeamPreview={onFavoriteTeamPreview} />;
}

function SportsDashboard() {
  const { currentUser } = useTournament();
  const featuredTournaments = footballTournaments.slice(0, 5);
  const [apiEvents, setApiEvents] = useState<NormalizedSportEvent[]>([]);
  const [apiStatus, setApiStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [apiMessage, setApiMessage] = useState('Conectando con ESPN');

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      getSportEvents('football', controller.signal),
      getSportEvents('basketball', controller.signal),
      getSportEvents('baseball', controller.signal),
      getSportEvents('american-football', controller.signal),
    ]).then((results) => {
      const events = results.flatMap((result) => result.data.slice(0, 2)).slice(0, 6);
      const usingFallback = results.some((result) => result.fromFallback);

      setApiEvents(events);
      setApiStatus(usingFallback ? 'error' : 'ready');
      setApiMessage(usingFallback ? 'Mostrando respaldo local mientras una API externa responde.' : 'Datos conectados desde ESPN.');
    }).catch((error) => {
      if (controller.signal.aborted) return;
      setApiEvents([]);
      setApiStatus('error');
      setApiMessage(error instanceof Error ? error.message : 'No se pudieron cargar eventos externos.');
    });

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-8 pb-24 px-4 pt-6 max-w-6xl mx-auto">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c] p-5 sm:p-7 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[radial-gradient(circle_at_center,#EA7301,transparent_58%)]" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">DASHBOARD KAS</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-heading font-black text-white">Bienvenido, {currentUser.name}</h1>
            <p className="mt-3 max-w-2xl text-[#d5c0d7]">
              Gestiona tus deportes, compra accesos por torneo, compite en rankings y entra a comunidades deportivas desde un solo lugar.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Prestigio" value={currentUser.points.toLocaleString()} />
            <Metric label="Ranking global" value="Top 5%" />
            <Metric label="Deportes" value={String(sports.length)} />
            <Metric label="Torneos activos" value={String(footballTournaments.length)} />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <InfoCard className="kas-dark-card" icon={<Trophy />} title="Quinielas por torneo" text="Acceso individual a competiciones, picks, jornadas y finales sin paquetes obligatorios." />
        <InfoCard className="kas-dark-card" icon={<BarChart3 />} title="Ranking y prestigio" text="Puntos, posiciones globales y reconocimiento por rendimiento en cada deporte." />
        <InfoCard className="kas-dark-card" icon={<Users />} title="Comunidad deportiva" text="Foros, perfiles, historial y participacion social alrededor de cada torneo." />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">DEPORTES</p>
            <h2 className="text-3xl font-heading font-black text-white">Explora las categorias</h2>
          </div>
          <Link to="/sports/football" className="inline-flex items-center gap-2 text-sm font-bold text-[#EA7301] hover:text-orange-300">
            Ver futbol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports.map((sport) => (
            <Link key={sport.id} to={`/sports/${sport.id}`} className="rounded-xl border border-[#3c313e] bg-[#221824] p-5 hover:border-[#EA7301] transition-colors">
              <div className="flex items-center justify-between">
                <Dumbbell className="w-7 h-7" style={{ color: sport.accent }} />
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-mono text-white/70">{sport.activeEvents} eventos</span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-black text-white">{sport.name}</h3>
              <p className="mt-2 text-sm text-[#d5c0d7]">{sport.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#EA7301]">Entrar <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <p className="text-sm font-mono text-[#EA7301]">SERVICIOS KAS</p>
          <h2 className="mt-2 text-3xl font-heading font-black text-white">Modelo pay-per-tournament</h2>
          <p className="mt-3 text-sm text-[#d5c0d7]">
            KAS permite crear experiencias deportivas independientes: membresia por torneo, ranking propio, foro de comunidad y reglas adaptadas a cada deporte.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Modelo" value="PPT" />
            <Metric label="Accesos" value="Por torneo" />
            <Metric label="Formato" value="Multi deporte" />
            <Metric label="Comunidad" value="Incluida" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-mono text-[#EA7301]">TORNEOS</p>
              <h2 className="text-3xl font-heading font-black text-white">Destacados</h2>
            </div>
            <Link to="/sports/football" className="text-sm font-bold text-[#EA7301] hover:text-orange-300">Ver todos</Link>
          </div>
          <div className="mt-4 space-y-3">
            {featuredTournaments.map((tournament) => (
              <Link key={tournament.id} to={getTournamentAccessPath(tournament.id)} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3 hover:border-[#EA7301]/70 transition-colors">
                <div>
                  <h3 className="font-heading text-xl font-black text-white">{tournament.name}</h3>
                  <p className="text-xs text-[#d5c0d7]">{tournament.season} · {tournament.status}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{tournament.price}</span>
                  <ArrowRight className="w-4 h-4 text-white/60" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">API SPORTS DATA</p>
            <h2 className="text-3xl font-heading font-black text-white">Eventos conectados</h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-mono ${apiStatus === 'ready' ? 'bg-emerald-400/15 text-emerald-300' : apiStatus === 'loading' ? 'bg-[#EA7301]/15 text-[#EA7301]' : 'bg-amber-400/15 text-amber-200'}`}>
            {apiStatus === 'loading' ? 'Cargando' : apiStatus === 'ready' ? 'ESPN activo' : 'Fallback local'}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#d5c0d7]">{apiMessage}</p>

        <div className="mt-5 grid md:grid-cols-2 gap-3">
          {apiStatus === 'loading' && [1, 2, 3, 4].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-xl border border-white/10 bg-black/25" />
          ))}

          {apiStatus !== 'loading' && apiEvents.map((event) => (
            <a
              key={event.id}
              href={event.sourceUrl || '#'}
              target={event.sourceUrl ? '_blank' : undefined}
              rel={event.sourceUrl ? 'noreferrer' : undefined}
              className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-[#EA7301]/70 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-mono uppercase text-[#EA7301]">{event.league}</p>
                  <h3 className="mt-1 font-heading text-xl font-black text-white">{event.title}</h3>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-mono text-white/65">{event.provider}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#d5c0d7]">
                <span>{event.status}</span>
                {event.score && <span className="text-white">Marcador {event.score}</span>}
                {event.startsAt && <span>{new Date(event.startsAt).toLocaleDateString()}</span>}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/30 p-3 border border-white/10">
      <div className="text-xs text-white/55">{label}</div>
      <div className="font-heading text-xl font-black text-white">{value}</div>
    </div>
  );
}

function FootballDashboard() {
  return (
    <div className="space-y-6 pb-24 px-4 pt-4">
      <div>
        <p className="text-sm font-mono text-[#EA7301]">FUTBOL</p>
        <h1 className="text-4xl font-heading font-black text-white">Torneos de futbol</h1>
      </div>
      <div className="grid gap-4">
        {footballTournaments.map((tournament) => (
          <Link
            key={tournament.id}
            to={getTournamentAccessPath(tournament.id)}
            className="rounded-xl border border-[#3c313e] bg-[#221824] p-5 hover:border-[#EA7301] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-black text-white">{tournament.name}</h2>
                <p className="text-sm text-[#d5c0d7]">{tournament.season} · {tournament.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{tournament.price}</span>
                <ArrowRight className="w-5 h-5 text-white/70" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TournamentMembershipLogin() {
  const { tournamentId } = useParams();
  const tournament = tournamentId ? findTournamentSummary(tournamentId) : undefined;
  const { loginUser } = useTournament();
  const navigate = useNavigate();
  const [email, setEmail] = useState('raymond@kas.com');
  const [password, setPassword] = useState('kas2026');

  if (!tournament || !tournamentId) return <Navigate to="/sports" replace />;
  if (tournamentId === 'cr-apertura-2026') return <Navigate to="/tournaments/cr-apertura-2026/login" replace />;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginUser(email.trim().toLowerCase() === 'admin@kas.com');
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <div className="min-h-[76vh] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
        <section className="rounded-2xl border border-[#EA7301]/40 bg-[#19101c]/90 p-6 sm:p-8">
          <p className="text-sm font-mono text-[#EA7301]">MEMBRESIA PAY-PER-TOURNAMENT</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-heading font-black text-white">{tournament.name}</h1>
          <p className="mt-3 text-[#d5c0d7]">{tournament.sportName} · {tournament.season} · {tournament.status}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Metric label="Acceso" value={tournament.price} />
            <Metric label="Modelo" value="PPT" />
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-mono text-white/45">INCLUYE</p>
            <ul className="mt-3 space-y-2 text-sm text-[#eeddee]">
              <li>Quiniela del torneo</li>
              <li>Ranking KAS por competicion</li>
              <li>Foro exclusivo del torneo</li>
              <li>Prestigio global y badges</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-[#EA7301]/50 bg-[#19101c]/95 p-6 sm:p-8 shadow-2xl">
          <p className="text-xs font-mono text-[#EA7301]">LOGIN DE MEMBRESIA</p>
          <h2 className="mt-1 text-3xl font-heading font-black text-white">Acceso al torneo</h2>
          <p className="mt-2 text-sm text-[#d5c0d7]">
            Inicia sesion o compra esta membresia para desbloquear la experiencia completa.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Correo</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="w-full rounded-xl bg-white px-3 py-3 text-sm font-medium text-black outline-none" />
            </label>

            <label className="block space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Contrasena</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="w-full rounded-xl bg-white px-3 py-3 text-sm font-medium text-black outline-none" />
            </label>

            <button type="submit" className="w-full rounded-xl bg-[#EA7301] py-3.5 font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400">
              Comprar acceso {tournament.price}
            </button>
          </form>

          <Link to={`/tournaments/${tournamentId}`} className="mt-4 block text-center text-xs font-mono text-[#d5c0d7] hover:text-[#EA7301]">
            Ver resumen publico del torneo
          </Link>
        </section>
      </div>
    </div>
  );
}

function TournamentDashboard() {
  const { tournamentId } = useParams();
  const tournament = tournamentId ? findTournamentSummary(tournamentId) : undefined;

  if (!tournament || !tournamentId) return <Navigate to="/sports" replace />;

  const sport = sports.find((item) => item.id === tournament.sportId);
  const dashboard = sportDashboards[tournament.sportId];
  const isCostaRica = tournament.id === 'cr-apertura-2026';
  const primaryPath = isCostaRica ? '/tournaments/cr-apertura-2026/predictions' : getTournamentAccessPath(tournament.id);
  const events = dashboard?.events || [
    'Jornada inicial pendiente de fixture',
    'Ranking del torneo en preparacion',
    'Foro de comunidad disponible',
  ];
  const enabledPath = primaryPath;

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-6xl mx-auto">
      <section className="rounded-2xl border border-[#EA7301]/40 bg-[#19101c] p-5 sm:p-7 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[radial-gradient(circle_at_center,#EA7301,transparent_58%)]" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">DASHBOARD DEL TORNEO</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-heading font-black text-white">{tournament.name}</h1>
            <p className="mt-3 text-[#d5c0d7]">
              {tournament.sportName} · {tournament.season} · {tournament.status} · Membresia {tournament.price}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Deporte" value={tournament.sportName} />
            <Metric label="Formato" value="PPT" />
            <Metric label="Estado" value={tournament.status} />
            <Metric label="Eventos" value={String(sport?.activeEvents || events.length)} />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <InfoCard className="kas-dark-card" icon={<CalendarDays />} title="Calendario" text={isCostaRica ? 'Jornada activa disponible.' : 'Fixture conectado al deporte y listo para carga.'} />
        <InfoCard className="kas-dark-card" icon={<BarChart3 />} title="Ranking KAS" text={`Prestigio y posiciones exclusivas para ${tournament.name}.`} />
        <InfoCard className="kas-dark-card" icon={<Shield />} title="Membresia activa" text="Acceso pay-per-tournament para competir dentro de este torneo." />
      </section>

      <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-4">
        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <p className="text-sm font-mono text-[#EA7301]">FORMATO DE PREDICCION</p>
          <h2 className="mt-2 text-3xl font-heading font-black text-white">{dashboard?.prediction || 'Ganador, marcador y ranking'}</h2>
          <p className="mt-3 text-sm text-[#d5c0d7]">
            Este torneo tiene su propio espacio de picks, ranking, comunidad y control de membresia.
          </p>
          <Link to={primaryPath} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EA7301] px-5 py-3 font-heading font-bold text-black hover:bg-orange-400">
            {isCostaRica ? 'Entrar a quiniela' : 'Gestionar membresia'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <p className="text-sm font-mono text-[#EA7301]">EVENTOS DEL TORNEO</p>
          <h2 className="text-3xl font-heading font-black text-white">Actividad destacada</h2>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="font-heading text-lg font-bold text-white">{event}</span>
                <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">Picks</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="space-y-5 pb-24 px-4 pt-4">
      <div className="rounded-2xl border border-[#EA7301]/40 bg-[#19101c] p-5">
        <p className="text-sm font-mono text-[#EA7301]">DASHBOARD DEL TORNEO</p>
        <h1 className="text-3xl font-heading font-black text-white">{tournament.name}</h1>
        <p className="text-sm text-[#d5c0d7]">{tournament.season} · Membresia {tournament.price}</p>
        {!tournament.enabled && (
          <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
            Esta competicion ya esta registrada en la arquitectura KAS. La quiniela reutilizable con equipos y logos correctos queda para la siguiente fase.
          </p>
        )}
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <InfoCard icon={<CalendarDays />} title="Proximos partidos" text={tournament.enabled ? 'Jornada activa disponible.' : 'Fixture pendiente de carga.'} />
        <InfoCard icon={<BarChart3 />} title="Ranking KAS" text="Prestigio global y por torneo." />
        <InfoCard icon={<Shield />} title="Membresia" text={tournament.enabled ? 'Acceso activo de prototipo.' : 'Pay-per-tournament preparado.'} />
      </div>
      <Link to={enabledPath} className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-heading font-bold ${tournament.enabled ? 'bg-[#EA7301] text-black' : 'bg-white/10 text-white'}`}>
        {tournament.enabled ? 'Acceder con login de quiniela' : 'Comprar membresia'} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function SportPlaceholder() {
  const { sportId } = useParams();
  const sport = sports.find((item) => item.id === sportId);
  const dashboard = sportId ? sportDashboards[sportId] : undefined;

  if (!sport) return <Navigate to="/sports" replace />;
  if (!dashboard) return <Navigate to="/sports" replace />;

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-6xl mx-auto">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">{dashboard.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">{dashboard.title}</h1>
            <p className="mt-3 max-w-2xl text-[#d5c0d7]">{dashboard.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <Metric label="Eventos activos" value={String(sport.activeEvents)} />
            <Metric label="Torneos" value={String(dashboard.tournaments.length)} />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
        <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
          <p className="text-xs font-mono text-[#EA7301]">FORMATO DE PRONOSTICO</p>
          <h2 className="mt-2 text-2xl font-heading font-black text-white">{dashboard.prediction}</h2>
          <p className="mt-3 text-sm text-[#d5c0d7]">
            La quiniela de {sport.name} usa la identidad KAS, pero adapta el tipo de pick al deporte.
          </p>
          <div className="mt-5 rounded-xl bg-black/30 border border-white/10 p-4">
            <p className="text-xs font-mono text-white/50">DESTACADO</p>
            <p className="font-heading text-2xl font-black text-white">{dashboard.featured}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
          <p className="text-xs font-mono text-[#EA7301]">PROXIMOS EVENTOS</p>
          <div className="mt-4 space-y-3">
            {dashboard.events.map((event) => (
              <div key={event} className="flex items-center justify-between rounded-xl bg-black/25 border border-white/10 px-4 py-3">
                <span className="font-heading text-lg font-bold text-white">{event}</span>
                <span className="text-xs font-mono text-[#EA7301]">Picks</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-sm font-mono text-[#EA7301]">TORNEOS</p>
          <h2 className="text-3xl font-heading font-black text-white">Competiciones de {sport.name}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {dashboard.tournaments.map((tournament) => (
            <Link key={tournament.name} to={getTournamentAccessPath(toTournamentId(tournament.name))} className="rounded-xl border border-[#3c313e] bg-[#221824]/90 p-5 hover:border-[#EA7301] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-2xl font-black text-white">{tournament.name}</h3>
                  <p className="text-sm text-[#d5c0d7]">{tournament.season} · {tournament.status}</p>
                </div>
                <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{tournament.price}</span>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#EA7301]">
                Acceder con membresia <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function CostaRicaOnly({ children }: { children: React.ReactNode }) {
  const { tournamentId } = useParams();
  if (tournamentId !== 'cr-apertura-2026') return <Navigate to={`/tournaments/${tournamentId}`} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <TournamentProvider>
      <BrowserRouter>
        <KasShell />
      </BrowserRouter>
    </TournamentProvider>
  );
}
