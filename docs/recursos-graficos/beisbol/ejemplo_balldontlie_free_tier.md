# BÃ©isbol (MLB) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** MLB 2026 (temporada regular mar/abr - sep/out 2026, playoffs oct 2026, World Series oct/nov 2026)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/mlb/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (MLB free endpoints), TheSportsDB v1, MLB Stats API oficial

---

## 1. MLB â€” 30 Equipos (Liga Americana / Liga Nacional)

### Ejemplo BallDontLie (Free Tier)
```bash
# Equipos
curl -H "Authorization: Bearer YOUR_KEY" https://mlb.balldontlie.io/api/v1/teams

# Partidos de una fecha
curl -H "Authorization: Bearer YOUR_KEY" "https://mlb.balldontlie.io/api/v1/games?dates[]=2026-06-15"
```

---

## 4. Mapeo de Aliases para NormalizaciÃ³n (teamLogos.ts)

```typescript
// Agregar a src/data/teamLogos.ts - secciÃ³n MLB
const mlbAliases: Record<string, string[]> = {
  // AL Este
  'Baltimore Orioles': ['Orioles', 'BAL', "O's", 'Birds', 'Baltimore'],
  'Boston Red Sox': ['Red Sox', 'BOS', 'Sox', 'BoSox', 'Boston'],
  'New York Yankees': ['Yankees', 'NYY', 'Bombers', 'Pinstripes', 'NY Yankees', 'Bronx Bombers'],
  'Tampa Bay Rays': ['Rays', 'TB', 'Rays Up', 'Tampa Bay', 'Devil Rays'],
  'Toronto Blue Jays': ['Blue Jays', 'TOR', 'Jays', 'Toronto', 'Blue Jays'],
  
  // AL Central
  'Chicago White Sox': ['White Sox', 'CHW', 'South Siders', 'Chicago White Sox', 'Pale Hose'],
  'Cleveland Guardians': ['Guardians', 'CLE', 'The Land', 'Cleveland', 'Indians (legacy)'],
  'Detroit Tigers': ['Tigers', 'DET', 'Motor City Kitties', 'Detroit', 'Bengals'],
  'Kansas City Royals': ['Royals', 'KC', 'Boys in Blue', 'Kansas City', 'Royals'],
  'Minnesota Twins': ['Twins', 'MIN', 'Twinkies', 'Minnesota', 'TC'],
  
  // AL Oeste
  'Athletics': ['Athletics', 'ATH', "A's", 'A\'s', 'Green & Gold', 'Oakland A\'s', 'Sacramento A\'s'],
  'Houston Astros': ['Astros', 'HOU', 'Stros', 'Houston', 'Space City'],
  'Los Angeles Angels': ['Angels', 'LAA', 'Halos', 'LA Angels', 'Anaheim Angels'],
  'Seattle Mariners': ['Mariners', 'SEA', "M's", 'Seattle', 'Mariners'],
  'Texas Rangers': ['Rangers', 'TEX', 'Lone Star', 'Texas', 'Rangers'],
  
  // NL Este
  'Atlanta Braves': ['Braves', 'ATL', 'Chop On', 'Atlanta', 'Braves'],
  'Miami Marlins': ['Marlins', 'MIA', 'Fish', 'Miami', 'Marlins'],
  'New York Mets': ['Mets', 'NYM', "Amazin's", 'Amazins', 'NY Mets', 'Metropolitans'],
  'Philadelphia Phillies': ['Phillies', 'PHI', 'Fightins', 'Philly', 'Phils'],
  'Washington Nationals': ['Nationals', 'WSH', 'Nats', 'Washington', 'Nats'],
  
  // NL Central
  'Chicago Cubs': ['Cubs', 'CHC', 'Cubbies', 'North Siders', 'Chicago', 'Lovable Losers'],
  'Cincinnati Reds': ['Reds', 'CIN', 'Redlegs', 'Cincinnati', 'Big Red Machine'],
  'Milwaukee Brewers': ['Brewers', 'MIL', 'Crew', 'Milwaukee', 'Brew Crew'],
  'Pittsburgh Pirates': ['Pirates', 'PIT', 'Bucs', 'Pittsburgh', 'Buccos'],
  'St. Louis Cardinals': ['Cardinals', 'STL', 'Redbirds', 'St. Louis', 'Cards', 'Best Fans'],
  
  // NL Oeste
  'Arizona Diamondbacks': ['Diamondbacks', 'ARI', 'D-backs', 'Dbacks', 'Snakes', 'Arizona'],
  'Colorado Rockies': ['Rockies', 'COL', 'Rox', 'Purple Row', 'Colorado', 'Blake Street Bombers'],
  'Los Angeles Dodgers': ['Dodgers', 'LAD', 'Blue Crew', 'LA Dodgers', 'Dodgers', 'Boys in Blue'],
  'San Diego Padres': ['Padres', 'SD', 'Friars', 'San Diego', 'Padres'],
  'San Francisco Giants': ['Giants', 'SF', 'G-Men', 'San Francisco', 'Giants', 'Orange & Black'],
};
```

---

## 5. Estructura de Datos para KAS (types.ts extension)

```typescript
// En src/types.ts - agregar para MLB
export interface MLBTeam extends Team {
  league: 'AL' | 'NL';
  division: 'East' | 'Central' | 'West';
  stadium: string;
  stadiumCapacity: number;
  fieldDimensions: {
    leftField: number;      // feet
    leftCenter: number;
    centerField: number;
    rightCenter: number;
    rightField: number;
    backstop: number;
  };
  surface: 'Grass' | 'Artificial';
  roofType: 'Open' | 'Retractable' | 'Fixed';
  championships: number;    // World Series titles
  lastChampionship: number; // year
  pennants: number;         // League championships
  manager: string;
  generalManager: string;
  mascot?: string;
}

export interface MLBGame extends Match {
  // Hereda de Match
  inningScores: {
    home: number[];  // 9 innings + extra
    away: number[];
  };
  currentInning?: number;
  inningHalf?: 'top' | 'bottom';
  outs?: number;
  balls?: number;
  strikes?: number;
  baseRunners?: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
  pitchers: {
    home: { id: number; name: string; era: number; record: string };
    away: { id: number; name: string; era: number; record: string };
  };
  seriesInfo?: {
    gameNumber: number;
    seriesLeader: 'home' | 'away' | 'tied';
    homeWins: number;
    awayWins: number;
    isPostseason: boolean;
  };
  gameType: 'S' | 'R' | 'F' | 'D' | 'L' | 'W'; // Spring, Regular, Wild Card, Division, League, World
}

export interface MLBPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: string; // P, C, 1B, 2B, 3B, SS, LF, CF, RF, DH
  bats: 'L' | 'R' | 'S';
  throws: 'L' | 'R';
  height: string; // "6'2\""
  weight: number; // lbs
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  teamId: string;
  jerseyNumber: number;
  debutDate?: string;
  status: 'Active' | 'IL10' | 'IL15' | 'IL60' | 'Bereavement' | 'Paternity' | 'Minors' | 'Suspended';
  stats?: {
    hitting?: {
      avg: string; // ".285"
      hr: number;
      rbi: number;
      ops: string; // ".912"
      sb: number;
    };
    pitching?: {
      era: string; // "2.85"
      w: number;
      l: number;
      sv: number;
      so: number;
      whip: string; // "1.05"
    };
  };
}
```

---

## 6. ConfiguraciÃ³n de Quiniela MLB (predicciones)

