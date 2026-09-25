import { fetchEspnScoreboard } from './espnClient';
import { fetchSportsDbLeagues } from './theSportsDbClient';
import type { NormalizedLeague, NormalizedSportEvent, SportsApiResult } from './types';

const localEvents: NormalizedSportEvent[] = [
  {
    id: 'local-cr-apertura',
    sportId: 'football',
    league: 'Campeonato Nacional de Costa Rica',
    title: 'Apertura 2026',
    status: 'Activo',
    provider: 'local',
  },
  {
    id: 'local-nba',
    sportId: 'basketball',
    league: 'NBA',
    title: 'Temporada regular 2026-2027',
    status: 'Preparacion',
    provider: 'local',
  },
  {
    id: 'local-mlb',
    sportId: 'baseball',
    league: 'MLB',
    title: 'Temporada 2027',
    status: 'Preparacion',
    provider: 'local',
  },
  {
    id: 'local-nfl',
    sportId: 'american-football',
    league: 'NFL',
    title: 'Temporada 2026-2027',
    status: 'Preparacion',
    provider: 'local',
  },
];

export async function getSportEvents(sportId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  try {
    const events = await fetchEspnScoreboard(sportId, signal);
    if (events.length > 0) {
      return { data: events, provider: 'espn', fromFallback: false };
    }

    return {
      data: localEvents.filter((event) => event.sportId === sportId),
      provider: 'local',
      fromFallback: true,
    };
  } catch (error) {
    return {
      data: localEvents.filter((event) => event.sportId === sportId),
      provider: 'local',
      fromFallback: true,
      error: error instanceof Error ? error.message : 'No se pudo cargar ESPN',
    };
  }
}

export async function getLeaguesBySport(sportId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedLeague[]>> {
  try {
    const leagues = await fetchSportsDbLeagues(sportId, signal);
    return { data: leagues, provider: 'thesportsdb', fromFallback: false };
  } catch (error) {
    return {
      data: [],
      provider: 'local',
      fromFallback: true,
      error: error instanceof Error ? error.message : 'No se pudo cargar TheSportsDB',
    };
  }
}

export type { NormalizedLeague, NormalizedSportEvent, SportsApiResult };

