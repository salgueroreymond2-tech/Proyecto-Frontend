import fs from 'fs';
import path from 'path';

const API_STANDINGS = 'https://site.api.espn.com/apis/v2/sports/soccer/crc.1/standings';
const API_SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/soccer/crc.1/scoreboard?dates=2026&limit=1000';
const API_STATS = 'https://site.api.espn.com/apis/site/v2/sports/soccer/crc.1/statistics';

// Map ESPN team IDs or names to our internal IDs
const teamMapping = {
  'Saprissa': 'sap',
  'Deportivo Saprissa': 'sap',
  'Alajuelense': 'lda',
  'L.D. Alajuelense': 'lda',
  'Herediano': 'csh',
  'C.S. Herediano': 'csh',
  'Cartaginés': 'csc',
  'C.S. Cartaginés': 'csc',
  'San Carlos': 'sca',
  'A.D. San Carlos': 'sca',
  'Puntarenas': 'pfc',
  'Puntarenas F.C.': 'pfc',
  'Sporting FC': 'spo',
  'Sporting San José': 'spo',
  'Sporting F.C.': 'spo',
  'Pérez Zeledón': 'mpz',
  'Municipal Pérez Zeledón': 'mpz',
  'Guanacasteca': 'adg', // They might be in ESPN but not in our fixture
  'Santos': 'san', // Santos de Guápiles
  'Santa Ana': 'sta', 
  'Liberia': 'lib', // Municipal Liberia
  'Escorpiones F.C.': 'esc',
  'Inter San Carlos': 'isc'
};

function getInternalTeamId(espnName) {
  return teamMapping[espnName] || null;
}

async function run() {
  console.log('Fetching ESPN Standings...');
  const resStandings = await fetch(API_STANDINGS);
  const standingsData = await resStandings.json();

  console.log('Fetching ESPN Schedule...');
  const resScoreboard = await fetch(API_SCOREBOARD);
  const scoreboardData = await resScoreboard.json();

  console.log('Fetching ESPN Statistics...');
  const resStats = await fetch(API_STATS);
  const statsData = await resStats.json();

  // 1. UPDATE TEAMS.TS WITH STAR PLAYERS
  console.log('Processing Top Scorers...');
  const goalsLeaders = statsData.stats?.find(s => s.name === 'goalsLeaders')?.leaders || [];
  
  // Group scorers by team name
  const teamScorers = {};
  goalsLeaders.forEach(leader => {
    const teamName = leader.athlete?.team?.displayName || leader.athlete?.team?.name;
    const internalId = getInternalTeamId(teamName);
    if (internalId) {
      if (!teamScorers[internalId]) teamScorers[internalId] = [];
      teamScorers[internalId].push(leader.athlete.displayName);
    }
  });

  const teamsFilePath = path.join(process.cwd(), 'src/data/teams.ts');
  let teamsFileContent = fs.readFileSync(teamsFilePath, 'utf-8');

  // Regex to replace starPlayers array
  for (const [teamId, players] of Object.entries(teamScorers)) {
    if (players.length > 0) {
      // Find the team block in the TS file and replace starPlayers
      // This is a naive but effective replacement for our known teams.ts structure
      const regex = new RegExp(`(id:\\s*'${teamId}'[\\s\\S]*?starPlayers:\\s*\\[)([^\\]]*)(\\])`, 'g');
      teamsFileContent = teamsFileContent.replace(regex, (match, p1, p2, p3) => {
        const quotedPlayers = players.map(p => `'${p}'`).join(', ');
        return `${p1}${quotedPlayers}${p3}`;
      });
    }
  }
  fs.writeFileSync(teamsFilePath, teamsFileContent, 'utf-8');
  console.log('Updated src/data/teams.ts with latest players from ESPN');

  // 2. CREATE A NEW FIXTURE/CALENDAR FILE
  console.log('Processing Schedule...');
  const partidos = [];
  let roundCounter = 1;
  const events = scoreboardData.events || [];
  
  // Group events by some date/round logic if ESPN doesn't provide rounds easily.
  // ESPN scoreboard gives dates, we can just map them directly.
  events.forEach((event, index) => {
    const comp = event.competitions?.[0];
    if (!comp) return;

    const homeComp = comp.competitors.find(c => c.homeAway === 'home');
    const awayComp = comp.competitors.find(c => c.homeAway === 'away');
    
    if (!homeComp || !awayComp) return;

    const homeName = homeComp.team.displayName || homeComp.team.name;
    const awayName = awayComp.team.displayName || awayComp.team.name;

    const homeId = getInternalTeamId(homeName);
    const awayId = getInternalTeamId(awayName);

    if (!homeId || !awayId) return; // Skip matches with teams we don't track

    // Format date DD.MM
    const dateObj = new Date(event.date);
    const dateStr = `${dateObj.getDate().toString().padStart(2, '0')}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;

    // Status logic
    const statusType = event.status?.type || {};
    const statusLower = (statusType.name || '').toLowerCase();
    const isFinished = statusType.completed === true || statusLower.includes('final') || statusLower.includes('full_time') || statusLower === 'status_postponed';
    const timeStr = isFinished ? 'Finalizado' : statusType.shortDetail || 'TBD';
    
    const localScore = isFinished ? parseInt(homeComp.score || '0', 10) : 0;
    const awayScore = isFinished ? parseInt(awayComp.score || '0', 10) : 0;

    // Estimate round based on index if no clear round is provided
    const round = event.season?.type === 1 ? Math.floor(index / 6) + 1 : 19; // Roughly 6 matches per round

    const reverseMapping = {
      'sap': 'Deportivo Saprissa',
      'lda': 'L.D. Alajuelense',
      'csh': 'C.S. Herediano',
      'csc': 'C.S. Cartaginés',
      'sca': 'A.D. San Carlos',
      'pfc': 'Puntarenas F.C.',
      'spo': 'Sporting F.C.',
      'mpz': 'Municipal Pérez Zeledón',
      'esc': 'Escorpiones F.C.',
      'isc': 'Inter San Carlos'
    };

    partidos.push({
      id_partido: parseInt(event.id, 10) || (index + 1000),
      semana: `Semana ${round}`,
      fecha: dateStr,
      equipo_local: reverseMapping[homeId] || homeName,
      equipo_visitante: reverseMapping[awayId] || awayName,
      marcador: {
        local: localScore,
        visitante: awayScore,
        texto: timeStr
      }
    });
  });

  const calendarioObj = {
    fuente: {
      organizacion: "ESPN API (Actualizado)",
      url: "https://site.api.espn.com/",
      titulo: "Calendario",
      liga: "costarica",
      competition_id: 2373,
      fase: "Fase Regular"
    },
    filtros_disponibles: {
      semanas: ["Todas las Semanas", ...Array.from({length: 22}, (_, i) => `Semana ${i+1}`)]
    },
    partidos: partidos
  };

  const calFilePath = path.join(process.cwd(), 'data/calendario_unafut.json');
  fs.writeFileSync(calFilePath, JSON.stringify(calendarioObj, null, 2), 'utf-8');
  console.log('Updated data/calendario_unafut.json with latest schedule from ESPN');
  console.log('Data fetch and update complete!');
}

run().catch(console.error);
