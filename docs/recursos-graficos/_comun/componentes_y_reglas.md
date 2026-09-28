# Recursos Gráficos - King Arthur Sports (KAS)

> **Fecha de corte:** 26 de septiembre de 2026  
> **Propósito:** Catálogo centralizado de logos, escudos, fotografías y recursos visuales para todos los deportes y torneos soportados en KAS.  
> **Estructura:** Un archivo por categoría deportiva para facilitar mantenimiento y actualizaciones por temporada.

---

## 1. Reglas Generales de Uso

### 1.1 Licencias y Derechos
- **ESPN CDN**: Las URLs de escudos (`https://a.espncdn.com/i/teamlogos/...`) son referencias públicas. **No constituyen licencia de uso comercial**. Para producción, descargar y alojar copias autorizadas.
- **TheSportsDB**: Requiere clave pública (`123`) y respeta sus [términos de uso](https://www.thesportsdb.com/docs_terms_of_use.php). Las imágenes pueden tener derechos de marca separados.
- **Unsplash / Pexels**: Sus licencias permiten uso gratuito (ver [Unsplash License](https://unsplash.com/license), [Pexels License](https://www.pexels.com/license/)). Verificar marcas, personas y derechos adicionales por imagen.
- **Wikimedia Commons**: Cada archivo tiene su propia licencia (CC BY, CC BY-SA, dominio público, etc.). Abrir el archivo original para confirmar.

### 1.2 Buenas Prácticas en React
```tsx
// ✅ Correcto: URL directa de imagen con fallback
<img 
  src={team.logoUrl || '/assets/logos/teams/placeholder.png'} 
  alt={team.name}
  width={48}
  height={48}
  loading="lazy"
  onError={(e) => { e.currentTarget.src = '/assets/logos/teams/placeholder.png'; }}
/>

// ❌ Incorrecto: URL de búsqueda o endpoint JSON como src
<img src="https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=..." />

// ✅ Correcto: Proxy para claves privadas (server-side)
const response = await fetch('/api/proxy?url=...'); // No exponer claves en VITE_
```

### 1.3 Convenciones de Nombramiento
- **Equipos**: `kebab-case` del nombre corto (ej: `real-madrid`, `la-lakers`)
- **Ligas/Torneos**: `kebab-case` del nombre (ej: `serie-a`, `nba`, `champions-league`)
- **Archivos locales**: `/public/assets/logos/teams/{id}.png` o `/public/assets/logos/leagues/{id}.png`

### 1.4 Actualización por Temporada
1. Verificar ascensos/descensos y cambios de identidad (ej: franquicias MLB, rebranding NFL)
2. Comprobar disponibilidad de logos en ESPN CDN / TheSportsDB
3. Actualizar `logos_equipos_ligas_KAS_2026.md` → dividir en archivos por deporte
4. Regenerar `teamLogos.ts` con mapeo normalizado
5. Ejecutar tests de renderizado de badges

---

## 2. APIs Principales y Claves

| API | Deportes | Clave Gratuita | Límite | Uso en KAS |
|-----|----------|----------------|--------|------------|
| **ESPN CDN (directo)** | Fútbol, NBA, NFL, MLB, Tennis, F1 | No requerida | Sin límite público | Logos de equipos y ligas (referencia) |
| **TheSportsDB v1** | Multi-deporte | `123` | ~30 req/min | Fallback de escudos, badges de liga, miniaturas de deporte |
| **football-data.org v4** | Fútbol (UEFA, top 5 ligas) | Registro gratis | 10 req/min | Fixtures, standings, equipos oficiales UEFA |
| **API-SPORTS** | Multi-deporte | Registro gratis | 100 req/día por API | Cobertura amplia, verificar plan free por endpoint |
| **BallDontLie** | NBA, NFL, MLB, EPL | Registro gratis | Solo endpoints "Free" | Estadísticas, rosters, schedules |
| **OpenLigaDB** | Fútbol alemán (Bundesliga) | Sin clave | Sin límite publicado | Datos históricos Bundesliga bajo ODbL |
| **Jolpica-F1** | Fórmula 1 | Pública (no comercial) | Respeta rate limits | Calendario, pilotos, resultados F1 |
| **OpenF1** | Fórmula 1 | Histórica gratis | Tiempo real de pago | Telemetría, sesiones, timing |

> **Nota de seguridad**: Todas las claves privadas **deben** ir en variables de entorno del servidor (`SUPABASE_*`, `API_SPORTS_KEY`, etc.) y consumirse via Edge Functions / API Routes. **Nunca** en `VITE_*` ni código cliente.

---

## 3. Estructura de Archivos en `/docs/recursos-graficos/`

```
docs/recursos-graficos/
├── 00_intro_y_componentes.md   ← Este archivo (reglas, APIs, ejemplos)
├── futbol.md                   ← Ligas UEFA, FIFA, federaciones, torneos internacionales
├── baloncesto.md               ← NBA (30 equipos), FIBA, Euroliga
├── futbol_americano.md         ← NFL (32 equipos), NCAA, CFL
├── beisbol.md                  ← MLB (30 equipos), NPB, KBO, ligas invernales
├── motor.md                    ← Fórmula 1, MotoGP, WEC, IndyCar
├── tenis.md                    ← Grand Slams, ATP/WTA Masters, Copa del Café, atletas
├── combate.md                  ← UFC, MMA, Boxeo (WBC, WBA, IBF, WBO)
└── otros.md                    ← Ciclismo, Golf, Unsplash general, otros deportes
```

---

## 4. Ejemplos de Componentes React Comunes

### 4.1 UniversalTeamLogo
```tsx
// src/components/UniversalTeamLogo.tsx
import { getExternalTeamLogo } from '../data/teamLogos';

interface Props {
  name: string;
  sport: 'football' | 'basketball' | 'baseball' | 'american-football';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const UniversalTeamLogo = ({ name, sport, size = 'md', fallback }: Props) => {
  const logo = getExternalTeamLogo(name);
  const sizeMap = { xs: 16, sm: 24, md: 32, lg: 48, xl: 64 };
  const dim = sizeMap[size];
  
  return (
    <img
      src={logo?.logoUrl || fallback || `/assets/logos/teams/placeholder-${sport}.png`}
      alt={name}
      width={dim}
      height={dim}
      className="object-contain"
      loading="lazy"
    />
  );
};
```

### 4.2 TeamBadge (con colores del equipo)
```tsx
// src/components/TeamBadge.tsx
import { TEAMS, getTeamById } from '../data/teams';

interface Props {
  teamId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const TeamBadge = ({ teamId, size = 'md', showName = false }: Props) => {
  const team = getTeamById(teamId);
  const sizeClasses = { xs: 'w-4 h-4', sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-12 h-12' };
  
  return (
    <div className={`flex items-center gap-1.5 ${sizeClasses[size]}`} style={{ '--team-primary': team.primaryColor }}>
      <div 
        className="rounded-full bg-current flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: team.primaryColor }}
      >
        <UniversalTeamLogo name={team.name} sport="football" size={size} />
      </div>
      {showName && <span className="font-heading font-bold text-white truncate">{team.shortName}</span>}
    </div>
  );
};
```

---

## 5. Checklist de Integración por Torneo

- [ ] Identificar `leagueId` / `tournamentId` en proveedor (ESPN, TheSportsDB, football-data.org)
- [ ] Listar todos los equipos participantes (20 Serie A, 18 Bundesliga, 20 LaLiga, 20 PL, 18 Liga Portugal, 30 NBA, 32 NFL, 30 MLB, 10-12 CR)
- [ ] Obtener y validar URL de logo por equipo (ESPN CDN preferido por consistencia)
- [ ] Definir `primaryColor`, `secondaryColor`, `accentColor` por equipo para theming
- [ ] Crear mapeo de alias (ej: "Real Madrid" ↔ "Real Madrid CF" ↔ "RM" ↔ "RMA")
- [ ] Actualizar `teamLogos.ts` con `normalizeTeamName` y `teamLogoMap`
- [ ] Verificar renderizado en `TeamBadge`, `UniversalTeamLogo`, `DashboardView`
- [ ] Probar fallback cuando logo no disponible
- [ ] Documentar en el archivo correspondiente de `/docs/recursos-graficos/`

---

## 6. Referencias Rápidas

- **Logos equipos (ESPN CDN base)**: `https://a.espncdn.com/i/teamlogos/{sport}/500/{id}.png`
  - Fútbol: `soccer/500/{id}.png`
  - NBA: `nba/500/{abbr}.png` (ej: `lal.png`)
  - NFL: `nfl/500/{abbr}.png` (ej: `kc.png`)
  - MLB: `mlb/500/{abbr}.png` (ej: `nyy.png`)
- **Logos ligas (ESPN CDN)**: `https://a.espncdn.com/i/leaguelogos/{sport}/500/{id}.png`
- **TheSportsDB lookup**: `https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id={teamId}`
- **Unsplash search**: `https://unsplash.com/s/photos/{query}`
- **Pexels search**: `https://www.pexels.com/search/{query}/`