# APIs deportivas gratuitas y públicas para King Arthur Sports

Verificado: 25 de septiembre de 2026. **Gratuita** significa un nivel permanente sin pago, aunque pueda requerir registro y tenga cuotas. **Pública** significa documentación y acceso disponibles para desarrolladores; no implica ausencia de clave. La cobertura y la disponibilidad de partidos concretos deben comprobarse antes de prometer una quiniela o marcador en vivo.

| API | Deportes y torneos pertinentes | Acceso gratuito comprobado | Documentación / prueba |
| --- | --- | --- | --- |
| **TheSportsDB v1** | Fútbol, tenis, baloncesto, béisbol, fútbol americano, hockey, MMA y otros; consulta de ligas, equipos, eventos y material gráfico según disponibilidad. | Clave pública `123`; algunas rutas de v1 y datos limitados. Los marcadores en vivo y v2 requieren pago. | [Documentación](https://www.thesportsdb.com/documentation) · [Listar deportes](https://www.thesportsdb.com/api/v1/json/123/all_sports.php) · [Listar ligas](https://www.thesportsdb.com/api/v1/json/123/all_leagues.php) |
| **football-data.org v4** | Fútbol: UEFA Champions League, Serie A italiana, Premier League, La Liga, Bundesliga, Ligue 1, Eredivisie, Primeira Liga, Championship, Serie A brasileña, Mundial y Eurocopa. | Registro y clave gratuitos; 10 peticiones/minuto; solo las competiciones del nivel gratuito. | [Cobertura gratuita](https://www.football-data.org/coverage) · [Inicio rápido](https://www.football-data.org/documentation/quickstart) · `GET https://api.football-data.org/v4/competitions` con cabecera `X-Auth-Token` |
| **API-SPORTS** | Fútbol, baloncesto, NBA, béisbol, hockey, fútbol americano, MMA, rugby, balonmano, voleibol, F1 y otros productos anunciados en su catálogo. | Registro y clave gratuitos; **100 solicitudes/día por API**. Comprobar la cobertura efectiva de la liga y de cada endpoint en el panel gratuito. | [Catálogo y plan](https://api-sports.io/) · [Fútbol](https://api-sports.io/sports/football) · [Baloncesto](https://api-sports.io/sports/basketball) · [MMA](https://api-sports.io/sports/mma) |
| **BALLDONTLIE** | NBA, NFL, MLB y Premier League (EPL). | Cuenta y clave gratuitas; solo endpoints marcados **Free** para cada deporte. No asumir que estadísticas avanzadas o todos los resultados están incluidos. | [Cuenta y niveles](https://www.balldontlie.io/account/) · [NBA](https://nba.balldontlie.io/) · [NFL](https://nfl.balldontlie.io/) · [MLB](https://mlb.balldontlie.io/) · [EPL](https://epl.balldontlie.io/) |
| **OpenLigaDB** | Fútbol alemán, especialmente Bundesliga; otras ligas cargadas por la comunidad. | Sin registro, sin clave y sin cuota publicada; datos bajo ODbL. Los logos enlazados tienen derechos separados. | [Swagger](https://api.openligadb.de/index.html) · [Sitio y licencia](https://openligadb.de/) · [Ejemplo Bundesliga](https://api.openligadb.de/getmatchdata/bl1/2025) |
| **Jolpica-F1** | Fórmula 1: calendario, pilotos, escuderías, clasificación y resultados históricos. | Pública y gratuita para **uso no comercial**; respeta límites de uso y atribución/licencia CC BY-NC-SA. | [Documentación](https://github.com/jolpica/jolpica-f1/blob/main/docs/README.md) · [Condiciones](https://github.com/jolpica/jolpica-f1/blob/main/TERMS.md) · [Ejemplo](https://api.jolpi.ca/ergast/f1/2025.json) |
| **OpenF1** | Fórmula 1: telemetría, sesiones, tiempos y datos históricos desde 2023. | Histórico público sin autenticación; **tiempo real de pago**. | [Documentación](https://openf1.org/docs/) · [Ejemplo](https://api.openf1.org/v1/sessions?year=2024) |

## Mapa rápido para KAS

- **Champions League y Serie A:** football-data.org; API-SPORTS si la competencia y los endpoints necesarios aparecen en el plan gratuito.
- **Fútbol de Costa Rica (UNAFUT):** consultar cobertura concreta en TheSportsDB y API-SPORTS antes de integrarla; ninguna de las fuentes verificadas garantiza gratuitamente partidos, escudos y resultados completos de UNAFUT.
- **Grand Slams, ATP, WTA y Copa del Café:** TheSportsDB permite consultar los torneos y eventos que tenga cargados. No se confirmó aquí una API gratuita permanente que garantice marcadores detallados en vivo para todos esos torneos.
- **NBA, MLB y NFL:** BALLDONTLIE en sus endpoints Free; API-SPORTS y TheSportsDB como alternativas según disponibilidad.
- **UFC / MMA:** API-SPORTS MMA y eventos disponibles en TheSportsDB. Verificar específicamente UFC en la cuenta gratuita.
- **Otros deportes:** comenzar por la lista de deportes y ligas de TheSportsDB y el catálogo de API-SPORTS; la existencia de una categoría no asegura datos para cada torneo.

## Integración responsable

Usa las claves privadas mediante un proxy o función de servidor, nunca dentro de `VITE_` ni del código React público. Guarda en `db.json` solo identificadores, selecciones y pronósticos propios; consulta resultados al proveedor y almacena una copia temporal para ahorrar cuota. Vincula las quinielas con IDs de torneo, partido y equipo del proveedor. Revisa los derechos de escudos y fotografías por separado: una API de datos gratuita no concede automáticamente una licencia sobre las marcas.

**Alcance de “funcional”:** las páginas oficiales documentan rutas y planes vigentes; las rutas sin clave muestran ejemplos para comprobar la respuesta. Las APIs con registro requieren una clave propia antes de verificar una respuesta de su cuenta. No se garantiza disponibilidad continua ni cobertura de cada liga.
