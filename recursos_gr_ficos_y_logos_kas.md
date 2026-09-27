# Recursos Gráficos y Logos Deportivos para King Arthur Sports (KAS)

> **Actualizado:** 26 de septiembre de 2026 (Costa Rica).
>
> **Contenido:** Fotografías de stock, catálogos de APIs (TheSportsDB) y rutas directas de logos (ESPN).

Este documento unifica las fuentes de imágenes y emblemas deportivos para su uso en la plataforma KAS. Las imágenes en formato PNG (ESPN) tienen fondo transparente donde se ha verificado. Ten en cuenta que estas URL de terceros no representan una licencia de uso permanente; para entornos de producción, asegúrate de cumplir con los derechos de marca y condiciones de cada proveedor.

## 1. Integración en React

Aquí tienes ejemplos de cómo consumir e implementar estas imágenes en tus componentes de React.

### Consumo directo (Logos estáticos)

```jsx
// Ejemplo para un componente de equipo
const logoUrl = "https://a.espncdn.com/i/teamlogos/soccer/500/103.png";

export const TeamBadge = () => (
  <img src={logoUrl} alt="Escudo de AC Milan" width={48} height={48} loading="lazy" />
);
```

### Consumo asíncrono (API TheSportsDB para atletas)

```jsx
import { useState, useEffect } from 'react';

export const AthleteProfile = ({ athleteName }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(athleteName)}`);
        const data = await response.json();
        // strCutout es la foto sin fondo. Si no existe, usamos strThumb (foto normal)
        const url = data.player?.[0]?.strCutout || data.player?.[0]?.strThumb || null;
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching athlete:", error);
      }
    };
    if (athleteName) fetchAthlete();
  }, [athleteName]);

  if (!imageUrl) return <div>Cargando...</div>;
  return <img src={imageUrl} alt={`Foto de ${athleteName}`} width={150} loading="lazy" />;
};
```

## 2. Atletas Individuales, Motor y Ciclismo

Para disciplinas individuales o con una alta rotación de competidores, KAS utilizará el endpoint de búsqueda de **TheSportsDB**. La clave gratuita `123` permite obtener fotografías de los atletas, a menudo sin fondo (`strCutout`), ideales para tarjetas de perfil o enfrentamientos (Matchups).

**URL Base para Atletas:** `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=[NOMBRE]`
**URL Base para Equipos:** `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=[NOMBRE]`

| Deporte | Entidad | Ejemplo de Búsqueda (Sustituye el nombre) | Campo JSON a extraer |
| --- | --- | --- | --- |
| **Fórmula 1** | Pilotos | `.../searchplayers.php?p=Max%20Verstappen` | `player[0].strCutout` |
| **Fórmula 1** | Escuderías | `.../search_all_teams.php?l=Formula_1` | `teams[].strBadge` |
| **MMA / UFC** | Luchadores | `.../searchplayers.php?p=Ilia%20Topuria` | `player[0].strCutout` |
| **Tenis** | Tenistas (ATP/WTA) | `.../searchplayers.php?p=Carlos%20Alcaraz` | `player[0].strCutout` |
| **Golf** | Golfistas | `.../searchplayers.php?p=Scottie%20Scheffler` | `player[0].strCutout` |
| **Ciclismo** | Ciclistas | `.../searchplayers.php?p=Tadej%20Pogacar` | `player[0].strCutout` |
| **Ciclismo** | Equipos | `.../searchteams.php?t=Ineos%20Grenadiers` | `teams[0].strBadge` |
| **Atletismo** | Corredores / Pista | `.../searchplayers.php?p=Noah%20Lyles` | `player[0].strCutout` |

> *Nota:* Si `strCutout` viene nulo (null), puedes configurar tu componente React para que utilice `strThumb` (que es una fotografía estándar cuadrada o rectangular del atleta) o renderice un avatar por defecto.

## 3. Catálogo Directo de Logos (ESPN)

> Fútbol y NBA: temporada 2026/27; NFL y MLB: temporada 2026.

### Serie A (2026/27)

**Logo de la liga:** [Serie A](https://a.espncdn.com/i/leaguelogos/soccer/500/12.png) | **Equipos:** 20.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| AC Milan | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/103.png) | 
| AS Roma | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/104.png) | 
| Atalanta | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/105.png) | 
| Bologna | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/107.png) | 
| Cagliari | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2925.png) | 
| Como | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2572.png) | 
| Fiorentina | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/109.png) | 
| Frosinone | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/4057.png) | 
| Genoa | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3263.png) | 
| Internazionale | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/110.png) | 
| Juventus | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/111.png) | 
| Lazio | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/112.png) | 
| Lecce | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/113.png) | 
| Monza | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/4007.png) | 
| Napoli | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/114.png) | 
| Parma | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/115.png) | 
| Sassuolo | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3997.png) | 
| Torino | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/239.png) | 
| Udinese | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/118.png) | 
| Venezia | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/17530.png) | 

### Bundesliga (2026/27)

**Logo de la liga:** [Bundesliga](https://a.espncdn.com/i/leaguelogos/soccer/500/10.png) | **Equipos:** 18.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| 1\. FC Union Berlin | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/598.png) | 
| Bayer Leverkusen | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/131.png) | 
| Bayern Munich | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/132.png) | 
| Borussia Dortmund | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/124.png) | 
| Borussia Mönchengladbach | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/268.png) | 
| Eintracht Frankfurt | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/125.png) | 
| FC Augsburg | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3841.png) | 
| FC Cologne | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/122.png) | 
| Hamburg SV | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/127.png) | 
| Mainz | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2950.png) | 
| RB Leipzig | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/11420.png) | 
| SC Freiburg | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/126.png) | 
| SC Paderborn 07 | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3307.png) | 
| Schalke 04 | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/133.png) | 
| SV Elversberg | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/10388.png) | 
| TSG Hoffenheim | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/7911.png) | 
| VfB Stuttgart | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/134.png) | 
| Werder Bremen | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/137.png) | 

### LaLiga (España) (2026/27)

**Logo de la liga:** [LaLiga](https://a.espncdn.com/i/leaguelogos/soccer/500/15.png) | **Equipos:** 20.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| Alavés | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/96.png) | 
| Athletic Club | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/93.png) | 
| Atlético Madrid | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/1068.png) | 
| Barcelona | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/83.png) | 
| Celta Vigo | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/85.png) | 
| Deportivo | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/90.png) | 
| Elche | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3751.png) | 
| Espanyol | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/88.png) | 
| Getafe | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2922.png) | 
| Levante | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/1538.png) | 
| Málaga | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/99.png) | 
| Osasuna | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/97.png) | 
| Racing Santander | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/87.png) | 
| Rayo Vallecano | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/101.png) | 
| Real Betis | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/244.png) | 
| Real Madrid | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/86.png) | 
| Real Sociedad | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/89.png) | 
| Sevilla | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/243.png) | 
| Valencia | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/94.png) | 
| Villarreal | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/102.png) | 

### Premier League (2026/27)

**Logo de la liga:** [Premier League](https://a.espncdn.com/i/leaguelogos/soccer/500/23.png) | **Equipos:** 20.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| AFC Bournemouth | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/349.png) | 
| Arsenal | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/359.png) | 
| Aston Villa | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/362.png) | 
| Brentford | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/337.png) | 
| Brighton & Hove Albion | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/331.png) | 
| Chelsea | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/363.png) | 
| Coventry City | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/388.png) | 
| Crystal Palace | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/384.png) | 
| Everton | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/368.png) | 
| Fulham | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/370.png) | 
| Hull City | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/306.png) | 
| Ipswich Town | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/373.png) | 
| Leeds United | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/357.png) | 
| Liverpool | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/364.png) | 
| Manchester City | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/382.png) | 
| Manchester United | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/360.png) | 
| Newcastle United | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/361.png) | 
| Nottingham Forest | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/393.png) | 
| Sunderland | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/366.png) | 
| Tottenham Hotspur | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/367.png) | 

### Liga Portugal (2026/27)

**Logo de la liga:** [Liga Portugal](https://a.espncdn.com/i/leaguelogos/soccer/500/14.png) | **Equipos:** 18.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| Académico de Viseu | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/21607.png) | 
| Alverca | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/21613.png) | 
| Arouca | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/15784.png) | 
| Benfica | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/1929.png) | 
| Braga | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2994.png) | 
| C.D. Nacional | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3472.png) | 
| Casa Pia | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/21581.png) | 
| Estoril | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/12216.png) | 
| Estrela | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/21610.png) | 
| FC Famalicao | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/12698.png) | 
| FC Porto | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/437.png) | 
| Gil Vicente | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3699.png) | 
| Maritimo | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/552.png) | 
| Moreirense | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3696.png) | 
| Rio Ave | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/3822.png) | 
| Santa Clara | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/12215.png) | 
| Sporting CP | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/2250.png) | 
| Vitória de Guimaraes | [Abrir PNG](https://a.espncdn.com/i/teamlogos/soccer/500/5309.png) | 

### NBA (2026/27)

**Logo de la liga:** [NBA](https://a.espncdn.com/i/teamlogos/leagues/500/nba.png) | **Equipos:** 30.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| Atlanta Hawks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/atl.png) | 
| Boston Celtics | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/bos.png) | 
| Brooklyn Nets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/bkn.png) | 
| Charlotte Hornets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/cha.png) | 
| Chicago Bulls | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/chi.png) | 
| Cleveland Cavaliers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/cle.png) | 
| Dallas Mavericks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/dal.png) | 
| Denver Nuggets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/den.png) | 
| Detroit Pistons | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/det.png) | 
| Golden State Warriors | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/gs.png) | 
| Houston Rockets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/hou.png) | 
| Indiana Pacers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/ind.png) | 
| LA Clippers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/lac.png) | 
| Los Angeles Lakers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/lal.png) | 
| Memphis Grizzlies | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/mem.png) | 
| Miami Heat | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/mia.png) | 
| Milwaukee Bucks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/mil.png) | 
| Minnesota Timberwolves | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/min.png) | 
| New Orleans Pelicans | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/no.png) | 
| New York Knicks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/ny.png) | 
| Oklahoma City Thunder | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/okc.png) | 
| Orlando Magic | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/orl.png) | 
| Philadelphia 76ers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/phi.png) | 
| Phoenix Suns | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/phx.png) | 
| Portland Trail Blazers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/por.png) | 
| Sacramento Kings | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/sac.png) | 
| San Antonio Spurs | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/sa.png) | 
| Toronto Raptors | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/tor.png) | 
| Utah Jazz | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/utah.png) | 
| Washington Wizards | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nba/500/wsh.png) | 

### NFL (2026)

**Logo de la liga:** [NFL](https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png) | **Equipos:** 32.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| Arizona Cardinals | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/ari.png) | 
| Atlanta Falcons | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/atl.png) | 
| Baltimore Ravens | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/bal.png) | 
| Buffalo Bills | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/buf.png) | 
| Carolina Panthers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/car.png) | 
| Chicago Bears | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/chi.png) | 
| Cincinnati Bengals | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/cin.png) | 
| Cleveland Browns | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/cle.png) | 
| Dallas Cowboys | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/dal.png) | 
| Denver Broncos | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/den.png) | 
| Detroit Lions | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/det.png) | 
| Green Bay Packers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/gb.png) | 
| Houston Texans | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/hou.png) | 
| Indianapolis Colts | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/ind.png) | 
| Jacksonville Jaguars | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/jax.png) | 
| Kansas City Chiefs | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/kc.png) | 
| Las Vegas Raiders | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/lv.png) | 
| Los Angeles Chargers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/lac.png) | 
| Los Angeles Rams | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/lar.png) | 
| Miami Dolphins | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/mia.png) | 
| Minnesota Vikings | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/min.png) | 
| New England Patriots | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/ne.png) | 
| New Orleans Saints | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/no.png) | 
| New York Giants | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png) | 
| New York Jets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png) | 
| Philadelphia Eagles | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/phi.png) | 
| Pittsburgh Steelers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/pit.png) | 
| San Francisco 49ers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/sf.png) | 
| Seattle Seahawks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/sea.png) | 
| Tampa Bay Buccaneers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/tb.png) | 
| Tennessee Titans | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/ten.png) | 
| Washington Commanders | [Abrir PNG](https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png) | 

### MLB (2026)

**Logo de la liga:** [MLB](https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png) | **Equipos:** 30.

| Equipo | Logo PNG sin fondo | 
| ----- | ----- | 
| Arizona Diamondbacks | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/ari.png) | 
| Athletics | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/ath.png) | 
| Atlanta Braves | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/atl.png) | 
| Baltimore Orioles | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/bal.png) | 
| Boston Red Sox | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/bos.png) | 
| Chicago Cubs | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/chc.png) | 
| Chicago White Sox | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/chw.png) | 
| Cincinnati Reds | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/cin.png) | 
| Cleveland Guardians | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/cle.png) | 
| Colorado Rockies | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/col.png) | 
| Detroit Tigers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/det.png) | 
| Houston Astros | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/hou.png) | 
| Kansas City Royals | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/kc.png) | 
| Los Angeles Angels | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/laa.png) | 
| Los Angeles Dodgers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/lad.png) | 
| Miami Marlins | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/mia.png) | 
| Milwaukee Brewers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/mil.png) | 
| Minnesota Twins | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/min.png) | 
| New York Mets | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/nym.png) | 
| New York Yankees | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png) | 
| Philadelphia Phillies | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/phi.png) | 
| Pittsburgh Pirates | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/pit.png) | 
| San Diego Padres | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/sd.png) | 
| San Francisco Giants | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/sf.png) | 
| Seattle Mariners | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/sea.png) | 
| St. Louis Cardinals | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/stl.png) | 
| Tampa Bay Rays | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/tb.png) | 
| Texas Rangers | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/tex.png) | 
| Toronto Blue Jays | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/tor.png) | 
| Washington Nationals | [Abrir PNG](https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png) | 

## 4. Fotografías para el carrusel y portadas (Unsplash / Pexels)

Los enlaces a continuación abren galerías para que selecciones fotografías. **No uses estas URL directamente en la etiqueta `<img src="">`**, ya que apuntan a páginas web, no al archivo de imagen final. 

| Deporte | Unsplash | Pexels | 
| ----- | ----- | ----- | 
| Fútbol | https://unsplash.com/s/photos/soccer-stadium | https://www.pexels.com/search/football%20stadium/ | 
| UEFA Champions League / ligas europeas | https://unsplash.com/s/photos/european-football-stadium | https://www.pexels.com/search/soccer%20stadium/ | 
| Ligue 1 de Francia | https://unsplash.com/s/photos/french-football-stadium | https://www.pexels.com/search/france%20football%20stadium/ | 
| UEFA Europa League | https://unsplash.com/s/photos/european-football | https://www.pexels.com/search/european%20football/ | 
| Eurocopa / UEFA Nations League | https://unsplash.com/s/photos/international-football | https://www.pexels.com/search/international%20football/ | 
| Copa América / Copa Oro | https://unsplash.com/s/photos/national-team-football | https://www.pexels.com/search/football%20fans/ | 
| Fútbol de Costa Rica | https://unsplash.com/s/photos/costa-rica-football | https://www.pexels.com/search/costa%20rica%20football/ | 
| Tenis | https://unsplash.com/s/photos/tennis-match | https://www.pexels.com/search/tennis%20match/ | 
| Baloncesto / NBA | https://unsplash.com/s/photos/basketball-arena | https://www.pexels.com/search/basketball%20arena/ | 
| Béisbol / MLB | https://unsplash.com/s/photos/baseball-stadium | https://www.pexels.com/search/baseball%20stadium/ | 
| Fútbol americano / NFL | https://unsplash.com/s/photos/american-football-stadium | https://www.pexels.com/search/american%20football/ | 
| MMA / UFC | https://unsplash.com/s/photos/mma-fight | https://www.pexels.com/search/mma/ | 
| Fórmula 1 / automovilismo | https://unsplash.com/s/photos/formula-1 | https://www.pexels.com/search/racing%20car/ | 
| Ciclismo | https://unsplash.com/s/photos/cycling-race | https://www.pexels.com/search/cycling%20race/ | 
| Golf | https://unsplash.com/s/photos/golf | https://www.pexels.com/search/golf/ | 

> **Alternativa:** [Fotografías deportivas en Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Photographs_of_sports_by_type). Revisa siempre la licencia individual de cada imagen.

## 5. APIs Adicionales: TheSportsDB (Escudos, logos y torneos)

### Consultas Generales

| Propósito | URL de consulta | Campo de Imagen | 
| ----- | ----- | ----- | 
| Miniatura de cada deporte | `https://www.thesportsdb.com/api/v1/json/123/all_sports.php` | `strSportThumb` o `strSportIcon` | 
| Todos los deportes/ligas | `https://www.thesportsdb.com/api/v1/json/123/all_leagues.php` | (Para obtener `idLeague`) | 
| Escudo de un equipo por ID | `https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=133604` | `teams[0].strBadge` | 
| Imagen de evento por ID | `https://www.thesportsdb.com/api/v1/json/123/lookupevent.php?id=441613` | `events[0].strThumb` / `strPoster` | 

