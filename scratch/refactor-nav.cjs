const fs = require('fs');

try {
  let dash = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

  // Add aria labels to round navigation buttons (ChevronLeft and ChevronRight)
  dash = dash.replace(/<button([^>]*)onClick=\{\(\) => setSelectedRound\(selectedRound - 1\)\}([^>]*)>/g, '<button$1onClick={() => setSelectedRound(selectedRound - 1)} aria-label="Jornada anterior" title="Jornada anterior"$2>');
  dash = dash.replace(/<button([^>]*)onClick=\{\(\) => setSelectedRound\(selectedRound \+ 1\)\}([^>]*)>/g, '<button$1onClick={() => setSelectedRound(selectedRound + 1)} aria-label="Siguiente jornada" title="Siguiente jornada"$2>');

  fs.writeFileSync('src/components/DashboardView.tsx', dash);
  console.log('Chevron buttons updated with aria-label');
} catch(e) {
  console.error(e);
}
