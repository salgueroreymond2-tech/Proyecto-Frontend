# Formula 1 - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Campeonato F1, escuderias, calendario de Grand Prix, APIs, quiniela y fotografia.

---

## 1. FÃ³rmula 1 â€” 10 Equipos / 20 Pilotos (2026)

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

