# Baloncesto - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NBA 2026/27  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nba/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NBA free endpoints), TheSportsDB v1, NBA Stats API

---

## 1. NBA â€” 30 Equipos (Conferencia Este / Oeste)

### Ejemplo BallDontLie (Free Tier)
```bash
# Equipos
curl -H "Authorization: Bearer YOUR_KEY" https://nba.balldontlie.io/api/v1/teams

# Partidos de una fecha
curl -H "Authorization: Bearer YOUR_KEY" "https://nba.balldontlie.io/api/v1/games?dates[]=2026-10-22"

# Jugadores de un equipo
curl -H "Authorization: Bearer YOUR_KEY" "https://nba.balldontlie.io/api/v1/players?team_ids[]=14"  # 14 = Lakers
```

---

## 4. Mapeo de Aliases para NormalizaciÃ³n (teamLogos.ts)

```typescript
// Agregar a src/data/teamLogos.ts - secciÃ³n NBA
const nbaAliases: Record<string, string[]> = {
  // Este - AtlÃ¡ntico
  'Boston Celtics': ['Celtics', "C's", 'Green Team', 'Bos'],
  'Brooklyn Nets': ['Nets', 'BK Nets', 'Brooklyn'],
  'New York Knicks': ['Knicks', 'NYK', 'Knickerbockers', 'NY'],
  'Philadelphia 76ers': ['Sixers', '76ers', 'Philly', 'Phi'],
  'Toronto Raptors': ['Raptors', 'Raps', 'North', 'Tor'],
  
  // Este - Central
  'Chicago Bulls': ['Bulls', 'Chi-Town', 'Chi'],
  'Cleveland Cavaliers': ['Cavs', 'Cavaliers', 'Wine & Gold', 'Cle'],
  'Detroit Pistons': ['Pistons', 'Motor City', 'Det'],
  'Indiana Pacers': ['Pacers', 'Indy', 'Ind'],
  'Milwaukee Bucks': ['Bucks', 'Fear the Deer', 'Mil', 'MIL'],
  
  // Este - Sureste
  'Atlanta Hawks': ['Hawks', 'ATL', 'Atl'],
  'Charlotte Hornets': ['Hornets', 'Buzz City', 'Cha'],
  'Miami Heat': ['Heat', 'Heat Culture', '305', 'Mia'],
  'Orlando Magic': ['Magic', 'ORL', 'Orl'],
  'Washington Wizards': ['Wizards', 'Wiz', 'DC', 'Wsh'],
  
  // Oeste - Noroeste
  'Denver Nuggets': ['Nuggets', 'Mile High', 'Den'],
  'Minnesota Timberwolves': ['Wolves', 'T-Wolves', 'Timberwolves', 'Min'],
  'Oklahoma City Thunder': ['Thunder', 'OKC', 'Okc'],
  'Portland Trail Blazers': ['Blazers', 'Rip City', 'Por', 'Trail Blazers'],
  'Utah Jazz': ['Jazz', 'UTA', 'Utah'],
  
  // Oeste - PacÃ­fico
  'Golden State Warriors': ['Warriors', 'Dubs', 'GSW', 'Golden State', 'GS'],
  'LA Clippers': ['Clippers', 'LAC', 'Clipper Nation', 'LA Clippers'],
  'Los Angeles Lakers': ['Lakers', 'LAL', 'Purple & Gold', 'Showtime', 'LA'],
  'Phoenix Suns': ['Suns', 'Valley', 'PHX', 'Phx', 'The Valley'],
  'Sacramento Kings': ['Kings', 'Sactown', 'SAC', 'Sac', 'Kings'],
  
  // Oeste - Suroeste
  'Dallas Mavericks': ['Mavs', 'MFFL', 'Dallas', 'Dal'],
  'Houston Rockets': ['Rockets', 'H-Town', 'Hou', 'Clutch City'],
  'Memphis Grizzlies': ['Grizzlies', 'Grind City', 'Mem', 'Grizz'],
  'New Orleans Pelicans': ['Pelicans', 'NOLA', 'Pels', 'Pelicans', 'NO'],
  'San Antonio Spurs': ['Spurs', 'Go Spurs Go', 'SA', 'San Antonio', 'Silver & Black'],
};
```

---

## 5. Estructura de Datos para KAS (types.ts extension)

```typescript
// En src/types.ts - agregar para NBA
export interface NBATeam extends Team {
  conference: 'East' | 'West';
  division: 'Atlantic' | 'Central' | 'Southeast' | 'Northwest' | 'Pacific' | 'Southwest';
  arena: string;
  arenaCapacity: number;
  championships: number;
  retiredNumbers: number[];
  mascot?: string;
}

export interface NBAGame extends Match {
  // Hereda de Match
  quarterScores?: {
    home: number[];
    away: number[];
  };
  overtime?: number;
  seriesInfo?: {
    gameNumber: number;
    seriesLeader: 'home' | 'away' | 'tied';
    homeWins: number;
    awayWins: number;
  };
}

export interface NBAPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  height: string; // "6'7\""
  weight: number; // lbs
  teamId: string;
  jerseyNumber: number;
  college?: string;
  country: string;
  draftYear?: number;
  draftRound?: number;
  draftPick?: number;
}
```

---

## 6. ConfiguraciÃ³n de Quiniela NBA (predicciones)

