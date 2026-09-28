# Boxeo - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Organismos, peleadores, APIs compartidas y fotografia para boxeo.

---

## 3. Boxeo Profesional â€” 4 Organismos Mayores + The Ring

### 3.3 Promociones Boxeo Principales
| PromociÃ³n | DueÃ±o / Head | Boxeadores Clave | TV/Streaming |
|-----------|--------------|------------------|--------------|
| **Matchroom Boxing** | Eddie Hearn | Joshua, Bivol, Beterbiev, Ennis, Haney | DAZN |
| **Top Rank** | Bob Arum | Crawford, Lomachenko, Teofimo, Navarrete | ESPN / ESPN+ |
| **Premier Boxing Champions (PBC)** | Al Haymon | Canelo, Benavidez, Charlo, Fundora, Davis | Amazon Prime / Showtime |
| **Golden Boy Promotions** | Oscar De La Hoya | Ryan Garcia, Vergara, etc. | DAZN |
| **Queensberry Promotions** | Frank Warren | Fury, Dubois, Joyce, Buatsi | TNT Sports / ESPN+ |

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

