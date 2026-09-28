# Tenis - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** ATP/WTA Tour 2026-2027  
> **Fuente principal:** TheSportsDB, ESPN CDN, ATP/WTA APIs oficiales  
> **Nota:** El tenis es deporte **individual** - no hay "equipos" fijos, sino **jugadores** y **torneos**

---

## 1. Grand Slams (Majors) â€” 4 Torneos / AÃ±o

| Torneo | Superficie | UbicaciÃ³n | Logo / Imagen | Fechas 2026-27 | CategorÃ­a |
|--------|------------|-----------|---------------|----------------|-----------|
| **Australian Open** | Dura (Plexicushion) | Melbourne, AUS | https://a.espncdn.com/i/leaguelogos/tennis/500/ausopen.png | Ene 2027 (13-26 Ene) | GS2000 |
| **Roland Garros** | Tierra batida | ParÃ­s, FRA | https://a.espncdn.com/i/leaguelogos/tennis/500/rolandgarros.png | May-Jun 2027 (24 May-7 Jun) | GS2000 |
| **Wimbledon** | Hierba | Londres, UK | https://a.espncdn.com/i/leaguelogos/tennis/500/wimbledon.png | Jun-Jul 2027 (23 Jun-6 Jul) | GS2000 |
| **US Open** | Dura (Laykold) | Nueva York, USA | https://a.espncdn.com/i/leaguelogos/tennis/500/usopen.png | Ago-Sep 2027 (25 Ago-7 Sep) | GS2000 |

**Formato GS:** 128 cuadro principal (M/W), 128 qualy â†’ 7 rondas (R128, R64, R32, R16, QF, SF, F)  
**Sets:** Best of 5 (Hombres), Best of 3 (Mujeres) - *Wimbledon y US Open: tiebreak final set 10 pts*

---

## 2. ATP Masters 1000 / WTA 1000 â€” 9 Torneos / AÃ±o

| Torneo | Superficie | UbicaciÃ³n | Logo | CategorÃ­a | Notas |
|--------|------------|-----------|------|-----------|-------|
| **Indian Wells** | Dura | Indian Wells, USA | https://a.espncdn.com/i/leaguelogos/tennis/500/indianwells.png | M1000 / W1000 | "Quinto Grand Slam", 2 semanas |
| **Miami Open** | Dura | Miami, USA | https://a.espncdn.com/i/leaguelogos/tennis/500/miami.png | M1000 / W1000 | 2 semanas, combinado |
| **Monte Carlo** | Tierra | Monte Carlo, MON | https://a.espncdn.com/i/leaguelogos/tennis/500/montecarlo.png | M1000 | No obligatorio para top players |
| **Madrid Open** | Tierra | Madrid, ESP | https://a.espncdn.com/i/leaguelogos/tennis/500/madrid.png | M1000 / W1000 | 2 semanas (desde 2021) |
| **Italian Open (Roma)** | Tierra | Roma, ITA | https://a.espncdn.com/i/leaguelogos/tennis/500/rome.png | M1000 / W1000 | Pre-Roland Garros clave |
| **Canadian Open** | Dura | Montreal/Toronto (rota) | https://a.espncdn.com/i/leaguelogos/tennis/500/canada.png | M1000 / W1000 | Pre-US Open |
| **Cincinnati Open** | Dura | Cincinnati, USA | https://a.espncdn.com/i/leaguelogos/tennis/500/cincinnati.png | M1000 / W1000 | Pre-US Open, una semana |
| **Shanghai Masters** | Dura | Shanghai, CHN | https://a.espncdn.com/i/leaguelogos/tennis/500/shanghai.png | M1000 | Gira asiÃ¡tica |
| **Paris Masters** | Dura (Indoor) | ParÃ­s, FRA | https://a.espncdn.com/i/leaguelogos/tennis/500/paris.png | M1000 | Final Masters, indoor |

**WTA 1000 adicionales (no combinados):** Dubai, Doha, Guadalajara, Beijing, Wuhan (calendario rota)

---

## 3. ATP 500 / 250 + WTA 500 / 250 â€” Torneos Regulares

