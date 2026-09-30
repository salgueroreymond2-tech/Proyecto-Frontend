import { fetchEspnScoreboard } from './espnClient';
import { fetchBundesligaMatches } from './openLigaDbClient';
import { fetchFootballDataMatches } from './secureProxyClient';
import { fetchSportsDbLeagues, fetchSportsDbSportVisuals } from './theSportsDbClient';
import { fetchApiSportsGamesBySport } from './apiSportsClient';
import type { NormalizedLeague, NormalizedSportEvent, NormalizedSportVisual, SportProvider, SportsApiResult } from './types';

const formulaOneGrandPrix = [
  'Bahrain Grand Prix',
  'Saudi Arabian Grand Prix',
  'Australian Grand Prix',
  'Japanese Grand Prix',
  'Chinese Grand Prix',
  'Miami Grand Prix',
  'Emilia Romagna Grand Prix',
  'Monaco Grand Prix',
  'Canadian Grand Prix',
  'Spanish Grand Prix',
  'Austrian Grand Prix',
  'British Grand Prix',
  'Hungarian Grand Prix',
  'Belgian Grand Prix',
  'Dutch Grand Prix',
  'Italian Grand Prix',
  'Azerbaijan Grand Prix',
  'Singapore Grand Prix',
  'United States Grand Prix',
  'Mexico City Grand Prix',
  'Sao Paulo Grand Prix',
  'Las Vegas Grand Prix',
  'Qatar Grand Prix',
  'Abu Dhabi Grand Prix',
];

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
    score: '112 - 108 pts',
    provider: 'local',
  },
  {
    id: 'local-mlb',
    sportId: 'baseball',
    league: 'MLB',
    title: 'Temporada 2027',
    status: 'Preparacion',
    score: '5 - 3 carreras',
    provider: 'local',
  },
  {
    id: 'local-nfl',
    sportId: 'american-football',
    league: 'NFL',
    title: 'Temporada 2026-2027',
    status: 'Preparacion',
    score: '27 - 24 pts',
    provider: 'local',
  },
  {
    id: 'local-tennis',
    sportId: 'tennis',
    league: 'ATP / WTA',
    title: 'Carlos Alcaraz vs Jannik Sinner',
    status: 'Agenda',
    score: '2 - 1 sets',
    provider: 'local',
  },
  ...formulaOneGrandPrix.map((title, index) => ({
    id: `local-f1-${index + 1}`,
    sportId: 'f1',
    league: 'Formula 1 World Championship',
    title,
    status: 'Agenda',
    score: index === 0 ? 'Pole: Verstappen' : undefined,
    provider: 'local' as const,
  })),
  {
    id: 'local-cycling',
    sportId: 'cycling',
    league: 'Tour de France',
    title: 'Etapa reina',
    status: 'Agenda',
    score: 'Lider: UAE',
    provider: 'local',
  },
  {
    id: 'local-golf',
    sportId: 'golf',
    league: 'PGA Tour',
    title: 'The Masters - Ronda final',
    status: 'Agenda',
    score: 'Lider: -12',
    provider: 'local',
  },
  {
    id: 'local-mma',
    sportId: 'mma',
    league: 'UFC',
    title: 'Main Event',
    status: 'Agenda',
    score: 'R2 TKO',
    provider: 'local',
  },
  {
    id: 'local-boxing-1',
    sportId: 'boxing',
    league: 'Boxeo Campeonatos Mundiales',
    title: 'Canelo Alvarez vs David Benavidez',
    status: 'Agenda',
    score: 'R7 KO',
    provider: 'local',
  },
  {
    id: 'local-boxing-2',
    sportId: 'boxing',
    league: 'Boxeo PPV Series',
    title: 'Naoya Inoue vs Junto Nakatani',
    status: 'Agenda',
    provider: 'local',
  },
  {
    id: 'local-boxing-3',
    sportId: 'boxing',
    league: 'Boxeo P4P Stars',
    title: 'Oleksandr Usyk vs Tyson Fury',
    status: 'Agenda',
    provider: 'local',
  },
];

export async function getTournamentEvents(tournamentId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  const localSportByTournament: Record<string, string> = {
    'f1-world-championship': 'f1',
  };

  const localSportId = localSportByTournament[tournamentId];
  if (localSportId) {
    return {
      data: localEvents.filter((event) => event.sportId === localSportId),
      provider: 'local',
      fromFallback: true,
    };
  }

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
    const events = await fetchApiSportsGamesBySport(sportId, undefined, signal);
    if (events.length > 0) {
      return { data: events, provider: 'api-sports', fromFallback: false };
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
      error: error instanceof Error ? error.message : 'No se pudo cargar API-Sports',
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
