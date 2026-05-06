const fs = require('fs');
const path = require('path');

// 读取组件索引
const indexPath = path.join(__dirname, '../components/index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

// 读取预览页面
const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 构建新的COMPONENTS_DATA
const componentsData = {
  schema_version: "1.0",
  last_updated: new Date().toISOString().slice(0, 16).replace('T', 'T').replace(/:/g, ':'),
  library_path: "/Users/oxohuang/oxo-ui-library",
  components: indexData.components
};

const newDataString = JSON.stringify(componentsData);

// 替换HTML中的COMPONENTS_DATA
const regex = /(const COMPONENTS_DATA = )(.*?)(;\s*\n)/;
const match = html.match(regex);

if (match) {
  html = html.replace(regex, `$1${newDataString}$3`);
  
  // 写回文件
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ 预览页面数据已更新');
  console.log(`   组件数量: ${indexData.components.length}`);
} else {
  console.error('❌ 未找到COMPONENTS_DATA变量');
}
