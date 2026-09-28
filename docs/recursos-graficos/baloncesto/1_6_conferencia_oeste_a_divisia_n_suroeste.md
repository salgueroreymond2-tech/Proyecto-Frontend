# Baloncesto - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NBA 2026/27  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nba/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NBA free endpoints), TheSportsDB v1, NBA Stats API

---

## 1. NBA â€” 30 Equipos (Conferencia Este / Oeste)

### 1.6 Conferencia Oeste â€” DivisiÃ³n Suroeste

| Equipo | Abreviatura ESPN | Logo PNG (500px) | Ciudad | Estadio | Aliases |
|--------|------------------|------------------|--------|---------|---------|
| Dallas Mavericks | `dal` | https://a.espncdn.com/i/teamlogos/nba/500/dal.png | Dallas, TX | American Airlines Center | Mavs, MFFL |
| Houston Rockets | `hou` | https://a.espncdn.com/i/teamlogos/nba/500/hou.png | Houston, TX | Toyota Center | Rockets, H-Town |
| Memphis Grizzlies | `mem` | https://a.espncdn.com/i/teamlogos/nba/500/mem.png | Memphis, TN | FedExForum | Grizzlies, Grind City |
| New Orleans Pelicans | `no` | https://a.espncdn.com/i/teamlogos/nba/500/no.png | New Orleans, LA | Smoothie King Center | Pelicans, NOLA, Pels |
| San Antonio Spurs | `sa` | https://a.espncdn.com/i/teamlogos/nba/500/sa.png | San Antonio, TX | Frost Bank Center | Spurs, Go Spurs Go |

---

## 2. Logos de Liga y Eventos NBA

| Elemento | URL ESPN CDN | DescripciÃ³n |
|----------|--------------|-------------|
| **Logo NBA** | https://a.espncdn.com/i/teamlogos/leagues/500/nba.png | Logo oficial de la liga |
| **Logo NBA Finals** | https://a.espncdn.com/i/leaguelogos/basketball/500/nba_finals.png | Logo de las Finales |
| **Logo All-Star** | https://a.espncdn.com/i/leaguelogos/basketball/500/nba_allstar.png | Juego de las Estrellas |
| **Logo Play-In** | https://a.espncdn.com/i/leaguelogos/basketball/500/nba_playin.png | Torneo Play-In |
| **Trofeo Larry O'Brien** | https://a.espncdn.com/i/teamlogos/basketball/500/trophy_larry_obrien.png | Trofeo de campeÃ³n |

---

## 3. APIs para Datos NBA

| API | Endpoint Principal | Clave | LÃ­mite Free | Uso en KAS |
|-----|-------------------|-------|-------------|------------|
| **BallDontLie NBA** | `https://nba.balldontlie.io/api/v1/` | Registro gratis | Solo endpoints "Free" | Games, stats, players, teams |
| **NBA Stats (oficial)** | `https://stats.nba.com/stats/` | PÃºblica (headers) | Rate limited | Advanced stats, play-by-play |
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=NBA` | `123` | ~30 req/min | Team info, logos fallback |
| **ESPN API (no oficial)** | `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/` | Sin clave | PÃºblico | Scores, schedule, standings |

