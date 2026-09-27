type LogoEntry = {
  name: string;
  logoUrl: string;
  aliases?: string[];
};

const kasBadgeLogo = (label: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="#111111"/>
      <circle cx="60" cy="60" r="47" fill="${color}" opacity="0.18"/>
      <circle cx="60" cy="60" r="43" fill="none" stroke="${color}" stroke-width="6"/>
      <text x="60" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff">${label}</text>
    </svg>
  `)}`;

const entityBadgeLogo = (name: string, color = '#EA7301') => {
  const label = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 4)
    .toUpperCase();

  return kasBadgeLogo(label || name.slice(0, 3).toUpperCase(), color);
};

const f1TeamLogos: LogoEntry[] = [
  { name: 'Red Bull Racing', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/redbullracing/2025redbullracinglogowhite.webp', aliases: ['Red Bull'] },
  { name: 'Ferrari', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/ferrari/2025ferrarilogolight.webp', aliases: ['Scuderia Ferrari'] },
  { name: 'Mercedes', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/mercedes/2025mercedeslogowhite.webp', aliases: ['Mercedes-AMG'] },
  { name: 'McLaren', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/mclaren/2025mclarenlogowhite.webp' },
  { name: 'Aston Martin', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/astonmartin/2025astonmartinlogowhite.webp' },
  { name: 'Alpine', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/alpine/2025alpinelogowhite.webp' },
  { name: 'Williams', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/williams/2025williamslogowhite.webp' },
  { name: 'Racing Bulls', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/racingbulls/2025racingbullslogowhite.webp', aliases: ['RB'] },
  { name: 'Audi', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2026/audi/2026audilogowhite.webp', aliases: ['Sauber'] },
  { name: 'Haas F1 Team', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2025/haas/2025haaslogowhite.webp', aliases: ['Haas'] },
  { name: 'Cadillac', logoUrl: 'https://media.formula1.com/image/upload/c_fit%2Ch_64/q_auto/v1740000001/common/f1/2026/cadillac/2026cadillaclogowhite.webp' },
];

const cyclingTeamLogos: LogoEntry[] = [
  { name: 'UAE Team Emirates-XRG', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/Br13mQAe2bAGOJM74TNm_010226-114202.png?v=20260201114202', aliases: ['UAE Team Emirates'] },
  { name: 'Team Visma-Lease a Bike', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2026/05/WdIWiiUROUQwbjt6xbUB_070526-015633.png?v=20260507135633', aliases: ['Visma Lease a Bike'] },
  { name: 'Soudal Quick-Step', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/tuaiS5vUPToBBMb2TMJS_010526-103232.png?v=20260501103232' },
  { name: 'Netcompany INEOS Cycling Team', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2026/05/tc8nsVjopJPZxNVN53J9_070526-043213.png?v=20260507163214', aliases: ['INEOS Grenadiers'] },
  { name: 'Red Bull-BORA-hansgrohe', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2026/05/THge03Zv7d8UGWgsSZal_070526-015438.png?v=20260507135438', aliases: ['Bora Hansgrohe'] },
  { name: 'Lidl-Trek', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/p5eDSBqpSwRdyoEqf6qO_010226-112259.png?v=20260201112259' },
  { name: 'Alpecin-Premier Tech', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/hdUPyRCqIUYvQG8PCWxO_010226-111813.png?v=20260201111813', aliases: ['Alpecin-Deceuninck'] },
  { name: 'Movistar Team', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/6WnyZezJoaEEiRloNDg1_010226-113223.png?v=20260201113223' },
  { name: 'EF Education-EasyPost', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/jA8ivHjkkQ1Y1IgeAbk7_070526-085228.png?v=20260507085228' },
  { name: 'Groupama-FDJ United', logoUrl: 'https://static2.giroditalia.it/wp-content/uploads/2020/01/oZJXaVRIVw1br3HVacoI_010226-112130.png?v=20260201112130', aliases: ['Groupama-FDJ'] },
];

const generatedLogoEntries: LogoEntry[] = [
  'Alemania', 'Argentina', 'Australia', 'Austria', 'Belgica', 'Bolivia', 'Brasil', 'Canada', 'Chile', 'Colombia',
  'Costa Rica', 'Croacia', 'Curazao', 'Dinamarca', 'Ecuador', 'El Salvador', 'Escocia', 'Eslovenia', 'Espana',
  'Estados Unidos', 'Francia', 'Gales', 'Guatemala', 'Haiti', 'Honduras', 'Hungria', 'Inglaterra', 'Italia',
  'Jamaica', 'Martinica', 'Mexico', 'Nicaragua', 'Noruega', 'Paises Bajos', 'Panama', 'Paraguay', 'Peru',
  'Polonia', 'Portugal', 'Qatar', 'Reino Unido', 'Republica Checa', 'Rumania', 'Serbia', 'Suecia', 'Suiza',
  'Surinam', 'Trinidad y Tobago', 'Turquia', 'Ucrania', 'Uruguay', 'Venezuela',
].map((name) => ({ name, logoUrl: entityBadgeLogo(name, '#2563eb') }));

generatedLogoEntries.push(
  ...[
    'Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'RB', 'Sauber', 'Haas',
  ].map((name) => ({ name, logoUrl: entityBadgeLogo(name, '#ef4444') })),
  ...[
    'UAE Team Emirates', 'Visma Lease a Bike', 'Soudal Quick-Step', 'INEOS Grenadiers', 'Bora Hansgrohe',
    'Lidl-Trek', 'Alpecin-Deceuninck', 'Movistar Team', 'EF Education-EasyPost', 'Groupama-FDJ',
  ].map((name) => ({ name, logoUrl: entityBadgeLogo(name, '#22c55e') })),
  ...[
    'Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Collin Morikawa', 'Viktor Hovland',
    'Ludvig Aberg', 'Tommy Fleetwood', 'Hideki Matsuyama', 'Jordan Spieth', 'Team USA', 'Team Europe',
  ].map((name) => ({ name, logoUrl: entityBadgeLogo(name, '#16a34a') }))
);

export const LEAGUE_LOGOS: Record<string, string> = {
  'serie-a': 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png',
  bundesliga: 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png',
  laliga: 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png',
  'premier-league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png',
  'ligue-1': kasBadgeLogo('L1', '#1d4ed8'),
  'primeira-liga': 'https://a.espncdn.com/i/leaguelogos/soccer/500/14.png',
  'liga-portugal': 'https://a.espncdn.com/i/leaguelogos/soccer/500/14.png',
  'nba-temporada-regular': 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png',
  'nba-playoffs': 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png',
  'nba-finals': 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png',
  'mlb-temporada-regular': 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png',
  'mlb-postseason': 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png',
  'world-series': 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png',
  'nfl-temporada-regular': 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png',
  'nfl-playoffs': 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png',
  'super-bowl': 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png',
  'nations-league': kasBadgeLogo('UNL', '#2563eb'),
  'concacaf-nations-league': kasBadgeLogo('CNL', '#0ea5e9'),
  'copa-oro': kasBadgeLogo('ORO', '#facc15'),
  'copa-america': kasBadgeLogo('CA', '#22c55e'),
  eurocopa: kasBadgeLogo('EURO', '#3b82f6'),
  'f1-world-championship': kasBadgeLogo('F1', '#ef4444'),
  'tour-de-france': 'https://www.letour.fr/img/global/logo@2x.png',
  'giro-d-italia': 'https://components2.rcsobjects.it/rcs_sport_giro2020-layout/v0/assets/img/ext/logo-giro.svg?v=6ed7fe7486dde17350b8838c3f5a9407',
  'la-vuelta': 'https://www.lavuelta.es/img/global/logo-reversed@2x.png',
  'uci-world-championships': 'https://r2.thesportsdb.com/images/media/league/badge/igahc11535183469.png/tiny',
  'pga-tour': 'https://r2.thesportsdb.com/images/media/league/badge/quvqqr1423564787.png/tiny',
  'the-masters': 'https://www.masters.com/assets/images/nav/footer_masters_logo.png',
  'ryder-cup': kasBadgeLogo('RC', '#ef4444'),
};

export function getLeagueLogo(tournamentId: string) {
  return LEAGUE_LOGOS[tournamentId];
}

export const SERIE_A_TEAMS = [
  'AC Milan', 'AS Roma', 'Atalanta', 'Bologna', 'Cagliari', 'Como', 'Fiorentina', 'Frosinone', 'Genoa', 'Internazionale',
  'Juventus', 'Lazio', 'Lecce', 'Monza', 'Napoli', 'Parma', 'Sassuolo', 'Torino', 'Udinese', 'Venezia',
];

export const BUNDESLIGA_TEAMS = [
  '1. FC Union Berlin', 'Bayer Leverkusen', 'Bayern Munich', 'Borussia Dortmund', 'Borussia Monchengladbach', 'Eintracht Frankfurt',
  'FC Augsburg', 'FC Cologne', 'Hamburg SV', 'Mainz', 'RB Leipzig', 'SC Freiburg', 'SC Paderborn 07', 'Schalke 04',
  'SV Elversberg', 'TSG Hoffenheim', 'VfB Stuttgart', 'Werder Bremen',
];

export const LALIGA_TEAMS = [
  'Alaves', 'Athletic Club', 'Atletico Madrid', 'Barcelona', 'Celta Vigo', 'Deportivo', 'Elche', 'Espanyol', 'Getafe', 'Levante',
  'Malaga', 'Osasuna', 'Racing Santander', 'Rayo Vallecano', 'Real Betis', 'Real Madrid', 'Real Sociedad', 'Sevilla', 'Valencia', 'Villarreal',
];

export const PREMIER_LEAGUE_TEAMS = [
  'AFC Bournemouth', 'Arsenal', 'Aston Villa', 'Brentford', 'Brighton & Hove Albion', 'Chelsea', 'Coventry City', 'Crystal Palace',
  'Everton', 'Fulham', 'Hull City', 'Ipswich Town', 'Leeds United', 'Liverpool', 'Manchester City', 'Manchester United',
  'Newcastle United', 'Nottingham Forest', 'Sunderland', 'Tottenham Hotspur',
];

export const PRIMEIRA_LIGA_TEAMS = [
  'Academico de Viseu', 'Alverca', 'Arouca', 'Benfica', 'Braga', 'C.D. Nacional', 'Casa Pia', 'Estoril', 'Estrela',
  'FC Famalicao', 'FC Porto', 'Gil Vicente', 'Maritimo', 'Moreirense', 'Rio Ave', 'Santa Clara', 'Sporting CP', 'Vitoria de Guimaraes',
];

export const LIGUE_1_TEAMS = [
  'Paris Saint-Germain', 'Marseille', 'Lyon', 'Monaco', 'Lille', 'Nice', 'Rennes', 'Lens', 'Strasbourg',
  'Nantes', 'Toulouse', 'Montpellier', 'Brest', 'Reims', 'Auxerre', 'Angers', 'Le Havre', 'Metz',
];

export const NBA_TEAMS = [
  'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks',
  'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers',
  'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans',
  'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers',
  'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards',
];

export const NFL_TEAMS = [
  'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills', 'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals',
  'Cleveland Browns', 'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers', 'Houston Texans', 'Indianapolis Colts',
  'Jacksonville Jaguars', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins',
  'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants', 'New York Jets', 'Philadelphia Eagles',
  'Pittsburgh Steelers', 'San Francisco 49ers', 'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders',
];

export const MLB_TEAMS = [
  'Arizona Diamondbacks', 'Athletics', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox', 'Chicago Cubs', 'Chicago White Sox',
  'Cincinnati Reds', 'Cleveland Guardians', 'Colorado Rockies', 'Detroit Tigers', 'Houston Astros', 'Kansas City Royals',
  'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 'Milwaukee Brewers', 'Minnesota Twins', 'New York Mets',
  'New York Yankees', 'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants', 'Seattle Mariners',
  'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers', 'Toronto Blue Jays', 'Washington Nationals',
];

const logoEntries: LogoEntry[] = [
  ...generatedLogoEntries,
  ...f1TeamLogos,
  ...cyclingTeamLogos,
  { name: 'Australian Open', logoUrl: 'https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH' },
  { name: 'Roland Garros', logoUrl: 'https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg?auto=compress,format', aliases: ['Roland-Garros'] },
  { name: 'Wimbledon', logoUrl: 'https://www.wimbledon.com/_next/static/media/Logo-Wimbledon.2wyelfplbl7j4.svg?dpl=v0_118_1' },
  { name: 'US Open', logoUrl: 'https://www.usopen.org/assets/images/header/usopen-header-logo-white.svg', aliases: ['US Open tenis'] },
  { name: 'ATP Masters', logoUrl: 'https://r2.thesportsdb.com/images/media/league/badge/q7aej51769857150.png/tiny', aliases: ['ATP Tour', 'ATP Masters 1000'] },
  { name: 'WTA Masters', logoUrl: 'https://r2.thesportsdb.com/images/media/league/badge/bddhun1768230678.png/tiny', aliases: ['WTA Tour', 'WTA 1000'] },
  { name: 'PGA Tour', logoUrl: 'https://r2.thesportsdb.com/images/media/league/badge/quvqqr1423564787.png/tiny' },
  { name: 'The Masters', logoUrl: 'https://www.masters.com/assets/images/nav/footer_masters_logo.png' },
  { name: 'Islam Makhachev', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/3332412.png' },
  { name: 'Ilia Topuria', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/4350812.png' },
  { name: 'Alex Pereira', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/4705658.png' },
  { name: 'Tom Aspinall', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/4010976.png' },
  { name: 'Alexander Volkanovski', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/3949584.png' },
  { name: 'Jon Jones', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/2335639.png' },
  { name: 'Valentina Shevchenko', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/2554705.png' },
  { name: 'Zhang Weili', logoUrl: 'https://a.espncdn.com/i/headshots/mma/players/full/4350762.png' },
  { name: 'Bologna', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/107.png' },
  { name: 'Cagliari', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2925.png' },
  { name: 'Como', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2572.png' },
  { name: 'Frosinone', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/4057.png' },
  { name: 'Genoa', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3263.png' },
  { name: 'Lecce', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/113.png' },
  { name: 'Monza', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/4007.png' },
  { name: 'Parma', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/115.png' },
  { name: 'Sassuolo', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3997.png' },
  { name: 'Torino', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/239.png' },
  { name: 'Udinese', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/118.png' },
  { name: 'Venezia', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/17530.png' },
  { name: 'AC Milan', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png', aliases: ['Milan'] },
  { name: 'AS Roma', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/104.png', aliases: ['Roma'] },
  { name: 'Atalanta', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/105.png' },
  { name: 'Fiorentina', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/109.png' },
  { name: 'Internazionale', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/110.png', aliases: ['Inter'] },
  { name: 'Juventus', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/111.png' },
  { name: 'Lazio', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/112.png' },
  { name: 'Napoli', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/114.png' },
  { name: 'Bayer Leverkusen', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/131.png' },
  { name: 'Bayern Munich', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/132.png' },
  { name: 'Borussia Dortmund', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/124.png' },
  { name: '1. FC Union Berlin', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/598.png', aliases: ['Union Berlin'] },
  { name: 'Borussia Monchengladbach', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/268.png', aliases: ['Borussia Mönchengladbach'] },
  { name: 'Eintracht Frankfurt', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/125.png' },
  { name: 'FC Augsburg', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3841.png' },
  { name: 'FC Cologne', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/122.png', aliases: ['Cologne'] },
  { name: 'Hamburg SV', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/127.png' },
  { name: 'Mainz', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2950.png' },
  { name: 'RB Leipzig', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/11420.png' },
  { name: 'SC Freiburg', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/126.png', aliases: ['Freiburg'] },
  { name: 'SC Paderborn 07', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3307.png' },
  { name: 'Schalke 04', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/133.png' },
  { name: 'SV Elversberg', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/10388.png' },
  { name: 'TSG Hoffenheim', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/7911.png' },
  { name: 'VfB Stuttgart', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/134.png', aliases: ['Stuttgart'] },
  { name: 'Werder Bremen', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/137.png' },
  { name: 'Alaves', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/96.png', aliases: ['Alavés'] },
  { name: 'Athletic Club', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/93.png' },
  { name: 'Atletico Madrid', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png', aliases: ['Atletico', 'Atlético Madrid'] },
  { name: 'Barcelona', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png' },
  { name: 'Celta Vigo', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/85.png' },
  { name: 'Deportivo', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/90.png' },
  { name: 'Elche', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3751.png' },
  { name: 'Espanyol', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/88.png' },
  { name: 'Getafe', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2922.png' },
  { name: 'Levante', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1538.png' },
  { name: 'Malaga', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/99.png', aliases: ['Málaga'] },
  { name: 'Osasuna', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/97.png' },
  { name: 'Racing Santander', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/87.png' },
  { name: 'Rayo Vallecano', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/101.png' },
  { name: 'Real Betis', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/244.png' },
  { name: 'Real Madrid', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png' },
  { name: 'Real Sociedad', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/89.png' },
  { name: 'Sevilla', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png' },
  { name: 'Valencia', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/94.png' },
  { name: 'Villarreal', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/102.png' },
  { name: 'Arsenal', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png' },
  { name: 'AFC Bournemouth', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/349.png', aliases: ['Bournemouth'] },
  { name: 'Aston Villa', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png' },
  { name: 'Brentford', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/337.png' },
  { name: 'Brighton & Hove Albion', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/331.png', aliases: ['Brighton'] },
  { name: 'Chelsea', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png' },
  { name: 'Coventry City', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/388.png' },
  { name: 'Crystal Palace', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/384.png' },
  { name: 'Everton', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/368.png' },
  { name: 'Fulham', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/370.png' },
  { name: 'Hull City', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/306.png' },
  { name: 'Ipswich Town', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/373.png' },
  { name: 'Leeds United', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/357.png' },
  { name: 'Liverpool', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png' },
  { name: 'Manchester City', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png' },
  { name: 'Manchester United', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png' },
  { name: 'Newcastle United', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png', aliases: ['Newcastle'] },
  { name: 'Nottingham Forest', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/393.png' },
  { name: 'Sunderland', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/366.png' },
  { name: 'Tottenham Hotspur', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png', aliases: ['Tottenham'] },
  { name: 'Benfica', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1929.png' },
  { name: 'Academico de Viseu', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/21607.png', aliases: ['Académico de Viseu'] },
  { name: 'Alverca', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/21613.png' },
  { name: 'Arouca', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/15784.png' },
  { name: 'Braga', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2994.png' },
  { name: 'C.D. Nacional', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3472.png', aliases: ['Nacional'] },
  { name: 'Casa Pia', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/21581.png' },
  { name: 'Estoril', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/12216.png' },
  { name: 'Estrela', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/21610.png' },
  { name: 'FC Famalicao', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/12698.png', aliases: ['Famalicao', 'Famalicão'] },
  { name: 'FC Porto', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/437.png', aliases: ['Porto'] },
  { name: 'Gil Vicente', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3699.png' },
  { name: 'Maritimo', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/552.png' },
  { name: 'Moreirense', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3696.png' },
  { name: 'Rio Ave', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3822.png' },
  { name: 'Santa Clara', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/12215.png' },
  { name: 'Sporting CP', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2250.png' },
  { name: 'Vitória de Guimaraes', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/5309.png', aliases: ['Vitoria SC', 'Vitória SC'] },
  { name: 'Atlanta Hawks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png', aliases: ['ATL'] },
  { name: 'Boston Celtics', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png', aliases: ['BOS'] },
  { name: 'Brooklyn Nets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png', aliases: ['BKN'] },
  { name: 'Charlotte Hornets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/cha.png', aliases: ['CHA'] },
  { name: 'Chicago Bulls', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png', aliases: ['CHI'] },
  { name: 'Cleveland Cavaliers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png', aliases: ['CLE'] },
  { name: 'Dallas Mavericks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png', aliases: ['DAL'] },
  { name: 'Denver Nuggets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png', aliases: ['DEN'] },
  { name: 'Detroit Pistons', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/det.png', aliases: ['DET'] },
  { name: 'Golden State Warriors', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', aliases: ['GS', 'GSW'] },
  { name: 'Houston Rockets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/hou.png', aliases: ['HOU'] },
  { name: 'Indiana Pacers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png', aliases: ['IND'] },
  { name: 'LA Clippers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png', aliases: ['LAC'] },
  { name: 'Los Angeles Lakers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png', aliases: ['LAL'] },
  { name: 'Miami Heat', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png', aliases: ['MIA'] },
  { name: 'Milwaukee Bucks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png' },
  { name: 'Memphis Grizzlies', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mem.png' },
  { name: 'Minnesota Timberwolves', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/min.png' },
  { name: 'New Orleans Pelicans', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/no.png' },
  { name: 'New York Knicks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png' },
  { name: 'Oklahoma City Thunder', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png' },
  { name: 'Orlando Magic', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/orl.png' },
  { name: 'Philadelphia 76ers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png' },
  { name: 'Phoenix Suns', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png' },
  { name: 'Portland Trail Blazers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/por.png' },
  { name: 'Sacramento Kings', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/sac.png' },
  { name: 'San Antonio Spurs', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/sa.png' },
  { name: 'Toronto Raptors', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/tor.png', aliases: ['TOR'] },
  { name: 'Utah Jazz', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/utah.png' },
  { name: 'Washington Wizards', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/wsh.png', aliases: ['WSH'] },
  { name: 'Arizona Diamondbacks', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png' },
  { name: 'Atlanta Braves', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png' },
  { name: 'Athletics', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/ath.png' },
  { name: 'Baltimore Orioles', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/bal.png' },
  { name: 'Boston Red Sox', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png' },
  { name: 'Chicago Cubs', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/chc.png' },
  { name: 'Chicago White Sox', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/chw.png' },
  { name: 'Cincinnati Reds', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/cin.png' },
  { name: 'Cleveland Guardians', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/cle.png' },
  { name: 'Colorado Rockies', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/col.png' },
  { name: 'Detroit Tigers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/det.png', aliases: ['DET'] },
  { name: 'Houston Astros', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png' },
  { name: 'Kansas City Royals', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/kc.png' },
  { name: 'Los Angeles Angels', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/laa.png' },
  { name: 'Los Angeles Dodgers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png' },
  { name: 'Miami Marlins', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/mia.png' },
  { name: 'Milwaukee Brewers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/mil.png' },
  { name: 'Minnesota Twins', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/min.png' },
  { name: 'New York Mets', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png', aliases: ['NYM'] },
  { name: 'New York Yankees', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png' },
  { name: 'Philadelphia Phillies', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/phi.png' },
  { name: 'Pittsburgh Pirates', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/pit.png', aliases: ['PIT'] },
  { name: 'San Diego Padres', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/sd.png' },
  { name: 'San Francisco Giants', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/sf.png' },
  { name: 'Seattle Mariners', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/sea.png' },
  { name: 'St. Louis Cardinals', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/stl.png' },
  { name: 'Tampa Bay Rays', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/tb.png' },
  { name: 'Texas Rangers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png' },
  { name: 'Toronto Blue Jays', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/tor.png' },
  { name: 'Washington Nationals', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png', aliases: ['WSH'] },
  { name: 'Arizona Cardinals', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png' },
  { name: 'Atlanta Falcons', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png' },
  { name: 'Baltimore Ravens', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png' },
  { name: 'Buffalo Bills', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png', aliases: ['BUF'] },
  { name: 'Carolina Panthers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png' },
  { name: 'Chicago Bears', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png' },
  { name: 'Cincinnati Bengals', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png' },
  { name: 'Cleveland Browns', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png' },
  { name: 'Dallas Cowboys', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png' },
  { name: 'Denver Broncos', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png' },
  { name: 'Detroit Lions', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png' },
  { name: 'Green Bay Packers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png' },
  { name: 'Houston Texans', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png' },
  { name: 'Indianapolis Colts', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png' },
  { name: 'Jacksonville Jaguars', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png' },
  { name: 'Kansas City Chiefs', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png' },
  { name: 'Las Vegas Raiders', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png' },
  { name: 'Los Angeles Chargers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png', aliases: ['LAC'] },
  { name: 'Los Angeles Rams', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png' },
  { name: 'Miami Dolphins', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png' },
  { name: 'Minnesota Vikings', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png' },
  { name: 'New England Patriots', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png' },
  { name: 'New Orleans Saints', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png' },
  { name: 'New York Giants', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png' },
  { name: 'New York Jets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png' },
  { name: 'Philadelphia Eagles', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png' },
  { name: 'Pittsburgh Steelers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png' },
  { name: 'San Francisco 49ers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png' },
  { name: 'Seattle Seahawks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png' },
  { name: 'Tampa Bay Buccaneers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png' },
  { name: 'Tennessee Titans', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png' },
  { name: 'Washington Commanders', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png' },
];

const normalizeTeamName = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const teamLogoMap = new Map<string, LogoEntry>();

logoEntries.forEach((entry) => {
  [entry.name, ...(entry.aliases || [])].forEach((name) => {
    teamLogoMap.set(normalizeTeamName(name), entry);
  });
});

export function getExternalTeamLogo(name: string) {
  return teamLogoMap.get(normalizeTeamName(name));
}

export function splitMatchupTitle(title: string) {
  const normalized = title.replace(/\s+@\s+/g, ' vs ');
  const parts = normalized.split(/\s+vs\s+/i).map((item) => item.trim()).filter(Boolean);
  return parts.length === 2 ? { home: parts[0], away: parts[1] } : null;
}
