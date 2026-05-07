const fs = require('fs');
const path = require('path');

const baseDir = '/Users/oxohuang/oxo-ui-library';
const htmlPath = path.join(baseDir, 'index.html');
const indexData = JSON.parse(fs.readFileSync(path.join(baseDir, 'components/index.json'), 'utf8'));

const dataStr = JSON.stringify(indexData);
const html = fs.readFileSync(htmlPath, 'utf8');

// Replace COMPONENTS_DATA
const newHtml = html.replace(
  /const COMPONENTS_DATA = \{[\s\S]*?\};/,
  'const COMPONENTS_DATA = ' + dataStr + ';'
);

fs.writeFileSync(htmlPath, newHtml, 'utf8');
console.log('Updated COMPONENTS_DATA with', indexData.components.length, 'components.');
