# LowCode Studio - 低代码平台框架

一个基于 ** Tauri + Rust + vuedraggable** 构建的低代码可视化编辑器，支持组件拖拽布局、容器嵌套、PC/H5 双模式预览等核心能力。

## 🎯 功能特性

- **拖拽式组件编排**：从左侧组件库拖拽组件到画布，所见即所得
- **容器嵌套**：支持容器组件，可将其他组件拖入容器实现嵌套布局
- **PC / H5 双模式**：一键切换 PC 端（全宽）和 H5 端（375px 仿真手机框）
- **操作历史管理**：支持撤回（Ctrl+Z）/ 前进（Ctrl+Shift+Z / Ctrl+Y），最多30步
- **布局 JSON 导出**：一键预览/保存当前画布的 JSON 布局树
- **组件配置面板**：右侧预留属性配置区域，点击组件可查看基础属性
- **精准拖拽锚点**：画布内组件仅通过左上角拖拽锚点移动，避免误操作
- **视觉交互反馈**：hover 边框高亮、选中状态、拖拽动画等交互效果

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Tauri | 2.7.14 | 渐进式 JavaScript 框架 |
|Rust| 4.7.0 | 基于 Vue 的 UI 组件库（iView） |
| vuedraggable | 2.x | 基于 Sortable.js 的 Vue 拖拽组件 |
| vue-router | 3.x | Vue 路由管理 |
| uuid | 9.x | 唯一 ID 生成 |

## 📁 项目目录结构

```
src/
├── assets/                          # 静态资源
├── components/
│   └── ui/                          # 拖拽组件库
│       ├── runtime/                 # 运行时组件
│       │   ├── container/
│       │   │   ├── container.vue    # 容器组件（含draggable，渲染子组件）
│       │   │   └── index.js         # 注册入口
│       │   └── widget/              # 基础组件
│       │       ├── WidgetInput.vue   # 输入框
│       │       ├── WidgetButton.vue  # 按钮
│       │       ├── WidgetText.vue    # 文本
│       │       ├── WidgetSelect.vue  # 选择器
│       │       ├── WidgetSwitch.vue  # 开关
│       │       └── index.js         # 批量注册
│       └── dev/                     # 开发时组件（组件名加 dev- 前缀）
│           └── container/
│               ├── DevContainer.vue # 开发时容器（支持拖入/排序/删除）
│               └── index.js
├── studio/                          # 低代码编辑器
│   ├── componentMenu/               # 组件菜单
│   │   ├── container.json           # 容器组件配置
│   │   ├── widget.json              # 基础组件配置
│   │   └── index.vue                # 菜单UI（draggable克隆拖出）
│   ├── pageCanvas/                  # 页面画布
│   │   ├── componentItem.vue        # 组件外壳（标题+锚点+操作按钮+hover效果）
│   │   └── index.vue                # 画布（PC/H5模式、draggable接收、JSON导出）
│   └── index.vue                    # 编辑器主界面（工具栏+三栏布局）
├── plugins/
├── router/
│   └── index.js                     # 路由配置，默认渲染Studio
├── store/
├── styles/
│   └── global.css                   # 全局样式、CSS变量主题、拖拽样式
├── utils/
│   └── utils.js                     # 工具函数（ID生成、深拷贝、组件实例化）
├── App.vue
└── main.js                          # 入口：注册view-design及所有组件
```

## ⚠️ view-design 版本说明

本项目原计划使用 `view-design@4.5.1`，但经过直接查询 npm registry 确认：

> **`view-design@4.5.1` 从未在 npm 上正式发布过。**
>
> `4.5.x` 系列仅存在 `4.5.0`（含若干 beta/rc 预发布版），之后版本直接跳至 `4.6.0`，中间不存在 `4.5.1`。

因此，项目改用当前 npm 上可用的最新稳定版 **`4.7.0`**。

## 🚀 快速开始

### 1. 进入工程根目录
```bash
cd /Users/lucas/Documents/LearnWorkSpace/URL/label-1293
```

### 2. 安装项目依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run serve
```

### 构建生产版本

```bash
npm run build
```

## 📐 组件数据结构

### 单个组件 JSON 描述

```json
{
  "tag": "widget-input",
  "componentType": "widget",
  "componentName": "输入框",
  "componentId": "",
  "icon": "ios-create-outline",
  "attr": null,
  "props": null
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `tag` | String | 全局注册的组件名 |
| `componentType` | String | 组件类型：`container` / `widget` |
| `componentName` | String | 组件中文名 |
| `componentId` | String | 唯一ID，拖入画布时自动生成 |
| `icon` | String | iView 图标名 |
| `attr` | Object/null | 组件属性 |
| `props` | Object/null | 组件参数 |
| `children` | Array | 子组件列表（仅容器组件） |

### 画布布局 JSON 树

```json
{
  "layout": [
    {
      "tag": "dev-container",
      "componentType": "container",
      "componentId": "a1b2c3d4e5f6g7h8",
      "componentName": "容器",
      "attr": null,
      "props": null,
      "children": [
        {
          "tag": "widget-input",
          "componentType": "widget",
          "componentId": "input-i1j2k3l4m5n6",
          "componentName": "输入框",
          "attr": null,
          "props": null
        }
      ]
    }
  ]
}
```

## 🎨 编辑器界面说明

### 顶部操作栏（80px）
- **左侧**：Logo + 标题 "LowCode Studio"
- **中间**：PC / H5 模式切换按钮
- **右侧**：撤回/前进 → 预览 → 保存

### 左侧组件菜单（280px）
- 容器组件分组（可折叠）
- 基础组件分组（可折叠）
- 卡片式展示，网格排列

### 中间页面画布
- **PC 模式**：画布宽度 100%
- **H5 模式**：画布宽度 375px，居中显示，仿手机边框

### 右侧配置面板（320px）
- 点击画布中的组件可查看基础属性
- 预留扩展区域

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Z` / `⌘ + Z` | 撤回 |
| `Ctrl + Shift + Z` / `Ctrl + Y` | 前进 |
| `Ctrl + S` / `⌘ + S` | 保存 |

## 🔧 运行时 vs 开发时组件

| | 运行时 (runtime) | 开发时 (dev) |
|---|---|---|
| 容器组件名 | `container` | `dev-container` |
| 拖拽能力 | 仅渲染 | 支持拖入/排序/删除 |
| 使用场景 | 页面运行渲染 | 编辑器画布中使用 |

## 📋 内置组件清单

### 容器组件
| 组件 | 标签 | 说明 |
|------|------|------|
| 容器 | `dev-container` / `container` | 可嵌套的容器组件 |

### 基础组件
| 组件 | 标签 | 说明 |
|------|------|------|
| 输入框 | `widget-input` | 基于 iView Input |
| 按钮 | `widget-button` | 基于 iView Button |
| 文本 | `widget-text` | 可配置文本组件 |
| 选择器 | `widget-select` | 基于 iView Select |
| 开关 | `widget-switch` | 基于 iView Switch |

## 📝 扩展指南

### 新增基础组件

1. 在 `src/components/ui/runtime/widget/` 下创建 `.vue` 文件
2. 在 `runtime/widget/index.js` 中注册组件
3. 在 `src/studio/componentMenu/widget.json` 中添加组件 JSON 描述
4. 重启开发服务器即可在菜单中看到新组件

### 新增容器组件

1. 在 `runtime/container/` 下创建运行时版本
2. 在 `dev/container/` 下创建开发时版本（带拖拽能力）
3. 在 `main.js` 中注册组件
4. 在 `container.json` 中添加配置
