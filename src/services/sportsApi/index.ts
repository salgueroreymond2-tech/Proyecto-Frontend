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
  'ligue-1': 'soccer/fra.1',
  'europa-league': 'soccer/uefa.europa',
  'nations-league': 'soccer/uefa.nations',
  'concacaf-nations-league': 'soccer/concacaf.nations.league',
  'copa-oro': 'soccer/concacaf.gold',
  'copa-america': 'soccer/conmebol.america',
  'eurocopa': 'soccer/uefa.euro',
  'cr-apertura-2026': 'soccer/crc.1',
  'f1-world-championship': 'racing/f1',
  'nba-temporada-regular': 'basketball/nba',
  'nba-playoffs': 'basketball/nba',
  'nba-finals': 'basketball/nba',
  'mlb-temporada-regular': 'baseball/mlb',
  'mlb-postseason': 'baseball/mlb',
  'world-series': 'baseball/mlb',
  'nfl-temporada-regular': 'football/nfl',
  'nfl-playoffs': 'football/nfl',
  'super-bowl': 'football/nfl',
  'atp-masters': 'tennis/atp',
  'wta-masters': 'tennis/wta',
  'australian-open': 'tennis/atp',
  'wimbledon': 'tennis/atp',
  'us-open': 'tennis/atp',
  'roland-garros': 'tennis/atp',
  'ufc-fight-night': 'mma/ufc',
  'ufc-ppv': 'mma/ufc',
  'campeonatos-mundiales': 'boxing/boxing',
  'veladas-estelares': 'boxing/boxing',
  'pga-tour': 'golf/pga',
  'the-masters': 'golf/pga',
  'ryder-cup': 'golf/pga',
  'tour-de-france': 'cycling/tour',
  'giro-d-italia': 'cycling/giro',
  'la-vuelta': 'cycling/vuelta',
  'vuelta-a-espana': 'cycling/vuelta',
};

const CUSTOM_LEAGUE_LOGOS: Record<string, string> = {
  // Football - from ESPN league logos
  'cr-apertura-2026': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2245.png',
  'champions-league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png',
  'concacaf-nations-league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2406.png',
  'copa-oro': 'https://a.espncdn.com/i/leaguelogos/soccer/500/59.png',
  'copa-america': 'https://a.espncdn.com/i/leaguelogos/soccer/500/83.png',
  'eurocopa': 'https://a.espncdn.com/i/leaguelogos/soccer/500/74.png',
  // Basketball
  'nba-temporada-regular': 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png',
  // Baseball
  'mlb-temporada-regular': 'https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png',
  // Tennis - ESPN sport icon
  'australian-open': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  'roland-garros': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  'wimbledon': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  'us-open': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  'atp-masters': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  'wta-masters': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-tennis.png&w=80&h=80',
  // Golf - ESPN PGA Tour
  'the-masters': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/pgatour.png',
  'ryder-cup': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/pgatour.png',
  // Cycling - ESPN sport icon
  'tour-de-france': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-cycling.png&w=80&h=80',
  'giro-d-italia': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-cycling.png&w=80&h=80',
  'la-vuelta': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-cycling.png&w=80&h=80',
  'uci-world-championships': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-cycling.png&w=80&h=80',
  // MMA - ESPN UFC
  'ufc-fight-night': 'https://a.espncdn.com/i/teamlogos/leagues/500/ufc.png',
  'ufc-ppv-series': 'https://a.espncdn.com/i/teamlogos/leagues/500/ufc.png',
  'ufc-championship-events': 'https://a.espncdn.com/i/teamlogos/leagues/500/ufc.png',
  // Boxing - ESPN sport icon
  'wbc-world-boxing-council': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png&w=80&h=80',
  'wba-world-boxing-association': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png&w=80&h=80',
  'ibf-international-boxing-federation': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png&w=80&h=80',
  'wbo-world-boxing-organization': 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png&w=80&h=80',
  // F1
  'f1-world-championship': 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/f1.png',
};

