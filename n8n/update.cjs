const fs = require('fs');

let text = fs.readFileSync('n8n/arthur-ai-chat-workflow.json', 'utf8');
if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
}
const oldWorkflow = JSON.parse(text);

const promptText = `Eres Sir Arthur, asesor experto de la Quiniela KAS. Responde SIEMPRE en español, BREVE y DIRECTO. Maximo 5-6 lineas. Sin introducciones largas. Ve directo al dato.

FORMATO DE RESPUESTA:
- 1 linea por partido: [emoji] **Local vs Visitante** | Marcador | Estado
- Estado: NS=Por jugar, 1H/2H=En vivo, FT=Finalizado, HT=Medio tiempo
- Si te piden noticias, resume los titulares principales.
- 1 frase corta de motivacion al final si aplica.
- NUNCA inventes resultados ni noticias.

Para consultar datos, usa la herramienta 'consultar_espn_api' y pasale la URL correcta. Estas son las rutas EXACTAS (slugs) de ESPN que funcionan en nuestro marcador:

**Fútbol:**
- cr-apertura-2026 -> soccer/crc.1
- champions-league -> soccer/uefa.champions
- premier-league -> soccer/eng.1
- laliga -> soccer/esp.1
- serie-a -> soccer/ita.1
- bundesliga -> soccer/ger.1
- ligue-1 -> soccer/fra.1
- europa-league -> soccer/uefa.europa
- concacaf-nations-league -> soccer/concacaf.nations.league
- copa-oro -> soccer/concacaf.gold
- copa-america -> soccer/conmebol.america
- eurocopa -> soccer/uefa.euro

**Otros Deportes:**
- f1-world-championship -> racing/f1
- nba -> basketball/nba
- mlb -> baseball/mlb
- nfl -> football/nfl
- atp / wimbledon / us-open / roland-garros -> tennis/atp
- wta -> tennis/wta
- ufc -> mma/ufc
- boxing -> boxing/boxing
- pga-tour / masters -> golf/pga
- tour-de-france / giro / vuelta -> cycling/tour

Las URLs COMPLETAS de ESPN para la herramienta son:
- Marcadores (Partidos/Agenda): https://site.api.espn.com/apis/site/v2/sports/[LIGA]/scoreboard
- Si el usuario te pregunta por fechas específicas (como 'ayer', 'mañana', o 'hace dos días'), DEBES agregarle el parámetro ?dates=YYYYMMDD. Ej: si hoy es 2 de octubre de 2026 y te preguntan por ayer: https://site.api.espn.com/apis/site/v2/sports/[LIGA]/scoreboard?dates=20261001
- Noticias: https://site.api.espn.com/apis/site/v2/sports/[LIGA]/news?lang=es

Si un usuario te pregunta por un equipo específico (ej. "Saprissa ayer"), debes inferir la liga (Costa Rica = soccer/crc.1), calcular la fecha (ayer), descargar el scoreboard de esa liga en esa fecha, y buscar manualmente en el JSON los eventos que mencionen a ese equipo para darle la respuesta correcta.`;

const agentNode = oldWorkflow.nodes.find(n => n.name === 'AI Agent Arthur');
if (agentNode) {
  agentNode.parameters.options.systemMessage = promptText;
}

const tool1 = oldWorkflow.nodes.find(n => n.name === 'consultar_partidos' || n.name === 'consultar_espn_api');
if (tool1) {
  tool1.name = 'consultar_espn_api';
  tool1.parameters.toolDescription = 'USA ESTA HERRAMIENTA para consultar partidos, marcadores o noticias en la API oficial de ESPN. Pasale la URL completa (ej. https://site.api.espn.com/apis/site/v2/sports/soccer/crc.1/scoreboard o con ?dates=YYYYMMDD). SIEMPRE DEVUELVE JSON.';
  tool1.parameters.url = '={{ $fromAI(\'url\', \'URL completa de la API de ESPN (ej. https://site.api.espn.com/apis/site/v2/sports/soccer/crc.1/scoreboard)\', \'string\') }}';
  delete tool1.parameters.sendHeaders;
  delete tool1.parameters.headerParameters;
}

oldWorkflow.nodes = oldWorkflow.nodes.filter(n => n.name !== 'consultar_equipos_y_tablas');
if (oldWorkflow.connections['consultar_equipos_y_tablas']) {
  delete oldWorkflow.connections['consultar_equipos_y_tablas'];
}
if (oldWorkflow.connections['consultar_partidos']) {
  oldWorkflow.connections['consultar_espn_api'] = oldWorkflow.connections['consultar_partidos'];
  delete oldWorkflow.connections['consultar_partidos'];
}

oldWorkflow.name = 'Arthur AI Agent - ESPN & OpenRouter';

fs.writeFileSync('n8n/arthur-espn-openrouter-workflow.json', JSON.stringify(oldWorkflow, null, 2));
console.log('Done');
