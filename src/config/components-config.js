export const containerComponents = [
  {
    tag: 'dev-container',
    componentType: 'container',
    name: '容器组件',
    icon: 'md-ionic',
    defaultProps: {
      title: '容器',
      padding: '16px',
      background: '#f5f5f5',
      border: '1px dashed #ccc'
    },
    children: []
  },
  {
    tag: 'dev-form',
    componentType: 'container',
    name: '表单容器',
    icon: 'md-clipboard',
    defaultProps: {
      title: '表单',
      labelWidth: '100px',
      labelPosition: 'left'
    },
    children: []
  }
]

export const basicComponents = [
  {
    tag: 'dev-button',
    componentType: 'basic',
    name: '按钮',
    icon: 'md-radio-button-off',
    defaultProps: {
      text: '按钮',
      type: 'primary',
      size: 'medium'
    }
  },
  {
    tag: 'dev-input',
    componentType: 'basic',
    name: '输入框',
    icon: 'md-create',
    defaultProps: {
      placeholder: '请输入',
      type: 'text',
      width: '200px'
    }
  },
  {
    tag: 'dev-text',
    componentType: 'basic',
    name: '文本',
    icon: 'md-text',
    defaultProps: {
      content: '这是一段文本',
      fontSize: '14px',
      color: '#333'
    }
  },
  {
    tag: 'dev-image',
    componentType: 'basic',
    name: '图片',
    icon: 'md-image',
    defaultProps: {
      src: 'https://picsum.photos/200/150',
      width: '200px',
      height: '150px'
    }
  },
  {
    tag: 'dev-select',
    componentType: 'basic',
    name: '选择器',
    icon: 'md-arrow-dropdown',
    defaultProps: {
      placeholder: '请选择',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    }
  },
  {
    tag: 'dev-switch',
    componentType: 'basic',
    name: '开关',
    icon: 'md-toggle',
    defaultProps: {
      value: false,
      size: 'medium'
    }
  }
]

export const runtimeComponents = [
  {
    tag: 'runtime-container',
    componentType: 'container'
  },
  {
    tag: 'runtime-button',
    componentType: 'basic'
  },
  {
    tag: 'runtime-input',
    componentType: 'basic'
  },
  {
    tag: 'runtime-text',
    componentType: 'basic'
  },
  {
    tag: 'runtime-image',
    componentType: 'basic'
  },
  {
    tag: 'runtime-select',
    componentType: 'basic'
  },
  {
    tag: 'runtime-switch',
    componentType: 'basic'
  }
]
