# FÃºtbol - Recursos GrÃ¡ficos KAS

> **Fecha de corte:** 26 de septiembre de 2026  
> **Temporada de referencia:** 2026/27 (europa), 2026 (Costa Rica, Brasil, Argentina)  
> **Fuente principal:** ESPN CDN (`https://a.espncdn.com/i/teamlogos/soccer/500/{id}.png`)  
> **Fuente secundaria:** TheSportsDB v1 (clave `123`), football-data.org v4 (requiere registro)

---

## 1. Ligas Europeas Top 5 + Portugal

### 2.5 Mundial de Clubes FIFA (nuevo formato 2025+)
**Logo:** https://a.espncdn.com/i/leaguelogos/soccer/500/1.png  
**Equipos:** 32 (campeones continentales + ranking)

---

## 3. FÃºtbol de Costa Rica (UNAFUT) â€” 12 equipos

**Torneo:** Campeonato Nacional Apertura 2026 / Clausura 2027  
**Fuente:** `data/calendario_unafut.json` (local) + TheSportsDB (buscar `Costa Rica Primera Division`)

| Equipo | ID Interno | Logo Local | Colores | Estadio |
|--------|------------|------------|---------|---------|
| Deportivo Saprissa | `sap` | `/assets/logos/teams/Saprissa.png` | #46002C / #FFFFFF | Ricardo Saprissa AymÃ¡ |
| Liga Deportiva Alajuelense | `lda` | `/assets/logos/teams/LD_Alajuelense.png` | #F40001 / #000000 | Alejandro Morera Soto |
| Club Sport Herediano | `csh` | `/assets/logos/teams/Herediano.png` | #DE1F2B / #F4BA1E | Carlos Alvarado Villalobos |
| Club Sport CartaginÃ©s | `csc` | `/assets/logos/teams/Cartagines.png` | #002F6C / #FFFFFF | JosÃ© Rafael "Fello" Meza |
| AD San Carlos | `sca` | `/assets/logos/teams/SanCarlos.png` | #0033A0 / #D6001C | Carlos Ugalde Ãlvarez |
| Puntarenas FC | `pfc` | `/assets/logos/teams/Puntarenas.png` | #F36F21 / #111111 | Miguel "Lito" PÃ©rez |
| Sporting FC | `spo` | `/assets/logos/teams/Sporting.png` | #1A1A1A / #FFFFFF | Ernesto Rohrmoser |
| Municipal PÃ©rez ZeledÃ³n | `mpz` | `/assets/logos/teams/PerezZeledon.png` | #0047BA / #FFFFFF | Municipal PÃ©rez ZeledÃ³n |
| Escorpiones de BelÃ©n | `esc` | `/assets/logos/teams/Escorpiones.png` | #F5B800 / #004085 | Polideportivo de BelÃ©n |
| Inter San Carlos | `isc` | `/assets/logos/teams/InterSanCarlos.png` | #135C34 / #A67C1E | Complejo Deportivo San Carlos |
| AD Guanacasteca | `adg` | `/assets/logos/teams/Guanacasteca.png` | #128038 / #E31B23 | Chorotega |
| Municipal Liberia | `lib` | `/assets/logos/teams/Liberia.png` | #FFD700 / #111111 | Edgardo Baltodano BriceÃ±o |

> **Pendiente:** Subir logos locales a `/public/assets/logos/teams/` y actualizar `teamLogos.ts` con mapeo UNAFUT.

---

## 4. Otras Ligas Relevantes (para expansiÃ³n futura)

| Liga | PaÃ­s | Equipos | ESPN ID | football-data.org | Nota |
|------|------|---------|---------|-------------------|------|
| Ligue 1 | Francia | 18 | `fra.1` | `FL1` | PSG, Marsella, Lyon, MÃ³naco, Lille |
| Eredivisie | PaÃ­ses Bajos | 18 | `ned.1` | `DED` | Ajax, PSV, Feyenoord, AZ |
| Primeira Liga | Portugal | 18 | `por.1` | `PPL` | Ya listada arriba |
| BrasileirÃ£o | Brasil | 20 | `bra.1` | `BSA` | Flamengo, Palmeiras, SÃ£o Paulo |
| Liga Profesional | Argentina | 28 | `arg.1` | - | River, Boca, Racing, Independiente |
| MLS | USA/CanadÃ¡ | 29 | `usa.1` | - | LA Galaxy, Inter Miami, Seattle |
| Liga MX | MÃ©xico | 18 | `mex.1` | - | AmÃ©rica, Chivas, Cruz Azul |

---

## 5. Mapeo de Aliases para NormalizaciÃ³n (teamLogos.ts)

