import { fetchFootballDataMatches } from './secureProxyClient';

export function fetchChampionsLeagueMatches(signal?: AbortSignal) {
  return fetchFootballDataMatches('CL', signal);
}
