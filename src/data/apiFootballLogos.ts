type ApiFootballLogoEntry = {
  id: number;
  name: string;
  logoUrl?: string;
  aliases?: string[];
};

const apiFootballTeamLogo = (id: number) =>
  `https://media.api-sports.io/football/teams/${id}.png`;

const apiFootballLeagueLogo = (id: number) =>
  `https://media.api-sports.io/football/leagues/${id}.png`;

export const API_FOOTBALL_TEAM_LOGOS = [
  { id: 541, name: 'Real Madrid', aliases: ['Real Madrid CF'] },
  { id: 529, name: 'Barcelona', aliases: ['FC Barcelona', 'Barca'] },
  { id: 50, name: 'Manchester City', aliases: ['Man City'] },
  { id: 40, name: 'Liverpool' },
  { id: 42, name: 'Arsenal' },
  { id: 33, name: 'Manchester United', aliases: ['Man United'] },
  { id: 49, name: 'Chelsea' },
  { id: 47, name: 'Tottenham Hotspur', aliases: ['Tottenham', 'Spurs'] },
  { id: 157, name: 'Bayern Munich', aliases: ['Bayern Munchen', 'FC Bayern'] },
  { id: 165, name: 'Borussia Dortmund', aliases: ['Dortmund', 'BVB'] },
  { id: 489, name: 'AC Milan', aliases: ['Milan'] },
  { id: 505, name: 'Internazionale', aliases: ['Inter', 'Inter Milan'] },
  { id: 496, name: 'Juventus' },
  { id: 492, name: 'Napoli' },
  { id: 85, name: 'Paris Saint-Germain', aliases: ['PSG', 'Paris SG'] },
  { id: 211, name: 'Benfica', aliases: ['SL Benfica'] },
  { id: 212, name: 'FC Porto', aliases: ['Porto'] },
  { id: 228, name: 'Sporting CP', aliases: ['Sporting Lisbon'] },
  { id: 9, name: 'Espana', aliases: ['España', 'Spain', 'Seleccion de Espana', 'Selección de España'] },
  { id: 2, name: 'Francia', aliases: ['France', 'Seleccion de Francia', 'Selección de Francia'] },
  { id: 27, name: 'Portugal', aliases: ['Seleccion de Portugal', 'Selección de Portugal'] },
  { id: 25, name: 'Alemania', aliases: ['Germany', 'Deutschland', 'Seleccion de Alemania', 'Selección de Alemania'] },
  { id: 768, name: 'Italia', aliases: ['Italy', 'Seleccion de Italia', 'Selección de Italia'] },
  { id: 1118, name: 'Paises Bajos', aliases: ['Países Bajos', 'Netherlands', 'Holanda'] },
  { id: 10, name: 'Inglaterra', aliases: ['England', 'Seleccion de Inglaterra', 'Selección de Inglaterra'] },
  { id: 3, name: 'Croacia', aliases: ['Croatia'] },
  { id: 1, name: 'Belgica', aliases: ['Bélgica', 'Belgium'] },
  { id: 21, name: 'Dinamarca', aliases: ['Denmark'] },
  { id: 15, name: 'Suiza', aliases: ['Switzerland'] },
  { id: 775, name: 'Austria' },
  { id: 24, name: 'Polonia', aliases: ['Poland'] },
  { id: 14, name: 'Serbia' },
  { id: 0, name: 'Costa Rica', logoUrl: '/assets/logos/national-teams/costa-rica.svg', aliases: ['Seleccion de Costa Rica', 'Selección de Costa Rica', 'CRC'] },
  { id: 0, name: 'Mexico', logoUrl: '/assets/logos/national-teams/mexico.svg', aliases: ['México', 'Seleccion de Mexico', 'Selección de México'] },
  { id: 0, name: 'Estados Unidos', logoUrl: '/assets/logos/national-teams/estados-unidos.svg', aliases: ['United States', 'USA', 'USMNT'] },
  { id: 0, name: 'Canada', logoUrl: '/assets/logos/national-teams/canada.svg', aliases: ['Canadá'] },
  { id: 0, name: 'Panama', logoUrl: '/assets/logos/national-teams/panama.svg', aliases: ['Panamá'] },
  { id: 0, name: 'Honduras', logoUrl: '/assets/logos/national-teams/honduras.svg' },
  { id: 0, name: 'Jamaica', logoUrl: '/assets/logos/national-teams/jamaica.svg' },
  { id: 0, name: 'Guatemala', logoUrl: '/assets/logos/national-teams/guatemala.svg' },
  { id: 0, name: 'El Salvador', logoUrl: '/assets/logos/national-teams/el-salvador.svg' },
  { id: 0, name: 'Trinidad y Tobago', logoUrl: '/assets/logos/national-teams/trinidad-y-tobago.svg', aliases: ['Trinidad and Tobago'] },
  { id: 0, name: 'Haiti', logoUrl: '/assets/logos/national-teams/haiti.svg', aliases: ['Haití'] },
  { id: 0, name: 'Curazao', logoUrl: '/assets/logos/national-teams/curazao.svg', aliases: ['Curaçao', 'Curacao'] },
] satisfies ApiFootballLogoEntry[];

export const API_FOOTBALL_LEAGUE_LOGOS = {
  costaRicaPrimeraDivision: '/assets/logos/leagues/costa-rica-primera-division.png',
  championsLeague: apiFootballLeagueLogo(2),
  europaLeague: apiFootballLeagueLogo(3),
  nationsLeague: apiFootballLeagueLogo(5),
  concacafNationsLeague: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Concacaf_Nations_League_logo.svg',
  premierLeague: apiFootballLeagueLogo(39),
  laliga: apiFootballLeagueLogo(140),
  serieA: apiFootballLeagueLogo(135),
  bundesliga: apiFootballLeagueLogo(78),
  ligue1: apiFootballLeagueLogo(61),
  primeiraLiga: apiFootballLeagueLogo(94),
} as const;

export const apiFootballLogoEntries = API_FOOTBALL_TEAM_LOGOS.map((entry) => ({
  name: entry.name,
  logoUrl: entry.logoUrl || apiFootballTeamLogo(entry.id),
  aliases: entry.aliases,
}));
