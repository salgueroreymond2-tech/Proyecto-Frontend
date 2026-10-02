const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');
const search = `            <div className="mt-3 space-y-2">
              {nextMatches.map((match) => {`;
const startIdx = content.indexOf(search);
if (startIdx === -1) {
  console.log('Not found');
  process.exit(1);
}
const endSearch = `              })}
            </div>`;
const endIdx = content.indexOf(endSearch, startIdx) + endSearch.length;
const replacement = `            <div className="mt-3 space-y-2">
              {isLoadingAgenda ? (
                <div className="h-16 animate-pulse rounded-lg bg-black/25 w-full" />
              ) : agendaEvents.length > 0 ? (
                agendaEvents.slice(0, 5).map((match) => (
                  <button
                    key={match.id}
                    className="w-full rounded-lg bg-black/25 px-3 py-2 text-left hover:bg-black/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#d5c0d7]">
                      <span>{new Date(match.startsAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(match.startsAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="flex items-center gap-2 truncate text-sm font-heading font-bold text-white">
                        {match.homeTeam}
                        <span className="text-[#d5c0d7]">vs</span>
                        {match.awayTeam}
                      </p>
                      {match.score && <span className="font-mono text-xs text-[#EA7301]">{match.score}</span>}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-sm text-[#d5c0d7]">No hay eventos proximos</p>
              )}
            </div>`;
content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log('Replaced');
