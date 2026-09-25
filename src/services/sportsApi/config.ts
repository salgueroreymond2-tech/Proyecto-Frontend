export type EspnLeagueConfig = {
  sportId: string;
  sportSlug: string;
  leagueSlug: string;
  leagueName: string;
};

export const espnLeagueBySport: Record<string, EspnLeagueConfig> = {
  football: {
    sportId: 'football',
    sportSlug: 'soccer',
    leagueSlug: 'crc.1',
    leagueName: 'Costa Rica Primera Division',
  },
  basketball: {
    sportId: 'basketball',
    sportSlug: 'basketball',
    leagueSlug: 'nba',
    leagueName: 'NBA',
  },
  baseball: {
    sportId: 'baseball',
    sportSlug: 'baseball',
    leagueSlug: 'mlb',
    leagueName: 'MLB',
  },
  'american-football': {
    sportId: 'american-football',
    sportSlug: 'football',
    leagueSlug: 'nfl',
    leagueName: 'NFL',
  },
};

export const sportsDbSportNames: Record<string, string> = {
  football: 'Soccer',
  basketball: 'Basketball',
  baseball: 'Baseball',
  'american-football': 'American Football',
  tennis: 'Tennis',
  mma: 'Fighting',
};

