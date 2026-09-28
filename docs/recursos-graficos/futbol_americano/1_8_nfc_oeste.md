# FÃºtbol Americano (NFL) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NFL 2026 (temporada regular sep 2026 - ene 2027, playoffs ene-feb 2027, Super Bowl LXI feb 2027)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nfl/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NFL free endpoints), TheSportsDB v1, NFL API oficial

---

## 1. NFL â€” 32 Equipos (AFC / NFC)

### 1.8 NFC Oeste

| Equipo | Abreviatura ESPN | Logo PNG (500px) | Ciudad | Estadio | Aliases |
|--------|------------------|------------------|--------|---------|---------|
| Arizona Cardinals | `ari` | https://a.espncdn.com/i/teamlogos/nfl/500/ari.png | Glendale, AZ | State Farm Stadium | Cardinals, ARI, Red Sea |
| Los Angeles Rams | `lar` | https://a.espncdn.com/i/teamlogos/nfl/500/lar.png | Inglewood, CA | SoFi Stadium | Rams, LAR, Mob Squad |
| San Francisco 49ers | `sf` | https://a.espncdn.com/i/teamlogos/nfl/500/sf.png | Santa Clara, CA | Levi's Stadium | 49ers, SF, Faithful |
| Seattle Seahawks | `sea` | https://a.espncdn.com/i/teamlogos/nfl/500/sea.png | Seattle, WA | Lumen Field | Seahawks, SEA, 12s |

---

## 2. Logos de Liga y Eventos NFL

| Elemento | URL ESPN CDN | DescripciÃ³n |
|----------|--------------|-------------|
| **Logo NFL** | https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png | Logo oficial de la liga |
| **Logo Super Bowl** | https://a.espncdn.com/i/leaguelogos/football/500/superbowl.png | Super Bowl LXI (2027) |
| **Logo Playoffs** | https://a.espncdn.com/i/leaguelogos/football/500/nfl_playoffs.png | Playoffs NFL |
| **Logo Pro Bowl** | https://a.espncdn.com/i/leaguelogos/football/500/probowl.png | Pro Bowl Games |
| **Trofeo Lombardi** | https://a.espncdn.com/i/teamlogos/football/500/trophy_lombardi.png | Trofeo de campeÃ³n |
| **Logo AFC** | https://a.espncdn.com/i/leaguelogos/football/500/afc.png | Conferencia Americana |
| **Logo NFC** | https://a.espncdn.com/i/leaguelogos/football/500/nfc.png | Conferencia Nacional |

---

## 3. APIs para Datos NFL

| API | Endpoint Principal | Clave | LÃ­mite Free | Uso en KAS |
|-----|-------------------|-------|-------------|------------|
| **BallDontLie NFL** | `https://nfl.balldontlie.io/api/v1/` | Registro gratis | Solo endpoints "Free" | Games, stats, players, teams |
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=NFL` | `123` | ~30 req/min | Team info, logos fallback |
| **ESPN API (no oficial)** | `https://site.api.espn.com/apis/site/v2/sports/football/nfl/` | Sin clave | PÃºblico | Scores, schedule, standings, boxscore |
| **NFL API (oficial)** | `https://api.nfl.com/` | Requiere partnership | Limitado | Next Gen Stats, oficiales |

