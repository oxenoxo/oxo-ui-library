const fs = require('fs');
const path = require('path');

const baseDir = '/Users/oxohuang/oxo-ui-library';

// Read existing index.json
const indexPath = path.join(baseDir, 'components/index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

// Add dossier components
const dossierComponents = [
  {
    id: 'dossier-top',
    name: '卷宗头标',
    category: 'dossier',
    tags: ['卷宗', '头部', '品牌', '元信息', '暗色'],
    meta_path: 'components/dossier/dossier-top.meta.json',
    file_path: 'components/dossier/dossier-top.html',
    thumbnail: 'thumbnails/dossier/dossier-top.png'
  },
  {
    id: 'dossier-hero',
    name: '卷宗Hero区域',
    category: 'dossier',
    tags: ['卷宗', 'Hero', '金额展示', '香槟金', '动画'],
    meta_path: 'components/dossier/dossier-hero.meta.json',
    file_path: 'components/dossier/dossier-hero.html',
    thumbnail: 'thumbnails/dossier/dossier-hero.png'
  },
  {
    id: 'dossier-chips',
    name: '筹码卡片',
    category: 'dossier',
    tags: ['卷宗', '筹码', '双栏', '金额', '暗色'],
    meta_path: 'components/dossier/dossier-chips.meta.json',
    file_path: 'components/dossier/dossier-chips.html',
    thumbnail: 'thumbnails/dossier/dossier-chips.png'
  },
  {
    id: 'dossier-tabs',
    name: 'Tab导航',
    category: 'dossier',
    tags: ['卷宗', 'Tab', '导航', '吸顶', '磨砂玻璃'],
    meta_path: 'components/dossier/dossier-tabs.meta.json',
    file_path: 'components/dossier/dossier-tabs.html',
    thumbnail: 'thumbnails/dossier/dossier-tabs.png'
  },
  {
    id: 'dossier-section',
    name: '区块头部',
    category: 'dossier',
    tags: ['卷宗', '区块', '标题', '编号', '金色下划线'],
    meta_path: 'components/dossier/dossier-section.meta.json',
    file_path: 'components/dossier/dossier-section.html',
    thumbnail: 'thumbnails/dossier/dossier-section.png'
  },
  {
    id: 'dossier-amount-plate',
    name: '金额大字展示',
    category: 'dossier',
    tags: ['卷宗', '金额', '大字', '渐变', '居中'],
    meta_path: 'components/dossier/dossier-amount-plate.meta.json',
    file_path: 'components/dossier/dossier-amount-plate.html',
    thumbnail: 'thumbnails/dossier/dossier-amount-plate.png'
  },
  {
    id: 'dossier-kv-row',
    name: '数据行',
    category: 'dossier',
    tags: ['卷宗', '数据', '3栏', '网格', '暗色'],
    meta_path: 'components/dossier/dossier-kv-row.meta.json',
    file_path: 'components/dossier/dossier-kv-row.html',
    thumbnail: 'thumbnails/dossier/dossier-kv-row.png'
  },
  {
    id: 'dossier-ledger',
    name: '奖励档位列表',
    category: 'dossier',
    tags: ['卷宗', '档位', '列表', '表格', '暗色'],
    meta_path: 'components/dossier/dossier-ledger.meta.json',
    file_path: 'components/dossier/dossier-ledger.html',
    thumbnail: 'thumbnails/dossier/dossier-ledger.png'
  },
  {
    id: 'dossier-exam-card',
    name: '考试档位卡',
    category: 'dossier',
    tags: ['卷宗', '考试', '档位', '卡片', '暗色'],
    meta_path: 'components/dossier/dossier-exam-card.meta.json',
    file_path: 'components/dossier/dossier-exam-card.html',
    thumbnail: 'thumbnails/dossier/dossier-exam-card.png'
  },
  {
    id: 'dossier-formula',
    name: '公式卡片',
    category: 'dossier',
    tags: ['卷宗', '公式', '等宽字体', '计算原理', '暗色'],
    meta_path: 'components/dossier/dossier-formula.meta.json',
    file_path: 'components/dossier/dossier-formula.html',
    thumbnail: 'thumbnails/dossier/dossier-formula.png'
  },
  {
    id: 'dossier-bar-chart',
    name: '增值条',
    category: 'dossier',
    tags: ['卷宗', '柱状图', '进度条', '渐变', '暗色'],
    meta_path: 'components/dossier/dossier-bar-chart.meta.json',
    file_path: 'components/dossier/dossier-bar-chart.html',
    thumbnail: 'thumbnails/dossier/dossier-bar-chart.png'
  },
  {
    id: 'dossier-insights',
    name: '策略启示',
    category: 'dossier',
    tags: ['卷宗', '洞察', '文本', '策略', '暗色'],
    meta_path: 'components/dossier/dossier-insights.meta.json',
    file_path: 'components/dossier/dossier-insights.html',
    thumbnail: 'thumbnails/dossier/dossier-insights.png'
  },
  {
    id: 'dossier-footer-seal',
    name: '底部印章',
    category: 'dossier',
    tags: ['卷宗', '底部', '印章', '暗色'],
    meta_path: 'components/dossier/dossier-footer-seal.meta.json',
    file_path: 'components/dossier/dossier-footer-seal.html',
    thumbnail: 'thumbnails/dossier/dossier-footer-seal.png'
  },
  {
    id: 'dossier-template-complete',
    name: '卷宗完整模板',
    category: 'dossier',
    tags: ['卷宗', '完整模板', '香槟金', '暗色', '可复用'],
    meta_path: 'components/dossier/dossier-template-complete.meta.json',
    file_path: 'components/dossier/dossier-template-complete.html',
    thumbnail: 'thumbnails/dossier/dossier-template-complete.png'
  }
];

// Add dossier components to index
dossierComponents.forEach(comp => {
  // Check if already exists
  const exists = indexData.components.some(c => c.id === comp.id);
  if (!exists) {
    indexData.components.push(comp);
  }
});

// Update timestamp
indexData.last_updated = new Date().toISOString();

// Write back
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log('Updated index.json with', dossierComponents.length, 'dossier components.');
console.log('Total components:', indexData.components.length);
