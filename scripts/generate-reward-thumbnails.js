const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const components = [
  'reward/reward-hero',
  'reward/reward-pool',
  'reward/reward-tier-card',
  'reward/reward-metrics',
  'reward/reward-spotlight',
  'reward/reward-progress',
  'reward/reward-formula',
  'reward/reward-bar-chart',
  'reward/reward-insight'
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 760, height: 500 });
  
  for (const comp of components) {
    const htmlPath = path.join(__dirname, 'components', comp + '.html');
    const thumbnailPath = path.join(__dirname, 'thumbnails', comp + '.png');
    
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: thumbnailPath, fullPage: false });
    console.log('Generated: ' + comp + '.png');
  }
  
  await browser.close();
  console.log('All thumbnails generated successfully!');
})();