export async function getTournamentEvents(tournamentId: string, signal?: AbortSignal, dateRange?: string): Promise<SportsApiResult<NormalizedSportEvent[]>> {
  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  
  if (espnEndpoint) {
    try {
      let url = `https://site.api.espn.com/apis/site/v2/sports/${espnEndpoint}/scoreboard`;
      if (dateRange) url += `?dates=${dateRange}`;
      const response = await fetch(url, { signal });
      const data = await response.json();
      
      const events: NormalizedSportEvent[] = (data.events || []).map((event: any) => {
        const comp = event.competitions?.[0] || event.groupings?.[0]?.competitions?.[0];
        const homeCompetitor = comp?.competitors?.find((c: any) => c.homeAway === 'home') || comp?.competitors?.[0];
        const awayCompetitor = comp?.competitors?.find((c: any) => c.homeAway === 'away') || comp?.competitors?.[1];

        const getEntityName = (c: any) => c?.team?.displayName || c?.athlete?.displayName || c?.athlete?.fullName || c?.team?.name || 'Competidor';
        const getEntityLogo = (c: any) => 
          c?.team?.logo || 
          c?.team?.logos?.[0]?.href || 
          c?.athlete?.headshot?.href || 
          (typeof c?.athlete?.headshot === 'string' ? c?.athlete?.headshot : null) || 
          c?.athlete?.flag?.href || 
          (typeof c?.athlete?.flag === 'string' ? c?.athlete?.flag : null);
        
        const homeName = getEntityName(homeCompetitor);
        const awayName = getEntityName(awayCompetitor);
        const homeLogo = getEntityLogo(homeCompetitor);
        const awayLogo = getEntityLogo(awayCompetitor);
        
        const hasScore = homeCompetitor?.score && awayCompetitor?.score;
        const score = hasScore ? `${homeCompetitor.score} - ${awayCompetitor.score}` : undefined;

        return {
          id: `espn-${event.id}`,
          sportId: tournamentId,
          league: data.leagues?.[0]?.name || event.season?.slug || tournamentId,
          title: event.name || `${homeName} vs ${awayName}`,
          homeTeam: homeName,
          awayTeam: awayName,
          homeLogo,
          awayLogo,
          status: event.status?.type?.detail || event.status?.type?.state,
          score,
          startsAt: event.date,
          provider: 'espn',
        };
      });

      let leagueLogo = data.leagues?.[0]?.logos?.[0]?.href;
      if (CUSTOM_LEAGUE_LOGOS[tournamentId]) leagueLogo = CUSTOM_LEAGUE_LOGOS[tournamentId];

      return { data: events, provider: 'espn', fromFallback: false, meta: { leagueLogo } };
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

export async function getTournamentStandings(tournamentId: string, signal?: AbortSignal): Promise<{ groupName: string; entries: any[] }[]> {
  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  if (!espnEndpoint) return [];
  
  try {
    const response = await fetch(`https://site.api.espn.com/apis/v2/sports/${espnEndpoint}/standings`, { signal });
    const data = await response.json();
    
    // Si la competencia tiene multiples grupos (como la Nations League o formatos de grupos), 
    // devolvemos los grupos separados.
    if (data.children && data.children.length > 0) {
      return data.children.map((child: any) => ({
        groupName: child.name || 'Posiciones',
        entries: child.standings?.entries || []
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching standings for ${tournamentId}`, error);
    return [];
  }
}

export async function getTournamentTopScorers(tournamentId: string, signal?: AbortSignal): Promise<any[]> {
  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  if (!espnEndpoint) return [];
  
  try {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${espnEndpoint}/statistics`, { signal });
    const data = await response.json();
    const goalsLeaders = data.stats?.find((s: any) => s.name === 'goalsLeaders');
    return goalsLeaders?.leaders || [];
  } catch (error) {
    console.error(`Error fetching top scorers for ${tournamentId}`, error);
    return [];
  }
}

export async function getLeaguesBySport(sportId: string, signal?: AbortSignal): Promise<SportsApiResult<NormalizedLeague[]>> {
  return { data: [], provider: 'espn', fromFallback: false };
}

export async function getTournamentLogo(tournamentId: string, signal?: AbortSignal): Promise<string | null> {
  // Manual overrides para logos que ESPN no tiene correctos o actualizados
  if (CUSTOM_LEAGUE_LOGOS[tournamentId]) return CUSTOM_LEAGUE_LOGOS[tournamentId];

  const espnEndpoint = ESPN_TOURNAMENT_MAP[tournamentId];
  if (!espnEndpoint) return null;
  
  try {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${espnEndpoint}/scoreboard`, { signal });
    const data = await response.json();
    return data.leagues?.[0]?.logos?.[0]?.href || null;
  } catch (error) {
    return null;
  }
}

export async function getSportVisuals(signal?: AbortSignal): Promise<SportsApiResult<NormalizedSportVisual[]>> {
  return { data: [], provider: 'espn', fromFallback: false };
}

export type { NormalizedLeague, NormalizedSportEvent, NormalizedSportVisual, SportProvider, SportsApiResult };
