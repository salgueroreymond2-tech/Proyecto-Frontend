# Formula 1 - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Campeonato F1, escuderias, calendario de Grand Prix, APIs, quiniela y fotografia.

---

## 1. FÃ³rmula 1 â€” 10 Equipos / 20 Pilotos (2026)

### 1.1 Equipos 2026 (Nuevos Reglamentos: Motor V6 Turbo HÃ­brido + Combustible 100% Sostenible)

| Equipo | Nombre Completo | Base | Motor 2026 | Logo ESPN / Oficial | Aliases |
|--------|-----------------|------|------------|---------------------|---------|
| **McLaren** | McLaren Formula 1 Team | Woking, UK | Mercedes | https://a.espncdn.com/i/teamlogos/motorsports/500/mclaren.png | McLaren, Papaya, Orange Army |
| **Ferrari** | Scuderia Ferrari HP | Maranello, IT | Ferrari | https://a.espncdn.com/i/teamlogos/motorsports/500/ferrari.png | Ferrari, Scuderia, Prancing Horse, Tifosi |
| **Red Bull Racing** | Oracle Red Bull Racing | Milton Keynes, UK | Red Bull Ford Powertrains | https://a.espncdn.com/i/teamlogos/motorsports/500/redbull.png | Red Bull, RBR, Bulls, Wings |
| **Mercedes** | Mercedes-AMG Petronas F1 Team | Brackley, UK | Mercedes | https://a.espncdn.com/i/teamlogos/motorsports/500/mercedes.png | Mercedes, Silver Arrows, AMG |
| **Aston Martin** | Aston Martin Aramco F1 Team | Silverstone, UK | Mercedes | https://a.espncdn.com/i/teamlogos/motorsports/500/astonmartin.png | Aston Martin, AM, Green |
| **Alpine** | BWT Alpine F1 Team | Enstone, UK | Renault | https://a.espncdn.com/i/teamlogos/motorsports/500/alpine.png | Alpine, Pink/Blue, Renault |
| **Williams** | Williams Racing | Grove, UK | Mercedes | https://a.espncdn.com/i/teamlogos/motorsports/500/williams.png | Williams, FW, Blue/White |
| **RB (Racing Bulls)** | Visa Cash App RB Formula One Team | Faenza, IT | Red Bull Ford Powertrains | https://a.espncdn.com/i/teamlogos/motorsports/500/rb.png | RB, Racing Bulls, Visa Cash App |
| **Sauber (Audi 2026)** | Stake F1 Team Kick Sauber | Hinwil, CH | Ferrari (2026) â†’ Audi (2027) | https://a.espncdn.com/i/teamlogos/motorsports/500/sauber.png | Sauber, Stake, Kick, Alfa Romeo (legacy) |
| **Haas** | MoneyGram Haas F1 Team | Kannapolis, US / Banbury, UK | Ferrari | https://a.espncdn.com/i/teamlogos/motorsports/500/haas.png | Haas, MoneyGram, USA |

### 1.2 Pilotos 2026 (Confirmados / Rumoreados a sep 2026)

| Equipo | Piloto 1 | Piloto 2 | NÃºmero |
|--------|----------|----------|--------|
| McLaren | Lando Norris | Oscar Piastri | 4, 81 |
| Ferrari | Charles Leclerc | Lewis Hamilton | 16, 44 |
| Red Bull | Max Verstappen | Yuki Tsunoda / Liam Lawson | 1, 22/30 |
| Mercedes | George Russell | Andrea Kimi Antonelli | 63, 12 |
| Aston Martin | Fernando Alonso | Lance Stroll | 14, 18 |
| Alpine | Pierre Gasly | Jack Doohan / Franco Colapinto | 10, 61/43 |
| Williams | Alexander Albon | Carlos Sainz / Franco Colapinto | 23, 55/43 |
| RB | Yuki Tsunoda | Daniel Ricciardo / Liam Lawson / Isack Hadjar | 22, 3/30/37 |
| Sauber | Nico HÃ¼lkenberg | Gabriel Bortoleto | 27, 5 |
| Haas | Esteban Ocon | Oliver Bearman | 31, 87 |

> **Nota:** Alineaciones sujetas a cambios. Verificar en `https://www.jolpi.ca/ergast/f1/2026/drivers.json` (Jolpica-F1).

### 1.3 Calendario F1 2026 (24 Carreras - Provisional)

