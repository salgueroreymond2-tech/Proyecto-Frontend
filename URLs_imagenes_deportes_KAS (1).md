# URLs de imágenes deportivas para KAS

Actualizado: 25 de septiembre de 2026. Los enlaces de **fotografías** abren colecciones para elegir imágenes concretas; los enlaces de **API** devuelven JSON con URLs de imágenes que se extraen del campo indicado. Una página de búsqueda o una respuesta JSON **no es una URL directa de archivo** y no se debe colocar directamente en `<img src>`.

## Fotografías para el carrusel y las portadas

| Deporte | Unsplash | Pexels |
| --- | --- | --- |
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
| Hockey | https://unsplash.com/s/photos/ice-hockey | https://www.pexels.com/search/ice%20hockey/ |
| Fórmula 1 / automovilismo | https://unsplash.com/s/photos/formula-1 | https://www.pexels.com/search/racing%20car/ |
| Voleibol | https://unsplash.com/s/photos/volleyball | https://www.pexels.com/search/volleyball/ |
| Rugby | https://unsplash.com/s/photos/rugby | https://www.pexels.com/search/rugby/ |
| Balonmano | https://unsplash.com/s/photos/handball | https://www.pexels.com/search/handball/ |
| Ciclismo | https://unsplash.com/s/photos/cycling-race | https://www.pexels.com/search/cycling%20race/ |
| Golf | https://unsplash.com/s/photos/golf | https://www.pexels.com/search/golf/ |

