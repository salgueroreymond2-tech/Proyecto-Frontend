import { NormalizedSportEvent } from './types';

// Mapeo de deportes KAS hacia endpoints de ESPN
const ESPN_ENDPOINTS: Record<string, string> = {
  football: 'soccer/uefa.champions', // Se podría expandir a array si quisieras varias ligas
  basketball: 'basketball/nba',
  baseball: 'baseball/mlb',
  mma: 'mma/ufc',
  motorsports: 'racing/f1',
  tennis: 'tennis/atp'
};

function normalizeEspnEvent(event: any, sportId: string): NormalizedSportEvent {
  const comp = event.competitions[0];
  const homeCompetitor = comp.competitors.find((c: any) => c.homeAway === 'home') || comp.competitors[0];
  const awayCompetitor = comp.competitors.find((c: any) => c.homeAway === 'away') || comp.competitors[1];

  const getEntityName = (c: any) => c?.team?.displayName || c?.athlete?.displayName || c?.team?.name || 'Competidor';
  
  const homeName = getEntityName(homeCompetitor);
  const awayName = getEntityName(awayCompetitor);
  
  const hasScore = homeCompetitor?.score && awayCompetitor?.score;
  const score = hasScore ? `${homeCompetitor.score} - ${awayCompetitor.score}` : undefined;

  return {
    id: `espn-${event.id}`,
    sportId,
    league: event.season?.slug || sportId,
    title: event.name || `${homeName} vs ${awayName}`,
    status: event.status.type.detail || event.status.type.state,
    score,
    startsAt: event.date,
    provider: 'espn', // Cambiado a espn
  };
}

export async function fetchApiSportsGamesBySport(
  sportId: string,
  date?: string,
  signal?: AbortSignal
): Promise<NormalizedSportEvent[]> {
  const endpoint = ESPN_ENDPOINTS[sportId];
  if (!endpoint) return [];

  // ESPN format para soccer no soporta fechas exactas a menos que sea muy preciso,
  // pero para los demás podemos pasar la fecha. Si es soccer y no hay fecha, no pasamos nada
  // Para estandarizar, si el usuario pasa date YYYY-MM-DD, lo convertimos a YYYYMMDD
  let url = `https://site.api.espn.com/apis/site/v2/sports/${endpoint}/scoreboard`;
  
  if (date) {
    const formattedDate = date.replace(/-/g, '');
    url += `?dates=${formattedDate}`;
  }

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      console.warn(`ESPN API retornó ${response.status} para ${sportId}`);
      return [];
    }

    const data = await response.json();
    if (!data.events || data.events.length === 0) return [];

    return data.events.map((e: any) => normalizeEspnEvent(e, sportId));
  } catch (error) {
    console.error(`Error fetching ESPN API for ${sportId}:`, error);
    return [];
  }
}
