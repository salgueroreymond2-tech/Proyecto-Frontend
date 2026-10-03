const fs = require('fs');
let content = fs.readFileSync('src/data/teams.ts', 'utf8');

const map = {
  'sap': 'https://a.espncdn.com/i/teamlogos/soccer/500/858.png',
  'lda': 'https://a.espncdn.com/i/teamlogos/soccer/500/2057.png',
  'csh': 'https://a.espncdn.com/i/teamlogos/soccer/500/862.png',
  'csc': 'https://a.espncdn.com/i/teamlogos/soccer/500/7239.png',
  'sca': 'https://a.espncdn.com/i/teamlogos/soccer/500/859.png',
  'pfc': 'https://a.espncdn.com/i/teamlogos/soccer/500/7237.png',
  'spo': 'https://a.espncdn.com/i/teamlogos/soccer/500/20705.png',
  'mpz': 'https://a.espncdn.com/i/teamlogos/soccer/500/7234.png',
  'esc': 'https://a.espncdn.com/i/teamlogos/soccer/500/132447.png',
  'isc': 'https://a.espncdn.com/i/teamlogos/soccer/500/131790.png'
};

for (const [id, url] of Object.entries(map)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?logoUrl:\\s*)UNAFUT_LOGOS\\[[^\\]]+\\]`, 'g');
  content = content.replace(regex, `$1'${url}'`);
}

fs.writeFileSync('src/data/teams.ts', content, 'utf8');
console.log('Done!');