### Formato de Puntos por Ronda (Grand Slam Hombres - Best of 5)
| Ronda | Partidos | Puntos ATP | Puntos Quiniela (sugerido) |
|-------|----------|------------|----------------------------|
| R128 | 64 | 10 | 50 |
| R64 | 32 | 45 | 100 |
| R32 | 16 | 90 | 200 |
| R16 | 8 | 180 | 400 |
| QF | 4 | 360 | 800 |
| SF | 2 | 720 | 1600 |
| F | 1 | 1200 | 3200 |
| **CampeÃ³n** | 1 | **2000** | **5000** |

*Mujeres (Best of 3) y torneos menores: escalar proporcionalmente*

---

## 9. Mapeo de Aliases Jugadores (teamLogos.ts style)

```typescript
// En src/data/teamLogos.ts - secciÃ³n Tenis (jugadores como "equipos")
const tennisAliases: Record<string, string[]> = {
  // Hombres Top
  'Jannik Sinner': ['Sinner', 'Jannik', 'ITA', 'Fox'],
  'Carlos Alcaraz': ['Alcaraz', 'Carlitos', 'ESP', 'El NiÃ±o'],
  'Novak Djokovic': ['Djokovic', 'Nole', 'SRB', 'GOAT', 'The Joker'],
  'Alexander Zverev': ['Zverev', 'Sascha', 'GER', 'Zverev'],
  'Daniil Medvedev': ['Medvedev', 'Daniil', 'RUS', 'Meddy'],
  'Andrey Rublev': ['Rublev', 'Andrey', 'RUS', 'Rublo'],
  'Casper Ruud': ['Ruud', 'Casper', 'NOR', 'Ruud'],
  'Stefanos Tsitsipas': ['Tsitsipas', 'Stefanos', 'GRE', 'Stef'],
  'Taylor Fritz': ['Fritz', 'Taylor', 'USA', 'Fritz'],
  'Ben Shelton': ['Shelton', 'Ben', 'USA', 'Big Ben'],
  
  // Mujeres Top
  'Iga ÅšwiÄ…tek': ['Swiatek', 'Iga', 'POL', 'Iga', 'Queen of Clay'],
  'Aryna Sabalenka': ['Sabalenka', 'Aryna', 'BLR', 'Aryna', 'Tiger'],
  'Coco Gauff': ['Gauff', 'Coco', 'USA', 'Coco', 'Cocomania'],
  'Elena Rybakina': ['Rybakina', 'Elena', 'KAZ', 'Lena'],
  'Jessica Pegula': ['Pegula', 'Jessica', 'USA', 'Jess'],
  'Ons Jabeur': ['Jabeur', 'Ons', 'TUN', 'Ons', 'Minister of Happiness'],
  
  // Torneos (como "ligas")
  'Australian Open': ['AO', 'Aus Open', 'Melbourne', 'Happy Slam'],
  'Roland Garros': ['French Open', 'RG', 'Paris', 'Roland Garros', 'La Coupe des Mousquetaires'],
  'Wimbledon': ['Wim', 'The Championships', 'London', 'SW19', 'All England Club'],
  'US Open': ['USO', 'Flushing Meadows', 'New York', 'Arthur Ashe'],
  'ATP Finals': ['Turin Finals', 'Year-End Championships', 'Nitto ATP Finals'],
  'WTA Finals': ['WTA Finals', 'Year-End Championships', 'Riyadh'],
  'Copa del CafÃ©': ['Costa Rica Challenger', 'San Jose Challenger', 'Cafe Cup'],
};
```

---

## 10. Estructura de Datos para KAS (types.ts extension)

