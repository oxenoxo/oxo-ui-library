/**
 * 自动截图脚本 - oxo-ui-library
 * 使用 Playwright 为组件生成缩略图
 * 
 * 使用方法：
 *   node scripts/screenshot.js           # 为所有组件截图
 *   node scripts/screenshot.js navbar-dark  # 为指定组件截图
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const LIBRARY_PATH = path.join(__dirname, '..');
const INDEX_PATH = path.join(LIBRARY_PATH, 'components', 'index.json');

/**
 * 为单个组件生成截图
 */
async function generateThumbnail(component, browser) {
  const page = await browser.newPage();
  
  // 设置视口大小（缩略图尺寸）
  await page.setViewportSize({ width: 800, height: 600 });
  
  // 构建组件文件的绝对路径
  const componentPath = path.join(LIBRARY_PATH, component.file_path);
  const fileUrl = 'file://' + componentPath;
  
  console.log(`📸 正在截图：${component.name} (${component.id})`);
  
  try {
    // 打开组件HTML
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    
    // 等待渲染完成
    await page.waitForTimeout(1000);
    
    // 确保缩略图目录存在
    const thumbnailDir = path.join(LIBRARY_PATH, path.dirname(component.thumbnail));
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }
    
    // 截图保存
    const thumbnailPath = path.join(LIBRARY_PATH, component.thumbnail);
    await page.screenshot({ 
      path: thumbnailPath,
      fullPage: false  // 只截图视口大小
    });
    
    console.log(`✅ 截图成功：${component.thumbnail}`);
  } catch (error) {
    console.error(`❌ 截图失败：${component.name}`, error.message);
  } finally {
    await page.close();
  }
}

/**
 * 主函数
 */
async function main() {
  // 读取组件索引
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('❌ 找不到 components/index.json');
    process.exit(1);
  }
  
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  let componentsToProcess = index.components;
  
  // 如果指定了组件ID，只处理指定的组件
  const args = process.argv.slice(2);
  if (args.length > 0) {
    componentsToProcess = index.components.filter(c => args.includes(c.id));
    if (componentsToProcess.length === 0) {
      console.error('❌ 找不到指定的组件：', args.join(', '));
      process.exit(1);
    }
  }
  
  console.log(`🚀 开始为 ${componentsToProcess.length} 个组件生成截图...\n`);
  
  // 启动浏览器
  const browser = await chromium.launch({ headless: true });
  
  // 逐个生成截图
  for (const component of componentsToProcess) {
    await generateThumbnail(component, browser);
  }
  
  // 关闭浏览器
  await browser.close();
  
  console.log('\n✅ 全部截图完成！');
  console.log('💡 提示：刷新 index.html 页面查看缩略图');
}

// 执行
main().catch(error => {
  console.error('❌ 脚本执行失败：', error);
  process.exit(1);
});
