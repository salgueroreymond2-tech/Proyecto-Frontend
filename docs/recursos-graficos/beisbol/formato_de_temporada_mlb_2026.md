# BÃ©isbol (MLB) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** MLB 2026 (temporada regular mar/abr - sep/out 2026, playoffs oct 2026, World Series oct/nov 2026)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/mlb/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (MLB free endpoints), TheSportsDB v1, MLB Stats API oficial

---

## 1. MLB â€” 30 Equipos (Liga Americana / Liga Nacional)

### Formato de Temporada MLB 2026
- **Spring Training:** Feb - Mar (Cactus League AZ / Grapefruit League FL)
- **Temporada Regular:** 162 partidos/equipo (mar/abr - sep/out)
  - Series de 3-4 juegos (mayorÃ­a divisiÃ³n, interleague rotativo)
- **Postemporada (12 equipos):**
  - **Wild Card Series:** Best of 3 (4 series, 6 equipos por liga)
  - **Division Series (ALDS/NLDS):** Best of 5 (4 series)
  - **Championship Series (ALCS/NLCS):** Best of 7 (2 series)
  - **World Series:** Best of 7 (1 serie)
- **Eventos Especiales:**
  - All-Star Game: Julio (sede rotativa)
  - Home Run Derby: DÃ­a antes All-Star
  - Field of Dreams / London Series / Mexico Series (esporÃ¡dicos)

---

## 7. FotografÃ­a de Estadios / Portadas MLB (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| MLB Stadium genÃ©rico | https://unsplash.com/s/photos/baseball-stadium | https://www.pexels.com/search/baseball%20stadium/ |
| World Series / Championship | https://unsplash.com/s/photos/world-series | https://www.pexels.com/search/world%20series/ |
| Baseball field detalle | https://unsplash.com/s/photos/baseball-field | https://www.pexels.com/search/baseball%20field/ |
| MLB Players acciÃ³n | https://unsplash.com/s/photos/mlb-player | https://www.pexels.com/search/mlb%20player/ |
| Baseball equipment | https://unsplash.com/s/photos/baseball-equipment | https://www.pexels.com/search/baseball%20bat/ |

---

## 8. Checklist de IntegraciÃ³n MLB

- [x] **30 equipos** listados con abreviatura ESPN
- [x] **Logos ESPN CDN** confirmados (formato `{abbr}.png`)
- [x] **Aliases** para normalizaciÃ³n completados
- [x] **Ligas/Divisiones** definidas (AL/NL, 3 divisiones cada una)
- [ ] Subir logos a `/public/assets/logos/teams/mlb/` como respaldo local
- [ ] Actualizar `teamLogos.ts` con `mlbAliases`
- [ ] Crear `mlbTeams.ts` con datos extendidos (stadium, dimensions, championships)
- [ ] Implementar `MLBGame` type en `types.ts`
- [ ] Generar fixture MLB 2026 (2430 partidos temporada regular + playoffs)
- [ ] Definir reglas de puntuaciÃ³n quiniela MLB en `scoringRules.ts`
- [ ] Crear vista `MLBDashboardView` o extender `DashboardView`
- [ ] Probar renderizado badges MLB en `TeamBadge` / `UniversalTeamLogo`
- [ ] Manejar *doubleheaders* (juegos dobles) en calendarizaciÃ³n
- [ ] Integrar *pitchers probables* para predicciones avanzadas
- [ ] Soportar *extra innings* y *walk-off* en scoring
