# BÃ©isbol (MLB) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** MLB 2026 (temporada regular mar/abr - sep/out 2026, playoffs oct 2026, World Series oct/nov 2026)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/mlb/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (MLB free endpoints), TheSportsDB v1, MLB Stats API oficial

---

## 1. MLB â€” 30 Equipos (Liga Americana / Liga Nacional)

### 1.6 Liga Nacional â€” Oeste

| Equipo | Abreviatura ESPN | Logo PNG (500px) | Ciudad | Estadio | Aliases |
|--------|------------------|------------------|--------|---------|---------|
| Arizona Diamondbacks | `ari` | https://a.espncdn.com/i/teamlogos/mlb/500/ari.png | Phoenix, AZ | Chase Field | Diamondbacks, ARI, D-backs, Snakes |
| Colorado Rockies | `col` | https://a.espncdn.com/i/teamlogos/mlb/500/col.png | Denver, CO | Coors Field | Rockies, COL, Rox, Purple Row |
| Los Angeles Dodgers | `lad` | https://a.espncdn.com/i/teamlogos/mlb/500/lad.png | Los Angeles, CA | Dodger Stadium | Dodgers, LAD, Blue Crew |
| San Diego Padres | `sd` | https://a.espncdn.com/i/teamlogos/mlb/500/sd.png | San Diego, CA | Petco Park | Padres, SD, Friars |
| San Francisco Giants | `sf` | https://a.espncdn.com/i/teamlogos/mlb/500/sf.png | San Francisco, CA | Oracle Park | Giants, SF, G-Men |

---

## 2. Logos de Liga y Eventos MLB

| Elemento | URL ESPN CDN | DescripciÃ³n |
|----------|--------------|-------------|
| **Logo MLB** | https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png | Logo oficial de la liga |
| **Logo World Series** | https://a.espncdn.com/i/leaguelogos/baseball/500/worldseries.png | Serie Mundial |
| **Logo All-Star Game** | https://a.espncdn.com/i/leaguelogos/baseball/500/allstar.png | Juego de Estrellas |
| **Logo Postseason** | https://a.espncdn.com/i/leaguelogos/baseball/500/postseason.png | Postemporada |
| **Logo Home Run Derby** | https://a.espncdn.com/i/leaguelogos/baseball/500/hrderby.png | Derby de Jonrones |
| **Trofeo Comisionado** | https://a.espncdn.com/i/teamlogos/baseball/500/trophy_commissioner.png | Trofeo de campeÃ³n WS |
| **Logo Liga Americana** | https://a.espncdn.com/i/leaguelogos/baseball/500/american_league.png | American League |
| **Logo Liga Nacional** | https://a.espncdn.com/i/leaguelogos/baseball/500/national_league.png | National League |

---

## 3. APIs para Datos MLB

| API | Endpoint Principal | Clave | LÃ­mite Free | Uso en KAS |
|-----|-------------------|-------|-------------|------------|
| **BallDontLie MLB** | `https://mlb.balldontlie.io/api/v1/` | Registro gratis | Solo endpoints "Free" | Games, stats, players, teams |
| **MLB Stats API (oficial)** | `https://statsapi.mlb.com/api/v1/` | PÃºblica | Rate limited (~5 req/s) | Official stats, play-by-play, Statcast |
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=MLB` | `123` | ~30 req/min | Team info, logos fallback |
| **ESPN API (no oficial)** | `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/` | Sin clave | PÃºblico | Scores, schedule, standings, boxscore |

