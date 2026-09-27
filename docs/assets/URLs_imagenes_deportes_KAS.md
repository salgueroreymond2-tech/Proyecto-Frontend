# URLs de imágenes deportivas para KAS

Actualizado: 25 de septiembre de 2026. Los enlaces de **fotografías** abren colecciones para elegir imágenes concretas; los enlaces de **API** devuelven JSON con URLs de imágenes que se extraen del campo indicado. Una página de búsqueda o una respuesta JSON **no es una URL directa de archivo** y no se debe colocar directamente en `<img src>`.

## Fotografías para el carrusel y las portadas

| Deporte | Unsplash | Pexels |
| --- | --- | --- |
| Fútbol | https://unsplash.com/s/photos/soccer-stadium | https://www.pexels.com/search/football%20stadium/ |
| UEFA Champions League / ligas europeas | https://unsplash.com/s/photos/european-football-stadium | https://www.pexels.com/search/soccer%20stadium/ |
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

## Ejemplo para React

```js
const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=133604');
const data = await response.json();
const badgeUrl = data.teams?.[0]?.strBadge ?? null;
// Usa badgeUrl como src solo si es una URL de imagen válida y la licencia lo permite.
```

Para el carrusel, elige una fotografía en la galería y copia la URL de la imagen seleccionada o usa la API autorizada; los enlaces de la tabla son para **selección**, no para mostrar imágenes directamente.