**Licencias:** [Unsplash](https://unsplash.com/license) y [Pexels](https://www.pexels.com/license/) permiten el uso gratuito de sus fotografías conforme a sus condiciones. Verifica marcas, personas y derechos adicionales de cada imagen; una búsqueda puede incluir resultados de otro tipo o sin coincidencias. Si usas sus **APIs**, cumple las [reglas de Unsplash](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) o la [documentación de Pexels](https://www.pexels.com/api/documentation/), respectivamente.

## Escudos, logos y arte de torneos/equipos

TheSportsDB v1 ofrece rutas públicas con clave gratuita `123`. Abre los enlaces, lee el JSON y usa el campo de imagen que realmente aparezca; algunas entidades no tienen imagen. [Documentación oficial](https://www.thesportsdb.com/documentation).

| Imagen | URL de consulta | Campo útil |
| --- | --- | --- |
| Miniatura de cada deporte | https://www.thesportsdb.com/api/v1/json/123/all_sports.php | `sports[].strSportThumb` / `sports[].strSportIcon` si está presente |
| Logo de la Premier League (ejemplo) | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4328 | `leagues[0].strBadge` / `strLogo` / `strPoster` según respuesta |
| Equipos de la Premier League (ejemplo) | https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=English_Premier_League | `teams[].strBadge` / `strLogo` |
| Escudo de un equipo por ID (ejemplo) | https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=133604 | `teams[0].strBadge` |
| Imagen de un evento por ID (ejemplo) | https://www.thesportsdb.com/api/v1/json/123/lookupevent.php?id=441613 | `events[0].strThumb` / `strPoster` según respuesta |
| Ligas de un país y deporte | https://www.thesportsdb.com/api/v1/json/123/search_all_leagues.php?c=Spain&s=Soccer | Obtén el `idLeague`, consulta `lookupleague.php?id=ID` |
| Todos los deportes y ligas disponibles | https://www.thesportsdb.com/api/v1/json/123/all_leagues.php | Encuentra `idLeague` y consulta la liga |

La clave gratuita **limita la cantidad de resultados por consulta**. Para Champions League, Serie A, NBA, MLB, NFL, tenis y UFC, identifica primero el ID de la liga/torneo; no asignes una imagen de otro torneo si la consulta no devuelve coincidencia. Las imágenes de TheSportsDB pueden representar escudos, marcas, atletas o fotografías con derechos propios: revisa sus [condiciones de uso](https://www.thesportsdb.com/docs_terms_of_use.php) y la autorización aplicable a KAS.

## Alternativa con licencia específica por archivo

- [Fotografías deportivas en Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Photographs_of_sports_by_type). Abre **cada archivo** para obtener su URL original, autor y licencia; no todas las imágenes tienen la misma licencia.

## Ampliación: Ligue 1, Fórmula 1 y copas internacionales (26 de septiembre de 2026)

Las siguientes URLs **devuelven JSON**. Extrae la dirección de la imagen desde `strBadge`, `strLogo` o `strPoster` si el campo existe. No pongas la URL del JSON en `<img src>`. Una imagen puede tener fondo transparente, pero comprueba el archivo concreto antes de usarla.

| Categoría | Logo del torneo o campeonato | Equipos o escuderías |
| --- | --- | --- |
| Ligue 1 francesa | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4334 | https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=French_Ligue_1 |
| Fórmula 1 | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4370 | https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Formula_1 |
| UEFA Champions League | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4480 | [Clubes de la temporada en UEFA](https://www.uefa.com/uefachampionsleague/clubs/) |
| UEFA Europa League | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4481 | [Clubes de la temporada en UEFA](https://www.uefa.com/uefaeuropaleague/clubs/) |
| Eurocopa de selecciones | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4502 | [Selecciones UEFA](https://www.uefa.com/uefaeuro/teams/) |
| UEFA Nations League | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4490 | [Selecciones UEFA](https://www.uefa.com/uefanationsleague/teams/) |
| Copa América | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4499 | [Competencia CONMEBOL](https://copaamerica.com/) |
| Copa Oro CONCACAF | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4873 | [Competencia CONCACAF](https://www.concacaf.com/gold-cup/) |
| Mundial de selecciones | https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4429 | [Competencia FIFA](https://www.fifa.com/en/tournaments/mens/worldcup) |

Para **cada club, selección o escudería** de las columnas de participantes, consulta su imagen individual con `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=NOMBRE` o, si tienes el ID, `https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=ID`. En el JSON toma `teams[0].strBadge`. La búsqueda por nombre gratuita devuelve como máximo una coincidencia y puede estar restringida; valida nombre e ID antes de asociar el logo. También puedes obtener IDs en los eventos de la temporada mediante `eventsseason.php?id=ID_LIGA&s=TEMPORADA`, sujeto a su límite gratuito.

**Champions y Europa League:** selecciona la temporada en los enlaces oficiales y agrega solo los clubes que todavía no aparecen en las ligas que ya incluiste (Serie A, Bundesliga, La Liga, Premier League, Primeira Liga y Ligue 1). La membresía cambia por temporada; por eso no hay una lista fija de escudos adicionales. Comprueba cada participante contra UEFA y guarda la relación `torneo + temporada + idTeam + urlLogo`.

**Ligue 1:** la clave gratuita de `search_all_teams.php` devuelve hasta **10 registros**, por lo que no representa necesariamente a todos los clubes. Comprueba los participantes de la [temporada 2026/27](https://www.uefa.com/nationalassociations/fra/domestic/league/1038/) y completa las imágenes mediante consultas individuales.

**Torneos de selecciones de Europa y América:** Eurocopa, Nations League, Copa América y Copa Oro están enlazados arriba. Un escudo de federación y una bandera nacional son imágenes diferentes: si falta el escudo, no lo sustituyas silenciosamente por una bandera. La [licencia y las condiciones de TheSportsDB](https://www.thesportsdb.com/docs_terms_of_use.php) requieren verificar cada obra y los derechos de marcas por separado antes de publicarla.

## Ejemplo para React

```js
const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=133604');
const data = await response.json();
const badgeUrl = data.teams?.[0]?.strBadge ?? null;
// Usa badgeUrl como src solo si es una URL de imagen válida y la licencia lo permite.
```

Para el carrusel, elige una fotografía en la galería y copia la URL de la imagen seleccionada o usa la API autorizada; los enlaces de la tabla son para **selección**, no para mostrar imágenes directamente.
