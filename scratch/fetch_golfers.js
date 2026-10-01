const fetchGolfer = async (name) => {
  try {
    const res = await fetch('https://site.api.espn.com/apis/search/v2?region=us&lang=en&limit=10&query=' + encodeURIComponent(name));
    const data = await res.json();
    for (const r of (data.results || [])) {
      if (r.type === 'athlete') {
        const url = r.contents?.[0]?.image?.url;
        if (url && url.includes('headshots')) {
          return { displayName: name, headshot: { href: url } };
        }
      }
    }
  } catch(e) {}
  return { displayName: name, headshot: null };
};

const golfers = ['Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Xander Schauffele', 'Collin Morikawa', 'Viktor Hovland', 'Ludvig Aberg', 'Tommy Fleetwood', 'Hideki Matsuyama', 'Jordan Spieth'];
Promise.all(golfers.map(fetchGolfer)).then(res => {
  console.log(JSON.stringify(res, null, 2));
});
