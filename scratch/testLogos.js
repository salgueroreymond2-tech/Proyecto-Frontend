const ESPN_TOURNAMENT_MAP = {
  'champions-league': 'soccer/uefa.champions',
  'premier-league': 'soccer/eng.1',
  'laliga': 'soccer/esp.1',
  'serie-a': 'soccer/ita.1',
  'primeira-liga': 'soccer/por.1',
  'bundesliga': 'soccer/ger.1',
  'ligue-1': 'soccer/fra.1',
  'europa-league': 'soccer/uefa.europa',
  'nations-league': 'soccer/uefa.nations',
  'concacaf-nations-league': 'soccer/concacaf.nations',
  'cr-apertura-2026': 'soccer/crc.1',
  'f1-world-championship': 'racing/f1',
};

async function getLogos() {
  for (const [key, endpoint] of Object.entries(ESPN_TOURNAMENT_MAP)) {
    try {
      const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${endpoint}/scoreboard`);
      if (!response.ok) {
        console.log(`${key}: HTTP ${response.status}`);
        continue;
      }
      const data = await response.json();
      const logo = data.leagues?.[0]?.logos?.[0]?.href || null;
      console.log(`${key}: ${logo}`);
    } catch (e) {
      console.log(`${key}: ERROR ${e.message}`);
    }
  }
}

getLogos();