| Ronda | Gran Premio | Circuito | PaÃ­s | Fecha 2026 |
|-------|-------------|----------|------|------------|
| 1 | Bahrain GP | Bahrain International Circuit | Bahrain | 6-8 Mar |
| 2 | Saudi Arabian GP | Jeddah Corniche Circuit | Arabia Saudita | 13-15 Mar |
| 3 | Australian GP | Albert Park | Australia | 27-29 Mar |
| 4 | Japanese GP | Suzuka | JapÃ³n | 3-5 Abr |
| 5 | Chinese GP | Shanghai | China | 17-19 Abr |
| 6 | Miami GP | Hard Rock Stadium | USA | 1-3 May |
| 7 | Emilia-Romagna GP | Imola | Italia | 15-17 May |
| 8 | Monaco GP | Monte Carlo | MÃ³naco | 22-24 May |
| 9 | Spanish GP | Barcelona-Catalunya | EspaÃ±a | 5-7 Jun |
| 10 | Canadian GP | Circuit Gilles Villeneuve | CanadÃ¡ | 19-21 Jun |
| 11 | Austrian GP | Red Bull Ring | Austria | 3-5 Jul |
| 12 | British GP | Silverstone | UK | 17-19 Jul |
| 13 | Belgian GP | Spa-Francorchamps | BÃ©lgica | 28-30 Ago |
| 14 | Hungarian GP | Hungaroring | HungrÃ­a | 4-6 Sep |
| 15 | Dutch GP | Zandvoort | PaÃ­ses Bajos | 11-13 Sep |
| 16 | Italian GP | Monza | Italia | 25-27 Sep |
| 17 | Azerbaijan GP | Baku City Circuit | AzerbaiyÃ¡n | 2-4 Oct |
| 18 | Singapore GP | Marina Bay | Singapur | 16-18 Oct |
| 19 | United States GP | COTA Austin | USA | 23-25 Oct |
| 20 | Mexico GP | AutÃ³dromo Hermanos RodrÃ­guez | MÃ©xico | 30 Oct-1 Nov |
| 21 | SÃ£o Paulo GP | Interlagos | Brasil | 13-15 Nov |
| 22 | Las Vegas GP | Las Vegas Strip Circuit | USA | 20-22 Nov |
| 23 | Qatar GP | Lusail | Qatar | 27-29 Nov |
| 24 | Abu Dhabi GP | Yas Marina | UAE | 4-6 Dic |

---


---

## 2. APIs para Datos F1 / Motor

| API | Endpoint Principal | Clave | Licencia | Uso en KAS |
|-----|-------------------|-------|----------|------------|
| **Jolpica-F1** (Ergast fork) | `https://api.jolpi.ca/ergast/f1/` | PÃºblica | CC BY-NC-SA (no comercial) | Calendario, resultados, standings, drivers, constructors - **ideal para KAS** |
| **OpenF1** | `https://api.openf1.org/v1/` | HistÃ³rica gratis | Abierta | TelemetrÃ­a, timing, sesiones, datos en vivo (tiempo real de pago) |
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Formula_1` | `123` | TÃ©rminos propios | Team info, logos fallback |
| **ESPN API** | `https://site.api.espn.com/apis/site/v2/sports/racing/f1/` | Sin clave | PÃºblico | Scores, schedule, standings |

### Ejemplos Jolpica-F1 (Gratis, No Comercial)
```bash
# Calendario 2026
curl "https://api.jolpi.ca/ergast/f1/2026.json"

# Pilotos 2026
curl "https://api.jolpi.ca/ergast/f1/2026/drivers.json"

# Constructores 2026
curl "https://api.jolpi.ca/ergast/f1/2026/constructors.json"

# Resultados carrera especÃ­fica (Ronda 5)
curl "https://api.jolpi.ca/ergast/f1/2026/5/results.json"

# ClasificaciÃ³n pilotos tras ronda 5
curl "https://api.jolpi.ca/ergast/f1/2026/5/driverStandings.json"

# ClasificaciÃ³n constructores tras ronda 5
curl "https://api.jolpi.ca/ergast/f1/2026/5/constructorStandings.json"

# PrÃ³xima carrera
curl "https://api.jolpi.ca/ergast/f1/current/next.json"
```

---


---

## 6. Logos de Series / Eventos Motor

| Evento | Logo / Imagen |
|--------|---------------|
| **FÃ³rmula 1** | https://a.espncdn.com/i/leaguelogos/motorsports/500/f1.png |
| **MotoGP** | https://a.espncdn.com/i/leaguelogos/motorsports/500/motogp.png |
| **WEC** | https://a.espncdn.com/i/leaguelogos/motorsports/500/wec.png |
| **IndyCar** | https://a.espncdn.com/i/leaguelogos/motorsports/500/indycar.png |
| **24h Le Mans** | https://a.espncdn.com/i/leaguelogos/motorsports/500/lemans.png |
| **Daytona 500** | https://a.espncdn.com/i/leaguelogos/motorsports/500/daytona500.png |

