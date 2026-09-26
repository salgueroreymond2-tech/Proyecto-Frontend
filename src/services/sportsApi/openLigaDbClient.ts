import { getCachedJson } from './cache';
import type { NormalizedSportEvent } from './types';

type OpenLigaTeam = {
  teamName?: string;
};

type OpenLigaResult = {
  pointsTeam1?: number;
  pointsTeam2?: number;
  resultTypeID?: number;
};

type OpenLigaMatch = {
  matchID?: number;
  matchDateTimeUTC?: string;
  matchIsFinished?: boolean;
  group?: { groupName?: string };
  team1?: OpenLigaTeam;
  team2?: OpenLigaTeam;
  matchResults?: OpenLigaResult[];
};

function currentSeason() {
  return new Date().getFullYear();
}

function getScore(match: OpenLigaMatch) {
  const result = match.matchResults?.find((item) => item.resultTypeID === 2) || match.matchResults?.at(-1);
  if (result?.pointsTeam1 === undefined || result?.pointsTeam2 === undefined) return undefined;
  return `${result.pointsTeam2} - ${result.pointsTeam1}`;
}

export async function fetchBundesligaMatches(signal?: AbortSignal): Promise<NormalizedSportEvent[]> {
  const season = currentSeason();
  const url = `https://api.openligadb.de/getmatchdata/bl1/${season}`;
  const payload = await getCachedJson(url, async () => {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`OpenLigaDB respondio ${response.status}`);
    return response.json() as Promise<OpenLigaMatch[]>;
  });

  return payload.slice(0, 12).map((match) => {
    const homeTeam = match.team1?.teamName || 'Local';
    const awayTeam = match.team2?.teamName || 'Visita';

    return {
      id: `openligadb-bl1-${match.matchID || `${homeTeam}-${awayTeam}`}`,
      sportId: 'football',
      league: 'Bundesliga',
      title: `${homeTeam} vs ${awayTeam}`,
      homeTeam,
      awayTeam,
      startsAt: match.matchDateTimeUTC,
      status: match.matchIsFinished ? 'Finalizado' : match.group?.groupName || 'Programado',
      score: getScore(match),
      provider: 'openligadb',
      sourceUrl: 'https://openligadb.de/',
    };
  });
}
