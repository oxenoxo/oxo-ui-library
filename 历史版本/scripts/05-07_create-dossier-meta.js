const fs = require('fs');
const path = require('path');

const components = [
  {
    id: 'dossier-chips',
    name: '筹码卡片',
    tags: ['卷宗', '筹码', '双栏', '金额', '暗色'],
    description: '卷宗风格的双栏筹码卡片，并排显示两个数值（如两场考试的奖励金额），中间有渐变分隔线和乘号。'
  },
  {
    id: 'dossier-tabs',
    name: 'Tab导航',
    tags: ['卷宗', 'Tab', '导航', '吸顶', '磨砂玻璃'],
    description: '卷宗风格的Tab导航栏，支持吸顶效果（sticky）、磨砂玻璃背景、圆角按钮组。包含完整的JS交互逻辑。'
  },
  {
    id: 'dossier-section',
    name: '区块头部',
    tags: ['卷宗', '区块', '标题', '编号', '金色下划线'],
    description: '卷宗风格的区块头部，包含编号（左上）、标题（左中）、元信息（右侧）。底部有金色下划线装饰。'
  },
  {
    id: 'dossier-amount-plate',
    name: '金额大字展示',
    tags: ['卷宗', '金额', '大字', '渐变', '居中'],
    description: '卷宗风格的金额大字展示区域，包含标签、超大渐变金额、说明文字。金额使用特殊渐变和阴影效果。'
  },
  {
    id: 'dossier-kv-row',
    name: '数据行',
    tags: ['卷宗', '数据', '3栏', '网格', '暗色'],
    description: '卷宗风格的3栏数据行，支持accent高亮（金色顶部边线）。适合展示TOP PRIZE、生死线、满分等数据。'
  },
  {
    id: 'dossier-ledger',
    name: '奖励档位列表',
    tags: ['卷宗', '档位', '列表', '表格', '暗色'],
    description: '卷宗风格的奖励档位列表，支持3种特殊档位样式：tier-max（翡翠绿王座）、tier-crit（金色暴击）、tier-zero（印章红生死线）。'
  },
  {
    id: 'dossier-exam-card',
    name: '考试档位卡',
    tags: ['卷宗', '考试', '档位', '卡片', '暗色'],
    description: '卷宗风格的考试档位卡片，支持3种状态：tier-full（翡翠绿满分）、普通、tier-zero（红色零分）。包含分数、奖金、指标、备注。'
  },
  {
    id: 'dossier-formula',
    name: '公式卡片',
    tags: ['卷宗', '公式', '等宽字体', '计算原理', '暗色'],
    description: '卷宗风格的公式卡片，带四角装饰线。适合展示奖金计算公式、加速回报原理等。'
  },
  {
    id: 'dossier-bar-chart',
    name: '增值条',
    tags: ['卷宗', '柱状图', '进度条', '渐变', '暗色'],
    description: '卷宗风格的增值条/柱状图，显示每5分增值曲线。支持普通和peak（峰值高亮）两种样式。'
  },
  {
    id: 'dossier-insights',
    name: '策略启示',
    tags: ['卷宗', '洞察', '文本', '策略', '暗色'],
    description: '卷宗风格的策略启示列表，带编号（左侧金色数字）。适合展示边际递增、临界点战略等策略分析。'
  },
  {
    id: 'dossier-footer-seal',
    name: '底部印章',
    tags: ['卷宗', '底部', '印章', '暗色'],
    description: '卷宗风格的底部印章区域，包含文档信息（左侧）和印章（右侧圆形红色印章，带旋转效果）。'
  },
  {
    id: 'dossier-template-complete',
    name: '卷宗完整模板',
    tags: ['卷宗', '完整模板', '香槟金', '暗色', '可复用'],
    description: '完整的卷宗风格奖励页面模板，包含所有拆解出的组件的组合示例。可直接复制使用。'
  }
];

const template = (comp) => `# JSON
{
  "id": "${comp.id}",
  "name": "${comp.name}",
  "category": "dossier",
  "tags": ${JSON.stringify(comp.tags, null, 2).replace(/\n/g, '\n  ')},
  "props": {},
  "when_to_use": [
    "需要${comp.name}时",
    "创建卷宗风格页面",
    "暗色主题设计"
  ],
  "description": "${comp.description}"
}
`;

const baseDir = '/Users/oxohuang/oxo-ui-library/components/dossier';

components.forEach(comp => {
  const filePath = path.join(baseDir, `${comp.id}.meta.json`);
  const content = template(comp);
  
  // Remove the # JSON line and clean up
  const jsonContent = content.replace(/^# JSON\n/, '').trim();
  
  // Validate it's proper JSON
  try {
    JSON.parse(jsonContent);
    fs.writeFileSync(filePath, jsonContent, 'utf8');
    console.log(`Created: ${comp.id}.meta.json`);
  } catch (e) {
    console.error(`Error creating ${comp.id}.meta.json:`, e.message);
    console.log('Content:', jsonContent.substring(0, 200));
  }
});

console.log('\nDone! Created', components.length, 'metadata files.');
