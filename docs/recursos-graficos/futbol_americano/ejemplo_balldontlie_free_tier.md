# FÃºtbol Americano (NFL) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NFL 2026 (temporada regular sep 2026 - ene 2027, playoffs ene-feb 2027, Super Bowl LXI feb 2027)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nfl/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NFL free endpoints), TheSportsDB v1, NFL API oficial

---

## 1. NFL â€” 32 Equipos (AFC / NFC)

### Ejemplo BallDontLie (Free Tier)
```bash
# Equipos
curl -H "Authorization: Bearer YOUR_KEY" https://nfl.balldontlie.io/api/v1/teams

# Partidos de una semana
curl -H "Authorization: Bearer YOUR_KEY" "https://nfl.balldontlie.io/api/v1/games?week=1&season=2026"

# Jugadores de un equipo
curl -H "Authorization: Bearer YOUR_KEY" "https://nfl.balldontlie.io/api/v1/players?team_ids[]=15"  # 15 = Chiefs
```

---

## 4. Mapeo de Aliases para NormalizaciÃ³n (teamLogos.ts)

```typescript
// Agregar a src/data/teamLogos.ts - secciÃ³n NFL
const nflAliases: Record<string, string[]> = {
  // AFC Este
  'Buffalo Bills': ['Bills', 'BUF', 'Mafia', 'Buffalo'],
  'Miami Dolphins': ['Dolphins', 'Fins', 'MIA', 'Miami'],
  'New England Patriots': ['Patriots', 'Pats', 'NE', 'New England'],
  'New York Jets': ['Jets', 'NYJ', 'Gang Green', 'NY Jets'],
  
  // AFC Norte
  'Baltimore Ravens': ['Ravens', 'BAL', 'Flock', 'Baltimore'],
  'Cincinnati Bengals': ['Bengals', 'CIN', 'Who Dey', 'Cincinnati'],
  'Cleveland Browns': ['Browns', 'CLE', 'Dawg Pound', 'Cleveland'],
  'Pittsburgh Steelers': ['Steelers', 'PIT', 'Steel Curtain', 'Pittsburgh'],
  
  // AFC Sur
  'Houston Texans': ['Texans', 'HOU', 'Battle Red', 'Houston'],
  'Indianapolis Colts': ['Colts', 'IND', 'Horseshoe', 'Indianapolis'],
  'Jacksonville Jaguars': ['Jaguars', 'JAX', 'Duuuval', 'Jacksonville', 'Jags'],
  'Tennessee Titans': ['Titans', 'TEN', 'Two-Tone Blue', 'Tennessee'],
  
  // AFC Oeste
  'Denver Broncos': ['Broncos', 'DEN', 'Mile High', 'Denver'],
  'Kansas City Chiefs': ['Chiefs', 'KC', 'Kingdom', 'Kansas City', 'Chiefs Kingdom'],
  'Las Vegas Raiders': ['Raiders', 'LV', 'Raider Nation', 'Las Vegas', 'Silver & Black'],
  'Los Angeles Chargers': ['Chargers', 'LAC', 'Bolt Up', 'LA Chargers', 'Bolts'],
  
  // NFC Este
  'Dallas Cowboys': ['Cowboys', 'DAL', "America's Team", 'Dallas', 'Boys'],
  'New York Giants': ['Giants', 'NYG', 'Big Blue', 'NY Giants'],
  'Philadelphia Eagles': ['Eagles', 'PHI', 'Bird Gang', 'Philadelphia', 'Fly Eagles Fly'],
  'Washington Commanders': ['Commanders', 'WSH', 'Hogs', 'Washington', 'Football Team'],
  
  // NFC Norte
  'Chicago Bears': ['Bears', 'CHI', 'Monsters of the Midway', 'Chicago', 'Da Bears'],
  'Detroit Lions': ['Lions', 'DET', 'One Pride', 'Detroit', 'Honolulu Blue'],
  'Green Bay Packers': ['Packers', 'GB', 'Title Town', 'Green Bay', 'Cheeseheads'],
  'Minnesota Vikings': ['Vikings', 'MIN', 'Skol', 'Minnesota', 'Purple People Eaters'],
  
  // NFC Sur
  'Atlanta Falcons': ['Falcons', 'ATL', 'Rise Up', 'Atlanta', 'Dirty Birds'],
  'Carolina Panthers': ['Panthers', 'CAR', 'Keep Pounding', 'Carolina', 'Panthers'],
  'New Orleans Saints': ['Saints', 'NO', 'Who Dat', 'New Orleans', 'Black & Gold'],
  'Tampa Bay Buccaneers': ['Buccaneers', 'TB', 'Bucs', 'Siege the Day', 'Tampa Bay', 'Pewter'],
  
  // NFC Oeste
  'Arizona Cardinals': ['Cardinals', 'ARI', 'Red Sea', 'Arizona', 'Bird Gang'],
  'Los Angeles Rams': ['Rams', 'LAR', 'Mob Squad', 'LA Rams', 'Rams'],
  'San Francisco 49ers': ['49ers', 'SF', 'Faithful', 'San Francisco', 'Niners', 'Gold Rush'],
  'Seattle Seahawks': ['Seahawks', 'SEA', '12s', 'Seattle', 'Legion of Boom'],
};
```

---

## 5. Estructura de Datos para KAS (types.ts extension)

```typescript
// En src/types.ts - agregar para NFL
export interface NFLTeam extends Team {
  conference: 'AFC' | 'NFC';
  division: 'East' | 'North' | 'South' | 'West';
  stadium: string;
  stadiumCapacity: number;
  surface: 'Grass' | 'Artificial';
  roofType: 'Open' | 'Retractable' | 'Fixed' | 'Dome';
  championships: number; // Super Bowl wins
  lastChampionship: number; // year
  headCoach: string;
  generalManager: string;
  mascot?: string;
  fightSong?: string;
}

export interface NFLGame extends Match {
  // Hereda de Match
  quarterScores: {
    home: number[]; // length 4 + OT
    away: number[];
  };
  overtime: boolean;
  timeOfPossession?: {
    home: string; // "32:14"
    away: string;
  };
  turnovers?: {
    home: number;
    away: number;
  };
  redZoneEfficiency?: {
    home: string; // "3/4"
    away: string;
  };
  thirdDownEfficiency?: {
    home: string; // "6/12"
    away: string;
  };
  week: number; // 1-18 (regular), 19-22 (playoffs)
  seasonType: 'PRE' | 'REG' | 'POST';
}

export interface NFLPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: string; // QB, RB, WR, TE, OL, DL, LB, CB, S, K, P, LS
  jerseyNumber: number;
  height: string; // "6'4\""
  weight: number; // lbs
  age: number;
  experience: number; // years
  college: string;
  teamId: string;
  status: 'Active' | 'IR' | 'PUP' | 'Suspended' | 'Practice Squad';
}
```

---

## 6. ConfiguraciÃ³n de Quiniela NFL (predicciones)