```typescript
// Agregar a src/data/teamLogos.ts
const footballAliases: Record<string, string[]> = {
  // Serie A
  'AC Milan': ['Milan'],
  'AS Roma': ['Roma'],
  'Internazionale': ['Inter', 'Inter Milan'],
  'Juventus': ['Juve'],
  'SSC Napoli': ['Napoli'],
  // Bundesliga
  'Bayern Munich': ['Bayern', 'FC Bayern'],
  'Borussia Dortmund': ['Dortmund', 'BVB'],
  'Borussia MÃ¶nchengladbach': ['Gladbach', 'Monchengladbach'],
  'Eintracht Frankfurt': ['Frankfurt', 'SGE'],
  'FC Cologne': ['KÃ¶ln', 'Cologne', 'FC KÃ¶ln'],
  'RB Leipzig': ['Leipzig', 'RBL'],
  'SC Freiburg': ['Freiburg', 'Sport-Club'],
  'VfB Stuttgart': ['Stuttgart', 'VfB'],
  // LaLiga
  'AtlÃ©tico Madrid': ['Atletico', 'AtlÃ©tico de Madrid', 'Atleti'],
  'Athletic Club': ['Athletic Bilbao', 'Athletic'],
  'Real Madrid': ['Madrid', 'Los Blancos'],
  'Real Betis': ['Betis'],
  'Real Sociedad': ['La Real', 'Txuri-Urdin'],
  // Premier League
  'Manchester City': ['Man City', 'MCFC'],
  'Manchester United': ['Man United', 'MUFC', 'Red Devils'],
  'Newcastle United': ['Newcastle', 'NUFC', 'Magpies'],
  'Tottenham Hotspur': ['Spurs', 'THFC', 'Tottenham'],
  'Brighton & Hove Albion': ['Brighton', 'Seagulls'],
  'Nottingham Forest': ['Forest', 'NFFC'],
  // Liga Portugal
  'Sporting CP': ['Sporting', 'Sporting Lisbon', 'LeÃµes'],
  'FC Porto': ['Porto', 'FCP', 'DragÃµes'],
  'Benfica': ['SL Benfica', 'Ãguias'],
  'VitÃ³ria de GuimarÃ£es': ['Vitoria SC', 'Vitoria Guimaraes', 'Os Conquistadores'],
  // Costa Rica
  'Deportivo Saprissa': ['Saprissa'],
  'Liga Deportiva Alajuelense': ['Alajuelense', 'LDA', 'Manudos'],
  'Club Sport Herediano': ['Herediano', 'CSH', 'Florenses'],
  'Club Sport CartaginÃ©s': ['CartaginÃ©s', 'CSC', 'Brumosos'],
  'AD San Carlos': ['San Carlos', 'SCA', 'Toros del Norte'],
  'Puntarenas FC': ['Puntarenas', 'PFC', 'Chuchequeros'],
  'Sporting FC': ['Sporting', 'SPO', 'Albinegros'],
  'Municipal PÃ©rez ZeledÃ³n': ['Perez Zeledon', 'MPZ', 'Guerreros del Sur'],
  'Escorpiones de BelÃ©n': ['Escorpiones', 'ESC'],
  'Inter San Carlos': ['Inter San Carlos', 'ISC'],
  'AD Guanacasteca': ['Guanacasteca', 'ADG'],
  'Municipal Liberia': ['Liberia', 'LIB'],
};
```

---

## 6. FotografÃ­a de Estadios / Portadas (Unsplash / Pexels)

| BÃºsqueda | Unsplash | Pexels |
|----------|----------|--------|
| Estadio fÃºtbol genÃ©rico | https://unsplash.com/s/photos/soccer-stadium | https://www.pexels.com/search/football%20stadium/ |
| Estadio europeo / Champions | https://unsplash.com/s/photos/european-football-stadium | https://www.pexels.com/search/soccer%20stadium/ |
| FÃºtbol Costa Rica | https://unsplash.com/s/photos/costa-rica-football | https://www.pexels.com/search/costa%20rica%20football/ |
| LaLiga / EspaÃ±a | https://unsplash.com/s/photos/spanish-football-stadium | https://www.pexels.com/search/la%20liga/ |
| Premier League / Inglaterra | https://unsplash.com/s/photos/premier-league-stadium | https://www.pexels.com/search/premier%20league/ |
| Bundesliga / Alemania | https://unsplash.com/s/photos/bundesliga-stadium | https://www.pexels.com/search/bundesliga/ |
| Serie A / Italia | https://unsplash.com/s/photos/serie-a-stadium | https://www.pexels.com/search/serie%20a/ |

---

## 7. Checklist de IntegraciÃ³n por Liga

- [ ] **Serie A**: 20 equipos âœ“, logos ESPN âœ“, aliases âœ“
- [ ] **Bundesliga**: 18 equipos âœ“, logos ESPN âœ“, aliases âœ“
- [ ] **LaLiga**: 20 equipos âœ“, logos ESPN âœ“, aliases âœ“
- [ ] **Premier League**: 20 equipos âœ“, logos ESPN âœ“, aliases âœ“
- [ ] **Liga Portugal**: 18 equipos âœ“, logos ESPN âœ“, aliases âœ“
- [ ] **UCL/UEL/UECL**: IDs de competiciÃ³n football-data.org âœ“
- [ ] **Costa Rica UNAFUT**: 12 equipos âœ“, logos locales (pendiente subida), aliases âœ“
- [ ] Actualizar `teamLogos.ts` con todos los aliases
- [ ] Verificar renderizado en `DashboardView`, `PlayoffsView`, `RankingView`
- [ ] Probar fallback de logos faltantes
