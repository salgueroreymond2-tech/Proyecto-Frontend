export const SPORTS_DB_RESOURCES = {
  baseUrl: 'https://www.thesportsdb.com/api/v1/json/123',
  athleteSearch: (name: string) =>
    `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(name)}`,
  teamSearch: (name: string) =>
    `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(name)}`,
  formulaOneTeams: 'https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Formula_1',
  leagues: {
    ligue1: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4334',
    championsLeague: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4480',
    europaLeague: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4481',
    euro: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4502',
    uefaNationsLeague: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4490',
    copaAmerica: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4499',
    goldCup: 'https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=4873',
  },
  photoSearches: {
    f1: {
      unsplash: 'https://unsplash.com/s/photos/formula-1',
      pexels: 'https://www.pexels.com/search/racing%20car/',
    },
    cycling: {
      unsplash: 'https://unsplash.com/s/photos/cycling-race',
      pexels: 'https://www.pexels.com/search/cycling%20race/',
    },
    golf: {
      unsplash: 'https://unsplash.com/s/photos/golf',
      pexels: 'https://www.pexels.com/search/golf/',
    },
    internationalFootball: {
      unsplash: 'https://unsplash.com/s/photos/international-football',
      pexels: 'https://www.pexels.com/search/international%20football/',
    },
  },
} as const;
