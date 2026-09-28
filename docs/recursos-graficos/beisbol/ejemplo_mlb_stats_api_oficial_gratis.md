# BÃ©isbol (MLB) - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** MLB 2026 (temporada regular mar/abr - sep/out 2026, playoffs oct 2026, World Series oct/nov 2026)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/mlb/500/{abbr}.png`)  
> **Fuente secundaria:** BallDontLie (MLB free endpoints), TheSportsDB v1, MLB Stats API oficial

---

## 1. MLB â€” 30 Equipos (Liga Americana / Liga Nacional)

### Ejemplo MLB Stats API (Oficial, Gratis)
```bash
# Equipos
curl "https://statsapi.mlb.com/api/v1/teams?sportId=1"

# Partidos de una fecha
curl "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2026-06-15"

# Roster de un equipo
curl "https://statsapi.mlb.com/api/v1/teams/147/roster?rosterType=active"  # 147 = Yankees

# Stats de un jugador
curl "https://statsapi.mlb.com/api/v1/people/660271/stats?stats=season&group=hitting&season=2026"  # Aaron Judge
```

