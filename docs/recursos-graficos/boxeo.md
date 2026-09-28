# Boxeo - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Organismos, peleadores, APIs compartidas y fotografia para boxeo.

---

## 3. Boxeo Profesional â€” 4 Organismos Mayores + The Ring

### 3.1 Campeones Unificados / Lineales por DivisiÃ³n (sep 2026)

| DivisiÃ³n | LÃ­mite | WBC | WBA | IBF | WBO | The Ring / Lineal |
|----------|--------|-----|-----|-----|-----|-------------------|
| **Peso Paja** | 105 lbs | - | - | - | - | - |
| **Peso Mosca** | 112 lbs | - | - | - | - | - |
| **Peso Gallo** | 118 lbs | - | - | - | - | Naoya Inoue (JPN) |
| **Peso Pluma** | 126 lbs | - | - | - | - | - |
| **Peso Superpluma** | 130 lbs | - | - | - | - | - |
| **Peso Ligero** | 135 lbs | - | - | - | - | - |
| **Peso Superligero** | 140 lbs | - | - | - | - | - |
| **Peso Welter** | 147 lbs | - | - | - | - | - |
| **Peso Superwelter** | 154 lbs | - | - | - | - | - |
| **Peso Medio** | 160 lbs | - | - | - | - | - |
| **Peso Supermedio** | 168 lbs | - | - | - | - | Canelo Ãlvarez (MEX) |
| **Peso Semipesado** | 175 lbs | - | - | - | - | - |
| **Peso Crucero** | 200 lbs | - | - | - | - | - |
| **Peso Pesado** | 200+ lbs | - | - | - | - | Oleksandr Usyk (UKR) / Tyson Fury (UK) |

> **Fuente actualizada:** `https://boxrec.com/en/ratings` + `https://www.the-ring.com/ratings`

### 3.2 Top Boxeadores 2026 (P4P + Estrellas)

**Hombres P4P:**
1. Naoya Inoue (JPN) - Undisputed BW/SFW | 2. Terence Crawford (USA) - Undisputed WW/SWW | 3. Oleksandr Usyk (UKR) - Undisputed HW | 4. Canelo Ãlvarez (MEX) - Undisputed SMW | 5. Gervonta Davis (USA) - LW/SFW | 6. Shakur Stevenson (USA) - SFW/LW | 7. Devin Haney (USA) - LW/SLW | 8. Dmitry Bivol (RUS) - LHW | 9. Artur Beterbiev (RUS) - LHW | 10. Jaron Ennis (USA) - WW

**Estrellas PPV / AtracciÃ³n:**
- Ryan Garcia (USA) - LW/SLW (red social masiva)
- Jake Paul (USA) - Cruiser/HW (celebrity boxing)
- Anthony Joshua (UK) - HW
- Tyson Fury (UK) - HW
- Deontay Wilder (USA) - HW

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

### Ejemplos TheSportsDB - MMA/Boxeo
```bash
# Buscar peleador UFC
curl "https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=Islam Makhachev"

# Eventos UFC prÃ³ximos
curl "https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=4400"  # id liga UFC

# Resultados evento especÃ­fico
curl "https://www.thesportsdb.com/api/v1/json/123/lookupevent.php?id=441613"

# Boxeadores
curl "https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=Canelo Alvarez"
```

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