### Ligue 1 y Copas Internacionales

*(Extrae la dirección de la imagen del JSON devuelto en cada URL)*

| Categoría | Logo del campeonato (JSON) | Directorio de equipos o clubes | 
| ----- | ----- | ----- | 
| **Ligue 1 francesa** | [Liga ID: 4334](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4334) | [Buscar equipos](https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=French_Ligue_1) *(límite 10 reqs)* | 
| **UEFA Champions League** | [Liga ID: 4480](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4480) | [Clubes en UEFA](https://www.uefa.com/uefachampionsleague/clubs/) | 
| **UEFA Europa League** | [Liga ID: 4481](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4481) | [Clubes en UEFA](https://www.uefa.com/uefaeuropaleague/clubs/) | 
| **Eurocopa** | [Torneo ID: 4502](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4502) | [Selecciones UEFA](https://www.uefa.com/uefaeuro/teams/) | 
| **UEFA Nations League** | [Torneo ID: 4490](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4490) | [Selecciones UEFA](https://www.uefa.com/uefanationsleague/teams/) | 
| **Copa América** | [Torneo ID: 4499](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4499) | [CONMEBOL](https://copaamerica.com/) | 
| **Copa Oro CONCACAF** | [Torneo ID: 4873](https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4873) | [CONCACAF](https://www.concacaf.com/gold-cup/) | 

**Notas importantes para TheSportsDB:**

* **Escudos vs Banderas:** Para selecciones nacionales, un escudo de federación y una bandera son recursos distintos. Si falta el escudo, no utilices la bandera como reemplazo directo.
* **Ligue 1:** La clave gratuita de TheSportsDB tiene límite de 10 registros por llamada general; valida los participantes faltantes haciendo consultas individuales.
* **Champions y Europa League:** La membresía cambia anualmente. Comprueba cada participante contra los datos de UEFA y obtén la imagen del equipo consultándolo individualmente si no se encuentra ya presente en tus catálogos de ligas nacionales.
