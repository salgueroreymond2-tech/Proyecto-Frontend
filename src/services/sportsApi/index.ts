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

// Map de torneos KAS a las ligas de ESPN
const ESPN_TOURNAMENT_MAP: Record<string, string> = {
  'champions-league': 'soccer/uefa.champions',
  'premier-league': 'soccer/eng.1',
  'laliga': 'soccer/esp.1',
  'serie-a': 'soccer/ita.1',
  'primeira-liga': 'soccer/por.1',
  'bundesliga': 'soccer/ger.1',
  'cr-apertura-2026': 'soccer/crc.1',
  'f1-world-championship': 'racing/f1',
};

export async function getTournamentEvents(tournamentId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  
  if (espnEndpoint) {
    try {
      const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${espnEndpoint}/scoreboard`, { signal });
      const data = await response.json();
      
      const events: NormalizedSportEvent[] = (data.events || []).map((event: any) => {
        const comp = event.competitions?.[0];
        const homeCompetitor = comp?.competitors?.find((c: any) => c.homeAway === 'home') || comp?.competitors?.[0];
        const awayCompetitor = comp?.competitors?.find((c: any) => c.homeAway === 'away') || comp?.competitors?.[1];

        const getEntityName = (c: any) => c?.team?.displayName || c?.athlete?.displayName || c?.team?.name || 'Competidor';
        const homeName = getEntityName(homeCompetitor);
        const awayName = getEntityName(awayCompetitor);
        
        const hasScore = homeCompetitor?.score && awayCompetitor?.score;
        const score = hasScore ? `${homeCompetitor.score} - ${awayCompetitor.score}` : undefined;

        return {
          id: `espn-${event.id}`,
          sportId: tournamentId,
          league: data.leagues?.[0]?.name || event.season?.slug || tournamentId,
          title: event.name || `${homeName} vs ${awayName}`,
          status: event.status?.type?.detail || event.status?.type?.state,
          score,
          startsAt: event.date,
          provider: 'espn',
        };
      });

      return { data: events, provider: 'espn', fromFallback: false };
    } catch (error) {
      return { data: localEvents, provider: 'local', fromFallback: true, error: error instanceof Error ? error.message : 'Error ESPN' };
    }
  }

  return { data: localEvents, provider: 'local', fromFallback: true };
}

export async function getSportEvents(sportId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  try {
    const events = await fetchApiSportsGamesBySport(sportId, undefined, signal);
    if (events.length > 0) {
      return { data: events, provider: 'espn', fromFallback: false };
    }
    return { data: localEvents, provider: 'local', fromFallback: true };
  } catch (error) {
    return {
      data: localEvents,
      provider: 'local',
      fromFallback: true,
      error: error instanceof Error ? error.message : 'No se pudo cargar ESPN',
    };
  }
}

export async function getTournamentStandings(tournamentId: string, signal?: AbortSignal): Promise<any[]> {
  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  if (!espnEndpoint) return [];
  
  try {
    const response = await fetch(`https://site.api.espn.com/apis/v2/sports/${espnEndpoint}/standings`, { signal });
    const data = await response.json();
    return data.children?.[0]?.standings?.entries || [];
  } catch (error) {
    console.error(`Error fetching standings for ${tournamentId}`, error);
    return [];
  }
}

export async function getLeaguesBySport(sportId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedLeague[]>> {
  return { data: [], provider: 'espn', fromFallback: false };
}

export async function getSportVisuals(signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportVisual[]>> {
  return { data: [], provider: 'espn', fromFallback: false };
}

export type { NormalizedLeague, NormalizedSportEvent, NormalizedSportVisual, SportProvider, SportsApiResult };
