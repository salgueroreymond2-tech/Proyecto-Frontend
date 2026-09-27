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
  DirectionsBike,
  SportsBaseball,
  SportsBasketball,
  SportsFootball,
  SportsMma,
  SportsMotorsports,
  SportsSoccer,
  SportsTennis,
  Trophy,
  Users,
} from '../components/Icon';
import { TournamentProvider, useTournament } from '../context/TournamentContext';
import { Navbar } from '../components/Navbar';
import { BottomNav, NavTab } from '../components/BottomNav';
import { DashboardView } from '../components/DashboardView';
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
import { signIn, signUp, simulatePayPalCheckout } from '../services/authApi';

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
  { id: 'football', name: 'Futbol', text: 'Jornadas, marcadores, rankings y finales.', tournaments: 13, activeEvents: 64, accent: '#EA7301', image: ASSET_PATHS.images.sports.football },
  { id: 'tennis', name: 'Tenis', text: 'Rondas, sets y prestigio por torneo.', tournaments: 7, activeEvents: 18, accent: '#46D369', image: ASSET_PATHS.images.sports.tennis },
  { id: 'basketball', name: 'Baloncesto', text: 'NBA con ganador, marcador y diferencia.', tournaments: 1, activeEvents: 14, accent: '#F97316', image: ASSET_PATHS.images.sports.basketball },
  { id: 'baseball', name: 'Beisbol', text: 'MLB con carreras y ganador por juego.', tournaments: 1, activeEvents: 12, accent: '#38BDF8', image: ASSET_PATHS.images.sports.baseball },
  { id: 'american-football', name: 'Futbol Americano', text: 'NFL con picks por semana y playoffs.', tournaments: 1, activeEvents: 16, accent: '#A78BFA', image: ASSET_PATHS.images.sports.americanFootball },
  { id: 'f1', name: 'F1', text: 'Grandes premios, pole, podio y campeonatos.', tournaments: 3, activeEvents: 24, accent: '#EF4444', image: ASSET_PATHS.images.sports.americanFootball },
  { id: 'cycling', name: 'Ciclismo', text: 'Grand Tours, etapas, maillots y clasificaciones.', tournaments: 4, activeEvents: 21, accent: '#22C55E', image: ASSET_PATHS.images.sports.tennis },
  { id: 'golf', name: 'Golf', text: 'Majors, rondas, liderato y match play.', tournaments: 3, activeEvents: 12, accent: '#16A34A', image: ASSET_PATHS.images.sports.football },
  { id: 'mma', name: 'UFC / MMA', text: 'Ganador, metodo y round por cartelera.', tournaments: 1, activeEvents: 9, accent: '#EF4444', image: ASSET_PATHS.images.sports.mma },
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
};

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
    events: ['Gran Premio de Bahrain', 'Gran Premio de Monaco', 'Gran Premio de Brasil'],
    tournaments: [
      { name: 'F1 World Championship', season: '2027', status: 'Activo', price: '$12.99' },
      { name: 'F1 Sprint Series', season: '2027', status: 'Preparacion', price: '$8.99' },
      { name: 'F1 Constructors Cup', season: '2027', status: 'Premium', price: '$9.99' },
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

const tournamentDetails: Record<string, {
  overview: string;
  teams: string[];
  format: string;
  predictionRules: string[];
  coverage: string[];
}> = {
  'cr-apertura-2026': {
    overview: 'Torneo base de la quiniela nacional con clubes de Primera Division de Costa Rica, jornadas activas, ranking y comunidad local.',
    teams: ['Saprissa', 'Alajuelense', 'Herediano', 'Cartagines', 'Sporting FC', 'Puntarenas FC', 'Perez Zeledon', 'San Carlos', 'Guanacasteca', 'Liberia'],
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
    overview: 'Temporada completa de Formula 1 con predicciones por gran premio y tabla de pilotos.',
    teams: ['Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'RB', 'Sauber', 'Haas'],
    format: 'F1 2027 - calendario mundial de grandes premios.',
    predictionRules: ['Pole position', 'Ganador', 'Podio', 'Vuelta rapida'],
    coverage: ['Clasificacion', 'Carrera', 'Pilotos', 'Constructores'],
  },
  'f1-sprint-series': {
    overview: 'Formato sprint de F1 con puntos cortos, pole sprint y ganador de fin de semana.',
    teams: ['Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'RB', 'Sauber', 'Haas'],
    format: 'Sprint Series 2027 - fines de semana seleccionados.',
    predictionRules: ['Sprint winner', 'Pole sprint', 'Top 3', 'Ganador GP'],
    coverage: ['Sprint', 'Qualy', 'Carrera', 'Puntos extra'],
  },
  'f1-constructors-cup': {
    overview: 'Competencia premium centrada en puntos por escuderia y campeonato de constructores.',
    teams: ['Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'RB', 'Sauber', 'Haas'],
    format: 'Constructors Cup 2027 - acumulado por escuderia.',
    predictionRules: ['Equipo ganador', 'Doble podio', 'Puntos por carrera', 'Campeon constructores'],
    coverage: ['Escuderias', 'Pilotos', 'Puntos', 'Campeonato'],
  },
  'tour-de-france': {
    overview: 'Grand Tour frances con predicciones por etapa, general, montana y puntos.',
    teams: ['UAE Team Emirates', 'Visma Lease a Bike', 'Soudal Quick-Step', 'INEOS Grenadiers', 'Bora Hansgrohe', 'Lidl-Trek', 'Alpecin-Deceuninck', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ'],
    format: 'Tour de France 2027 - 21 etapas.',
    predictionRules: ['Ganador de etapa', 'Maillot amarillo', 'Montana', 'Puntos'],
    coverage: ['Etapas llanas', 'Montana', 'Contrarreloj', 'Clasificacion general'],
  },
  'giro-d-italia': {
    overview: 'Grand Tour italiano con clasificacion general, sprints y etapas de montana.',
    teams: ['UAE Team Emirates', 'Visma Lease a Bike', 'Soudal Quick-Step', 'INEOS Grenadiers', 'Bora Hansgrohe', 'Lidl-Trek', 'Alpecin-Deceuninck', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ'],
    format: 'Giro d Italia 2027 - 21 etapas.',
    predictionRules: ['Ganador de etapa', 'Maglia rosa', 'Montana', 'Joven destacado'],
    coverage: ['Etapas', 'General', 'Montana', 'Sprint'],
  },
  'la-vuelta': {
    overview: 'Grand Tour espanol con finales en alto, general y etapas explosivas.',
    teams: ['UAE Team Emirates', 'Visma Lease a Bike', 'Soudal Quick-Step', 'INEOS Grenadiers', 'Bora Hansgrohe', 'Lidl-Trek', 'Alpecin-Deceuninck', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ'],
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
        showPublicLogin={location.pathname === '/'}
        showUserProfile={location.pathname !== '/login'}
        showSimulator={isLoggedIn && !isAdmin && location.pathname.includes('/tournaments/cr-apertura-2026')}
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

      <main className={isKasPublic ? 'flex-1 w-full' : 'flex-1 w-full max-w-4xl mx-auto pt-3 px-2 sm:px-4'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<KasLoginPage onSuccess={() => navigate('/dashboard')} />} />
          <Route path="/register" element={<KasLoginPage onSuccess={() => navigate('/dashboard')} isRegisterDefault />} />
          <Route path="/dashboard" element={isLoggedIn ? <SportsDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/sports" element={isLoggedIn ? <SportsDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/sports/football" element={isLoggedIn ? <FootballDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/sports/:sportId" element={isLoggedIn ? <SportPlaceholder /> : <Navigate to="/login" replace />} />
          <Route path="/tournaments/:tournamentId/membership" element={<TournamentMembershipLogin />} />
          <Route path="/tournaments/:tournamentId" element={<TournamentDashboard />} />
          <Route path="/tournaments/cr-apertura-2026/login" element={<LoginPage onSuccess={() => navigate('/tournaments/cr-apertura-2026/predictions')} onFavoriteTeamPreview={setPreviewTeamId} />} />
          <Route path="/tournaments/:tournamentId/predictions" element={<CostaRicaOnly><DashboardView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} onOpenAdmin={() => setAdminModalOpen(true)} /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/ranking" element={<CostaRicaOnly><RankingView /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/playoffs" element={<CostaRicaOnly><PlayoffsView onOpenScorerModal={(id) => setActiveScorerMatchId(id)} /></CostaRicaOnly>} />
          <Route path="/tournaments/:tournamentId/forum" element={<CostaRicaOnly><SocialView /></CostaRicaOnly>} />
          <Route path="/profile" element={<ProfileView onOpenLogin={() => navigate('/login')} />} />
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
        status: event.score ? `Marcador ${event.score}` : event.status,
        provider: event.provider,
        href: event.sourceUrl,
        path: '/login',
      }))
    : homeFallbackEvents.map((event) => ({
        ...event,
        provider: 'KAS',
        href: undefined,
      }));
  const liveTickerItems = [
    ...scoreboard.map((match) => {
      const home = getTeamById(match.homeTeamId);
      const away = getTeamById(match.awayTeamId);
      return {
        id: match.id,
        label: `J${match.round}`,
        status: match.status === 'live' ? `${match.minute}'` : 'Final',
        title: `${home.code} @ ${away.code}`,
        score: `${match.homeScore ?? 0} - ${match.awayScore ?? 0}`,
        path: '/tournaments/cr-apertura-2026/predictions',
        localHome: home,
        localAway: away,
      };
    }),
    ...homeEvents.slice(0, 10).map((event) => ({
      id: event.id,
      label: event.league,
      status: event.score ? 'Marcador' : event.status,
      title: event.title,
      score: event.score || (event.startsAt ? new Date(event.startsAt).toLocaleDateString() : ''),
      path: event.sourceUrl || '/login',
    })),
  ];
  const tickerItems = liveTickerItems.length > 0 ? liveTickerItems : homeFallbackEvents.map((event) => ({
    id: event.id,
    label: event.league,
    status: event.status,
    title: event.title,
    score: '',
    path: event.path,
  }));
  const animatedTickerItems = [...tickerItems, ...tickerItems];

  useEffect(() => {
    const controller = new AbortController();
    setHomeEventsStatus('loading');

    Promise.all([
      getSportEvents('football', controller.signal),
      getSportEvents('basketball', controller.signal),
      getSportEvents('baseball', controller.signal),
      getSportEvents('american-football', controller.signal),
    ]).then((results) => {
      if (controller.signal.aborted) return;
      const events = results.flatMap((result) => result.data.slice(0, 2)).slice(0, 6);
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
                      className="min-w-[184px] rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:border-[#EA7301]/70 transition-colors"
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
                            <span className="text-[#d5c0d7]">@</span>
                            <span className="flex min-w-0 items-center gap-1.5 truncate"><TeamBadge team={item.localAway} size="xs" />{item.localAway.code}</span>
                          </>
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
                      <Link key={match.id} to="/tournaments/cr-apertura-2026/predictions" className="block rounded-lg bg-black/25 px-3 py-2 hover:bg-black/40">
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
                              <span className="text-xs text-[#d5c0d7]">@</span>
                              <TeamBadge team={matchup.away} size="xs" />
                              <span className="truncate">{matchup.away.code}</span>
                            </h3>
                          ) : (
                            <h3 className="mt-1 flex min-w-0 items-center gap-2 font-heading text-lg font-black leading-tight text-white">
                              <MatchupLogoRow title={event.title} size="xs" />
                              <span className="truncate">{event.title}</span>
                            </h3>
                          )}
                        </div>
                        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-mono text-white/65">{event.provider}</span>
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

function KasLoginPage({ onSuccess, isRegisterDefault = false }: { onSuccess: () => void; isRegisterDefault?: boolean }) {
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
      onSuccess();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo iniciar sesion.');
    } finally {
      setIsSubmitting(false);
    }
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
                        <span className="text-sm text-[#d5c0d7]">@</span>
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
                  {event.score && <span className="text-white">Marcador {event.score}</span>}
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

function MatchupLogoRow({ title, size = 'sm' }: { title: string; size?: 'xs' | 'sm' | 'md' }) {
  const matchup = splitMatchupTitle(title);

  if (!matchup) return null;

  return (
    <span className="flex shrink-0 items-center -space-x-1">
      <UniversalTeamLogo name={matchup.home} size={size} className="rounded-full bg-black/30" />
      <UniversalTeamLogo name={matchup.away} size={size} className="rounded-full bg-black/30" />
    </span>
  );
}

function MatchupTitleWithLogos({ title, size = 'sm' }: { title: string; size?: 'xs' | 'sm' | 'md' }) {
  const matchup = splitMatchupTitle(title);

  if (!matchup) return <span className="truncate">{title}</span>;

  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex min-w-0 items-center gap-1.5">
        <UniversalTeamLogo name={matchup.home} size={size} />
        <span className="truncate">{matchup.home}</span>
      </span>
      <span className="text-sm text-[#d5c0d7]">@</span>
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
  if (tournamentId === 'cr-apertura-2026') return <Navigate to="/tournaments/cr-apertura-2026/login" replace />;

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
              <Link to="/login" className="block w-full rounded-xl bg-[#EA7301] py-3.5 text-center font-heading font-black uppercase tracking-wide text-black hover:bg-orange-400">
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

function TournamentDashboard() {
  const { tournamentId } = useParams();
  const tournament = tournamentId ? findTournamentSummary(tournamentId) : undefined;
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
  const primaryPath = isCostaRica ? '/tournaments/cr-apertura-2026/predictions' : getTournamentAccessPath(tournament.id);
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

  return (
    <div className="space-y-6 pb-24 px-4 pt-4 max-w-6xl mx-auto">
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
                <div key={team} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                  <div className="flex items-center gap-3">
                    {localTeam ? <TeamBadge team={localTeam} size="sm" /> : <UniversalTeamLogo name={team} size="sm" />}
                    <div className="min-w-0">
                      <p className="truncate font-heading text-lg font-black text-white">{localTeam?.shortName || team}</p>
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
            {isCostaRica ? 'Entrar a quiniela' : 'Gestionar membresia'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#3c313e] bg-[#19101c] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-mono text-[#EA7301]">EVENTOS DEL TORNEO</p>
              <h2 className="text-3xl font-heading font-black text-white">Actividad destacada</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-mono ${tournamentApiStatus === 'ready' ? 'bg-emerald-400/15 text-emerald-300' : tournamentApiStatus === 'loading' ? 'bg-[#EA7301]/15 text-[#EA7301]' : 'bg-amber-400/15 text-amber-200'}`}>
              {tournamentApiStatus === 'ready' ? tournamentProvider === 'openligadb' ? 'OpenLigaDB' : 'Football-Data' : tournamentApiStatus === 'loading' ? 'Cargando' : 'Fallback'}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {tournamentApiStatus === 'loading' && [1, 2, 3].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-xl border border-white/10 bg-black/25" />
            ))}

            {tournamentApiStatus !== 'loading' && liveTournamentEvents.map((event) => (
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
                  {event.score && <span className="text-white">Marcador {event.score}</span>}
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
          <p className="text-xs font-mono text-[#EA7301]">PROXIMOS EVENTOS</p>
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







