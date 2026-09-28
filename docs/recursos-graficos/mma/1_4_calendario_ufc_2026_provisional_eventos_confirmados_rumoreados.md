# MMA UFC - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

UFC, promociones MMA, peleadores, APIs, logos y fotografia.

---

## 1. UFC (Ultimate Fighting Championship) â€” Principal PromociÃ³n MMA

### 1.4 Calendario UFC 2026 (Provisional - Eventos Confirmados/Rumoreados)

| Fecha | Evento | UbicaciÃ³n | Main Event Rumorado |
|-------|--------|-----------|---------------------|
| Ene 2026 | UFC 305 | Las Vegas, NV | - |
| Feb 2026 | UFC 306 | Las Vegas, NV | - |
| Mar 2026 | UFC 307 | Las Vegas, NV | - |
| Abr 2026 | UFC 308 | Newark, NJ | - |
| May 2026 | UFC 309 | Las Vegas, NV | - |
| Jun 2026 | UFC 310 | Las Vegas, NV | International Fight Week |
| Jul 2026 | UFC 311 | Las Vegas, NV | - |
| Ago 2026 | UFC 312 | Perth, AUS | - |
| Sep 2026 | UFC 313 | Las Vegas, NV | Noche de Independencia MÃ©xico |
| Oct 2026 | UFC 314 | Abu Dhabi, UAE | - |
| Nov 2026 | UFC 315 | New York, NY | Madison Square Garden |
| Dic 2026 | UFC 316 | Las Vegas, NV | AÃ±o nuevo |

> **Verificar calendario oficial** en `https://www.ufc.com/events` - sujeto a cambios frecuentes.

---


---

## 2. Otras Promociones MMA Relevantes

| PromociÃ³n | Sede | TV/Streaming | Nivel | API / Datos |
|-----------|------|--------------|-------|-------------|
| **PFL (Professional Fighters League)** | USA | ESPN / DAZN | Temporada + Playoffs ($1M) | TheSportsDB, PFL API |
| **Bellator MMA** | USA | Showtime / Max | #2 en USA | TheSportsDB |
| **ONE Championship** | Singapur | ONE App / PPV | Asia + Global | TheSportsDB |
| **RIZIN FF** | JapÃ³n | Fuji TV / PPV | JapÃ³n, reglas diferentes | TheSportsDB |
| **LFA (Legacy Fighting Alliance)** | USA | UFC Fight Pass | Feeder para UFC | TheSportsDB |
| **DWCS (Dana White Contender Series)** | USA | UFC Fight Pass | Tryouts para UFC | TheSportsDB |
| **Cage Warriors** | Europa | UFC Fight Pass | Feeder europeo | TheSportsDB |

---


---

## 4. APIs para Datos Combate

| API | Endpoint | Clave | Cobertura | Uso en KAS |
|-----|----------|-------|-----------|------------|
| **TheSportsDB** | `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=MMA` | `123` | UFC, Bellator, PFL, ONE, boxeadores | Logos peleadores, eventos, resultados |
| **UFC Stats (oficial)** | `https://www.ufcstats.com/` | PÃºblica (scrape) | EstadÃ­sticas oficiales UFC | Stats detalladas por pelea |
| **Sherdog** | `https://www.sherdog.com/` | PÃºblica (scrape) | Historial completo MMA | Fight finder, records |
| **Tapology** | `https://www.tapology.com/` | PÃºblica (scrape) | MMA global, predicciones | Odds, predicciones comunidad |
| **BoxRec** | `https://boxrec.com/en/` | Registro gratis | Boxeo profesional completo | Records, rankings, schedules |
| **ESPN API** | `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/` | Sin clave | UFC scores, schedule | Live scores, eventos |
| **Odds API (The Odds API)** | `https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds` | Registro gratis (500 req/mes) | Odds UFC, Boxing | Quinielas con odds |

