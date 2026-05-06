#!/usr/bin/env python3
"""
oxo-ui-library AI 操作脚本
让AI可以通过命令行操作组件库

使用方法：
  python3 scripts/ai_operations.py add --id=navbar-new --category=navigation --name="新导航"
  python3 scripts/ai_operations.py modify --id=navbar-dark --property=cta_text --value="立即体验"
  python3 scripts/ai_operations.py delete --id=hero-centered
  python3 scripts/ai_operations.py list
  python3 scripts/ai_operations.py info --id=navbar-dark
"""

import json
import os
import sys
import shutil
from datetime import datetime

LIBRARY_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(LIBRARY_PATH, 'components', 'index.json')


def load_index():
    """加载组件索引"""
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_index(index):
    """保存组件索引"""
    index['last_updated'] = datetime.now().isoformat()
    with open(INDEX_PATH, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=2)


def backup_file(file_path):
    """备份文件"""
    if not os.path.exists(file_path):
        return
    
    backup_dir = os.path.join(LIBRARY_PATH, 'history', datetime.now().strftime('%Y-%m-%d'))
    os.makedirs(backup_dir, exist_ok=True)
    
    filename = os.path.basename(file_path)
    backup_path = os.path.join(backup_dir, filename + '.bak')
    shutil.copy(file_path, backup_path)
    print(f'📦 已备份：{backup_path}')


def list_components():
    """列出所有组件"""
    index = load_index()
    print(f"\n📦 组件库（共 {len(index['components'])} 个组件）\n")
    print(f"{'ID':<20} {'名称':<20} {'分类':<12} {'标签'}")
    print('-' * 80)
    
    for comp in index['components']:
        tags = ', '.join(comp['tags'][:3])
        if len(comp['tags']) > 3:
            tags += '...'
        print(f"{comp['id']:<20} {comp['name']:<20} {comp['category']:<12} {tags}")
    
    print()


def add_component(args):
    """添加组件"""
    component_id = args.get('id')
    category = args.get('category')
    name = args.get('name', component_id)
    
    if not component_id or not category:
        print('❌ 缺少参数：--id 和 --category 必须指定')
        return
    
    index = load_index()
    
    # 检查ID是否已存在
    if any(c['id'] == component_id for c in index['components']):
        print(f"❌ 组件ID已存在：{component_id}")
        return
    
    # 创建目录
    comp_dir = os.path.join(LIBRARY_PATH, 'components', category)
    thumb_dir = os.path.join(LIBRARY_PATH, 'thumbnails', category)
    os.makedirs(comp_dir, exist_ok=True)
    os.makedirs(thumb_dir, exist_ok=True)
    
    # 创建HTML文件（模板）
    html_path = os.path.join(comp_dir, f"{component_id}.html")
    if not os.path.exists(html_path):
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{name}</title>
  <link rel="stylesheet" href="../../assets/css/theme.css">
  <style>
    /* 在这里写组件样式 */
    .component {{
      padding: 20px;
      color: var(--text-primary);
    }}
  </style>
</head>
<body>
  <div class="component">
    <h2>{name}</h2>
    <p>组件内容</p>
  </div>
</body>
</html>""")
        print(f'✅ 已创建：{html_path}')
    
    # 创建元数据文件
    meta_path = os.path.join(comp_dir, f"{component_id}.meta.json")
    metadata = {
        "id": component_id,
        "name": name,
        "category": category,
        "description": args.get('description', ''),
        "version": "1.0.0",
        "author": "oxohuang",
        "created_at": datetime.now().strftime('%Y-%m-%d'),
        "updated_at": datetime.now().strftime('%Y-%m-%d'),
        "tags": args.get('tags', [category]),
        "when_to_use": args.get('when_to_use', []),
        "dependencies": {
            "css": ["../../assets/css/theme.css"],
            "js": [],
            "external": []
        },
        "props": {},
        "file_path": f"components/{category}/{component_id}.html",
        "thumbnail": f"thumbnails/{category}/{component_id}.png"
    }
    
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    print(f'✅ 已创建：{meta_path}')
    
    # 更新索引
    index['components'].append({
        "id": component_id,
        "name": name,
        "category": category,
        "tags": metadata['tags'],
        "meta_path": f"components/{category}/{component_id}.meta.json",
        "file_path": f"components/{category}/{component_id}.html",
        "thumbnail": f"thumbnails/{category}/{component_id}.png"
    })
    save_index(index)
    
    print(f'\n✅ 组件 {component_id} 添加成功！')
    print(f'💡 运行 node scripts/screenshot.js {component_id} 生成缩略图')


def modify_component(args):
    """修改组件"""
    component_id = args.get('id')
    if not component_id:
        print('❌ 缺少参数：--id')
        return
    
    index = load_index()
    component = next((c for c in index['components'] if c['id'] == component_id), None)
    
    if not component:
        print(f"❌ 找不到组件：{component_id}")
        return
    
    # 备份
    backup_file(component['file_path'])
    
    # 修改元数据
    meta_path = component['meta_path']
    with open(meta_path, 'r', encoding='utf-8') as f:
        metadata = json.load(f)
    
    # 更新字段
    for key in ['name', 'description', 'tags']:
        if key in args:
            metadata[key] = args[key]
    
    metadata['updated_at'] = datetime.now().strftime('%Y-%m-%d')
    
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    
    # 更新索引中的tags
    component['name'] = metadata['name']
    component['tags'] = metadata['tags']
    save_index(index)
    
    print(f'✅ 组件 {component_id} 修改成功！')


def delete_component(args):
    """删除组件（标记待删除）"""
    component_id = args.get('id')
    if not component_id:
        print('❌ 缺少参数：--id')
        return
    
    index = load_index()
    component = next((c for c in index['components'] if c['id'] == component_id), None)
    
    if not component:
        print(f"❌ 找不到组件：{component_id}")
        return
    
    # 标记为待删除
    component['status'] = 'pending_deletion'
    save_index(index)
    
    print(f'⚠️ 组件 {component_id} 已标记为待删除')
    print(f'💡 请在预览页面（index.html）确认删除')


def show_info(args):
    """显示组件详细信息"""
    component_id = args.get('id')
    if not component_id:
        print('❌ 缺少参数：--id')
        return
    
    index = load_index()
    component = next((c for c in index['components'] if c['id'] == component_id), None)
    
    if not component:
        print(f"❌ 找不到组件：{component_id}")
        return
    
    # 读取元数据
    with open(component['meta_path'], 'r', encoding='utf-8') as f:
        metadata = json.load(f)
    
    print(f"\n📦 组件信息：{component_id}\n")
    print(json.dumps(metadata, ensure_ascii=False, indent=2))
    print()


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    command = sys.argv[1]
    args = {}
    
    # 解析参数
    for arg in sys.argv[2:]:
        if '=' in arg and arg.startswith('--'):
            key, value = arg[2:].split('=', 1)
            # 尝试解析JSON（支持数组）
            try:
                value = json.loads(value)
            except:
                pass
            args[key] = value
    
    # 执行命令
    if command == 'list':
        list_components()
    elif command == 'add':
        add_component(args)
    elif command == 'modify':
        modify_component(args)
    elif command == 'delete':
        delete_component(args)
    elif command == 'info':
        show_info(args)
    else:
        print(f"❌ 未知命令：{command}")
        print(__doc__)


if __name__ == '__main__':
    main()
