import { sportsDbSportNames } from './config';
import type { NormalizedLeague } from './types';

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

const SPORTS_DB_KEY = import.meta.env.VITE_THESPORTSDB_API_KEY || '123';
const SPORTS_DB_BASE_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_KEY}`;

export async function fetchSportsDbLeagues(sportId: string, signal?: AbortSignal): Promise<NormalizedLeague[]> {
  const sportName = sportsDbSportNames[sportId];
  if (!sportName) return [];

  const url = `${SPORTS_DB_BASE_URL}/search_all_leagues.php?s=${encodeURIComponent(sportName)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`TheSportsDB respondio ${response.status}`);
  }

  const payload = await response.json() as SportsDbLeaguesResponse;

  return (payload.leagues || []).slice(0, 10).map((league) => ({
    id: league.idLeague || `${sportId}-${league.strLeague}`,
    sportId,
    name: league.strLeague || league.strLeagueAlternate || sportName,
    country: league.strCountry,
    provider: 'thesportsdb',
  }));
}

