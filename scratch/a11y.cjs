const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(path.join(process.cwd(), 'src/components'), []);
files.push(path.join(process.cwd(), 'src/app/App.tsx'));

let totalUpdates = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Add aria-hidden to all Icons if they don't have it
  content = content.replace(/<(Icon|Play|CheckCircle2|AlertCircle|Trophy|Flame|UserCheck|Newspaper|CalendarDays|BarChart3|Clock|ChevronLeft|ChevronRight|Lock|Unlock|Sparkles|Menu|LogOut|Edit3|SlidersHorizontal|Bell|Volume2|VolumeX|Sun|Moon|Dumbbell|BadgeDollarSign|Users|ArrowRight|ArrowLeft|Search) ([^>]*)(className=["'{][^>]*["'}])([^>]*)>/g, (match, tag, before, className, after) => {
    if (!match.includes('aria-hidden')) {
      return `<${tag} ${before}${className} aria-hidden="true"${after}>`;
    }
    return match;
  });

  // Add role='button' and tabIndex={0} to clickable elements
  content = content.replace(/<(div|span|p|h1|h2|h3) ([^>]*onClick=[^>]*)>/g, (match, tag, attrs) => {
    if (!attrs.includes('role=') && !attrs.includes('tabIndex=')) {
      return `<${tag} role="button" tabIndex={0} ${attrs}>`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    totalUpdates++;
  }
});

console.log('Archivos actualizados: ' + totalUpdates);
