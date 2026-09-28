# API-Football logos en frontend

Este proyecto no expone `API_SPORTS_KEY` en React. Para usar API-Football en modo frontend-only, se guardan IDs conocidos en `src/data/apiFootballLogos.ts` y la app consume directamente las URLs publicas de media:

- Equipos: `https://media.api-sports.io/football/teams/{id}.png`
- Ligas: `https://media.api-sports.io/football/leagues/{id}.png`

Flujo recomendado:

1. Buscar el equipo en API-Football desde el dashboard/Postman usando la key privada.
2. Copiar el `team.id`.
3. Agregarlo a `API_FOOTBALL_TEAM_LOGOS`.
4. Incluir aliases para nombres usados en KAS.

Esto evita exponer la key, no consume requests al cargar la app y mantiene los logos centralizados.

