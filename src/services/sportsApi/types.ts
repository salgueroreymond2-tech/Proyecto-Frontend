export type SportProvider = 'espn' | 'football-data' | 'thesportsdb' | 'openligadb' | 'local' | 'api-sports';

export type NormalizedSportEvent = {
  id: string;
  sportId: string;
  league: string;
  title: string;
  homeTeam?: string;
  awayTeam?: string;
  homeLogo?: string;
  awayLogo?: string;
  startsAt?: string;
  status: string;
  venue?: string;
  score?: string;
  provider: SportProvider;
  sourceUrl?: string;
};

export type NormalizedLeague = {
  id: string;
  sportId: string;
  name: string;
  country?: string;
  provider: SportProvider;
};

export type NormalizedSportVisual = {
  sportId: string;
  thumbnail?: string;
  icon?: string;
  provider: SportProvider;
};

export type SportsApiResult<T> = {
  data: T;
  provider: SportProvider;
  fromFallback: boolean;
  error?: string;
  meta?: { leagueLogo?: string; [key: string]: any };
};
