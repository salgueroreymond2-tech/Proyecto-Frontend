const fs = require('fs');

// 1. TeamBadge.tsx
try {
  let badgeContent = fs.readFileSync('src/components/TeamBadge.tsx', 'utf8');
  badgeContent = badgeContent.replace(/alt=\{team\.name\}/g, 'alt={`Escudo del equipo ${team.name}`}');
  fs.writeFileSync('src/components/TeamBadge.tsx', badgeContent);
  console.log('TeamBadge updated');
} catch(e) {
  console.error(e);
}

// 2. DashboardView.tsx
try {
  let dash = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

  // HTML Semantics & Landmarks
  dash = dash.replace(/<div className="space-y-5 pb-24 max-w-6xl mx-auto px-4 pt-2">/, '<main role="main" aria-label="Dashboard del torneo" tabIndex={-1} id="main-content" className="space-y-5 pb-24 max-w-6xl mx-auto px-4 pt-2">');
  dash = dash.replace(/<\/div>\s*$/, '</main>\n');

  // Sections
  dash = dash.replace(/<div className="space-y-3 pt-2">/g, '<section aria-labelledby="resto-jornada-heading" role="region" className="space-y-3 pt-2">');
  dash = dash.replace(/<h2 className="text-xl/g, '<h2 id="resto-jornada-heading" className="text-xl');

  // Add aria-live for Agenda
  dash = dash.replace(/<div className="space-y-3">\s*\{isLoadingAgenda \? \(/g, '<div className="space-y-3" aria-live="polite" aria-atomic="true" aria-busy={isLoadingAgenda}>\n          {isLoadingAgenda ? (');

  // Add aria-labels for matches
  dash = dash.replace(/className="rounded-xl bg-\[#221824\] border border-\[#3c313e\]\/80 hover:border-\[#bf00ff\]\/60 p-4 transition-all duration-200 shadow-md"/g, 'className="rounded-xl bg-[#221824] border border-[#3c313e]/80 hover:border-[#bf00ff]/60 p-4 transition-all duration-200 shadow-md" role="article" tabIndex={0} aria-label={`Partido: ${homeTeam.name} contra ${awayTeam.name}, a las ${match.time}`}');

  fs.writeFileSync('src/components/DashboardView.tsx', dash);
  console.log('DashboardView updated');
} catch(e) {
  console.error(e);
}
