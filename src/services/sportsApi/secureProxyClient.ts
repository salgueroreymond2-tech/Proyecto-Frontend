import type { NormalizedSportEvent } from './types';

type SecureFootballDataMatch = {
  id: number;
  utcDate?: string;
  status?: string;
  homeTeam?: { name?: string; shortName?: string };
  awayTeam?: { name?: string; shortName?: string };
  score?: { fullTime?: { home?: number | null; away?: number | null } };
  competition?: { name?: string };
};

type SecureFootballDataResponse = { matches?: SecureFootballDataMatch[] };

const proxyBaseUrl = (import.meta.env.VITE_SPORTS_PROXY_URL || '/api').replace(/\/$/, '');

export async function fetchFootballDataMatches(competitionCode: string, signal?: AbortSignal): Promise<NormalizedSportEvent[]> {
  const response = await fetch(`${proxyBaseUrl}/football-data/competitions/${competitionCode}/matches`, { signal });
  if (!response.ok) throw new Error(`Proxy Football-Data respondio ${response.status}`);

  const payload = await response.json() as SecureFootballDataResponse;
  return (payload.matches || []).slice(0, 12).map((match) => {
    const homeTeam = match.homeTeam?.name || match.homeTeam?.shortName || 'Local';
    const awayTeam = match.awayTeam?.name || match.awayTeam?.shortName || 'Visita';
    const homeScore = match.score?.fullTime?.home;
    const awayScore = match.score?.fullTime?.away;
    const score = homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined
      ? undefined
      : `${awayScore} - ${homeScore}`;

    return {
      id: `football-data-${competitionCode}-${match.id}`,
      sportId: 'football',
      league: match.competition?.name || competitionCode,
      title: `${homeTeam} vs ${awayTeam}`,
      homeTeam,
      awayTeam,
      startsAt: match.utcDate,
      status: match.status || 'Programado',
      score,
      provider: 'football-data',
      sourceUrl: 'https://www.football-data.org/',
    };
  });
}
