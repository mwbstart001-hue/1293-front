/**
 * 组件配置
 * 定义所有可用的组件及其属性
 */

export const componentCategories = [
  {
    name: 'container',
    label: '容器组件',
    icon: 'ios-cube'
  },
  {
    name: 'basic',
    label: '基础组件',
    icon: 'ios-apps'
  }
]

export const componentList = [
  // 容器组件
  {
    tag: 'LcContainer',
    devTag: 'DevLcContainer',
    componentType: 'container',
    name: '容器',
    icon: 'ios-square-outline',
    description: '基础容器，用于包裹其他组件',
    defaultProps: {
      padding: 16,
      backgroundColor: '#ffffff',
      borderRadius: 0,
      minHeight: 100
    },
    attrs: {
      padding: { type: 'number', label: '内边距', min: 0, max: 100 },
      backgroundColor: { type: 'color', label: '背景色' },
      borderRadius: { type: 'number', label: '圆角', min: 0, max: 50 },
      minHeight: { type: 'number', label: '最小高度', min: 50, max: 1000 }
    }
  },
  {
    tag: 'LcCard',
    devTag: 'DevLcCard',
    componentType: 'container',
    name: '卡片',
    icon: 'ios-card',
    description: '卡片容器，带标题和阴影效果',
    defaultProps: {
      title: '卡片标题',
      showTitle: true,
      padding: 16,
      shadow: 'hover',
      borderRadius: 4
    },
    attrs: {
      title: { type: 'string', label: '标题' },
      showTitle: { type: 'boolean', label: '显示标题' },
      padding: { type: 'number', label: '内边距', min: 0, max: 100 },
      borderRadius: { type: 'number', label: '圆角', min: 0, max: 50 }
    }
  },
  // 基础组件
  {
    tag: 'LcButton',
    devTag: 'DevLcButton',
    componentType: 'basic',
    name: '按钮',
    icon: 'ios-radio-button-on',
    description: '按钮组件',
    defaultProps: {
      text: '按钮',
      type: 'primary',
      size: 'default',
      long: false,
      width: 'auto',
      height: 'auto',
      borderRadius: 4
    },
    attrs: {
      text: { type: 'string', label: '文本' },
      type: { type: 'select', label: '类型', options: ['primary', 'default', 'dashed', 'text', 'info', 'success', 'warning', 'error'] },
      size: { type: 'select', label: '尺寸', options: ['large', 'default', 'small'] },
      long: { type: 'boolean', label: '长按钮' },
      width: { type: 'string', label: '宽度' },
      height: { type: 'string', label: '高度' },
      borderRadius: { type: 'number', label: '圆角', min: 0, max: 50 }
    }
  },
  {
    tag: 'LcText',
    devTag: 'DevLcText',
    componentType: 'basic',
    name: '文本',
    icon: 'ios-text',
    description: '文本组件',
    defaultProps: {
      content: '这是一段文本',
      fontSize: 14,
      color: '#333333',
      textAlign: 'left',
      fontWeight: 'normal',
      lineHeight: 1.5
    },
    attrs: {
      content: { type: 'textarea', label: '内容' },
      fontSize: { type: 'number', label: '字体大小', min: 12, max: 72 },
      color: { type: 'color', label: '颜色' },
      textAlign: { type: 'select', label: '对齐', options: ['left', 'center', 'right'] },
      fontWeight: { type: 'select', label: '字重', options: ['normal', 'bold', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900] },
      lineHeight: { type: 'number', label: '行高', min: 1, max: 3, step: 0.1 }
    }
  },
  {
    tag: 'LcImage',
    devTag: 'DevLcImage',
    componentType: 'basic',
    name: '图片',
    icon: 'ios-image',
    description: '图片组件',
    defaultProps: {
      src: 'https://via.placeholder.com/300x200',
      alt: '图片',
      width: '100%',
      height: 'auto',
      borderRadius: 0,
      objectFit: 'cover'
    },
    attrs: {
      src: { type: 'string', label: '图片地址' },
      alt: { type: 'string', label: '替代文本' },
      width: { type: 'string', label: '宽度' },
      height: { type: 'string', label: '高度' },
      borderRadius: { type: 'number', label: '圆角', min: 0, max: 50 },
      objectFit: { type: 'select', label: '填充模式', options: ['cover', 'contain', 'fill', 'none', 'scale-down'] }
    }
  },
  {
    tag: 'LcInput',
    devTag: 'DevLcInput',
    componentType: 'basic',
    name: '输入框',
    icon: 'ios-create',
    description: '输入框组件',
    defaultProps: {
      value: '',
      label: '',
      type: 'text',
      placeholder: '请输入',
      size: 'default',
      clearable: false,
      disabled: false,
      width: '100%'
    },
    attrs: {
      label: { type: 'string', label: '标签' },
      type: { type: 'select', label: '类型', options: ['text', 'password', 'textarea', 'url', 'email'] },
      placeholder: { type: 'string', label: '占位符' },
      size: { type: 'select', label: '尺寸', options: ['large', 'default', 'small'] },
      clearable: { type: 'boolean', label: '可清空' },
      disabled: { type: 'boolean', label: '禁用' },
      width: { type: 'string', label: '宽度' }
    }
  }
]

// 根据 tag 获取组件配置
export function getComponentConfig(tag) {
  return componentList.find(item => item.tag === tag || item.devTag === tag)
}

// 根据类型获取组件列表
export function getComponentsByType(type) {
  return componentList.filter(item => item.componentType === type)
}

// 创建组件实例数据
export function createComponentInstance(tag, uuid) {
  const config = getComponentConfig(tag)
  if (!config) return null

  return {
    tag: config.tag,
    devTag: config.devTag,
    componentType: config.componentType,
    componentId: uuid,
    attr: {},
    props: { ...config.defaultProps },
    children: config.componentType === 'container' ? [] : undefined
  }
}
