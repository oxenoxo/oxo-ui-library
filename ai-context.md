# oxo-ui-library - AI 使用说明

你正在操作 oxohuang 的组件库。这个库用于AI Coding场景，让AI可以精确理解并复用组件。

## 组件库路径
`/Users/oxohuang/oxo-ui-library`

## 你拥有的能力

### 1. 读取组件
- 读取 `components/index.json` 获取组件列表
- 读取 `components/<category>/<id>.meta.json` 理解组件细节
- 读取 `components/<category>/<id>.html` 获取组件代码

### 2. 添加组件
- 创建 `components/<category>/<id>.html`（组件代码）
- 创建 `components/<category>/<id>.meta.json`（组件元数据）
- 运行 `node scripts/screenshot.js <id>` 生成缩略图
- 更新 `components/index.json`，加入新组件条目

### 3. 修改组件
- 修改 `.html` 代码或 `.meta.json` 元数据
- 修改前先备份到 `history/YYYY-MM-DD/`
- 修改后运行截图脚本更新缩略图
- 更新 `.meta.json` 的 `updated_at` 字段

### 4. 删除组件（需人类确认）
- 在 `index.json` 中标记 `"status": "pending_deletion"`
- 回复人类："已标记为待删除，请在预览页面确认"
- 等待人类在预览页面确认后，执行删除

## 操作规范

### 组件ID命名
- 必须是 kebab-case（如 `navbar-dark`、`hero-centered`）
- 要描述性强（`card-product` 比 `card1` 好）
- 同类组件加后缀（`card-product`、`card-feature`）

### 文件结构
每个组件包含3个文件：
```
components/<category>/
├── <id>.html          ← 组件代码（HTML+CSS+JS）
├── <id>.meta.json     ← 组件元数据（AI和人类可编辑）
└── thumbnails/<category>/<id>.png  ← 缩略图（自动生成）
```

### 修改前备份
```bash
# 在修改任何文件前，先备份
cp <file> history/$(date +%Y-%m-%d)/<filename>.bak
```

### 更新索引
每次添加/删除组件后，必须更新 `components/index.json`：
- 添加：在 `components` 数组中加入新条目
- 删除：从 `components` 数组中移除条目
- 更新 `last_updated` 字段

## 人类如何调用你

### 场景1：搭建页面
```
人类：用我的组件库搭建一个产品落地页，组件用这些：
- 顶部：navbar-dark
- Hero：hero-centered
- 功能展示：card-product
- 页脚：cta-centered

组件库路径：/Users/oxohuang/oxo-ui-library
```

你的工作流：
1. 读取 `components/index.json`
2. 根据组件ID找到对应的 `.html` 文件
3. 读取每个组件的代码
4. 组装成完整页面
5. 只修改内容（文字、图片），不改动组件结构

---

### 场景2：添加组件
```
人类：帮我添加一个"渐变背景Hero"组件
背景：深色渐变
标题：探索未知的世界
CTA按钮：开始探索
```

你的工作流：
1. 询问细节（如果信息不足）
2. 生成组件代码（`.html`）
3. 生成元数据（`.meta.json`）
4. 保存到 `components/hero/gradient-hero.html`
5. 运行 `node scripts/screenshot.js gradient-hero` 生成缩略图
6. 更新 `components/index.json`
7. 回复："已添加组件 gradient-hero，请在预览页面查看"

---

### 场景3：修改组件
```
人类：把 navbar-dark 的CTA按钮颜色改成绿色
```

你的工作流：
1. 读取 `components/index.json`，找到 `navbar-dark` 的 `file_path`
2. 备份原文件到 `history/YYYY-MM-DD/navbar-dark.html.bak`
3. 读取 `.html` 文件
4. 定位并修改CTA按钮的CSS颜色
5. 写回文件
6. 运行截图脚本更新缩略图
7. 更新 `.meta.json` 的 `updated_at`
8. 回复："已修改 navbar-dark，CTA按钮颜色已改为绿色"

---

### 场景4：删除组件
```
人类：删除 hero-centered 组件
```

你的工作流：
1. 读取 `components/index.json`，找到 `hero-centered`
2. 在条目中添加 `"status": "pending_deletion"`
3. 回复："已将 hero-centered 标记为待删除，请在预览页面确认删除"
4. 等待人类确认（人类会在预览页面点击"确认删除"）
5. 如果人类确认：
   - 删除文件：`hero-centered.html`、`.meta.json`、缩略图
   - 从 `index.json` 移除条目
   - 备份到 `history/YYYY-MM-DD/deleted/`
6. 如果人类取消：
   - 移除 `"status": "pending_deletion"`

---

## 组件元数据格式

`.meta.json` 是给AI和人类看的"组件说明书"：

```json
{
  "id": "navbar-dark",
  "name": "暗色导航栏",
  "category": "navigation",
  "description": "固定顶部的响应式导航栏",
  "version": "1.0.0",
  "author": "oxohuang",
  "created_at": "2026-05-06",
  "updated_at": "2026-05-06",
  "tags": ["导航", "响应式", "暗色"],
  "when_to_use": [
    "产品官网需要顶部导航",
    "移动端需要汉堡菜单"
  ],
  "dependencies": {
    "css": ["../../assets/css/theme.css"],
    "js": [],
    "external": []
  },
  "props": {
    "title": {"type": "string", "default": "网站标题"},
    "cta_text": {"type": "string", "default": "开始使用"}
  },
  "file_path": "components/navigation/navbar-dark.html",
  "thumbnail": "thumbnails/navigation/navbar-dark.png"
}
```

---

## 预览页面功能

人类可以通过 `index.html` 可视化浏览组件库：
- 查看组件缩略图和演示
- 复制组件ID（发给AI）
- 一键生成AI提示词
- AI模式：显示组件JSON元数据
- 删除组件（需确认）

---

## 注意事项

1. **不要删除 `index.json` 中的 `schema_version` 字段**
2. **修改组件时，尽量保持向后兼容**（不要改已有的 `props` 名称）
3. **添加新组件时，先检查ID是否已存在**
4. **删除组件前，必须人类确认**
5. **每次操作后，更新 `index.json` 的 `last_updated`**
6. **缩略图生成失败时，不要阻塞，记录错误继续**
7. **人类可能会说"用我的组件库"**，此时自动读取 `index.json`

---

## 快速参考

| 操作 | 命令/步骤 |
|------|-----------|
| 添加组件 | 创建 `.html` + `.meta.json` → 运行截图 → 更新索引 |
| 修改组件 | 备份 → 修改 → 运行截图 → 更新 `updated_at` |
| 删除组件 | 标记待删除 → 等待确认 → 删除文件 + 更新索引 |
| 生成缩略图 | `node scripts/screenshot.js <component-id>` |
| 批量截图 | `node scripts/screenshot.js`（不指定ID则处理全部）|
| 读取组件列表 | `cat components/index.json` |
| 备份目录 | `history/YYYY-MM-DD/` |

---

**现在你可以开始操作组件库了。人类会告诉你做什么，按上述规范执行。**
