# MMA UFC - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

UFC, promociones MMA, peleadores, APIs, logos y fotografia.

---

## 1. UFC (Ultimate Fighting Championship) â€” Principal PromociÃ³n MMA

### Formato Evento UFC (Para Quiniela por Cartelera)
| Segmento | Peleas | Puntos Base | Notas |
|----------|--------|-------------|-------|
| **Early Prelims** | 2-3 | 50 | Streaming UFC Fight Pass / ESPN+ |
| **Prelims** | 4-5 | 100 | ESPN / ESPN+ |
| **Main Card** | 5 | 200 | PPV / ESPN / ABC |
| **Main Event** | 1 | 500 | 5 rounds (tÃ­tulo) o 3 rounds (no tÃ­tulo) |
| **Co-Main Event** | 1 | 300 | 3 o 5 rounds |

**Total por evento:** ~12-14 peleas = ~1,500-2,000 pts base por cartelera completa

---


---

## 6. Mapeo de Aliases Peleadores (teamLogos.ts)

```typescript
// En src/data/teamLogos.ts - secciÃ³n Combate
const combatAliases: Record<string, string[]> = {
  // UFC Campeones / Top P4P
  'Islam Makhachev': ['Makhachev', 'Islam', 'RUS', 'Dagestan'],
  'Jon Jones': ['Jones', 'Jon', 'USA', 'Bones', 'GOAT'],
  'Alex Pereira': ['Pereira', 'Alex', 'BRA', 'Poatan', 'Stone Hands'],
  'Ilia Topuria': ['Topuria', 'Ilia', 'GEO/ESP', 'El Matador'],
  'Merab Dvalishvili': ['Dvalishvili', 'Merab', 'GEO', 'The Machine'],
  'Dricus du Plessis': ['Du Plessis', 'Dricus', 'RSA', 'Stillknocks'],
  'Belal Muhammad': ['Muhammad', 'Belal', 'USA/PAL', 'Remember the Name'],
  'Alexandre Pantoja': ['Pantoja', 'Alexandre', 'BRA', 'The Cannibal'],
  'Sean O\'Malley': ['O\'Malley', 'Sean', 'USA', 'Suga', 'Sugar'],
  'Max Holloway': ['Holloway', 'Max', 'USA', 'Blessed'],
  'Charles Oliveira': ['Oliveira', 'Charles', 'BRA', 'Do Bronx'],
  'Alexander Volkanovski': ['Volkanovski', 'Alexander', 'AUS', 'The Great'],
  'Sean Strickland': ['Strickland', 'Sean', 'USA', 'Tarzan'],
  'Kamaru Usman': ['Usman', 'Kamaru', 'NGA/USA', 'The Nigerian Nightmare'],
  'Dustin Poirier': ['Poirier', 'Dustin', 'USA', 'The Diamond'],
  
  // Mujeres
  'Valentina Shevchenko': ['Shevchenko', 'Valentina', 'KGZ/PER', 'Bullet', 'Flyweight GOAT'],
  'Zhang Weili': ['Weili', 'Zhang', 'CHN', 'Magnum', 'Strawweight Queen'],
  'Alexa Grasso': ['Grasso', 'Alexa', 'MEX', 'La MuÃ±eca'],
  'Tatiana Suarez': ['Suarez', 'Tatiana', 'USA', 'Tati'],
  'Raquel Pennington': ['Pennington', 'Raquel', 'USA', 'Rocky'],
  'Kayla Harrison': ['Harrison', 'Kayla', 'USA', 'Two-time Olympic Gold'],
  
  // Boxeo
  'Canelo Ãlvarez': ['Canelo', 'Alvarez', 'SaÃºl', 'MEX', 'Undisputed SMW'],
  'Naoya Inoue': ['Inoue', 'Naoya', 'JPN', 'Monster', 'Undisputed BW/SFW'],
  'Terence Crawford': ['Crawford', 'Terence', 'USA', 'Bud', 'Undisputed WW/SWW'],
  'Oleksandr Usyk': ['Usyk', 'Oleksandr', 'UKR', 'The Cat', 'Undisputed HW'],
  'Gervonta Davis': ['Davis', 'Gervonta', 'USA', 'Tank'],
  'Shakur Stevenson': ['Stevenson', 'Shakur', 'USA', 'Shak'],
  'Devin Haney': ['Haney', 'Devin', 'USA', 'The Dream'],
  'Dmitry Bivol': ['Bivol', 'Dmitry', 'RUS', 'Bivol'],
  'Artur Beterbiev': ['Beterbiev', 'Artur', 'RUS', 'The Beast'],
  'Jaron Ennis': ['Ennis', 'Jaron', 'USA', 'Boots'],
  'Ryan Garcia': ['Garcia', 'Ryan', 'USA', 'KingRy', 'Flash'],
  'Anthony Joshua': ['Joshua', 'Anthony', 'UK', 'AJ'],
  'Tyson Fury': ['Fury', 'Tyson', 'UK', 'Gypsy King'],
  'Deontay Wilder': ['Wilder', 'Deontay', 'USA', 'Bronze Bomber'],
  
  // Promociones / Eventos
  'UFC': ['Ultimate Fighting Championship', 'Dana White', 'Zuffa'],
  'PFL': ['Professional Fighters League', 'Playoffs', 'Million Dollar'],
  'Bellator': ['Bellator MMA', 'Scott Coker', 'Paramount'],
  'ONE Championship': ['ONE', 'Chatri Sityodtong', 'Asia'],
  'Boxeo': ['Boxing', 'Sweet Science', 'Pugilism'],
  'WBC': ['World Boxing Council', 'Green Belt'],
  'WBA': ['World Boxing Association', 'Black Belt'],
  'IBF': ['International Boxing Federation', 'Red Belt'],
  'WBO': ['World Boxing Organization', 'Blue Belt'],
  'The Ring': ['The Ring Magazine', 'Lineal Champion'],
};
```

