type LogoEntry = {
  name: string;
  logoUrl: string;
  aliases?: string[];
};

const logoEntries: LogoEntry[] = [
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
  { name: 'Eintracht Frankfurt', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/125.png' },
  { name: 'RB Leipzig', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/11420.png' },
  { name: 'SC Freiburg', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/126.png', aliases: ['Freiburg'] },
  { name: 'VfB Stuttgart', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/134.png', aliases: ['Stuttgart'] },
  { name: 'Athletic Club', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/93.png' },
  { name: 'Atletico Madrid', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png', aliases: ['Atletico', 'Atlético Madrid'] },
  { name: 'Barcelona', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png' },
  { name: 'Real Betis', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/244.png' },
  { name: 'Real Madrid', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png' },
  { name: 'Real Sociedad', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/89.png' },
  { name: 'Sevilla', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png' },
  { name: 'Valencia', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/94.png' },
  { name: 'Villarreal', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/102.png' },
  { name: 'Arsenal', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png' },
  { name: 'Aston Villa', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png' },
  { name: 'Chelsea', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png' },
  { name: 'Liverpool', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png' },
  { name: 'Manchester City', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png' },
  { name: 'Manchester United', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png' },
  { name: 'Newcastle United', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png', aliases: ['Newcastle'] },
  { name: 'Tottenham Hotspur', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png', aliases: ['Tottenham'] },
  { name: 'Benfica', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1929.png' },
  { name: 'Braga', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2994.png' },
  { name: 'Casa Pia', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/21581.png' },
  { name: 'FC Famalicao', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/12698.png', aliases: ['Famalicao', 'Famalicão'] },
  { name: 'FC Porto', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/437.png', aliases: ['Porto'] },
  { name: 'Sporting CP', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2250.png' },
  { name: 'Vitória de Guimaraes', logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/5309.png', aliases: ['Vitoria SC', 'Vitória SC'] },
  { name: 'Atlanta Hawks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png' },
  { name: 'Boston Celtics', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png' },
  { name: 'Brooklyn Nets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png' },
  { name: 'Chicago Bulls', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png' },
  { name: 'Dallas Mavericks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png' },
  { name: 'Denver Nuggets', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png' },
  { name: 'Golden State Warriors', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png' },
  { name: 'Los Angeles Lakers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png' },
  { name: 'Miami Heat', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png' },
  { name: 'Milwaukee Bucks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png' },
  { name: 'Phoenix Suns', logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png' },
  { name: 'Arizona Diamondbacks', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png' },
  { name: 'Atlanta Braves', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png' },
  { name: 'Boston Red Sox', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png' },
  { name: 'Chicago Cubs', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/chc.png' },
  { name: 'Houston Astros', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png' },
  { name: 'Los Angeles Dodgers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png' },
  { name: 'New York Yankees', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png' },
  { name: 'San Diego Padres', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/sd.png' },
  { name: 'Texas Rangers', logoUrl: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png' },
  { name: 'Buffalo Bills', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png' },
  { name: 'Dallas Cowboys', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png' },
  { name: 'Kansas City Chiefs', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png' },
  { name: 'Philadelphia Eagles', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png' },
  { name: 'San Francisco 49ers', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png' },
  { name: 'Seattle Seahawks', logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png' },
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
