const fetchPlayers = async () => {
  const r = await fetch('https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/athletes?limit=1000');
  const d = await r.json();
  const arr = d.items;
  const golfers = ['Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Collin Morikawa', 'Viktor Hovland', 'Ludvig Åberg', 'Tommy Fleetwood', 'Hideki Matsuyama', 'Jordan Spieth', 'Ludvig Aberg'];
  
  const map = {};
  for (const item of arr) {
    if (golfers.length === 0) break;
    const rr = await fetch(item['$ref']);
    const dd = await rr.json();
    if (golfers.includes(dd.displayName)) {
      map[dd.displayName] = dd.headshot?.href || dd.flag?.href;
      golfers.splice(golfers.indexOf(dd.displayName), 1);
    }
  }
  console.log(map);
};
fetchPlayers();
