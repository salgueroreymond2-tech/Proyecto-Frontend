import { espnLeagueBySport } from './config';
import type { NormalizedSportEvent } from './types';

type EspnCompetition = {
  competitors?: Array<{
    homeAway?: 'home' | 'away';
    score?: string;
    team?: {
      displayName?: string;
      shortDisplayName?: string;
    };
  }>;
  venue?: {
    fullName?: string;
  };
};

type EspnEvent = {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  status?: {
    type?: {
      description?: string;
      shortDetail?: string;
    };
  };
  competitions?: EspnCompetition[];
  links?: Array<{
    href?: string;
  }>;
};

type EspnScoreboardResponse = {
  events?: EspnEvent[];
};

function getCompetitor(event: EspnEvent, side: 'home' | 'away') {
  return event.competitions?.[0]?.competitors?.find((competitor) => competitor.homeAway === side);
}

function formatScore(event: EspnEvent) {
  const home = getCompetitor(event, 'home');
  const away = getCompetitor(event, 'away');

  if (!home?.score || !away?.score) return undefined;
  return `${away.score} - ${home.score}`;
}

export async function fetchEspnScoreboard(sportId: string, signal?: AbortSignal): Promise<NormalizedSportEvent[]> {
  const config = espnLeagueBySport[sportId];
  if (!config) return [];

  const url = `https://site.api.espn.com/apis/site/v2/sports/${config.sportSlug}/${config.leagueSlug}/scoreboard`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`ESPN ${config.leagueName} respondio ${response.status}`);
  }

  const payload = await response.json() as EspnScoreboardResponse;

  return (payload.events || []).map((event) => {
    const home = getCompetitor(event, 'home');
    const away = getCompetitor(event, 'away');

    return {
      id: event.id || `${config.sportId}-${event.name || event.date}`,
      sportId: config.sportId,
      league: config.leagueName,
      title: event.shortName || event.name || config.leagueName,
      homeTeam: home?.team?.displayName || home?.team?.shortDisplayName,
      awayTeam: away?.team?.displayName || away?.team?.shortDisplayName,
      startsAt: event.date,
      status: event.status?.type?.shortDetail || event.status?.type?.description || 'Programado',
      venue: event.competitions?.[0]?.venue?.fullName,
      score: formatScore(event),
      provider: 'espn',
      sourceUrl: event.links?.[0]?.href || url,
    };
  });
}

