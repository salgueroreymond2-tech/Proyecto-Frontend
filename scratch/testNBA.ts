import { API_SPORTS_DOMAINS, API_SPORTS_KEY } from '../src/services/sportsApi/apiSportsConfig.ts';

async function testBasketball() {
  const url = new URL(`${API_SPORTS_DOMAINS['basketball']}/leagues`);
  url.searchParams.append('search', 'NBA');
  
  const response = await fetch(url.toString(), {
    headers: { 'x-apisports-key': API_SPORTS_KEY }
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data.response, null, 2));
}

testBasketball();
