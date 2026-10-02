import fs from 'fs';

let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const searchStart = 'function MembershipCalendarDashboard() {';
const searchEndStr = '  return (\n    <div className="mx-auto max-w-6xl space-y-5 px-4 py-4 pb-24">';

const startIdx = content.indexOf(searchStart);
const endIdx = content.indexOf(searchEndStr, startIdx);
if (startIdx === -1 || endIdx === -1) {
    console.log('Not found');
    process.exit(1);
}

const replacement = `function MembershipCalendarDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());

  useEffect(() => {
    let mounted = true;
    async function loadAllEvents() {
      setIsLoading(true);
      try {
        const { getTournamentEvents } = await import('../services/sportsApi');
        const popularTournaments = ['champions-league', 'cr-apertura-2026', 'nba-temporada-regular', 'mlb-temporada-regular', 'ufc-fight-night', 'f1-world-championship', 'us-open', 'the-masters'];
        
        const results = await Promise.all(
          popularTournaments.map(id => getTournamentEvents(id).catch(() => ({ data: [] })))
        );
        
        const allEvents = results.flatMap((r, i) => {
          const tId = popularTournaments[i];
          const summary = findTournamentSummary(tId);
          return (r.data || []).map(e => ({
            id: e.id,
            tournament: summary || { id: tId, name: e.league, sportName: tId, accentColor: '#EA7301' },
            label: e.title,
            date: new Date(e.startsAt || new Date()),
            status: e.status
          }));
        });
        
        if (mounted) setItems(allEvents);
      } catch (err) {
        console.error('Error fetching calendar events', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadAllEvents();
    return () => {
      mounted = false;
    };
  }, []);

  const paidTournaments = [...new Map(items.map((item) => [item.tournament.id, item.tournament])).values()];
  const paidSports = [...new Set(paidTournaments.map((item) => item.tournament?.sportName || item.tournament?.name))];
  const calendarDays = getCalendarGridDays(visibleMonth);
  const currentMonth = visibleMonth.getMonth();
  const eventsByDate = items.reduce<Record<string, typeof items>>((map, item) => {
    const key = getDateKey(item.date);
    map[key] = [...(map[key] || []), item];
    return map;
  }, {});

`;

content = content.substring(0, startIdx) + replacement + content.substring(endIdx);

// Also need to replace the text "Solo se muestran deportes y torneos donde tu cuenta tiene membresia activa."
const textOld = "Solo se muestran deportes y torneos donde tu cuenta tiene membresia activa.";
const textNew = "Se muestran todos los eventos proximos de los torneos activos en KAS, extrayendo datos reales de la API de ESPN.";
content = content.replace(textOld, textNew);

// Also need to replace "Calendario de tus membresias" with "Calendario Global"
content = content.replace("Calendario de tus membresias", "Calendario Global");
content = content.replace("Tus accesos", "Deportes disponibles");

fs.writeFileSync('src/app/App.tsx', content);
console.log('Replaced');
