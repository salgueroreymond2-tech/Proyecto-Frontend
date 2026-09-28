# Boxeo - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Organismos, peleadores, APIs compartidas y fotografia para boxeo.

---

## 3. Boxeo Profesional â€” 4 Organismos Mayores + The Ring

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

