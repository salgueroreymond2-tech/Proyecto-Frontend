import { fetchEspnScoreboard } from './espnClient';
import { fetchBundesligaMatches } from './openLigaDbClient';
import { fetchFootballDataMatches } from './secureProxyClient';
import { fetchSportsDbLeagues, fetchSportsDbSportVisuals } from './theSportsDbClient';
import type { NormalizedLeague, NormalizedSportEvent, NormalizedSportVisual, SportProvider, SportsApiResult } from './types';

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
    id: 'local-champions-league',
    sportId: 'football',
    league: 'UEFA Champions League',
    title: 'Fase de liga 2026-2027',
    status: 'Preparacion',
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

export async function getTournamentEvents(tournamentId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  const footballDataCompetitionByTournament: Record<string, string> = {
    'champions-league': 'CL',
    'premier-league': 'PL',
    laliga: 'PD',
    'serie-a': 'SA',
    'primeira-liga': 'PPL',
  };

  if (tournamentId === 'bundesliga') {
    try {
      const events = await fetchBundesligaMatches(signal);
      return { data: events, provider: 'openligadb', fromFallback: false };
    } catch (error) {
      return {
        data: [],
        provider: 'local',
        fromFallback: true,
        error: error instanceof Error ? error.message : 'No se pudo cargar OpenLigaDB',
      };
    }
  }

  const competitionCode = footballDataCompetitionByTournament[tournamentId];
  if (competitionCode) {
    try {
      const events = await fetchFootballDataMatches(competitionCode, signal);
      return { data: events, provider: 'football-data', fromFallback: false };
    } catch (error) {
      return {
        data: localEvents.filter((event) => event.id === 'local-champions-league'),
        provider: 'local',
        fromFallback: true,
        error: error instanceof Error ? error.message : 'No se pudo cargar Football-Data.org',
      };
    }
  }

  return {
    data: localEvents.filter((event) => event.sportId === 'football'),
    provider: 'local',
    fromFallback: true,
  };
}

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

export async function getSportVisuals(signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportVisual[]>> {
  try {
    const visuals = await fetchSportsDbSportVisuals(signal);
    return { data: visuals, provider: 'thesportsdb', fromFallback: false };
  } catch (error) {
    return {
      data: [],
      provider: 'local',
      fromFallback: true,
      error: error instanceof Error ? error.message : 'No se pudieron cargar los recursos de TheSportsDB',
    };
  }
}

export type { NormalizedLeague, NormalizedSportEvent, NormalizedSportVisual, SportProvider, SportsApiResult };
