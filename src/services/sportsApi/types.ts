export type SportProvider = 'espn' | 'thesportsdb' | 'local';

export type NormalizedSportEvent = {
  id: string;
  sportId: string;
  league: string;
  title: string;
  homeTeam?: string;
  awayTeam?: string;
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

export type SportsApiResult<T> = {
  data: T;
  provider: SportProvider;
  fromFallback: boolean;
  error?: string;
};

