# Formula 1 - Recursos Graficos KAS

> Fuente consolidada desde los documentos graficos KAS. Mantener este archivo como modulo unico del deporte.

Campeonato F1, escuderias, calendario de Grand Prix, APIs, quiniela y fotografia.

---

## 1. FÃ³rmula 1 â€” 10 Equipos / 20 Pilotos (2026)

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