---


---

## 7. Estructura de Datos para KAS (types.ts extension)

```typescript
// En src/types.ts - agregar para Combate
export interface Fighter {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  country: string;
  countryFlag: string;
  dateOfBirth: string;
  age: number;
  height: string; // "5'10\" / 178 cm"
  reach: string;  // "74\" / 188 cm"
  stance: 'Orthodox' | 'Southpaw' | 'Switch';
  weightClass: string; // 'Lightweight', 'Welterweight', etc.
  weightClassLimit: number; // lbs
  record: {
    wins: number;
    losses: number;
    draws: number;
    noContests: number;
    winsByKO: number;
    winsBySub: number;
    winsByDec: number;
  };
  ranking: number; // divisiÃ³n ranking (1-15, C=CampeÃ³n)
  p4pRanking?: number; // pound-for-pound
  promotion: 'UFC' | 'PFL' | 'Bellator' | 'ONE' | 'Boxing' | 'Other';
  team?: string; // gym/team (AKA, ATT, City Kickboxing, etc.)
  coach?: string;
  lastFight: {
    date: string;
    opponent: string;
    result: 'W' | 'L' | 'D' | 'NC';
    method: string;
    round: number;
    time: string;
    event: string;
  };
  nextFight?: {
    date: string;
    opponent: string;
    event: string;
  };
  stats: {
    strikingAccuracy: number; // %
    strikingDefense: number;
    takedownAccuracy: number;
    takedownDefense: number;
    avgSubAttempts: number;
    avgFightTime: string; // "12:34"
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface FightEvent {
  id: string;
  name: string; // "UFC 305", "UFC Fight Night 240"
  promotion: 'UFC' | 'PFL' | 'Bellator' | 'ONE' | 'Boxing' | 'Other';
  date: string;
  location: string;
  venue: string;
  timezone: string;
  mainEvent: Fight;
  coMainEvent: Fight;
  mainCard: Fight[];
  prelims: Fight[];
  earlyPrelims: Fight[];
  broadcast: {
    earlyPrelims: string; // 'UFC Fight Pass'
    prelims: string;      // 'ESPN+'
    mainCard: string;     // 'PPV' | 'ESPN' | 'ABC'
  };
  bonuses?: {
    fightOfTheNight: string[];
    performanceOfTheNight: string[];
  };
}

export interface Fight {
  id: string;
  eventId: string;
  fighter1: Fighter;
  fighter2: Fighter;
  weightClass: string;
  isTitleFight: boolean;
  isInterimTitle: boolean;
  isMainEvent: boolean;
  isCoMainEvent: boolean;
  scheduledRounds: 3 | 5;
  status: 'scheduled' | 'live' | 'finished' | 'cancelled' | 'postponed';
  result?: {
    winner: 'fighter1' | 'fighter2' | 'draw' | 'nc';
    method: 'KO/TKO' | 'Submission' | 'Decision - Unanimous' | 'Decision - Split' | 'Decision - Majority' | 'DQ' | 'Technical Decision' | 'Doctor Stoppage' | 'Corner Stoppage' | 'Retirement';
    round: number;
    time: string; // "4:32"
    details?: string; // "Rear-naked choke", "Right hook", etc.
    scorecards?: {
      judge1: string; // "29-28"
      judge2: string;
      judge3: string;
    };
  };
  odds?: {
    fighter1: number; // decimal odds
    fighter2: number;
    draw?: number;
  };
  stats?: {
    fighter1: { knockdowns: number; sigStrikes: { landed: number; attempted: number }; takedowns: { landed: number; attempted: number }; controlTime: string; };
    fighter2: { knockdowns: number; sigStrikes: { landed: number; attempted: number }; takedowns: { landed: number; attempted: number }; controlTime: string; };
  };
}
```

