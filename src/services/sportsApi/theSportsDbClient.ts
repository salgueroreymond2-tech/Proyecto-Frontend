import { sportsDbSportNames } from './config';
import { getCachedJson } from './cache';
import type { NormalizedLeague, NormalizedSportVisual } from './types';

type SportsDbLeague = {
  idLeague?: string;
  strLeague?: string;
  strSport?: string;
  strLeagueAlternate?: string;
  strCountry?: string;
};

type SportsDbLeaguesResponse = {
  leagues?: SportsDbLeague[];
};

type SportsDbSport = {
  strSport?: string;
  strSportThumb?: string;
  strSportIconGreen?: string;
};

type SportsDbSportsResponse = {
  sports?: SportsDbSport[];
};

const SPORTS_DB_KEY = import.meta.env.VITE_THESPORTSDB_API_KEY || '123';
const SPORTS_DB_BASE_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_KEY}`;

export async function fetchSportsDbLeagues(sportId: string, signal?: AbortSignal): Promise<NormalizedLeague[]> {
  const sportName = sportsDbSportNames[sportId];
  if (!sportName) return [];

  const url = `${SPORTS_DB_BASE_URL}/search_all_leagues.php?s=${encodeURIComponent(sportName)}`;
  const payload = await getCachedJson(url, async () => {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`TheSportsDB respondio ${response.status}`);
    return response.json() as Promise<SportsDbLeaguesResponse>;
  }, 5 * 60_000);

  return (payload.leagues || []).slice(0, 10).map((league) => ({
    id: league.idLeague || `${sportId}-${league.strLeague}`,
    sportId,
    name: league.strLeague || league.strLeagueAlternate || sportName,
    country: league.strCountry,
    provider: 'thesportsdb',
  }));
}

export async function fetchSportsDbSportVisuals(signal?: AbortSignal): Promise<NormalizedSportVisual[]> {
  const url = `${SPORTS_DB_BASE_URL}/all_sports.php`;
  const payload = await getCachedJson(url, async () => {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`TheSportsDB respondio ${response.status}`);
    return response.json() as Promise<SportsDbSportsResponse>;
  }, 5 * 60_000);

  return Object.entries(sportsDbSportNames).flatMap(([sportId, sportName]) => {
    const sport = payload.sports?.find((item) => item.strSport?.toLowerCase() === sportName.toLowerCase());
    if (!sport) return [];

    return [{
      sportId,
      thumbnail: sport.strSportThumb,
      icon: sport.strSportIconGreen,
      provider: 'thesportsdb' as const,
    }];
  });
}
