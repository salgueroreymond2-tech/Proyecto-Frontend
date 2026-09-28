# FÃºtbol Americano (NFL) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** NFL 2026 (temporada regular sep 2026 - ene 2027, playoffs ene-feb 2027, Super Bowl LXI feb 2027)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/nfl/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (NFL free endpoints), TheSportsDB v1, NFL API oficial

---

## 1. NFL â€” 32 Equipos (AFC / NFC)

### Formato de Temporada NFL 2026
- **Pretemporada:** 3 partidos/equipo (agosto)
- **Temporada Regular:** 17 partidos/equipo, 18 semanas (sep 2026 - ene 2027)
  - Semana 1-18: Cada equipo tiene 1 *bye week*
- **Playoffs:** 14 equipos (7 por conferencia)
  - Wild Card: 6 partidos (enero)
  - Divisional: 4 partidos (enero)
  - Championship: 2 partidos (enero/febrero)
- **Super Bowl LXI:** Febrero 2027 (Estadio TBD)
- **Pro Bowl Games:** Febrero 2027 (formato skills + flag football)

---

## 7. FotografÃ­a de Estadios / Portadas NFL (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| NFL Stadium genÃ©rico | https://unsplash.com/s/photos/american-football-stadium | https://www.pexels.com/search/american%20football/ |
| Super Bowl / Championship | https://unsplash.com/s/photos/super-bowl | https://www.pexels.com/search/super%20bowl/ |
| Football field detalle | https://unsplash.com/s/photos/football-field | https://www.pexels.com/search/football%20field/ |
| NFL Players acciÃ³n | https://unsplash.com/s/photos/nfl-player | https://www.pexels.com/search/nfl%20player/ |
| Tailgating / Fans | https://unsplash.com/s/photos/nfl-tailgate | https://www.pexels.com/search/tailgate/ |

---

## 8. Checklist de IntegraciÃ³n NFL

- [x] **32 equipos** listados con abreviatura ESPN
- [x] **Logos ESPN CDN** confirmados (formato `{abbr}.png`)
- [x] **Aliases** para normalizaciÃ³n completados
- [x] **Conferencias/Divisiones** definidas (AFC/NFC, 4 divisiones cada una)
- [ ] Subir logos a `/public/assets/logos/teams/nfl/` como respaldo local
- [ ] Actualizar `teamLogos.ts` con `nflAliases`
- [ ] Crear `nflTeams.ts` con datos extendidos (stadium, surface, roof, championships)
- [ ] Implementar `NFLGame` type en `types.ts`
- [ ] Generar fixture NFL 2026 (272 partidos temporada regular + playoffs)
- [ ] Definir reglas de puntuaciÃ³n quiniela NFL en `scoringRules.ts`
- [ ] Crear vista `NFLDashboardView` o extender `DashboardView`
- [ ] Probar renderizado badges NFL en `TeamBadge` / `UniversalTeamLogo`
- [ ] Manejar *bye weeks* en calendarizaciÃ³n
- [ ] Integrar formato *Thursday Night Football*, *Sunday Night Football*, *Monday Night Football*
