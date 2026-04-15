const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      replaceColors(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace accent colors
      content = content.replace(/#cca35e/g, 'var(--accent)');
      content = content.replace(/#c5a059/g, 'var(--accent)');
      content = content.replace(/#d9381e/g, 'var(--accent)');
      
      // Replace dark backgrounds with var(--bg) or var(--card-bg)
      // For hero sections, we might want to keep them dark or make them light.
      // Let's make them light to match the logo better.
      content = content.replace(/bg-\[#111827\]/g, 'bg-[var(--bg)]');
      content = content.replace(/bg-\[#0f172a\]/g, 'bg-[var(--bg)]');
      
      // Replace text-white in those hero sections with text-[var(--text-main)]
      // This is a bit tricky with regex, let's just replace text-white where it's likely used for the hero
      // Actually, let's just do a manual replacement for the hero sections in the files.
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

replaceColors('./app');
console.log('Done');
