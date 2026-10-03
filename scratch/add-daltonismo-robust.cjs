const fs = require('fs');

try {
  let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

  // Insert public daltonismo button before public theme button
  nav = nav.replace(/<button[\s\S]*?onClick=\{onToggleTheme\}[\s\S]*?aria-label=\{colorMode === 'dark' \? 'Activar modo claro' : 'Activar modo oscuro'\}/g, (match, offset, str) => {
    // Determine if this is the public button (rounded-xl) or private (rounded-full)
    const isPublic = match.includes('rounded-xl');
    
    if (isPublic) {
      return `<button
              type="button"
              onClick={toggleDaltonismo}
              className="rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors mr-2"
              aria-label="Alternar modo daltonismo"
              title="Modo daltonismo (Alto Contraste)"
            >
              <Eye className={\`w-4 h-4 \${daltonismoMode ? 'text-[#00f0ff]' : 'text-zinc-400'}\`} aria-hidden="true" />
            </button>\n            ` + match;
    } else {
      return `<button
            type="button"
            onClick={toggleDaltonismo}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors mr-1"
            aria-label="Alternar modo daltonismo"
            title="Modo daltonismo (Alto Contraste)"
          >
            <Eye className={\`w-4 h-4 \${daltonismoMode ? 'text-[#00f0ff]' : 'text-[#eeddee]/80'}\`} aria-hidden="true" />
          </button>\n          ` + match;
    }
  });

  fs.writeFileSync('src/components/Navbar.tsx', nav);
  console.log('Daltonismo buttons successfully injected.');
} catch(e) {
  console.error(e);
}
