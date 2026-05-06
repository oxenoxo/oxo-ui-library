const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 设置视口大小
  await page.setViewportSize({ width: 1280, height: 800 });
  
  const component = {
    id: 'cultivation-card',
    name: '修仙修炼卡片',
    category: 'xianxia',
    file_path: 'components/xianxia/cultivation-card.html'
  };
  
  const fileUrl = `file:///Users/oxohuang/oxo-ui-library/${component.file_path}`;
  const thumbnailPath = `/Users/oxohuang/oxo-ui-library/thumbnails/${component.category}/${component.id}.png`;
  
  console.log(`📸 截图: ${component.name}`);
  
  try {
    await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: thumbnailPath,
      fullPage: false
    });
    
    console.log(`✅ 完成: ${thumbnailPath}`);
  } catch (error) {
    console.error(`❌ 失败: ${component.name} - ${error.message}`);
  }
  
  await browser.close();
})();