---


---

## 8. Logos Promociones / Eventos

| Entidad | Logo URL |
|---------|----------|
| **UFC** | https://a.espncdn.com/i/leaguelogos/mma/500/ufc.png |
| **PFL** | https://a.espncdn.com/i/leaguelogos/mma/500/pfl.png |
| **Bellator** | https://a.espncdn.com/i/leaguelogos/mma/500/bellator.png |
| **ONE Championship** | https://a.espncdn.com/i/leaguelogos/mma/500/one.png |
| **WBC** | https://a.espncdn.com/i/leaguelogos/boxing/500/wbc.png |
| **WBA** | https://a.espncdn.com/i/leaguelogos/boxing/500/wba.png |
| **IBF** | https://a.espncdn.com/i/leaguelogos/boxing/500/ibf.png |
| **WBO** | https://a.espncdn.com/i/leaguelogos/boxing/500/wbo.png |
| **The Ring** | https://a.espncdn.com/i/leaguelogos/boxing/500/thering.png |
| **BoxRec** | https://a.espncdn.com/i/leaguelogos/boxing/500/boxrec.png |

---


---

## 9. FotografÃ­a Combate (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| UFC Octagon / Jaula | https://unsplash.com/s/photos/ufc-octagon | https://www.pexels.com/search/ufc/ |
| MMA Pelea / AcciÃ³n | https://unsplash.com/s/photos/mma-fight | https://www.pexels.com/search/mma/ |
| Boxeo Ring / Pelea | https://unsplash.com/s/photos/boxing-ring | https://www.pexels.com/search/boxing/ |
| Peleador / Retrato | https://unsplash.com/s/photos/fighter-portrait | https://www.pexels.com/search/fighter/ |
| Guantes / Equipamiento | https://unsplash.com/s/photos/boxing-gloves | https://www.pexels.com/search/boxing%20gloves/ |
| Entrenamiento / Gym | https://unsplash.com/s/photos/mma-training | https://www.pexels.com/search/mma%20training/ |

---


---

## 10. Checklist de IntegraciÃ³n Combate

- [x] **UFC:** 9 divisiones M, 4 W, campeones, top 15 P4P, tipos eventos
- [x] **Otras MMA:** PFL, Bellator, ONE, RIZIN, LFA, DWCS listadas
- [x] **Boxeo:** 4 organismos + The Ring, divisiones, top boxeadores, promociones
- [x] **APIs:** TheSportsDB, UFC Stats, Sherdog, Tapology, BoxRec, ESPN, Odds API
- [x] **Quinielas:** Tipos predicciÃ³n MMA y Boxeo definidos con puntos
- [ ] Subir logos peleadores a `/public/assets/logos/fighters/ufc/`, `/boxing/`, `/pfl/`
- [ ] Actualizar `teamLogos.ts` con `combatAliases`
- [ ] Crear `ufcFighters.ts`, `ufcEvents.ts`, `boxingFighters.ts`, `boxingEvents.ts`
- [ ] Implementar `Fight` / `FightEvent` types en `types.ts`
- [ ] Generar cartelera tipo (main card, prelims, early prelims) para quiniela
- [ ] Definir reglas de puntuaciÃ³n en `scoringRules.ts`
- [ ] Crear vista `CombatDashboardView` con bracket evento, odds, stats
- [ ] Integrar **Odds API** para moneyline / method / round betting
- [ ] Manejar **cambios de oponente** (lesiones, peso no batido)
- [ ] Soportar **pesaje** (weigh-in results) como predicciÃ³n extra
- [ ] PFL: formato **temporada regular + playoffs + campeonato** ($1M)
- [ ] Boxeo: **eliminatorias obligatorias**, **defensas obligatorias**, **unificaciones**

