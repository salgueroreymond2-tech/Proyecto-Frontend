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

### Mujeres (WTA) - Top 20 Referencia
| Ranking | Jugadora | PaÃ­s | Edad | Grand Slams | Estilo |
|---------|----------|------|------|-------------|--------|
| 1 | Iga ÅšwiÄ…tek | POL | 23 | 5 (FO 20,22,23,24; USO 22) | Dominante tierra |
| 2 | Aryna Sabalenka | BLR | 25 | 3 (AO 23,24; USO 24) | Potente baseline |
| 3 | Coco Gauff | USA | 20 | 1 (USO 23) | AtlÃ©tico, completa |
| 4 | Elena Rybakina | KAZ | 24 | 1 (Wim 22) | Saque + FH plano |
| 5 | Jessica Pegula | USA | 30 | 0 | SÃ³lida baseline |
| 6 | Ons Jabeur | TUN | 29 | 0 (F Wim 22,23; F USO 22) | Creativa, slice |
| 7 | Qinwen Zheng | CHN | 21 | 0 (Gold ParÃ­s 24) | Potente, agresiva |
| 8 | Maria Sakkari | GRE | 28 | 0 | Lucha, fÃ­sica |
| 9 | Barbora Krejcikova | CZE | 27 | 2 (FO 21, Wim 24) | Todo terreno, dobles esp. |
| 10 | Jasmine Paolini | ITA | 28 | 0 (F FO 24, F Wim 24) | PequeÃ±a, rÃ¡pida |

> **Actualizar rankings** antes de cada Grand Slam desde `https://www.atptour.com/en/rankings/singles` y `https://www.wtatennis.com/rankings`

---

## 7. APIs para Datos Tenis

| API | Endpoint | Clave | Cobertura | Uso en KAS |
|-----|----------|-------|-----------|------------|
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Tennis` | `123` | Torneos, jugadores, eventos | Logos torneos, players fallback |
| **ATP Tour API** (no oficial) | `https://www.atptour.com/en/-/api/` | PÃºblica | Rankings, draws, scores, stats | Datos oficiales ATP |
| **WTA API** (no oficial) | `https://www.wtatennis.com/api/` | PÃºblica | Rankings, draws, scores | Datos oficiales WTA |
| **Sportradar / Tennis Abstract** | Comercial | Pago | Avanzado (point-by-point) | Solo si budget |
| **ESPN API** | `https://site.api.espn.com/apis/site/v2/sports/tennis/` | Sin clave | Scores, schedule | Live scores, schedule |