---


---

## 7. ConfiguraciÃ³n de Quiniela Motor (F1)

### Tipos de PredicciÃ³n F1
| Tipo | DescripciÃ³n | Puntos Base | Ejemplo |
|------|-------------|-------------|---------|
| **Ganador Carrera** | Piloto que gana el GP | 300 | Verstappen gana en MÃ³naco |
| **Podio (Top 3)** | 3 pilotos en orden exacto | 500 | 1. Verstappen, 2. Leclerc, 3. Norris |
| **Top 6 / Top 10** | Pilotos en posiciones puntuables | 150 / 100 | Norris P4, Piastri P5 |
| **Pole Position** | Piloto que hace la pole | 200 | Leclerc pole en BakÃº |
| **Vuelta RÃ¡pida** | Piloto con mejor vuelta | 150 | Hamilton vuelta rÃ¡pida |
| **Constructor Ganador** | Equipo ganador | 200 | McLaren gana en Silverstone |
| **DNF / Retiros** | Pilotos que no terminan | 100 | 3 DNFs en la carrera |
| **Sprint Race (si aplica)** | Ganador Sprint / Top 8 | 200 | Piastri gana Sprint en Austin |
| **Campeonato Pilotos** | CampeÃ³n final temporada | 1000 | Verstappen campeÃ³n 2026 |
| **Campeonato Constructores** | Equipo campeÃ³n final | 1000 | McLaren campeones 2026 |

### Formato F1 2026
- **Entrenamientos:** FP1 (Viernes), FP2 (Viernes), FP3 (SÃ¡bado) - *algunas carreras solo FP1+FP2*
- **ClasificaciÃ³n:** Q1, Q2, Q3 (SÃ¡bado) - determina parrilla
- **Carrera:** Domingo (distancia ~305 km o 2h mÃ¡x)
- **Sprint (6 eventos 2026):** Sprint Shootout (Viernes) â†’ Sprint Race (SÃ¡bado) â†’ Carrera (Domingo)
- **Puntos:** 25-18-15-12-10-8-6-4-2-1 (Top 10) + 1 punto vuelta rÃ¡pida (si Top 10)

---


---

## 8. FotografÃ­a Motor (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| F1 Car / Racing | https://unsplash.com/s/photos/formula-1 | https://www.pexels.com/search/racing%20car/ |
| F1 Circuit / Track | https://unsplash.com/s/photos/f1-circuit | https://www.pexels.com/search/formula%201%20track/ |
| MotoGP Bike | https://unsplash.com/s/photos/motogp | https://www.pexels.com/search/motogp/ |
| Endurance / Le Mans | https://unsplash.com/s/photos/24-hours-le-mans | https://www.pexels.com/search/le%20mans/ |
| IndyCar | https://unsplash.com/s/photos/indycar | https://www.pexels.com/search/indycar/ |
| Paddock / Garage | https://unsplash.com/s/photos/f1-paddock | https://www.pexels.com/search/f1%20paddock/ |

---


---

## 9. Checklist de IntegraciÃ³n Motor

- [x] **F1 2026:** 10 equipos, 20 pilotos, 24 GPs listados
- [x] **Jolpica-F1 API** documentada (gratis, no comercial)
- [x] **MotoGP / WEC / IndyCar** resumen incluido
- [ ] Subir logos equipos a `/public/assets/logos/teams/f1/`, `/moto/`, `/wec/`, `/indy/`
- [ ] Actualizar `teamLogos.ts` con aliases F1 (constructores + pilotos)
- [ ] Crear `f1Teams.ts`, `f1Drivers.ts`, `f1Calendar.ts` con datos extendidos
- [ ] Implementar `F1Race` type en `types.ts` (sessions, pitstops, compounds, gaps)
- [ ] Generar fixture F1 2026 con sessions (FP1, FP2, FP3, Quali, Sprint, Race)
- [ ] Definir reglas de puntuaciÃ³n quiniela F1 en `scoringRules.ts`
- [ ] Crear vista `F1DashboardView` con timing en vivo, sectores, neumÃ¡ticos
- [ ] Integrar **OpenF1** para telemetrÃ­a en vivo (si presupuesto permite)
- [ ] Manejar **formato Sprint** (6 eventos) vs formato estÃ¡ndar

