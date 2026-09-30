import { NormalizedSportEvent } from './types';
import { API_SPORTS_DOMAINS, API_SPORTS_KEY } from './apiSportsConfig';

async function fetchApiSportsEndpoint(sport: string, endpoint: string, params: Record<string, string>, signal?: AbortSignal) {
  const domain = API_SPORTS_DOMAINS[sport];
  if (!domain) throw new Error(`Sport ${sport} not supported by API-Sports client yet`);

  const url = new URL(`${domain}${endpoint}`);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'x-apisports-key': API_SPORTS_KEY,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`API-Sports request failed: ${response.statusText}`);
  }

  return response.json();
}

function normalizeFootballFixture(item: any): NormalizedSportEvent {
  const home = item.teams.home.name;
  const away = item.teams.away.name;
  const status = item.fixture.status.long;
  const score = item.goals.home !== null ? `${item.goals.home} - ${item.goals.away}` : undefined;

  return {
    id: `api-sports-football-${item.fixture.id}`,
    sportId: 'football',
    league: item.league.name,
    title: `${home} vs ${away}`,
    status: status,
    score: score,
    startsAt: item.fixture.date,
    provider: 'api-sports',
  };
}

function normalizeBasketballGame(item: any): NormalizedSportEvent {
  const home = item.teams.home.name;
  const away = item.teams.away.name;
  const status = item.status.long;
  const score = item.scores.home.total !== null ? `${item.scores.home.total} - ${item.scores.away.total}` : undefined;

  return {
    id: `api-sports-basketball-${item.id}`,
    sportId: 'basketball',
    league: item.league.name,
    title: `${home} vs ${away}`,
    status: status,
    score: score,
    startsAt: item.date,
    provider: 'api-sports',
  };
}

export async function fetchApiSportsGamesBySport(
  sportId: string,
  date?: string,
  signal?: AbortSignal
): Promise<NormalizedSportEvent[]> {
  const queryDate = date || new Date().toISOString().split('T')[0];

  try {
    if (sportId === 'football') {
      // 2 es UEFA Champions League
      const data = await fetchApiSportsEndpoint(sportId, '/fixtures', { date: queryDate, league: '2', season: '2024' }, signal);
      if (!data.response) return [];
      return data.response.map(normalizeFootballFixture);
    }
    
    if (sportId === 'basketball') {
      // 12 es NBA
      const data = await fetchApiSportsEndpoint(sportId, '/games', { date: queryDate, league: '12', season: '2025' }, signal);
      if (!data.response) return [];
      return data.response.map(normalizeBasketballGame);
    }

    if (sportId === 'baseball') {
      // 1 es MLB
      const data = await fetchApiSportsEndpoint(sportId, '/games', { date: queryDate, league: '1', season: '2025' }, signal);
      if (!data.response) return [];
      return data.response.map(normalizeBasketballGame); // Asumiendo que el formato es similar
    }

    return [];
  } catch (error) {
    console.error(`Error fetching API-Sports for ${sportId}:`, error);
    return [];
  }
}
