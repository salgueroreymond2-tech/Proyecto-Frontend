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
  LayoutDashboard,
  Mail,
  Shield,
  DirectionsBike,
  SportsBaseball,
  SportsBasketball,
  SportsFootball,
  SportsMma,
  SportsMotorsports,
  SportsSoccer,
  SportsTennis,
  Trophy,
  User,
  Users,
} from '../components/Icon';
import { TournamentProvider, useTournament } from '../context/TournamentContext';
import { Navbar } from '../components/Navbar';
import { BottomNav, NavTab } from '../components/BottomNav';
import { DashboardView } from '../components/DashboardView';
import { AIAssistant } from '../components/AIAssistant';
import { RankingView } from '../components/RankingView';
import { PlayoffsView } from '../components/PlayoffsView';
import { SocialView } from '../components/SocialView';
import { ProfileView } from '../components/ProfileView';
import { LoginView } from '../components/LoginView';
import { ScorerVoteModal } from '../components/ScorerVoteModal';
import { ChampionModal } from '../components/ChampionModal';
import { AuthModal } from '../components/AuthModal';
import { RulesModal } from '../components/RulesModal';
import { AdminMatchModal } from '../components/AdminMatchModal';
import { AdminView } from '../components/AdminView';
import { TeamBadge } from '../components/TeamBadge';
import { UniversalTeamLogo } from '../components/UniversalTeamLogo';
import { ASSET_PATHS } from '../config/assets';
import { TEAMS, getTeamById } from '../data/teams';
import {
  BUNDESLIGA_TEAMS,
  LALIGA_TEAMS,
  LIGUE_1_TEAMS,
  MLB_TEAMS,
  NBA_TEAMS,
  NFL_TEAMS,
  PREMIER_LEAGUE_TEAMS,
  PRIMEIRA_LIGA_TEAMS,
  SERIE_A_TEAMS,
  getLeagueLogo,
  splitMatchupTitle,
} from '../data/teamLogos';
import { getSportEvents, getSportVisuals, getTournamentEvents, type NormalizedSportEvent, type SportProvider } from '../services/sportsApi';
import { cancelMembership, getMyMemberships, getStoredSession, renewMembership, signIn, signUp, simulatePayPalCheckout, type UserMembership } from '../services/authApi';

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
  { id: 'football', name: 'Futbol', text: 'Jornadas, marcadores, rankings y finales.', tournaments: 11, activeEvents: 64, accent: '#EA7301', image: ASSET_PATHS.images.sports.football },
  { id: 'tennis', name: 'Tenis', text: 'Rondas, sets y prestigio por torneo.', tournaments: 7, activeEvents: 18, accent: '#46D369', image: ASSET_PATHS.images.sports.tennis },
  { id: 'basketball', name: 'Baloncesto', text: 'NBA con ganador, marcador y diferencia.', tournaments: 1, activeEvents: 14, accent: '#F97316', image: ASSET_PATHS.images.sports.basketball },
  { id: 'baseball', name: 'Beisbol', text: 'MLB con carreras y ganador por juego.', tournaments: 1, activeEvents: 12, accent: '#38BDF8', image: ASSET_PATHS.images.sports.baseball },
  { id: 'american-football', name: 'Futbol Americano', text: 'NFL con picks por semana y playoffs.', tournaments: 1, activeEvents: 16, accent: '#A78BFA', image: ASSET_PATHS.images.sports.americanFootball },
  { id: 'f1', name: 'F1', text: 'Campeonato mundial con 24 Grand Prix.', tournaments: 1, activeEvents: 24, accent: '#EF4444', image: ASSET_PATHS.images.sports.f1 },
  { id: 'cycling', name: 'Ciclismo', text: 'Grand Tours, etapas, maillots y clasificaciones.', tournaments: 4, activeEvents: 21, accent: '#22C55E', image: ASSET_PATHS.images.sports.cycling },
  { id: 'golf', name: 'Golf', text: 'Majors, rondas, liderato y match play.', tournaments: 3, activeEvents: 12, accent: '#16A34A', image: ASSET_PATHS.images.sports.golf },
  { id: 'mma', name: 'UFC / MMA', text: 'Ganador, metodo y round por cartelera.', tournaments: 1, activeEvents: 9, accent: '#EF4444', image: ASSET_PATHS.images.sports.mma },
  { id: 'boxing', name: 'Boxeo', text: 'Carteleras, campeonatos mundiales, metodo y round.', tournaments: 3, activeEvents: 10, accent: '#FACC15', image: ASSET_PATHS.images.sports.boxing },
];

const sportIconById: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  football: SportsSoccer,
  tennis: SportsTennis,
  basketball: SportsBasketball,
  baseball: SportsBaseball,
  'american-football': SportsFootball,
  f1: SportsMotorsports,
  cycling: DirectionsBike,
  golf: Trophy,
  mma: SportsMma,
  boxing: SportsMma,
};

const f1GrandPrix = [
  'Bahrain Grand Prix',
  'Saudi Arabian Grand Prix',
  'Australian Grand Prix',
  'Japanese Grand Prix',
  'Chinese Grand Prix',
  'Miami Grand Prix',
  'Emilia Romagna Grand Prix',
  'Monaco Grand Prix',
  'Canadian Grand Prix',
  'Spanish Grand Prix',
  'Austrian Grand Prix',
  'British Grand Prix',
  'Hungarian Grand Prix',
  'Belgian Grand Prix',
  'Dutch Grand Prix',
  'Italian Grand Prix',
  'Azerbaijan Grand Prix',
  'Singapore Grand Prix',
  'United States Grand Prix',
  'Mexico City Grand Prix',
  'Sao Paulo Grand Prix',
  'Las Vegas Grand Prix',
  'Qatar Grand Prix',
  'Abu Dhabi Grand Prix',
];

const footballTournaments = [
  { id: 'cr-apertura-2026', name: 'Campeonato Nacional de Costa Rica', season: 'Apertura 2026', status: 'Activo', price: '$9.99', enabled: true },
  { id: 'champions-league', name: 'UEFA Champions League', season: '2026-2027', status: 'Preparacion', price: '$14.99', enabled: false },
  { id: 'premier-league', name: 'Premier League', season: '2026-2027', status: 'Preparacion', price: '$12.99', enabled: false },
  { id: 'laliga', name: 'LaLiga', season: '2026-2027', status: 'Preparacion', price: '$12.99', enabled: false },
  { id: 'serie-a', name: 'Serie A', season: '2026-2027', status: 'Preparacion', price: '$11.99', enabled: false },
  { id: 'bundesliga', name: 'Bundesliga', season: '2026-2027', status: 'Preparacion', price: '$11.99', enabled: false },
  { id: 'ligue-1', name: 'Ligue 1', season: '2026-2027', status: 'Preparacion', price: '$10.99', enabled: false },
  { id: 'primeira-liga', name: 'Liga Portugal', season: '2026-2027', status: 'Preparacion', price: '$9.99', enabled: false },
  { id: 'europa-league', name: 'UEFA Europa League', season: '2026-2027', status: 'Preparacion', price: '$10.99', enabled: false },
  { id: 'nations-league', name: 'UEFA Nations League', season: '2026-2027', status: 'Preparacion', price: '$9.99', enabled: false },
  { id: 'concacaf-nations-league', name: 'Concacaf Nations League', season: '2026-2027', status: 'Preparacion', price: '$8.99', enabled: false },
];

