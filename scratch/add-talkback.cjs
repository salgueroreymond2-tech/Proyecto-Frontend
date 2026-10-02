const fs = require('fs');
let app = fs.readFileSync('src/app/App.tsx', 'utf8');

if (!app.includes('GlobalTalkback')) {
  // Insert import
  app = app.replace(/import \{ AIAssistant \} from '\.\.\/components\/AIAssistant';/, "import { AIAssistant } from '../components/AIAssistant';\nimport { GlobalTalkback } from '../components/GlobalTalkback';");
  
  // Insert component right before <AIAssistant />
  app = app.replace(/<AIAssistant \/>/g, "<GlobalTalkback />\n        <AIAssistant />");
  
  fs.writeFileSync('src/app/App.tsx', app);
  console.log('App.tsx updated');
} else {
  console.log('Already added');
}
