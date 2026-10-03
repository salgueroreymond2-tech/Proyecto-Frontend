const fs = require('fs');

try {
  let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

  // Add Eye import
  nav = nav.replace(/Sun,\n  Moon,/, 'Sun,\n  Moon,\n  Eye,');

  // Add state
  nav = nav.replace(/const \[showSimMenu, setShowSimMenu\] = useState\(false\);/, "const [showSimMenu, setShowSimMenu] = useState(false);\n  const [daltonismoMode, setDaltonismoMode] = useState(() => typeof document !== 'undefined' && document.documentElement.style.filter.includes('grayscale'));\n  \n  const toggleDaltonismo = () => {\n    if (daltonismoMode) {\n      document.documentElement.style.filter = '';\n      setDaltonismoMode(false);\n    } else {\n      document.documentElement.style.filter = 'grayscale(100%) contrast(1.2)';\n      setDaltonismoMode(true);\n    }\n  };");

  // Add button for public mode
  const publicThemeBtn = `<button
              type="button"
              onClick={onToggleTheme}
              className="rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors"
              aria-label={colorMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {colorMode === 'dark' ? <Sun className="w-4 h-4 text-[#EA7301]" aria-hidden="true" /> : <Moon className="w-4 h-4 text-[#EA7301]" aria-hidden="true" />}
            </button>`;

  const daltonismoPublicBtn = `<button
              type="button"
              onClick={toggleDaltonismo}
              className="rounded-xl border border-white/15 bg-white/5 p-2.5 text-white hover:border-[#EA7301]/60 hover:bg-white/10 transition-colors"
              aria-label="Alternar modo daltonismo"
              title="Modo daltonismo (Alto Contraste)"
            >
              <Eye className={\`w-4 h-4 \${daltonismoMode ? 'text-[#00f0ff]' : 'text-zinc-400'}\`} aria-hidden="true" />
            </button>`;

  nav = nav.replace(publicThemeBtn, daltonismoPublicBtn + '\n            ' + publicThemeBtn);

  // Add button for private mode
  const privateThemeBtn = `<button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            aria-label={colorMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {colorMode === 'dark' ? <Sun className="w-4 h-4 text-[#EA7301]" aria-hidden="true" /> : <Moon className="w-4 h-4 text-[#EA7301]" aria-hidden="true" />}
          </button>`;

  const daltonismoPrivateBtn = `<button
            type="button"
            onClick={toggleDaltonismo}
            className="p-2 rounded-full hover:bg-[#312733] text-[#eeddee]/80 hover:text-white transition-colors"
            aria-label="Alternar modo daltonismo"
            title="Modo daltonismo (Alto Contraste)"
          >
            <Eye className={\`w-4 h-4 \${daltonismoMode ? 'text-[#00f0ff]' : 'text-[#EA7301]'}\`} aria-hidden="true" />
          </button>`;

  nav = nav.replace(privateThemeBtn, daltonismoPrivateBtn + '\n          ' + privateThemeBtn);

  fs.writeFileSync('src/components/Navbar.tsx', nav);
  console.log('Daltonismo mode added');
} catch (err) {
  console.error(err);
}
