# Baloncesto - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NBA 2026/27  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nba/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NBA free endpoints), TheSportsDB v1, NBA Stats API

---

## 1. NBA â€” 30 Equipos (Conferencia Este / Oeste)

### Formato de Temporada
- **Temporada Regular:** 82 partidos por equipo (oct - abr)
- **Play-In:** 7-10 semilla por conferencia (abril)
- **Playoffs:** 16 equipos, series al mejor de 7 (abr - jun)
- **Finales NBA:** CampeÃ³n Este vs CampeÃ³n Oeste (jun)

---

## 7. FotografÃ­a de Estadios / Portadas NBA (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| NBA Arena genÃ©rico | https://unsplash.com/s/photos/basketball-arena | https://www.pexels.com/search/basketball%20arena/ |
| NBA Finals / Championship | https://unsplash.com/s/photos/nba-finals | https://www.pexels.com/search/nba%20finals/ |
| Basketball court detalle | https://unsplash.com/s/photos/basketball-court | https://www.pexels.com/search/basketball%20court/ |
| NBA Players acciÃ³n | https://unsplash.com/s/photos/nba-player | https://www.pexels.com/search/nba%20player/ |

---

## 8. Checklist de IntegraciÃ³n NBA

- [x] **30 equipos** listados con abreviatura ESPN
- [x] **Logos ESPN CDN** confirmados (formato `{abbr}.png`)
- [x] **Aliases** para normalizaciÃ³n completados
- [x] **Conferencias/Divisiones** definidas
- [ ] Subir logos a `/public/assets/logos/teams/nba/` como respaldo local
- [ ] Actualizar `teamLogos.ts` con `nbaAliases`
- [ ] Crear `nbaTeams.ts` con datos extendidos (arena, championships, etc)
- [ ] Implementar `NBAGame` type en `types.ts`
- [ ] Generar fixture NBA 2026/27 (82 juegos x 30 equipos = 1230 partidos)
- [ ] Definir reglas de puntuaciÃ³n quiniela NBA en `scoringRules.ts`
- [ ] Crear vista `NBADashboardView` o extender `DashboardView`
- [ ] Probar renderizado badges NBA en `TeamBadge` / `UniversalTeamLogo`