```typescript
// En src/types.ts - agregar para Tenis
export interface TennisPlayer {
  id: string;           // "sinner-jannik", "alcaraz-carlos"
  firstName: string;
  lastName: string;
  country: string;      // ISO 3 (ITA, ESP, SRB)
  countryFlag: string;  // emoji o URL bandera
  ranking: number;      // ATP/WTA ranking actual
  rankingPoints: number;
  age: number;
  height: string;       // "1.88m"
  weight: number;       // kg
  plays: 'Right' | 'Left'; // handedness
  backhand: 'One-handed' | 'Two-handed';
  coach: string;
  prizeMoneyYTD: number;
  prizeMoneyCareer: number;
  titlesCareer: number;
  grandSlamsWon: number;
  grandSlamFinals: number;
  masters1000Won: number;
  surfacePreference: {
    hard: number;      // win%
    clay: number;
    grass: number;
    indoor: number;
  };
  h2h?: Record<string, { wins: number; losses: number }>; // vs otros top players
}

export interface TennisTournament {
  id: string;
  name: string;
  category: 'GS2000' | 'M1000' | 'M500' | 'M250' | 'W1000' | 'W500' | 'W250' | 'CHALLENGER' | 'ITF' | 'TEAM';
  gender: 'M' | 'W' | 'Mixed';
  surface: 'Hard' | 'Clay' | 'Grass' | 'Indoor Hard' | 'Indoor Clay';
  drawSize: 128 | 96 | 64 | 56 | 48 | 32 | 28;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  prizeMoney: number;
  pointsWinner: number;
  logoUrl: string;
  courts: {
    name: string;
    capacity: number;
    isShowCourt: boolean;
  }[];
}

export interface TennisMatch {
  id: string;
  tournamentId: string;
  round: string; // 'R128', 'R64', 'R32', 'R16', 'QF', 'SF', 'F', 'RR1', 'RR2', 'RR3'
  player1: TennisPlayer;
  player2: TennisPlayer;
  score?: {
    sets: { p1: number; p2: number }[];
    currentSet?: number;
    currentGame?: { p1: number; p2: number };
    tiebreak?: { p1: number; p2: number };
  };
  status: 'scheduled' | 'live' | 'finished' | 'retired' | 'walkover';
  winner?: 'player1' | 'player2';
  duration?: string; // "2h 34m"
  court?: string;
  stats?: {
    player1: { aces: number; dfs: number; firstServePct: number; firstServeWonPct: number; breakPoints: { faced: number; saved: number }; winners: number; ufe: number };
    player2: { aces: number; dfs: number; firstServePct: number; firstServeWonPct: number; breakPoints: { faced: number; saved: number }; winners: number; ufe: number };
  };
}
```

---

## 11. FotografÃ­a Tenis (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| Tenis partido / acciÃ³n | https://unsplash.com/s/photos/tennis-match | https://www.pexels.com/search/tennis%20match/ |
| Tenis cancha / estadio | https://unsplash.com/s/photos/tennis-court | https://www.pexels.com/search/tennis%20court/ |
| Grand Slam especÃ­fico | https://unsplash.com/s/photos/wimbledon | https://www.pexels.com/search/wimbledon/ |
| Jugador tenis | https://unsplash.com/s/photos/tennis-player | https://www.pexels.com/search/tennis%20player/ |
| Raqueta / pelota detalle | https://unsplash.com/s/photos/tennis-racket | https://www.pexels.com/search/tennis%20ball/ |
| Copa del CafÃ© Costa Rica | https://unsplash.com/s/photos/costa-rica-tennis | https://www.pexels.com/search/costa%20rica%20tennis/ |

---

## 12. Checklist de IntegraciÃ³n Tenis

- [x] **4 Grand Slams** + **9 Masters 1000** + **Finales** + **Copa Davis/BJK/United/Laver** listados
- [x] **Copa del CafÃ©** (Costa Rica Challenger) documentado
- [x] **Top 20 jugadores** ATP/WTA con perfiles
- [x] **APIs** TheSportsDB, ATP/WTA no oficiales, ESPN documentadas
- [ ] Subir logos torneos a `/public/assets/logos/tournaments/tennis/`
- [ ] Actualizar `teamLogos.ts` con `tennisAliases` (jugadores + torneos)
- [ ] Crear `tennisPlayers.ts`, `tennisTournaments.ts`, `tennisCalendar.ts`
- [ ] Implementar `TennisMatch` type en `types.ts` (sets, games, tiebreaks, stats)
- [ ] Generar draws simulados para quinielas (bracket 128/64)
- [ ] Definir reglas de puntuaciÃ³n quiniela tenis en `scoringRules.ts`
- [ ] Crear vista `TennisDashboardView` con bracket visual, H2H, surface stats
- [ ] Manejar **retirements / walkovers** en scoring
- [ ] Integrar **live scoring** punto a punto (si API lo permite)
- [ ] Soportar **dobles** y **mixtos** (United Cup, GS)
- [ ] Ranking en vivo ATP/WTA (actualizar semanal)