const upcomingFootballTournaments = [
  { id: 'copa-oro', name: 'Copa Oro', season: '2027', status: 'Preparacion', price: '$9.99', enabled: false },
  { id: 'copa-america', name: 'Copa America', season: '2028', status: 'Preparacion', price: '$11.99', enabled: false },
  { id: 'eurocopa', name: 'Eurocopa', season: '2028', status: 'Preparacion', price: '$12.99', enabled: false },
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
  f1: {
    eyebrow: 'FORMULA 1',
    title: 'Dashboard F1',
    description: 'Quinielas de Grand Prix con pole position, podio, vuelta rapida y campeonato.',
    prediction: 'Pole, podio, ganador y vuelta rapida',
    featured: 'Formula 1 World Championship 2027',
    events: f1GrandPrix,
    tournaments: [
      { name: 'F1 World Championship', season: '2027', status: 'Activo', price: '$12.99' },
    ],
  },
  cycling: {
    eyebrow: 'CICLISMO',
    title: 'Dashboard Ciclismo',
    description: 'Pronostica ganadores de etapa, clasificacion general, maillots y equipos.',
    prediction: 'Ganador de etapa, general y maillots',
    featured: 'Grand Tours 2027',
    events: ['Tour de France - Etapa reina', 'Giro d Italia - Contrarreloj', 'La Vuelta - Final en alto'],
    tournaments: [
      { name: 'Tour de France', season: '2027', status: 'Activo', price: '$10.99' },
      { name: 'Giro d Italia', season: '2027', status: 'Preparacion', price: '$9.99' },
      { name: 'La Vuelta', season: '2027', status: 'Preparacion', price: '$9.99' },
      { name: 'UCI World Championships', season: '2027', status: 'Premium', price: '$8.99' },
    ],
  },
  golf: {
    eyebrow: 'GOLF',
    title: 'Dashboard Golf',
    description: 'Pronostica lideres por ronda, ganador final, top 10 y matchups de golfistas.',
    prediction: 'Ganador, top 10 y lider por ronda',
    featured: 'PGA Tour 2027',
    events: ['The Masters - Ronda final', 'PGA Tour Championship', 'Ryder Cup Singles'],
    tournaments: [
      { name: 'PGA Tour', season: '2027', status: 'Activo', price: '$9.99' },
      { name: 'The Masters', season: '2027', status: 'Premium', price: '$11.99' },
      { name: 'Ryder Cup', season: '2027', status: 'Preparacion', price: '$8.99' },
    ],
  },
  mma: {
    eyebrow: 'UFC / MMA',
    title: 'Dashboard UFC',
    description: 'Carteleras por evento con ganador, metodo de victoria y round.',
    prediction: 'Ganador, metodo y round',
    featured: 'UFC Fight Night',
    events: ['Islam Makhachev vs Charles Oliveira', 'Alex Pereira vs Tom Aspinall', 'Valentina Shevchenko vs Alexa Grasso'],
    tournaments: [
      { name: 'UFC Fight Night', season: '2027', status: 'Activo', price: '$7.99' },
      { name: 'UFC PPV Series', season: '2027', status: 'Activo', price: '$12.99' },
      { name: 'UFC Championship Events', season: '2027', status: 'Premium', price: '$14.99' },
    ],
  },
  boxing: {
    eyebrow: 'BOXEO',
    title: 'Dashboard Boxeo',
    description: 'Quinielas de carteleras profesionales con campeones, estrellas P4P, metodo de victoria y round.',
    prediction: 'Ganador, metodo, round y decision',
    featured: 'Campeonatos mundiales 2027',
    events: ['Canelo Alvarez vs David Benavidez', 'Naoya Inoue vs Junto Nakatani', 'Oleksandr Usyk vs Tyson Fury'],
    tournaments: [
      { name: 'WBC World Boxing Council', season: '2027', status: 'Activo', price: '$11.99' },
      { name: 'WBA World Boxing Association', season: '2027', status: 'Activo', price: '$11.99' },
      { name: 'IBF International Boxing Federation', season: '2027', status: 'Activo', price: '$11.99' },
      { name: 'WBO World Boxing Organization', season: '2027', status: 'Activo', price: '$11.99' },
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

const tournamentDetails: Record<string, {
  overview: string;
  teams: string[];
  format: string;
  predictionRules: string[];
  coverage: string[];
}> = {
  'cr-apertura-2026': {
    overview: 'Torneo base de la quiniela nacional con clubes de Primera Division de Costa Rica, jornadas activas, ranking y comunidad local.',
    teams: ['Saprissa', 'Alajuelense', 'Herediano', 'Cartagines', 'Sporting FC', 'Puntarenas FC', 'Perez Zeledon', 'San Carlos', 'Escorpiones', 'Inter San Carlos'],
    format: 'Apertura 2026 · fase regular, semifinales y final nacional.',
    predictionRules: ['Marcador exacto', 'Ganador del partido', 'Campeon del torneo', 'Goleador destacado'],
    coverage: ['Jornadas nacionales', 'Tabla de posiciones', 'Playoffs', 'Ranking Promerica'],
  },
  'champions-league': {
    overview: 'Competicion europea premium con clubes elite, fase de liga, rondas eliminatorias y final continental.',
    teams: ['Real Madrid', 'Manchester City', 'Bayern Munich', 'Barcelona', 'Liverpool', 'Internazionale', 'Arsenal', 'Atletico Madrid', 'Juventus', 'Napoli', 'Borussia Dortmund', 'Bayer Leverkusen', 'Benfica', 'FC Porto', 'Sporting CP', 'Chelsea', 'Manchester United', 'Tottenham Hotspur', 'Sevilla', 'Real Sociedad'],
    format: 'Temporada 2026-2027 · fase de liga y eliminatorias.',
    predictionRules: ['Ganador', 'Marcador exacto', 'Clasificados por ronda', 'Campeon'],
    coverage: ['Fixture europeo', 'Octavos a final', 'Ranking continental', 'Clubes favoritos'],
  },
  'premier-league': {
    overview: 'Liga inglesa con jornadas semanales, tabla acumulada y quiniela por fecha.',
    teams: PREMIER_LEAGUE_TEAMS,
    format: 'Temporada 2026-2027 · todos contra todos.',
    predictionRules: ['Ganador', 'Marcador', 'Diferencia de goles', 'Top 4'],
    coverage: ['Calendario de liga', 'Tabla general', 'Derbis', 'Carrera al titulo'],
  },
  laliga: {
    overview: 'Competicion espanola con seguimiento de clubes principales, jornadas y lucha por puestos europeos.',
    teams: LALIGA_TEAMS,
    format: 'Temporada 2026-2027 · liga regular.',
    predictionRules: ['Ganador', 'Marcador', 'Porteria a cero', 'Campeon'],
    coverage: ['Jornadas', 'Clasico', 'Tabla', 'Puestos europeos'],
  },
  'serie-a': {
    overview: 'Liga italiana con pronosticos de resultados, ranking de usuarios y seguimiento de candidatos al Scudetto.',
    teams: SERIE_A_TEAMS,
    format: 'Temporada 2026-2027 · liga regular.',
    predictionRules: ['Ganador', 'Marcador', 'Resultado doble oportunidad', 'Campeon'],
    coverage: ['Jornadas', 'Tabla', 'Clasicos italianos', 'Zona europea'],
  },
  bundesliga: {
    overview: 'Liga alemana con foco en marcadores, liderato y rendimiento ofensivo.',
    teams: BUNDESLIGA_TEAMS,
    format: 'Temporada 2026-2027 · liga regular.',
    predictionRules: ['Ganador', 'Marcador', 'Total de goles', 'Campeon'],
    coverage: ['Jornadas', 'Tabla', 'Carrera al titulo', 'Goleadores'],
  },
  'ligue-1': {
    overview: 'Liga francesa con seguimiento de clubes historicos, jornada regular y carrera europea.',
    teams: LIGUE_1_TEAMS,
    format: 'Temporada 2026-2027 - liga regular.',
    predictionRules: ['Ganador', 'Marcador', 'Diferencia de goles', 'Campeon'],
    coverage: ['Jornadas', 'Tabla', 'Clasicos franceses', 'Zona europea'],
  },  'primeira-liga': {
    overview: 'Liga portuguesa con predicciones por fecha y seguimiento de clubes historicos.',
    teams: PRIMEIRA_LIGA_TEAMS,
    format: 'Temporada 2026-2027 · liga regular.',
    predictionRules: ['Ganador', 'Marcador', 'Diferencia de goles', 'Campeon'],
    coverage: ['Jornadas', 'Tabla', 'Clasicos', 'Puestos europeos'],
  },
  'europa-league': {
    overview: 'Torneo europeo de eliminatorias con clubes internacionales y alto valor de prediccion.',
    teams: ['AS Roma', 'Sevilla', 'Bayer Leverkusen', 'Tottenham Hotspur', 'FC Porto', 'Benfica', 'Sporting CP', 'Real Betis', 'Athletic Club', 'Lazio', 'Fiorentina', 'Villarreal', 'Aston Villa', 'Newcastle United', 'SC Freiburg', 'RB Leipzig', 'Atalanta', 'Braga', 'Real Sociedad', 'Valencia'],
    format: 'Temporada 2026-2027 · fase de liga y eliminatorias.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificados', 'Campeon'],
    coverage: ['Fase de liga', 'Eliminatorias', 'Final', 'Ranking europeo'],
  },
  'nations-league': {
    overview: 'Torneo UEFA de selecciones con grupos, semifinales y final continental.',
    teams: ['Espana', 'Francia', 'Portugal', 'Alemania', 'Italia', 'Paises Bajos', 'Inglaterra', 'Croacia', 'Belgica', 'Dinamarca', 'Suiza', 'Austria', 'Polonia', 'Serbia', 'Escocia', 'Hungria'],
    format: 'UEFA Nations League 2026-2027 - grupos, final four y descenso.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificados de grupo', 'Campeon'],
    coverage: ['Liga A', 'Liga B', 'Final Four', 'Ranking UEFA'],
  },
  'concacaf-nations-league': {
    overview: 'Competicion de selecciones CONCACAF con fase de grupos y finales regionales.',
    teams: ['Costa Rica', 'Mexico', 'Estados Unidos', 'Canada', 'Panama', 'Honduras', 'Jamaica', 'Guatemala', 'El Salvador', 'Trinidad y Tobago', 'Haiti', 'Curazao'],
    format: 'Concacaf Nations League 2026-2027 - grupos y eliminatorias.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificados', 'Campeon regional'],
    coverage: ['Liga A', 'Cuartos', 'Final Four', 'Ranking CONCACAF'],
  },
  'copa-oro': {
    overview: 'Torneo principal de selecciones CONCACAF con fase de grupos y eliminacion directa.',
    teams: ['Costa Rica', 'Mexico', 'Estados Unidos', 'Canada', 'Panama', 'Honduras', 'Jamaica', 'Guatemala', 'El Salvador', 'Trinidad y Tobago', 'Haiti', 'Curazao', 'Qatar', 'Martinica', 'Surinam', 'Nicaragua'],
    format: 'Copa Oro 2027 - grupos, cuartos, semifinales y final.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificado', 'Campeon'],
    coverage: ['Fase de grupos', 'Eliminatorias', 'Final', 'Goleadores'],
  },
  'copa-america': {
    overview: 'Competicion continental CONMEBOL con selecciones sudamericanas e invitadas.',
    teams: ['Argentina', 'Brasil', 'Uruguay', 'Colombia', 'Chile', 'Peru', 'Ecuador', 'Paraguay', 'Bolivia', 'Venezuela', 'Costa Rica', 'Mexico', 'Estados Unidos', 'Canada', 'Panama', 'Jamaica'],
    format: 'Copa America 2028 - grupos y eliminatorias.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificados', 'Campeon'],
    coverage: ['Grupos', 'Cuartos', 'Semifinales', 'Final'],
  },
  eurocopa: {
    overview: 'Eurocopa de selecciones con fase de grupos, eliminatorias y final europea.',
    teams: ['Espana', 'Francia', 'Alemania', 'Portugal', 'Italia', 'Inglaterra', 'Paises Bajos', 'Belgica', 'Croacia', 'Dinamarca', 'Suiza', 'Austria', 'Polonia', 'Turquia', 'Escocia', 'Serbia', 'Hungria', 'Republica Checa', 'Eslovenia', 'Rumania', 'Ucrania', 'Suecia', 'Noruega', 'Gales'],
    format: 'Eurocopa 2028 - 24 selecciones.',
    predictionRules: ['Ganador', 'Marcador', 'Clasificados por grupo', 'Campeon'],
    coverage: ['Grupos', 'Octavos', 'Semifinales', 'Final'],
  },  'nba-temporada-regular': {
    overview: 'Temporada regular NBA con partidos diarios, marcadores y ranking por aciertos.',
    teams: NBA_TEAMS,
    format: 'Temporada 2026-2027 · conferencia Este y Oeste.',
    predictionRules: ['Ganador', 'Marcador', 'Diferencia de puntos', 'Equipo con mas puntos'],
    coverage: ['Calendario NBA', 'Conferencias', 'Rachas', 'Play-in'],
  },
  'nba-playoffs': {
    overview: 'Playoffs NBA con series al mejor de siete y predicciones por ronda.',
    teams: NBA_TEAMS,
    format: 'Playoffs 2027 · series eliminatorias.',
    predictionRules: ['Ganador de juego', 'Ganador de serie', 'Resultado de serie', 'Campeon de conferencia'],
    coverage: ['Primera ronda', 'Semifinales', 'Finales de conferencia', 'Finales NBA'],
  },
  'nba-finals': {
    overview: 'Serie final NBA con predicciones premium por partido, MVP y campeon.',
    teams: NBA_TEAMS,
    format: 'Finales NBA 2027 · mejor de siete.',
    predictionRules: ['Ganador', 'Marcador', 'MVP', 'Resultado de serie'],
    coverage: ['Finales', 'MVP', 'Marcadores', 'Campeon'],
  },
  'mlb-temporada-regular': {
    overview: 'Temporada MLB con picks por juego, carreras y series.',
    teams: MLB_TEAMS,
    format: 'Temporada 2027 · liga Americana y Nacional.',
    predictionRules: ['Ganador', 'Carreras totales', 'Ganador de serie', 'Diferencia de carreras'],
    coverage: ['Temporada regular', 'Divisiones', 'Series', 'Wild Card'],
  },
  'mlb-postseason': {
    overview: 'Postemporada MLB con series eliminatorias y predicciones por ronda.',
    teams: MLB_TEAMS,
    format: 'Postseason 2027 · series eliminatorias.',
    predictionRules: ['Ganador de juego', 'Ganador de serie', 'Carreras', 'Campeon de liga'],
    coverage: ['Wild Card', 'Division Series', 'Championship Series', 'World Series'],
  },
  'world-series': {
    overview: 'Final de MLB con predicciones de campeon, marcador y MVP.',
    teams: MLB_TEAMS,
    format: 'World Series 2027 - mejor de siete.',
    predictionRules: ['Ganador', 'Carreras', 'Resultado de serie', 'MVP'],
    coverage: ['Serie final', 'MVP', 'Campeon', 'Juego decisivo'],
  },
  'nfl-temporada-regular': {
    overview: 'Temporada NFL con picks semanales, marcadores proyectados y ranking por conferencia.',
    teams: NFL_TEAMS,
    format: 'Temporada 2026-2027 Â· AFC y NFC.',
    predictionRules: ['Ganador', 'Marcador', 'Diferencia de puntos', 'Equipo con mas yardas'],
    coverage: ['Semana regular', 'Divisiones', 'Conferencias', 'Playoffs'],
  },
  'nfl-playoffs': {
    overview: 'Playoffs NFL con rondas eliminatorias y predicciones por conferencia.',
    teams: NFL_TEAMS,
    format: 'Playoffs 2027 Â· eliminatorias AFC y NFC.',
    predictionRules: ['Ganador', 'Marcador', 'Campeon de conferencia', 'Total de puntos'],
    coverage: ['Wild Card', 'Divisional', 'Finales de conferencia', 'Super Bowl'],
  },
  'super-bowl': {
    overview: 'Final NFL premium con predicciones de campeon, marcador, MVP y jugadas clave.',
    teams: NFL_TEAMS,
    format: 'Super Bowl 2027 - final unica por el campeonato.',
    predictionRules: ['Ganador', 'Marcador', 'MVP', 'Total de puntos'],
    coverage: ['Final NFL', 'MVP', 'Campeon', 'Halftime props'],
  },
  'f1-world-championship': {
    overview: 'Temporada completa de Formula 1 con un unico campeonato y 24 Grand Prix como eventos del calendario.',
    teams: ['Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'Racing Bulls', 'Audi', 'Haas F1 Team', 'Cadillac'],
    format: 'F1 2027 - campeonato mundial con 24 grandes premios.',
    predictionRules: ['Pole position', 'Ganador', 'Podio', 'Vuelta rapida'],
    coverage: ['Clasificacion', 'Carrera', 'Pilotos', 'Constructores'],
  },
  'tour-de-france': {
    overview: 'Grand Tour frances con predicciones por etapa, general, montana y puntos.',
    teams: ['UAE Team Emirates-XRG', 'Team Visma-Lease a Bike', 'Soudal Quick-Step', 'Netcompany INEOS Cycling Team', 'Red Bull-BORA-hansgrohe', 'Lidl-Trek', 'Alpecin-Premier Tech', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ United'],
    format: 'Tour de France 2027 - 21 etapas.',
    predictionRules: ['Ganador de etapa', 'Maillot amarillo', 'Montana', 'Puntos'],
    coverage: ['Etapas llanas', 'Montana', 'Contrarreloj', 'Clasificacion general'],
  },
  'giro-d-italia': {
    overview: 'Grand Tour italiano con clasificacion general, sprints y etapas de montana.',
    teams: ['UAE Team Emirates-XRG', 'Team Visma-Lease a Bike', 'Soudal Quick-Step', 'Netcompany INEOS Cycling Team', 'Red Bull-BORA-hansgrohe', 'Lidl-Trek', 'Alpecin-Premier Tech', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ United'],
    format: 'Giro d Italia 2027 - 21 etapas.',
    predictionRules: ['Ganador de etapa', 'Maglia rosa', 'Montana', 'Joven destacado'],
    coverage: ['Etapas', 'General', 'Montana', 'Sprint'],
  },
  'la-vuelta': {
    overview: 'Grand Tour espanol con finales en alto, general y etapas explosivas.',
    teams: ['UAE Team Emirates-XRG', 'Team Visma-Lease a Bike', 'Soudal Quick-Step', 'Netcompany INEOS Cycling Team', 'Red Bull-BORA-hansgrohe', 'Lidl-Trek', 'Alpecin-Premier Tech', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ United'],
    format: 'La Vuelta 2027 - 21 etapas.',
    predictionRules: ['Ganador de etapa', 'Maillot rojo', 'Montana', 'Equipo lider'],
    coverage: ['Finales en alto', 'Contrarreloj', 'General', 'Puntos'],
  },
  'uci-world-championships': {
    overview: 'Campeonato mundial UCI con ruta, contrarreloj y maillots arcoiris.',
    teams: ['Belgica', 'Paises Bajos', 'Francia', 'Italia', 'Espana', 'Dinamarca', 'Eslovenia', 'Reino Unido', 'Colombia', 'Australia'],
    format: 'UCI World Championships 2027 - seleccion nacional y pruebas elite.',
    predictionRules: ['Campeon ruta', 'Campeon CRI', 'Podio', 'Pais ganador'],
    coverage: ['Ruta elite', 'Contrarreloj', 'Sub-23', 'Ranking paises'],
  },
  'pga-tour': {
    overview: 'Circuito PGA con predicciones por ronda, top 10, ganador y desempates.',
    teams: ['Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Collin Morikawa', 'Viktor Hovland', 'Ludvig Aberg', 'Tommy Fleetwood', 'Hideki Matsuyama', 'Jordan Spieth'],
    format: 'PGA Tour 2027 - eventos por semana.',
    predictionRules: ['Ganador', 'Top 10', 'Lider por ronda', 'Corte superado'],
    coverage: ['Ronda 1', 'Ronda 2', 'Moving day', 'Final'],
  },
  'the-masters': {
    overview: 'Major premium en Augusta con picks por ronda, ganador y chaqueta verde.',
    teams: ['Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Collin Morikawa', 'Viktor Hovland', 'Ludvig Aberg', 'Tommy Fleetwood', 'Hideki Matsuyama', 'Jordan Spieth'],
    format: 'The Masters 2027 - 4 rondas.',
    predictionRules: ['Ganador', 'Top 5', 'Lider final', 'Mejor ronda'],
    coverage: ['Augusta', 'Amen Corner', 'Corte', 'Chaqueta verde'],
  },
  'ryder-cup': {
    overview: 'Competencia por equipos con match play, parejas y singles.',
    teams: ['Team USA', 'Team Europe', 'Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Tommy Fleetwood', 'Collin Morikawa'],
    format: 'Ryder Cup 2027 - foursomes, four-ball y singles.',
    predictionRules: ['Ganador de match', 'Punto por equipo', 'Marcador global', 'MVP'],
    coverage: ['Foursomes', 'Four-ball', 'Singles', 'Marcador global'],
  },
  'wbc-world-boxing-council': {
    overview: 'Quiniela de peleas titulares avaladas por el World Boxing Council.',
    teams: ['Canelo Alvarez', 'David Benavidez', 'Shakur Stevenson', 'Dmitry Bivol', 'Artur Beterbiev', 'Naoya Inoue', 'Gervonta Davis', 'Ryan Garcia'],
    format: 'Temporada 2027 - peleas titulares WBC por division.',
    predictionRules: ['Ganador', 'Metodo de victoria', 'Round exacto', 'Decision o KO/TKO'],
    coverage: ['Titulo mundial WBC', 'Titulo interino', 'Eliminatorias', 'Defensas obligatorias'],
  },
  'wba-world-boxing-association': {
    overview: 'Quiniela de peleas titulares avaladas por la World Boxing Association.',
    teams: ['Oleksandr Usyk', 'Anthony Joshua', 'Dmitry Bivol', 'Gervonta Davis', 'Naoya Inoue', 'Canelo Alvarez', 'Devin Haney', 'Ryan Garcia'],
    format: 'Temporada 2027 - peleas titulares WBA por division.',
    predictionRules: ['Ganador', 'Metodo', 'Round', 'Decision o KO/TKO'],
    coverage: ['Titulo mundial WBA', 'Super campeon', 'Regular', 'Eliminatorias'],
  },
  'ibf-international-boxing-federation': {
    overview: 'Quiniela de peleas titulares avaladas por la International Boxing Federation.',
    teams: ['Jaron Ennis', 'Oleksandr Usyk', 'Artur Beterbiev', 'Anthony Joshua', 'Naoya Inoue', 'Canelo Alvarez', 'Teofimo Lopez', 'Devin Haney'],
    format: 'Temporada 2027 - peleas titulares IBF por division.',
    predictionRules: ['Ganador', 'Metodo', 'Round', 'Decision o KO/TKO'],
    coverage: ['Titulo mundial IBF', 'Eliminatorias', 'Defensas obligatorias', 'Ranking IBF'],
  },
  'wbo-world-boxing-organization': {
    overview: 'Quiniela de peleas titulares avaladas por la World Boxing Organization.',
    teams: ['Terence Crawford', 'Teofimo Lopez', 'Oleksandr Usyk', 'Tyson Fury', 'Shakur Stevenson', 'Naoya Inoue', 'Dmitry Bivol', 'Junto Nakatani'],
    format: 'Temporada 2027 - peleas titulares WBO por division.',
    predictionRules: ['Ganador', 'Metodo', 'Round', 'Decision o KO/TKO'],
    coverage: ['Titulo mundial WBO', 'Titulo interino', 'Global', 'Ranking WBO'],
  },
};


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

function findF1GrandPrix(grandPrixId: string) {
  return f1GrandPrix.find((name) => toTournamentId(name) === grandPrixId);
}

function getTournamentAccessPath(id: string) {
  return `/tournaments/${id}/membership`;
}

function findTournamentSummary(tournamentId: string) {
  const football = [...footballTournaments, ...upcomingFootballTournaments].find((item) => item.id === tournamentId);
  if (football) return { ...football, sportId: 'football', sportName: 'Futbol' };

  for (const sport of sports) {
    const dashboard = sportDashboards[sport.id];
    const tournament = dashboard?.tournaments.find((item) => toTournamentId(item.name) === tournamentId);
    if (tournament) return { id: tournamentId, ...tournament, enabled: false, sportId: sport.id, sportName: sport.name };
  }

  return undefined;
}

function getAllAdminTournaments() {
  const football = footballTournaments.map((tournament) => ({ ...tournament, sportName: 'Futbol' }));
  const multiSport = sports.flatMap((sport) => {
    const dashboard = sportDashboards[sport.id];
    if (!dashboard) return [];
    return dashboard.tournaments.map((tournament) => ({
      id: toTournamentId(tournament.name),
      name: tournament.name,
      sportName: sport.name,
      season: tournament.season,
      status: tournament.status,
      price: tournament.price,
      enabled: tournament.status === 'Activo',
    }));
  });

  return [...football, ...multiSport];
}

function findCostaRicaTeamByName(name: string) {
  const normalizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return TEAMS.find((team) => {
    const candidates = [team.name, team.shortName, team.code, team.id].map((item) =>
      item
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    );
    return candidates.includes(normalizedName);
  });
}

function getCostaRicaTeamByProviderAlias(value: string) {
  const alias = value.trim().toUpperCase();
  const aliases: Record<string, string> = {
    ALA: 'lda',
    LDA: 'lda',
    SAP: 'sap',
    DSC: 'sap',
    CAR: 'csc',
    CSC: 'csc',
    HER: 'csh',
    CSH: 'csh',
    ADSC: 'sca',
    SCA: 'sca',
    SAN: 'sca',
    PFC: 'pfc',
    PUN: 'pfc',
    MPZ: 'mpz',
    PZ: 'mpz',
    SPO: 'spo',
    SFC: 'spo',
    ESC: 'esc',
    ISC: 'isc',
    ADG: 'adg',
    GUA: 'adg',
    LIB: 'lib',
  };

  const teamId = aliases[alias];
  return teamId ? getTeamById(teamId) : findCostaRicaTeamByName(value);
}

function parseCostaRicaMatchup(title: string) {
  const parts = title.split(/\s+(?:@|vs\.?|v\.?)\s+/i);
  if (parts.length !== 2) return null;

  const home = getCostaRicaTeamByProviderAlias(parts[0]);
  const away = getCostaRicaTeamByProviderAlias(parts[1]);
  if (!home || !away) return null;

  return { home, away };
}

function DashboardSidebar({ isAdmin }: { isAdmin: boolean }) {
  const location = useLocation();
  const items = [
    { label: 'Resumen', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Calendario', path: '/dashboard/calendario', icon: CalendarDays },
    { label: 'Membresias', path: '/dashboard/membresias', icon: BadgeDollarSign },
    { label: 'Ranking global', path: '/dashboard/ranking-global', icon: Trophy },
    { label: 'Soporte', path: '/dashboard/soporte', icon: Shield },
    { label: 'Perfil', path: '/profile', icon: User },
    ...(isAdmin ? [{ label: 'Administracion', path: '/admin', icon: Users }] : []),
  ];

  return (
    <aside className="shrink-0 border-white/10 bg-[#120913]/95 px-3 py-3 lg:sticky lg:top-[76px] lg:h-[calc(100vh-76px)] lg:w-64 lg:border-r lg:px-4 lg:py-5">
      <div className="hidden lg:block">
        <p className="text-xs font-mono uppercase text-[#EA7301]">Navegacion</p>
        <h2 className="mt-1 font-heading text-2xl font-black text-white">Dashboard KAS</h2>
      </div>
      <nav className="mt-0 flex gap-2 overflow-x-auto pb-1 lg:mt-6 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`inline-flex min-w-max items-center gap-2 rounded-lg border px-3 py-2 font-heading text-sm font-bold transition-colors lg:w-full lg:min-w-0 ${
                isActive
                  ? 'border-[#EA7301]/70 bg-[#EA7301]/15 text-white'
                  : 'border-white/10 bg-white/[0.03] text-[#d5c0d7] hover:border-[#EA7301]/45 hover:text-white'
              }`}
            >
              <Icon className={isActive ? 'text-[#EA7301]' : 'text-white/55'} size={20} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 hidden rounded-lg border border-white/10 bg-black/25 p-3 lg:block">
        <p className="text-xs font-mono uppercase text-white/45">Acceso</p>
        <p className="mt-1 text-sm text-[#d5c0d7]">Atajos para revisar actividad, pagos, ranking y soporte sin repetir las tarjetas del dashboard.</p>
      </div>
    </aside>
  );
}

const sidebarDashboards = {
  calendario: {
    eyebrow: 'AGENDA',
    title: 'Calendario KAS',
    text: 'Vista centralizada de torneos activos, proximos eventos y fechas clave de membresia.',
    stats: [['Eventos', '42'], ['Torneos', '18'], ['Hoy', '6']],
    rows: ['Champions League - fase de liga', 'Campeonato Nacional - jornada activa', 'F1 World Championship - proximo Grand Prix', 'Boxeo WBC - cartelera titular'],
  },
  membresias: {
    eyebrow: 'PAGOS',
    title: 'Membresias',
    text: 'Control de accesos comprados, renovaciones y torneos disponibles por Pay-Per-Tournament.',
    stats: [['Activas', '3'], ['Pendientes', '2'], ['Ahorro', '18%']],
    rows: ['Campeonato Nacional de Costa Rica', 'UEFA Champions League', 'F1 World Championship', 'WBC World Boxing Council'],
  },
  'ranking-global': {
    eyebrow: 'PRESTIGIO',
    title: 'Ranking global',
    text: 'Comparativa general de puntos, rachas y precision entre todos los deportes.',
    stats: [['Tu puesto', '#128'], ['Puntos', '12.4K'], ['Top', '8%']],
    rows: ['Mejor racha semanal', 'Top Costa Rica', 'Ranking por deporte', 'Historial de ascensos'],
  },
  soporte: {
    eyebrow: 'AYUDA',
    title: 'Soporte',
    text: 'Panel para revisar accesos, problemas de membresia, pagos y estado de cuenta.',
    stats: [['Tickets', '0'], ['Estado', 'OK'], ['Respuesta', '<24h']],
    rows: ['Validar membresia', 'Reportar resultado incorrecto', 'Solicitar revision de pago', 'Contactar administracion'],
  },
} satisfies Record<string, { eyebrow: string; title: string; text: string; stats: string[][]; rows: string[] }>;

const calendarEventTemplates = [
  { label: 'Ventana de picks', dayOffset: 1 },
  { label: 'Cierre de pronosticos', dayOffset: 3 },
  { label: 'Jornada principal', dayOffset: 6 },
];

function getMembershipCalendarItems(memberships: UserMembership[]) {
  const active = memberships.length > 0
    ? memberships
    : [{ id: 'demo-cr', userId: 'demo', tournamentId: 'cr-apertura-2026', paymentId: 'demo', status: 'active', grantedAt: new Date().toISOString() }];

  return active.flatMap((membership, membershipIndex) => {
    const tournament = findTournamentSummary(membership.tournamentId);
    if (!tournament) return [];
    return calendarEventTemplates.map((template, templateIndex) => {
      const date = new Date();
      date.setDate(date.getDate() + template.dayOffset + membershipIndex * 2 + templateIndex);
      return {
        id: `${membership.id}-${template.label}`,
        tournament,
        label: template.label,
        date,
      };
    });
  });
}

function getCalendarGridDays(baseDate: Date) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function MembershipCalendarDashboard() {
  const [memberships, setMemberships] = useState<UserMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());

  useEffect(() => {
    let mounted = true;
    getMyMemberships()
      .then((data) => {
        if (mounted) setMemberships(data.memberships);
      })
      .catch(() => {
        if (mounted) setMemberships([]);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const items = getMembershipCalendarItems(memberships);
  const paidTournaments = [...new Map(items.map((item) => [item.tournament.id, item.tournament])).values()];
  const paidSports = [...new Set(paidTournaments.map((item) => item.sportName))];
  const calendarDays = getCalendarGridDays(visibleMonth);
  const currentMonth = visibleMonth.getMonth();
  const eventsByDate = items.reduce<Record<string, typeof items>>((map, item) => {
    const key = getDateKey(item.date);
    map[key] = [...(map[key] || []), item];
    return map;
  }, {});

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <p className="text-sm font-mono text-[#EA7301]">AGENDA</p>
        <h1 className="mt-1 font-heading text-4xl font-black text-white">Calendario de tus membresias</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#d5c0d7]">
          Solo se muestran deportes y torneos donde tu cuenta tiene membresia activa.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Membresias" value={String(paidTournaments.length)} />
        <Metric label="Deportes" value={String(paidSports.length)} />
        <Metric label="Eventos" value={String(items.length)} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.4fr]">
        <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
          <p className="text-xs font-mono text-[#EA7301]">DEPORTES ACTIVOS</p>
          <h2 className="mt-1 font-heading text-2xl font-black text-white">Tus accesos</h2>
          <div className="mt-4 space-y-3">
            {paidSports.map((sportName) => (
              <div key={sportName} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                <p className="font-heading font-bold text-white">{sportName}</p>
                <p className="text-xs text-[#d5c0d7]">
                  {paidTournaments.filter((item) => item.sportName === sportName).length} torneo(s) con membresia
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-[#EA7301]">{isLoading ? 'CARGANDO' : 'CALENDARIO'}</p>
              <h2 className="font-heading text-2xl font-black text-white">
                {visibleMonth.toLocaleDateString('es-CR', { month: 'long', year: 'numeric' })}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
                className="rounded-lg border border-white/10 bg-black/25 p-2 text-white hover:border-[#EA7301]/60"
                aria-label="Mes anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
                className="rounded-lg border border-white/10 bg-black/25 p-2 text-white hover:border-[#EA7301]/60"
                aria-label="Mes siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px] font-mono uppercase text-[#d5c0d7]">
            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {calendarDays.map((date) => {
              const key = getDateKey(date);
              const dayEvents = eventsByDate[key] || [];
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isToday = getDateKey(date) === getDateKey(new Date());
              return (
                <div
                  key={key}
                  className={`min-h-28 rounded-lg border p-2 text-left ${
                    isToday
                      ? 'border-[#EA7301]/80 bg-[#EA7301]/10'
                      : isCurrentMonth
                        ? 'border-white/10 bg-black/25'
                        : 'border-white/5 bg-black/10 opacity-50'
                  }`}
                >
                  <span className={`text-xs font-mono ${isToday ? 'text-[#EA7301]' : 'text-[#d5c0d7]'}`}>{date.getDate()}</span>
                  <div className="mt-2 space-y-1">
                    {dayEvents.slice(0, 2).map((item) => (
                      <Link
                        key={item.id}
                        to={`/tournaments/${item.tournament.id}`}
                        className="block rounded-md bg-[#EA7301]/15 px-2 py-1 text-[11px] font-bold leading-tight text-white hover:bg-[#EA7301]/25"
                      >
                        <span className="block truncate">{item.tournament.name}</span>
                        <span className="block truncate font-mono text-[10px] text-[#EA7301]">{item.label}</span>
                      </Link>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="block text-[10px] font-mono text-[#d5c0d7]">+{dayEvents.length - 2} mas</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function MembershipsDashboard() {
  const [memberships, setMemberships] = useState<UserMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadMemberships = () => {
    setIsLoading(true);
    getMyMemberships({ includeHistory: true })
      .then((data) => setMemberships(data.memberships))
      .catch(() => setMemberships([]))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadMemberships();
  }, []);

  const activeMemberships = memberships.filter((item) => item.status === 'active');
  const history = memberships.filter((item) => item.status !== 'active' || item.renewedAt || item.cancelledAt);

  const handleAction = async (membership: UserMembership, action: 'cancel' | 'renew') => {
    setBusyId(membership.id);
    try {
      if (action === 'cancel') await cancelMembership(membership.id);
      else await renewMembership(membership.id);
      loadMemberships();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <p className="text-sm font-mono text-[#EA7301]">PAGOS</p>
        <h1 className="mt-1 font-heading text-4xl font-black text-white">Membresias</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#d5c0d7]">
          Administra tus accesos activos, cancela membresias que ya no quieres y renueva torneos desde tu cuenta.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Activas" value={String(activeMemberships.length)} />
        <Metric label="Historial" value={String(history.length)} />
        <Metric label="Estado" value={isLoading ? 'Cargando' : 'OK'} />
      </section>
      <section className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-[#EA7301]">ACTIVAS</p>
            <h2 className="font-heading text-2xl font-black text-white">Tus membresias actuales</h2>
          </div>
          <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{activeMemberships.length} activas</span>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {activeMemberships.map((membership) => {
            const tournament = findTournamentSummary(membership.tournamentId);
            return (
              <article key={membership.id} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase text-[#EA7301]">{tournament?.sportName || 'Torneo'}</p>
                    <h3 className="mt-1 truncate font-heading text-xl font-black text-white">{tournament?.name || membership.tournamentId}</h3>
                    <p className="mt-1 text-xs text-[#d5c0d7]">Activa desde {new Date(membership.grantedAt).toLocaleDateString()}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-mono text-emerald-200">Activa</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction(membership, 'cancel')}
                    disabled={busyId === membership.id}
                    className="rounded-lg border border-red-400/30 px-3 py-2 text-xs font-heading font-bold text-red-100 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {busyId === membership.id ? 'Procesando...' : 'Cancelar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(membership, 'renew')}
                    disabled={busyId === membership.id}
                    className="rounded-lg border border-[#EA7301]/50 bg-[#EA7301]/15 px-3 py-2 text-xs font-heading font-bold text-white hover:bg-[#EA7301]/25 disabled:opacity-50"
                  >
                    Renovar
                  </button>
                </div>
              </article>
            );
          })}
          {!isLoading && activeMemberships.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-[#d5c0d7]">No tienes membresias activas.</div>
          )}
        </div>
      </section>
      <section className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
        <p className="text-xs font-mono text-[#EA7301]">HISTORIAL</p>
        <h2 className="mt-1 font-heading text-2xl font-black text-white">Movimientos de membresia</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          {memberships.map((membership) => {
            const tournament = findTournamentSummary(membership.tournamentId);
            const statusText = membership.status === 'active' ? 'Activa' : 'Cancelada';
            const detailDate = membership.cancelledAt || membership.renewedAt || membership.grantedAt;
            return (
              <div key={membership.id} className="grid gap-2 border-b border-white/10 bg-black/20 px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[1.2fr_0.7fr_0.7fr]">
                <div>
                  <p className="font-heading font-bold text-white">{tournament?.name || membership.tournamentId}</p>
                  <p className="text-xs text-[#d5c0d7]">{tournament?.sportName || 'KAS'} · Pago {membership.paymentId}</p>
                </div>
                <p className="font-mono text-xs text-[#EA7301]">{statusText}</p>
                <p className="font-mono text-xs text-[#d5c0d7]">{new Date(detailDate).toLocaleDateString()}</p>
              </div>
            );
          })}
          {!isLoading && memberships.length === 0 && (
            <div className="bg-black/20 px-4 py-4 text-sm text-[#d5c0d7]">Todavia no hay historial de membresias.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function GlobalRankingDashboard() {
  const { currentUser, leaderboard } = useTournament();
  const ranking = [...leaderboard]
    .map((user) => (user.id === currentUser.id ? currentUser : user))
    .sort((a, b) => b.points - a.points);
  const currentPosition = Math.max(1, ranking.findIndex((user) => user.id === currentUser.id) + 1);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <p className="text-sm font-mono text-[#EA7301]">PRESTIGIO</p>
        <h1 className="mt-1 font-heading text-4xl font-black text-white">Ranking global</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#d5c0d7]">
          Lista general de usuarios KAS ordenada por puntos acumulados.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Tu posicion" value={`#${currentPosition}`} />
        <Metric label="Tus puntos" value={currentUser.points.toLocaleString()} />
        <Metric label="Usuarios" value={String(ranking.length)} />
      </section>
      <section className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-[#EA7301]">TABLA</p>
            <h2 className="font-heading text-2xl font-black text-white">Usuarios y posiciones</h2>
          </div>
          <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">Global</span>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          {ranking.map((user, index) => {
            const isCurrent = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                className={`grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 ${
                  isCurrent ? 'bg-[#EA7301]/15' : 'bg-black/20'
                }`}
              >
                <span className={`font-mono text-sm font-black ${isCurrent ? 'text-[#EA7301]' : 'text-[#d5c0d7]'}`}>#{index + 1}</span>
                <div className="flex min-w-0 items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-lg border border-white/10 object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-heading font-bold text-white">{user.name}</p>
                    <p className="truncate text-xs text-[#d5c0d7]">{user.username}{isCurrent ? ' · Tu posicion' : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading text-lg font-black text-white">{user.points.toLocaleString()}</p>
                  <p className="text-xs font-mono text-[#d5c0d7]">pts</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SupportDashboard() {
  const { currentUser } = useTournament();
  const [category, setCategory] = useState('Membresia');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<Array<{ id: string; category: string; message: string; status: string; createdAt: string }>>(() => {
    const saved = localStorage.getItem('kas_support_tickets_v1');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kas_support_tickets_v1', JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setTickets((prev) => [{
      id: `SOP-${Date.now()}`,
      category,
      message: message.trim(),
      status: 'Abierto',
      createdAt: new Date().toISOString(),
    }, ...prev]);
    setMessage('');
  };

  const quickActions = [
    'Problema con membresia',
    'Pago no reflejado',
    'Resultado incorrecto',
    'No puedo iniciar sesion',
    'Solicitar cambio de correo',
    'Reportar logo o imagen',
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <p className="text-sm font-mono text-[#EA7301]">AYUDA</p>
        <h1 className="mt-1 font-heading text-4xl font-black text-white">Soporte KAS</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#d5c0d7]">
          Centro de ayuda para membresias, pagos, resultados, cuenta y problemas visuales de la plataforma.
        </p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Tickets abiertos" value={String(tickets.filter((item) => item.status === 'Abierto').length)} />
        <Metric label="Respuesta" value="<24h" />
        <Metric label="Usuario" value={currentUser.username} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={createTicket} className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
          <p className="text-xs font-mono text-[#EA7301]">NUEVO TICKET</p>
          <h2 className="mt-1 font-heading text-2xl font-black text-white">Contactar soporte</h2>
          <label className="mt-4 block text-xs font-mono uppercase text-[#d5c0d7]">Categoria</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-[#EA7301]"
          >
            {['Membresia', 'Pago', 'Resultado', 'Cuenta', 'Imagenes y logos', 'Error tecnico'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label className="mt-4 block text-xs font-mono uppercase text-[#d5c0d7]">Mensaje</label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            placeholder="Describe que necesitas revisar..."
            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EA7301]"
          />
          <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#EA7301] px-4 py-3 font-heading font-black text-black hover:bg-orange-400">
            Enviar ticket <ArrowRight size={18} />
          </button>
        </form>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
            <p className="text-xs font-mono text-[#EA7301]">ATAJOS</p>
            <h2 className="mt-1 font-heading text-2xl font-black text-white">Opciones rapidas</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {quickActions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item.includes('Pago') ? 'Pago' : item.includes('logo') || item.includes('imagen') ? 'Imagenes y logos' : item.includes('sesion') || item.includes('correo') ? 'Cuenta' : item.includes('Resultado') ? 'Resultado' : 'Membresia');
                    setMessage(item);
                  }}
                  className="rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-left text-sm font-heading font-bold text-white hover:border-[#EA7301]/60"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
            <p className="text-xs font-mono text-[#EA7301]">CANALES</p>
            <h2 className="mt-1 font-heading text-2xl font-black text-white">Contacto</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                <p className="font-heading font-bold text-white">Soporte por correo</p>
                <p className="text-xs text-[#d5c0d7]">soporte@kingarthursports.local</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                <p className="font-heading font-bold text-white">Horario</p>
                <p className="text-xs text-[#d5c0d7]">Lunes a sabado · 8:00 a.m. - 8:00 p.m.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
        <p className="text-xs font-mono text-[#EA7301]">HISTORIAL</p>
        <h2 className="mt-1 font-heading text-2xl font-black text-white">Tus solicitudes</h2>
        <div className="mt-4 grid gap-3">
          {tickets.map((ticket) => (
            <article key={ticket.id} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-[#EA7301]">{ticket.id} · {ticket.category}</p>
                  <p className="mt-1 font-heading font-bold text-white">{ticket.message}</p>
                  <p className="mt-1 text-xs text-[#d5c0d7]">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{ticket.status}</span>
              </div>
            </article>
          ))}
          {tickets.length === 0 && (
            <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-4 text-sm text-[#d5c0d7]">No tienes solicitudes abiertas.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function SidebarDashboardPage({ section }: { section: keyof typeof sidebarDashboards }) {
  const dashboard = sidebarDashboards[section];

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <p className="text-sm font-mono text-[#EA7301]">{dashboard.eyebrow}</p>
        <h1 className="mt-1 font-heading text-4xl font-black text-white">{dashboard.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#d5c0d7]">{dashboard.text}</p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        {dashboard.stats.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </section>
      <section className="rounded-xl border border-white/10 bg-[#221824]/90 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-[#EA7301]">DETALLE</p>
            <h2 className="font-heading text-2xl font-black text-white">Actividad principal</h2>
          </div>
          <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">Dashboard</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {dashboard.rows.map((row) => (
            <div key={row} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
              <p className="font-heading font-bold text-white">{row}</p>
              <p className="mt-1 text-xs text-[#d5c0d7]">Disponible para seguimiento dentro de KAS.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function KasProfileDashboard() {
  const { currentUser, updateUserProfile } = useTournament();
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username.replace(/^@/, ''));
  const [favoriteTeamId, setFavoriteTeamId] = useState(currentUser.favoriteTeamId);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [cardName, setCardName] = useState(currentUser.name);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [savedCard, setSavedCard] = useState(() => localStorage.getItem('kas_payment_card_v1') || '');

  const saveProfile = (event: React.FormEvent) => {
    event.preventDefault();
    updateUserProfile(name.trim() || currentUser.name, username.trim() || currentUser.username, favoriteTeamId, avatar);
  };

  const saveCard = (event: React.FormEvent) => {
    event.preventDefault();
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 4) return;
    const label = `${cardName || currentUser.name} · **** ${digits.slice(-4)} · ${cardExpiry || 'Sin fecha'}`;
    localStorage.setItem('kas_payment_card_v1', label);
    setSavedCard(label);
    setCardNumber('');
    setCardExpiry('');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">
      <section className="rounded-2xl border border-[#EA7301]/35 bg-[#19101c]/90 p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt={currentUser.name} className="h-20 w-20 rounded-2xl border border-white/10 object-cover" />
            <div>
              <p className="text-sm font-mono text-[#EA7301]">PERFIL KAS</p>
              <h1 className="font-heading text-4xl font-black text-white">{currentUser.name}</h1>
              <p className="text-sm text-[#d5c0d7]">{currentUser.username}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#EA7301]/15 px-4 py-2 text-xs font-mono text-[#EA7301]">Nivel {currentUser.level}</span>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-4">
        <Metric label="Puntos KAS" value={currentUser.points.toLocaleString()} />
        <Metric label="Precision" value={`${currentUser.accuracyRate}%`} />
        <Metric label="Racha" value={String(currentUser.currentStreak)} />
        <Metric label="Ranking CR" value={`Top ${currentUser.countryRankPercentile}%`} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={saveProfile} className="rounded-xl border border-white/10 bg-[#19101c]/90 p-5">
          <p className="text-xs font-mono text-[#EA7301]">CUENTA</p>
          <h2 className="mt-1 font-heading text-2xl font-black text-white">Editar perfil</h2>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row">
            <div className="shrink-0 relative group">
              <img src={avatar} alt={name} className="h-24 w-24 rounded-2xl border border-white/10 object-cover transition-opacity group-hover:opacity-50" />
              <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-black/60">
                <span className="text-[10px] font-bold text-white text-center px-2">Cambiar Foto</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAvatar(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
            <div className="grid flex-1 gap-3">
              <label className="text-xs font-mono uppercase text-[#d5c0d7]">URL de foto/avatar</label>
              <input value={avatar} onChange={(event) => setAvatar(event.target.value)} className="rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-[#EA7301]" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-mono uppercase text-[#d5c0d7]">Nombre</label>
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-[#EA7301]" />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-[#d5c0d7]">Usuario</label>
              <input value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-[#EA7301]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-mono uppercase text-[#d5c0d7]">Equipo favorito</label>
              <select value={favoriteTeamId} onChange={(event) => setFavoriteTeamId(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-[#EA7301]">
                {TEAMS.map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#EA7301] px-4 py-3 font-heading font-black text-black hover:bg-orange-400">
            Guardar cambios <ArrowRight size={18} />
          </button>
        </form>
        <div className="space-y-4">
          <form onSubmit={saveCard} className="rounded-xl border border-white/10 bg-[#19101c]/90 p-5">
            <p className="text-xs font-mono text-[#EA7301]">PAGO</p>
            <h2 className="mt-1 font-heading text-2xl font-black text-white">Tarjeta debito/credito</h2>
            {savedCard && <p className="mt-3 rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-sm text-[#d5c0d7]">{savedCard}</p>}
            <div className="mt-4 grid gap-3">
              <input value={cardName} onChange={(event) => setCardName(event.target.value)} placeholder="Nombre en tarjeta" className="rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EA7301]" />
              <input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} inputMode="numeric" placeholder="Numero de tarjeta" className="rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EA7301]" />
              <input value={cardExpiry} onChange={(event) => setCardExpiry(event.target.value)} placeholder="MM/AA" className="rounded-lg border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EA7301]" />
            </div>
            <button type="submit" className="mt-4 rounded-lg border border-[#EA7301]/50 bg-[#EA7301]/15 px-4 py-3 font-heading font-bold text-white hover:bg-[#EA7301]/25">Guardar tarjeta</button>
          </form>
          <div className="rounded-xl border border-white/10 bg-[#19101c]/90 p-5">
            <p className="text-xs font-mono text-[#EA7301]">SEGURIDAD</p>
            <h2 className="mt-1 font-heading text-2xl font-black text-white">Opciones de cuenta</h2>
            <div className="mt-4 grid gap-3">
              {['Cambiar contrasena', 'Preferencias de notificaciones', 'Ver sesiones activas'].map((item) => (
                <button key={item} type="button" className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-left font-heading font-bold text-white hover:border-[#EA7301]/60">{item}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
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
  const isCostaRicaQuinielaRoute = [
    '/tournaments/cr-apertura-2026/predictions',
    '/tournaments/cr-apertura-2026/ranking',
    '/tournaments/cr-apertura-2026/playoffs',
    '/tournaments/cr-apertura-2026/forum',
  ].some((path) => location.pathname.startsWith(path));
  const usesTeamTheme = isLoggedIn && isCostaRicaQuinielaRoute;
  const usesLoginTeamTheme = !isLoggedIn && location.pathname === '/login';
  const isAdmin = isLoggedIn && (currentUser.role === 'admin' || currentUser.isAdmin === true);
  const activeTab = getActiveTab(location.pathname);
  const isKasPublic = location.pathname === '/' || location.pathname === '/dashboard' || location.pathname.startsWith('/sports');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showBottomNav = isCostaRicaQuinielaRoute;
  const showDashboardSidebar = location.pathname !== '/'
    && location.pathname !== '/login'
    && location.pathname !== '/register'
    && !location.pathname.endsWith('/login')
    && !location.pathname.endsWith('/membership');

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
        showPublicLogin={location.pathname === '/'}
        showUserProfile={location.pathname !== '/login'}
        showSimulator={isLoggedIn && !isAdmin && location.pathname === '/tournaments/cr-apertura-2026/predictions'}
        publicNavigation={{
          sports: sports.map((sport) => ({ id: sport.id, label: sport.name, path: '/login', accent: sport.accent })),
          services: [
            { id: 'tournaments', label: 'Torneos activos', detail: 'Competiciones, jornadas y finales.', path: '/login', icon: 'trophy' },
            { id: 'membership', label: 'Pay-Per-Tournament', detail: 'Accesos por torneo sin paquetes globales.', path: '/register', icon: 'payment' },
            { id: 'community', label: 'Comunidad', detail: 'Ranking, perfiles y actividad deportiva.', path: '/login', icon: 'community' },
          ],
        }}
        onNavigateToPath={(path) => navigate(path)}
      />

      <main className={showDashboardSidebar ? 'flex-1 w-full' : isKasPublic || isAdminRoute ? 'flex-1 w-full' : 'flex-1 w-full max-w-4xl mx-auto pt-3 px-2 sm:px-4'}>
        <div className={showDashboardSidebar ? 'flex min-h-full flex-col lg:flex-row' : ''}>
          {showDashboardSidebar && <DashboardSidebar isAdmin={isAdmin} />}
          <div className={showDashboardSidebar ? 'min-w-0 flex-1' : ''}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<KasLoginPage onSuccess={(user) => navigate(user.role === 'admin' || user.isAdmin ? '/admin' : '/dashboard')} />} />
              <Route path="/register" element={<KasLoginPage onSuccess={(user) => navigate(user.role === 'admin' || user.isAdmin ? '/admin' : '/dashboard')} isRegisterDefault />} />
              <Route path="/dashboard" element={isLoggedIn ? <SportsDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard/calendario" element={isLoggedIn ? <MembershipCalendarDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard/membresias" element={isLoggedIn ? <MembershipsDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard/ranking-global" element={isLoggedIn ? <GlobalRankingDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/dashboard/soporte" element={isLoggedIn ? <SupportDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/sports" element={isLoggedIn ? <SportsDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/sports/football" element={isLoggedIn ? <FootballDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/sports/:sportId" element={isLoggedIn ? <SportPlaceholder /> : <Navigate to="/login" replace />} />
              <Route path="/tournaments/:tournamentId/membership" element={<TournamentMembershipLogin />} />
              <Route path="/tournaments/:tournamentId/grand-prix/:grandPrixId" element={<GrandPrixDashboard />} />
              <Route path="/tournaments/:tournamentId" element={<TournamentDashboard />} />
              <Route path="/tournaments/cr-apertura-2026/login" element={<LoginPage onSuccess={() => navigate('/tournaments/cr-apertura-2026/predictions', { replace: true })} onFavoriteTeamPreview={setPreviewTeamId} />} />
              <Route path="/tournaments/:tournamentId/predictions" element={<CostaRicaOnly><DashboardView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} onOpenAdmin={() => setAdminModalOpen(true)} /></CostaRicaOnly>} />
              <Route path="/tournaments/:tournamentId/ranking" element={<CostaRicaOnly><RankingView /></CostaRicaOnly>} />
              <Route path="/tournaments/:tournamentId/playoffs" element={<CostaRicaOnly><PlayoffsView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} /></CostaRicaOnly>} />
              <Route path="/tournaments/:tournamentId/forum" element={<CostaRicaOnly><SocialView /></CostaRicaOnly>} />
              <Route path="/profile" element={isLoggedIn ? <KasProfileDashboard /> : <Navigate to="/login" replace />} />
              <Route path="/admin/*" element={isAdmin ? <AdminView tournaments={getAllAdminTournaments()} /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </main>

      {showBottomNav && (
        <BottomNav activeTab={activeTab} setActiveTab={(tab) => navigate(navPathByTab[tab])} isAdmin={isAdmin && activeTab === 'admin'} />
      )}

      {isKasPublic && <PublicFooter />}

      <ScorerVoteModal />
      <ChampionModal />
      <AuthModal />
      <RulesModal />
      <AIAssistant />
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

const normalizeTickerEntity = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const getStandaloneTickerName = (event: NormalizedSportEvent) => {
  if (event.sportId === 'f1') return 'Lider: McLaren';
  if (event.sportId === 'cycling') return 'Lider: UAE Team Emirates-XRG';
  if (event.sportId === 'golf') return '1: Scottie Scheffler';
  return event.title;
};

const getSportResultLabel = (sportId: string) => {
  const labels: Record<string, string> = {
    football: 'Resultado',
    basketball: 'Puntos',
    baseball: 'Carreras',
    'american-football': 'Puntos',
    tennis: 'Sets',
    f1: 'Clasificacion',
    cycling: 'Etapa',
    golf: 'Tarjeta',
    mma: 'Combate',
    boxing: 'Combate',
  };

  return labels[sportId] || 'Resultado';
};

const formatSportResult = (event: NormalizedSportEvent) =>
  event.score ? `${getSportResultLabel(event.sportId)} ${event.score}` : event.status;

function HomePage() {
  const { matches, standings, leaderboard } = useTournament();
  const [homeEvents, setHomeEvents] = useState<NormalizedSportEvent[]>([]);
  const [homeEventsStatus, setHomeEventsStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const scoreboard = matches
    .filter((match) => match.status === 'live' || match.status === 'finished')
    .slice(0, 6);
  const homeLeaderTeam = getTeamById(standings[0]?.teamId || 'sap');
  const homeFallbackEvents = [
    { id: 'kas-champions', league: 'UEFA Champions League', title: 'Champions League 2026-2027 prepara quiniela premium', status: 'Preparacion', sportId: 'football', path: '/tournaments/champions-league' },
    { id: 'kas-nba', league: 'NBA', title: 'Temporada regular NBA abre picks diarios y ranking por conferencia', status: 'Activo', sportId: 'basketball', path: '/tournaments/nba-temporada-regular' },
    { id: 'kas-mlb', league: 'MLB', title: 'MLB suma pronosticos por carreras, series y ganador', status: 'Activo', sportId: 'baseball', path: '/tournaments/mlb-temporada-regular' },
    { id: 'kas-nfl', league: 'NFL', title: 'NFL activa picks semanales rumbo a playoffs', status: 'Activo', sportId: 'american-football', path: '/tournaments/nfl-temporada-regular' },
  ];
  const headlines = [
    `${homeLeaderTeam.shortName} domina la tabla nacional con ${standings[0]?.points ?? 0} puntos`,
    `${leaderboard[0]?.name || 'Ranking KAS'} marca el paso del prestigio semanal`,
    `${footballTournaments.length} torneos de futbol listos para membresia pay-per-tournament`,
    'Agenda multi deporte conectada a eventos, rankings y comunidad',
  ];
  const upcoming = matches
    .filter((match) => match.status === 'scheduled')
    .slice(0, 4);
  const tournamentNews = homeEvents.length > 0
    ? homeEvents.slice(0, 6).map((event) => ({
        id: event.id,
        league: event.league,
        title: event.title,
        status: formatSportResult(event),
        provider: event.provider,
        href: event.sourceUrl,
        path: '/login',
        sportId: event.sportId,
      }))
    : homeFallbackEvents.map((event) => ({
        ...event,
        provider: 'KAS',
        href: undefined,
      }));
  const usedTickerTeams = new Set<string>();
  const uniqueScoreboard = scoreboard.filter((match) => {
    const home = normalizeTickerEntity(getTeamById(match.homeTeamId).code);
    const away = normalizeTickerEntity(getTeamById(match.awayTeamId).code);
    if (usedTickerTeams.has(home) || usedTickerTeams.has(away)) return false;
    usedTickerTeams.add(home);
    usedTickerTeams.add(away);
    return true;
  });
  const usedStandaloneSports = new Set<string>();
  const uniqueExternalTickerEvents = homeEvents.filter((event) => {
    if (event.sportId === 'f1' || event.sportId === 'cycling' || event.sportId === 'golf') {
      if (usedStandaloneSports.has(event.sportId)) return false;
      usedStandaloneSports.add(event.sportId);
      return true;
    }
    const matchup = splitMatchupTitle(event.title);
    if (!matchup) return true;

    const home = normalizeTickerEntity(matchup.home);
    const away = normalizeTickerEntity(matchup.away);
    if (usedTickerTeams.has(home) || usedTickerTeams.has(away)) return false;
    usedTickerTeams.add(home);
    usedTickerTeams.add(away);
    return true;
  });
  const liveTickerItems = [
    ...uniqueExternalTickerEvents.map((event) => ({
      id: event.id,
      label: event.league,
      status: event.score ? getSportResultLabel(event.sportId) : event.status,
      title: getStandaloneTickerName(event),
      score: event.score || (event.startsAt ? new Date(event.startsAt).toLocaleDateString() : ''),
      path: event.sourceUrl || '/login',
    })),
  ];
  const tickerItems = liveTickerItems;

  const animatedTickerItems = [...tickerItems, ...tickerItems];

  useEffect(() => {
    const controller = new AbortController();
    setHomeEventsStatus('loading');

    Promise.all(sports.map((sport) => getSportEvents(sport.id, controller.signal))).then((results) => {
      if (controller.signal.aborted) return;
      const events = results.flatMap((result) => result.data.slice(0, 2)).slice(0, 14);
      const usingFallback = results.some((result) => result.fromFallback);
      setHomeEvents(events);
      setHomeEventsStatus(usingFallback ? 'fallback' : 'ready');
    }).catch(() => {
      if (controller.signal.aborted) return;
      setHomeEvents([]);
      setHomeEventsStatus('fallback');
    });

    return () => controller.abort();
  }, []);

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
              <Link to="/register" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-heading font-bold text-white hover:bg-white/10">
                Crear cuenta KAS
              </Link>
            </div>
          </div>
          <SportsCarousel />
        </div>
      </section>

      <section className="px-4 py-8 bg-[#050505]/55">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/92 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[#3c313e]/60 px-3 py-2">
              <span className="shrink-0 rounded-md bg-[#EA7301] px-2 py-1 text-[10px] font-heading font-black uppercase tracking-wide text-black">
                Marcadores
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="kas-score-ticker flex w-max gap-2">
                {animatedTickerItems.map((item, index) => {
                  const isLocalMatch = 'localHome' in item && item.localHome && item.localAway;
                  return (
                    <Link
                      key={`${item.id}-${index}`}
                      to={item.path.startsWith('http') ? '/login' : item.path}
                      className="min-w-[220px] rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:border-[#EA7301]/70 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#d5c0d7]">
                        <span className="max-w-[120px] truncate">{item.label}</span>
                        <span className={item.status.includes("'") ? 'text-[#00f0ff]' : 'text-emerald-300'}>
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-heading font-bold text-white">
                        {isLocalMatch ? (
                          <>
                            <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={item.localHome} size="xs" />{item.localHome.code}</span>
                            <span className="text-[#d5c0d7]">vs</span>
                            <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={item.localAway} size="xs" />{item.localAway.code}</span>
                          </>
                        ) : parseCostaRicaMatchup(item.title) ? (
                          (() => {
                            const matchup = parseCostaRicaMatchup(item.title);
                            if (!matchup) return null;
                            return (
                              <>
                                <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={matchup.home} size="xs" />{matchup.home.code}</span>
                                <span className="text-[#d5c0d7]">vs</span>
                                <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={matchup.away} size="xs" />{matchup.away.code}</span>
                              </>
                            );
                          })()
                        ) : (
                          <MatchupTitleWithLogos title={item.title} size="xs" />
                        )}
                        {item.score && <span className="ml-auto shrink-0 font-black">{item.score}</span>}
                      </div>
                    </Link>
                  );
                })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Metric label="Deportes" value={String(sports.length)} />
            <Metric label="Eventos" value={String(sports.reduce((total, sport) => total + sport.activeEvents, 0))} />
            <Metric label="Torneos" value={String(footballTournaments.length)} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/92 p-4">
                <div className="flex items-center gap-2 border-b border-[#3c313e]/60 pb-3">
                  <BarChart3 className="h-4 w-4 text-[#EA7301]" />
                  <h2 className="font-heading text-xl font-black text-white">Titulares</h2>
                </div>
                <div className="divide-y divide-[#3c313e]/60">
                  {headlines.map((headline, index) => (
                    <p key={headline} className="flex items-center gap-2 py-3 text-sm leading-snug text-[#eeddee]">
                      {index === 0 && <TeamBadge team={homeLeaderTeam} size="xs" />}
                      <span>{headline}</span>
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/92 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#EA7301]" />
                  <h2 className="font-heading text-xl font-black text-white">Agenda</h2>
                </div>
                <div className="mt-3 space-y-2">
                  {upcoming.map((match) => {
                    const home = getTeamById(match.homeTeamId);
                    const away = getTeamById(match.awayTeamId);
                    return (
                      <Link key={match.id} to="/tournaments/cr-apertura-2026/login" className="block rounded-lg bg-black/25 px-3 py-2 hover:bg-black/40">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#d5c0d7]">
                          <span>J{match.round} · {match.date}</span>
                          <span>{match.time}</span>
                        </div>
                        <p className="mt-1 flex items-center gap-2 truncate text-sm font-heading font-bold text-white">
                          <TeamBadge team={home} size="xs" /> {home.shortName}
                          <span className="text-[#d5c0d7]">vs</span>
                          <TeamBadge team={away} size="xs" /> {away.shortName}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>

            <section className="rounded-xl border border-[#3c313e]/70 bg-[#19101c]/92 p-4">
              <div className="flex flex-col gap-2 border-b border-[#3c313e]/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#EA7301]" />
                  <h2 className="font-heading text-xl font-black text-white">Noticias de torneos KAS</h2>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-mono ${
                  homeEventsStatus === 'ready'
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : homeEventsStatus === 'loading'
                      ? 'bg-[#EA7301]/15 text-[#EA7301]'
                      : 'bg-amber-400/15 text-amber-200'
                }`}>
                  {homeEventsStatus === 'loading' ? 'Cargando' : homeEventsStatus === 'ready' ? 'Datos en vivo' : 'Respaldo KAS'}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {homeEventsStatus === 'loading' && [1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-28 animate-pulse rounded-xl border border-white/10 bg-black/25" />
                ))}

                {homeEventsStatus !== 'loading' && tournamentNews.map((event) => {
                  const sport = sports.find((item) => item.id === event.sportId);
                  const matchup = parseCostaRicaMatchup(event.title);
                  const content = (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono uppercase text-[#EA7301]">{event.league}</p>
                          {matchup ? (
                            <h3 className="mt-2 flex items-center gap-2 font-heading text-lg font-black leading-tight text-white">
                              <TeamBadge team={matchup.home} size="xs" />
                              <span className="truncate">{matchup.home.code}</span>
                              <span className="text-xs text-[#d5c0d7]">vs</span>
                              <TeamBadge team={matchup.away} size="xs" />
                              <span className="truncate">{matchup.away.code}</span>
                            </h3>
                          ) : (
                            <h3 className="mt-1 flex min-w-0 items-center gap-2 font-heading text-lg font-black leading-tight text-white">
                              <MatchupTitleWithLogos title={event.title} size="xs" />
                            </h3>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#d5c0d7]">
                        <span>{sport?.name || 'KAS'}</span>
                        <span className="rounded-full bg-[#EA7301]/15 px-2 py-0.5 text-[#EA7301]">{event.status}</span>
                      </div>
                    </>
                  );

                  return event.href ? (
                    <a key={event.id} href={event.href} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-[#EA7301]/70 transition-colors">
                      {content}
                    </a>
                  ) : (
                    <Link key={event.id} to={event.path} className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-[#EA7301]/70 transition-colors">
                      {content}
                    </Link>
                  );
                })}

                {homeEventsStatus !== 'loading' && (
                  <div className="sm:col-span-2 rounded-xl border border-[#EA7301]/30 bg-[#EA7301]/10 p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#EA7301]" />
                      <h3 className="font-heading text-lg font-black text-white">Proximos torneos</h3>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {upcomingFootballTournaments.map((tournament) => (
                        <Link
                          key={tournament.id}
                          to="/sports/football"
                          className="rounded-xl border border-white/10 bg-black/25 p-3 hover:border-[#EA7301]/70 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <LeagueLogo tournamentId={tournament.id} name={tournament.name} className="h-10 w-10 rounded-lg" />
                            <div className="min-w-0">
                              <p className="truncate font-heading text-base font-black text-white">{tournament.name}</p>
                              <p className="text-xs text-[#d5c0d7]">{tournament.season} - {tournament.status}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>

    </div>
  );
}

function SportsCarousel({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [providerVisuals, setProviderVisuals] = useState<Record<string, string>>({});
  const slide = sports[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % sports.length), 4800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getSportVisuals(controller.signal).then((result) => {
      const visuals = result.data.reduce<Record<string, string>>((items, visual) => {
        if (visual.thumbnail) items[visual.sportId] = visual.thumbnail;
        return items;
      }, {});
      setProviderVisuals(visuals);
    }).catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <div className={`mx-auto rounded-2xl border border-white/15 bg-[#140b16]/80 p-4 shadow-2xl backdrop-blur w-full ${compact ? 'max-w-none' : 'max-w-xl'}`}>
      <div
        key={slide.id}
        className={`${compact ? 'min-h-[300px]' : 'min-h-[360px]'} rounded-xl p-6 flex flex-col justify-end kas-slide-visual overflow-hidden`}
        style={{
          '--sport-accent': slide.accent,
          '--sport-image': `url(${providerVisuals[slide.id] || slide.image})`,
        } as React.CSSProperties}
      >
        <div className="max-w-xl">
          <p className="text-sm font-mono tracking-[0.28em] text-white/70">DEPORTE DESTACADO</p>
          <h2 className={`${compact ? 'text-4xl' : 'text-5xl'} mt-2 font-heading font-black text-white leading-none`}>{slide.name}</h2>
          <p className="mt-3 text-base text-white/82">{slide.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/login" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-[#EA7301] transition-colors">
              Entrar para explorar <ArrowRight className="w-4 h-4" />
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

function InfoCard({ icon, title, text, className = '' }: { icon: React.ReactNode; title: string; text: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[#19101c] p-5 ${className}`}>
      <div className="text-[#EA7301]">{icon}</div>
      <h3 className="mt-4 font-heading text-xl font-black text-white">{title}</h3>
      <p className="text-sm text-white/65">{text}</p>
    </div>
  );
}

function KasLoginPage({ onSuccess, isRegisterDefault = false }: { onSuccess: (user: ReturnType<typeof useTournament>['currentUser']) => void; isRegisterDefault?: boolean }) {
  const { loginUser } = useTournament();
  const [isRegister, setIsRegister] = useState(isRegisterDefault);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const session = isRegister
        ? await signUp({ email, password, name, username, favoriteTeamId: 'sap' })
        : await signIn(email, password);
      loginUser(session.user);
      onSuccess(session.user);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo iniciar sesion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[82vh] px-4 py-10 flex items-center justify-center kas-login-bg"
      style={{ '--kas-login-logo': `url(${ASSET_PATHS.logos.brand.kas})` } as React.CSSProperties}
    >
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
            {!isRegister && <p className="mt-2 text-xs text-[#d5c0d7]/75">Las cuentas administrativas entran al panel admin automaticamente.</p>}
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
            {isRegister && <>
              <label className="block space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Nombre</span>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" required className="w-full rounded-xl bg-white px-3 py-3 text-sm font-medium text-black outline-none" />
              </label>
              <label className="block space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#d5c0d7]">Usuario</span>
                <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" required className="w-full rounded-xl bg-white px-3 py-3 text-sm font-medium text-black outline-none" />
              </label>
            </>}
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

            {error && <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-100">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#EA7301] py-3.5 font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400 disabled:opacity-60">
              {isSubmitting ? 'Procesando' : isRegister ? 'Crear cuenta KAS' : 'Iniciar sesion'}
            </button>
          </form>

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
            src={ASSET_PATHS.logos.brand.kas}
            alt="King Arthur Sports"
            className="h-12 w-12 rounded-xl object-cover border border-[#EA7301]/50"
          />
          <div>
            <p className="font-heading text-xl font-black text-white">KING ARTHUR SPORTS</p>
            <p className="text-xs font-mono tracking-[0.2em] text-[#EA7301]">SPORTTECH ECOSYSTEM</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/65">
          <Link to="/login" className="hover:text-[#EA7301]">Deportes</Link>
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
  const tournamentCount = footballTournaments.length + Object.values(sportDashboards).reduce((total, dashboard) => total + dashboard.tournaments.length, 0);
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
            <p className="text-sm font-mono text-[#EA7301]">CENTRO DEPORTIVO KAS</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-heading font-black text-white">Bienvenido, {currentUser.name}</h1>
            <p className="mt-3 max-w-2xl text-[#d5c0d7]">
              Un solo espacio para descubrir competiciones, revisar la actualidad deportiva y activar membresias por el torneo que realmente quieres jugar.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Prestigio" value={currentUser.points.toLocaleString()} />
            <Metric label="Ranking global" value="Top 5%" />
            <Metric label="Deportes" value={String(sports.length)} />
            <Metric label="Torneos disponibles" value={String(tournamentCount)} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-l-2 border-[#EA7301] pl-4"><Trophy className="h-5 w-5 text-[#EA7301]" /><h2 className="mt-3 font-heading text-2xl font-black text-white">Quinielas por torneo</h2><p className="mt-2 text-sm text-[#d5c0d7]">Acceso individual a competiciones, picks, jornadas y finales sin paquetes obligatorios.</p></div>
          <div className="border-l-2 border-[#EA7301] pl-4"><BarChart3 className="h-5 w-5 text-[#EA7301]" /><h2 className="mt-3 font-heading text-2xl font-black text-white">Ranking y prestigio</h2><p className="mt-2 text-sm text-[#d5c0d7]">Tus resultados se convierten en puntos, posiciones y reconocimiento dentro de cada torneo.</p></div>
          <div className="border-l-2 border-[#EA7301] pl-4"><Users className="h-5 w-5 text-[#EA7301]" /><h2 className="mt-3 font-heading text-2xl font-black text-white">Comunidad deportiva</h2><p className="mt-2 text-sm text-[#d5c0d7]">Foros, perfiles e historial de actividad para seguir cada competencia con contexto.</p></div>
        </div>
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
          {sports.map((sport) => {
            const SportIcon = sportIconById[sport.id] || Dumbbell;
            return (
            <Link key={sport.id} to={`/sports/${sport.id}`} className="rounded-xl border border-[#3c313e] bg-[#221824] p-5 hover:border-[#EA7301] transition-colors">
              <div className="flex items-center justify-between">
                <SportIcon className="w-7 h-7" style={{ color: sport.accent }} />
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-mono text-white/70">{sport.activeEvents} eventos</span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-black text-white">{sport.name}</h3>
              <p className="mt-2 text-sm text-[#d5c0d7]">{sport.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#EA7301]">Entrar <ArrowRight className="w-4 h-4" /></span>
            </Link>
          );
          })}
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

      <section className="border-y border-white/10 py-8">
        <div className="max-w-3xl">
          <p className="text-sm font-mono text-[#EA7301]">ASI FUNCIONA KAS</p>
          <h2 className="mt-2 text-3xl font-heading font-black text-white">Elige, activa y compite</h2>
          <p className="mt-3 text-sm text-[#d5c0d7]">Cada deporte mantiene sus propias reglas, calendario y comunidad. La membresia se activa por torneo para que tu experiencia no dependa de un paquete global.</p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <div><span className="font-mono text-[#EA7301]">01</span><h3 className="mt-2 font-heading text-xl font-black text-white">Explora el torneo</h3><p className="mt-1 text-sm text-[#d5c0d7]">Consulta participantes, formato, precio y la actividad disponible antes de ingresar.</p></div>
          <div><span className="font-mono text-[#EA7301]">02</span><h3 className="mt-2 font-heading text-xl font-black text-white">Activa membresia</h3><p className="mt-1 text-sm text-[#d5c0d7]">Tu acceso queda asociado a tu cuenta y a la competición seleccionada.</p></div>
          <div><span className="font-mono text-[#EA7301]">03</span><h3 className="mt-2 font-heading text-xl font-black text-white">Participa y sigue</h3><p className="mt-1 text-sm text-[#d5c0d7]">Registra picks, revisa jornadas, ranking y actualizaciones de cada torneo.</p></div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">ACTUALIDAD DEPORTIVA</p>
            <h2 className="text-3xl font-heading font-black text-white">Noticias y agenda</h2>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#d5c0d7]">Agenda deportiva conectada con marcadores, fechas y actividad destacada de torneos KAS.</p>

        <div className="mt-5 grid md:grid-cols-2 gap-3">
          {apiStatus === 'loading' && [1, 2, 3, 4].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-xl border border-white/10 bg-black/25" />
          ))}

          {apiStatus !== 'loading' && apiEvents.map((event) => {
            const matchup = parseCostaRicaMatchup(event.title);

            return (
              <a
                key={event.id}
                href={event.sourceUrl || '#'}
                target={event.sourceUrl ? '_blank' : undefined}
                rel={event.sourceUrl ? 'noreferrer' : undefined}
                className="rounded-xl border border-white/10 bg-black/25 p-4 hover:border-[#EA7301]/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase text-[#EA7301]">{event.league}</p>
                    {matchup ? (
                      <h3 className="mt-2 flex items-center gap-2 font-heading text-xl font-black text-white">
                        <TeamBadge team={matchup.home} size="sm" />
                        <span className="truncate">{matchup.home.code}</span>
                        <span className="text-sm text-[#d5c0d7]">vs</span>
                        <TeamBadge team={matchup.away} size="sm" />
                        <span className="truncate">{matchup.away.code}</span>
                      </h3>
                    ) : (
                      <h3 className="mt-2 flex min-w-0 items-center gap-2 font-heading text-xl font-black text-white">
                        <MatchupTitleWithLogos title={event.title} size="sm" />
                      </h3>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#d5c0d7]">
                  <span>{event.status}</span>
                  {event.score && <span className="text-white">{formatSportResult(event)}</span>}
                  {event.startsAt && <span>{new Date(event.startsAt).toLocaleDateString()}</span>}
                </div>
              </a>
            );
          })}
          {apiStatus !== 'loading' && apiEvents.length === 0 && <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-[#d5c0d7]">No hay eventos publicados por los proveedores en este momento. Vuelve a consultar mas tarde.</div>}
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

function eventsFromDashboard(events: string[] | undefined, sportName: string) {
  if (!events || events.length === 0) return [`Participantes ${sportName}`, 'Calendario pendiente', 'Ranking disponible'];
  return events.flatMap((event) => event.split(' vs ')).slice(0, 8);
}

function formatMatchupTitle(title: string) {
  return title.replace(/\s+@\s+/g, ' vs ');
}

function MatchupLogoRow({ title, size = 'sm' }: { title: string; size?: 'xs' | 'sm' | 'md' }) {
  const matchup = splitMatchupTitle(title);

  if (!matchup) return null;

  return (
    <span className="flex shrink-0 items-center gap-1">
      <UniversalTeamLogo name={matchup.home} size={size} className="rounded-full bg-black/30" />
      <UniversalTeamLogo name={matchup.away} size={size} className="rounded-full bg-black/30" />
    </span>
  );
}

function MatchupTitleWithLogos({ title, size = 'sm' }: { title: string; size?: 'xs' | 'sm' | 'md' }) {
  const matchup = splitMatchupTitle(title);

  if (!matchup) return <span className="truncate">{formatMatchupTitle(title)}</span>;

  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex min-w-0 items-center gap-1.5">
        <UniversalTeamLogo name={matchup.home} size={size} />
        <span className="truncate">{matchup.home}</span>
      </span>
      <span className="text-sm text-[#d5c0d7]">vs</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <UniversalTeamLogo name={matchup.away} size={size} />
        <span className="truncate">{matchup.away}</span>
      </span>
    </span>
  );
}

function LeagueLogo({ tournamentId, name, className = '' }: { tournamentId: string; name: string; className?: string }) {
  const logoUrl = getLeagueLogo(tournamentId);

  if (!logoUrl) return null;

  return (
    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-1 ${className}`}>
      <img src={logoUrl} alt={name} className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
    </span>
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
                <div className="flex min-w-0 items-center gap-3">
                  <LeagueLogo tournamentId={tournament.id} name={tournament.name} />
                  <h2 className="truncate font-heading text-2xl font-black text-white">{tournament.name}</h2>
                </div>
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
  const { isLoggedIn } = useTournament();
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  if (!tournament || !tournamentId) return <Navigate to="/sports" replace />;

  const handleCheckout = async () => {
    setPaymentError('');
    setIsPaying(true);
    try {
      await simulatePayPalCheckout(tournamentId, tournament.price);
      navigate(`/tournaments/${tournamentId}`);
    } catch (requestError) {
      setPaymentError(requestError instanceof Error ? requestError.message : 'No se pudo procesar el pago.');
    } finally {
      setIsPaying(false);
    }
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
          <p className="text-xs font-mono text-[#EA7301]">MEMBRESIA DEL TORNEO</p>
          <h2 className="mt-1 text-3xl font-heading font-black text-white">Acceso protegido</h2>
          <p className="mt-2 text-sm text-[#d5c0d7]">
            {isLoggedIn ? 'Completa el pago simulado para activar tu membresia en este torneo.' : 'Inicia sesion antes de comprar una membresia.'}
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
              PayPal Sandbox: no se realiza ningun cobro real.
            </div>
            {isLoggedIn ? (
              <button type="button" onClick={handleCheckout} disabled={isPaying} className="w-full rounded-xl bg-[#0070ba] py-3.5 font-heading font-black uppercase tracking-wide text-white hover:bg-[#005ea6] disabled:opacity-60">
                {isPaying ? 'Procesando pago...' : `Pagar con PayPal simulado ${tournament.price}`}
              </button>
            ) : (
              <Link to={tournamentId === 'cr-apertura-2026' ? '/tournaments/cr-apertura-2026/login' : '/login'} className="block w-full rounded-xl bg-[#EA7301] py-3.5 text-center font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400">
                Iniciar sesion para continuar
              </Link>
            )}
            {paymentError && <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-100">{paymentError}</p>}
          </div>

          <Link to={`/tournaments/${tournamentId}`} className="mt-4 block text-center text-xs font-mono text-[#d5c0d7] hover:text-[#EA7301]">
            Ver resumen publico del torneo
          </Link>
        </section>
      </div>
    </div>
  );
}

function F1TeamCard({ team }: { team: string }) {
  return (
    <div className="select-none rounded-xl border border-white/10 bg-black/25 px-3 py-3 transition-colors hover:border-red-400/50 hover:bg-black/35">
      <div className="flex items-center gap-3">
        <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#f7f7f7]/95 px-2 shadow-inner">
          <UniversalTeamLogo name={team} size="md" className="h-12 w-full" />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-[15px] font-black leading-tight text-white sm:text-base">{team}</p>
          <p className="text-xs text-[#d5c0d7]">Formula 1</p>
        </div>
      </div>
    </div>
  );
}

function GrandPrixDashboard() {
  const { tournamentId, grandPrixId } = useParams();
  const tournament = tournamentId ? findTournamentSummary(tournamentId) : undefined;
  const grandPrix = grandPrixId ? findF1GrandPrix(grandPrixId) : undefined;
  const detail = tournamentId ? tournamentDetails[tournamentId] : undefined;

  if (!tournament || tournament.id !== 'f1-world-championship' || !grandPrix) {
    return <Navigate to="/sports/f1" replace />;
  }

  const roundNumber = f1GrandPrix.findIndex((item) => item === grandPrix) + 1;
  const teams = detail?.teams || [];

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-6xl mx-auto">
      <section className="rounded-2xl border border-[#EA7301]/40 bg-[#19101c] p-5 sm:p-7 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[radial-gradient(circle_at_center,#ef4444,transparent_58%)]" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">DASHBOARD GRAND PRIX</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-heading font-black text-white">{grandPrix}</h1>
            <p className="mt-3 text-[#d5c0d7]">
              {tournament.name} · Ronda {roundNumber} de {f1GrandPrix.length} · Membresia {tournament.price}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Torneo" value="F1" />
            <Metric label="Ronda" value={String(roundNumber)} />
            <Metric label="Prediccion" value="Pole" />
            <Metric label="Eventos" value="Carrera" />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-4">
        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <p className="text-sm font-mono text-[#EA7301]">FORMATO DEL GRAND PRIX</p>
          <h2 className="mt-2 text-3xl font-heading font-black text-white">Picks de carrera</h2>
          <p className="mt-3 text-sm text-[#d5c0d7]">
            Cada Grand Prix vive dentro del torneo F1 y tiene sus propias predicciones, ranking por carrera y puntaje acumulado.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Pole position', 'Ganador', 'Podio', 'Vuelta rapida', 'Top 10'].map((rule) => (
              <span key={rule} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-[#eeddee]">{rule}</span>
            ))}
          </div>
          <Link to={`/tournaments/${tournament.id}`} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-heading font-bold text-white hover:border-[#EA7301]">
            <ChevronLeft className="w-4 h-4" /> Volver al torneo
          </Link>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-mono text-[#EA7301]">ESCUDERIAS</p>
              <h2 className="text-3xl font-heading font-black text-white">Parrilla 2026</h2>
            </div>
            <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{teams.length} equipos</span>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {teams.map((team) => (
              <F1TeamCard key={team} team={team} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <InfoCard className="kas-dark-card" icon={<CalendarDays />} title="Agenda" text="Practicas, qualy y carrera agrupadas para este Grand Prix." />
        <InfoCard className="kas-dark-card" icon={<BarChart3 />} title="Ranking GP" text="Puntos separados por carrera y acumulados al campeonato F1." />
        <InfoCard className="kas-dark-card" icon={<Shield />} title="Acceso" text="Disponible con la membresia del torneo F1 World Championship." />
      </section>
    </div>
  );
}

function TournamentDashboard() {
  const { tournamentId } = useParams();
  const tournament = tournamentId ? findTournamentSummary(tournamentId) : undefined;
  const { standings, matches, userPredictions, currentUser } = useTournament();
  const [tournamentApiEvents, setTournamentApiEvents] = useState<NormalizedSportEvent[]>([]);
  const [tournamentApiStatus, setTournamentApiStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [tournamentProvider, setTournamentProvider] = useState<SportProvider>('local');

  useEffect(() => {
    if (!tournamentId) return;

    const controller = new AbortController();
    setTournamentApiStatus('loading');

    getTournamentEvents(tournamentId, controller.signal).then((result) => {
      setTournamentApiEvents(result.data);
      setTournamentApiStatus(result.fromFallback ? 'fallback' : 'ready');
      setTournamentProvider(result.provider);
    }).catch(() => {
      setTournamentApiEvents([]);
      setTournamentApiStatus('fallback');
      setTournamentProvider('local');
    });

    return () => controller.abort();
  }, [tournamentId]);

  if (!tournament || !tournamentId) return <Navigate to="/sports" replace />;

  const sport = sports.find((item) => item.id === tournament.sportId);
  const dashboard = sportDashboards[tournament.sportId];
  const isCostaRica = tournament.id === 'cr-apertura-2026';
  const primaryPath = isCostaRica ? '/tournaments/cr-apertura-2026/login' : getTournamentAccessPath(tournament.id);
  const detail = tournamentDetails[tournament.id] || {
    overview: dashboard?.description || `Dashboard de ${tournament.name} con informacion del torneo, participantes y formato de quiniela.`,
    teams: eventsFromDashboard(dashboard?.events, tournament.sportName),
    format: `${tournament.season} · ${tournament.status}`,
    predictionRules: [dashboard?.prediction || 'Ganador y marcador', 'Ranking del torneo', 'Prestigio KAS'],
    coverage: ['Calendario', 'Ranking', 'Comunidad', 'Membresia'],
  };
  const events = dashboard?.events || [
    'Jornada inicial pendiente de fixture',
    'Ranking del torneo en preparacion',
    'Foro de comunidad disponible',
  ];
  const liveTournamentEvents = tournamentApiEvents.length > 0 ? tournamentApiEvents : [];
  const enabledPath = primaryPath;
  const leagueLogo = getLeagueLogo(tournament.id);
  const isFormulaOne = tournament.id === 'f1-world-championship';
  const leaderStanding = standings[0];
  const leaderTeam = getTeamById(leaderStanding?.teamId || 'sap');
  const favoriteTeam = getTeamById(currentUser.favoriteTeamId || 'sap');
  const favoriteStanding = standings.find((standing) => standing.teamId === favoriteTeam.id);
  const currentRound = 5;
  const currentRoundMatches = matches.filter((match) => match.round === currentRound);
  const predictedCurrentRound = currentRoundMatches.filter((match) => {
    const prediction = userPredictions[match.id];
    return prediction?.homeScore !== null && prediction?.homeScore !== undefined && prediction?.awayScore !== null && prediction?.awayScore !== undefined;
  }).length;
  const predictionProgress = currentRoundMatches.length > 0 ? Math.round((predictedCurrentRound / currentRoundMatches.length) * 100) : 0;
  const classificationZone = standings.slice(0, 4);

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-6xl mx-auto">
      {isCostaRica && (
        <section className="overflow-hidden rounded-2xl border border-[#EA7301]/45 bg-[#19101c] shadow-2xl">
          <div className="relative p-5 sm:p-7">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_right,#EA7301,transparent_42%),radial-gradient(circle_at_bottom_left,#00f0ff,transparent_38%)]" />
            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-mono tracking-[0.28em] text-[#EA7301]">CAMPEONATO NACIONAL</p>
                <h1 className="mt-2 font-heading text-4xl font-black leading-none text-white sm:text-5xl">Costa Rica Apertura 2026</h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#eeddee]/80 sm:text-base">
                  Dashboard central para seguir la jornada, revisar tabla UNAFUT y entrar a la quiniela del torneo.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#EA7301]/35 bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">Activo</span>
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-mono text-[#d5c0d7]">18 jornadas + playoffs</span>
                  <Link to="/tournaments/cr-apertura-2026/login" className="inline-flex items-center gap-2 rounded-full bg-[#EA7301] px-4 py-1 text-xs font-heading font-black text-black hover:bg-orange-400">
                    Quiniela <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">Lider UNAFUT</p>
                  <div className="mt-3 flex items-center gap-3">
                    <TeamBadge team={leaderTeam} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-heading text-lg font-black text-white">{leaderTeam.shortName}</p>
                      <p className="text-xs text-[#EA7301]">{leaderStanding?.points ?? 0} pts</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[10px] font-mono uppercase text-[#d5c0d7]">Tu equipo</p>
                  <div className="mt-3 flex items-center gap-3">
                    <TeamBadge team={favoriteTeam} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-heading text-lg font-black text-white">{favoriteTeam.shortName}</p>
                      <p className="text-xs text-[#EA7301]">{favoriteStanding ? `${favoriteStanding.points} pts` : 'Sin puntos'}</p>
                    </div>
                  </div>
                </div>
                <Metric label="Jornada actual" value={`J${currentRound}`} />
                <Metric label="Tus picks" value={`${predictionProgress}%`} />
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 md:grid-cols-4">
              {classificationZone.map((standing, index) => {
                const team = getTeamById(standing.teamId);
                return (
                  <div key={standing.teamId} className="rounded-xl border border-white/10 bg-black/25 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-[#d5c0d7]">#{index + 1}</span>
                      <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-mono text-emerald-300">Clasifica</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <TeamBadge team={team} size="xs" />
                      <p className="min-w-0 truncate font-heading text-base font-black text-white">{team.shortName}</p>
                    </div>
                    <p className="mt-1 text-xs text-[#d5c0d7]">{standing.points} pts - DG {standing.goalDifference}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-[#EA7301]/40 bg-[#19101c] p-5 sm:p-7 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[radial-gradient(circle_at_center,#EA7301,transparent_58%)]" />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end">
          <div>
            <p className="text-sm font-mono text-[#EA7301]">DASHBOARD DEL TORNEO</p>
            {leagueLogo && (
              <span className="mt-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
                <img src={leagueLogo} alt={tournament.name} className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
              </span>
            )}
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

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-mono text-[#EA7301]">EQUIPOS / PARTICIPANTES</p>
              <h2 className="text-3xl font-heading font-black text-white">Competidores</h2>
            </div>
            <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{detail.teams.length} activos</span>
          </div>
          <p className="mt-3 text-sm text-[#d5c0d7]">{detail.overview}</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {detail.teams.map((team) => {
              const localTeam = findCostaRicaTeamByName(team);
              return (
                <div key={team} className={`rounded-xl border border-white/10 bg-black/25 px-4 py-3 ${isFormulaOne ? 'select-none' : ''}`}>
                  <div className="flex items-center gap-3">
                    {localTeam ? <TeamBadge team={localTeam} size="sm" /> : isFormulaOne ? (
                      <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#f7f7f7]/95 px-2 shadow-inner">
                        <UniversalTeamLogo name={team} size="md" className="h-12 w-full" />
                      </span>
                    ) : <UniversalTeamLogo name={team} size="sm" />}
                    <div className="min-w-0">
                      <p className={`${isFormulaOne ? 'whitespace-normal text-[15px] leading-tight sm:text-base' : 'truncate text-lg'} font-heading font-black text-white`}>{localTeam?.shortName || team}</p>
                      <p className="text-xs text-[#d5c0d7]">{localTeam?.name || tournament.sportName}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <p className="text-sm font-mono text-[#EA7301]">INFORMACION DEL TORNEO</p>
          <h2 className="mt-2 text-3xl font-heading font-black text-white">{detail.format}</h2>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs font-mono text-white/45">REGLAS DE PREDICCION</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {detail.predictionRules.map((rule) => (
                  <span key={rule} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-[#eeddee]">{rule}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-white/45">COBERTURA</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {detail.coverage.map((item) => (
                  <div key={item} className="rounded-lg bg-black/25 px-3 py-2 text-sm text-[#d5c0d7]">{item}</div>
                ))}
              </div>
            </div>
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
            {isCostaRica ? 'Quiniela' : 'Gestionar membresia'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-mono text-[#EA7301]">{isFormulaOne ? 'GRAND PRIX DEL TORNEO' : 'EVENTOS DEL TORNEO'}</p>
              <h2 className="text-3xl font-heading font-black text-white">{isFormulaOne ? 'Calendario F1' : 'Actividad destacada'}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-mono ${tournamentApiStatus === 'ready' ? 'bg-emerald-400/15 text-emerald-300' : tournamentApiStatus === 'loading' ? 'bg-[#EA7301]/15 text-[#EA7301]' : 'bg-amber-400/15 text-amber-200'}`}>
              {tournamentApiStatus === 'ready' ? tournamentProvider === 'openligadb' ? 'OpenLigaDB' : 'Football-Data' : tournamentApiStatus === 'loading' ? 'Cargando' : 'Fallback'}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {tournamentApiStatus === 'loading' && [1, 2, 3].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-xl border border-white/10 bg-black/25" />
            ))}

            {isFormulaOne && tournamentApiStatus !== 'loading' && liveTournamentEvents.map((event) => (
              <Link key={event.id} to={`/tournaments/${tournament.id}/grand-prix/${toTournamentId(event.title)}`} className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 transition-colors hover:border-[#EA7301]/70">
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 font-heading text-lg font-bold text-white">
                    <span className="truncate">{event.title}</span>
                  </span>
                  <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">Dashboard</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#d5c0d7]">
                  <span>{event.league}</span>
                  <span>Pole · Podio · Ganador · Vuelta rapida</span>
                </div>
              </Link>
            ))}

            {!isFormulaOne && tournamentApiStatus !== 'loading' && liveTournamentEvents.map((event) => (
              <div key={event.id} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex min-w-0 items-center gap-3 font-heading text-lg font-bold text-white">
                    <MatchupLogoRow title={event.title} />
                    <span className="truncate">{event.title}</span>
                  </span>
                  <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{event.status}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#d5c0d7]">
                  <span>{event.league}</span>
                  {event.startsAt && <span>{new Date(event.startsAt).toLocaleDateString()}</span>}
                  {event.score && <span className="text-white">{formatSportResult(event)}</span>}
                </div>
              </div>
            ))}

            {tournamentApiStatus !== 'loading' && liveTournamentEvents.length === 0 && events.map((event) => (
              <div key={event} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <span className="flex min-w-0 items-center gap-3 font-heading text-lg font-bold text-white">
                  <MatchupLogoRow title={event} />
                  <span className="truncate">{event}</span>
                </span>
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
          <p className="text-xs font-mono text-[#EA7301]">{sport.id === 'f1' ? 'ESTRUCTURA' : 'PROXIMOS EVENTOS'}</p>
          {sport.id === 'f1' ? (
            <div className="mt-4 rounded-xl bg-black/25 border border-white/10 px-4 py-4">
              <p className="font-heading text-xl font-black text-white">Los 24 Grand Prix viven dentro del torneo.</p>
              <p className="mt-2 text-sm text-[#d5c0d7]">
                Entra a F1 World Championship para ver Bahrain, Monaco, Las Vegas, Abu Dhabi y el resto del calendario como dashboards internos.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {dashboard.events.map((event) => (
                <div key={event} className="flex items-center justify-between rounded-xl bg-black/25 border border-white/10 px-4 py-3">
                  <span className="flex min-w-0 items-center gap-3 font-heading text-lg font-bold text-white">
                    <MatchupLogoRow title={event} />
                    <span className="truncate">{event}</span>
                  </span>
                  <span className="text-xs font-mono text-[#EA7301]">Picks</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-sm font-mono text-[#EA7301]">TORNEOS</p>
          <h2 className="text-3xl font-heading font-black text-white">Competiciones de {sport.name}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {dashboard.tournaments.map((tournament) => {
            const tournamentAccessId = toTournamentId(tournament.name);
            return (
              <Link key={tournament.name} to={getTournamentAccessPath(tournamentAccessId)} className="rounded-xl border border-[#3c313e] bg-[#221824]/90 p-5 hover:border-[#EA7301] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <LeagueLogo tournamentId={tournamentAccessId} name={tournament.name} />
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-2xl font-black text-white">{tournament.name}</h3>
                      <p className="text-sm text-[#d5c0d7]">{tournament.season} - {tournament.status}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#EA7301]/15 px-3 py-1 text-xs font-mono text-[#EA7301]">{tournament.price}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#EA7301]">
                  Acceder con membresia <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CostaRicaOnly({ children }: { children: React.ReactNode }) {
  const { tournamentId } = useParams();
  const { isLoggedIn } = useTournament();
  if (tournamentId !== 'cr-apertura-2026') return <Navigate to={`/tournaments/${tournamentId}`} replace />;
  if (!isLoggedIn && !getStoredSession()) return <Navigate to="/tournaments/cr-apertura-2026/login" replace />;
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







