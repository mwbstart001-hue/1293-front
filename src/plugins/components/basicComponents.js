export default [
  {
    tag: 'Button',
    componentType: 'basic',
    name: '按钮',
    icon: 'ios-cube-outline',
    category: 'basic',
    defaultProps: {
      type: 'primary',
      size: 'default',
      text: '按钮'
    }
  },
  {
    tag: 'Input',
    componentType: 'basic',
    name: '输入框',
    icon: 'ios-create-outline',
    category: 'basic',
    defaultProps: {
      placeholder: '请输入内容',
      size: 'default',
      clearable: true
    }
  },
  {
    tag: 'Select',
    componentType: 'basic',
    name: '选择器',
    icon: 'ios-arrow-down-outline',
    category: 'basic',
    defaultProps: {
      placeholder: '请选择',
      clearable: true
    }
  },
  {
    tag: 'Checkbox',
    componentType: 'basic',
    name: '多选框',
    icon: 'ios-checkbox-outline',
    category: 'basic',
    defaultProps: {
      label: '多选项'
    }
  },
  {
    tag: 'Radio',
    componentType: 'basic',
    name: '单选框',
    icon: 'ios-radio-button-off',
    category: 'basic',
    defaultProps: {
      label: '单选项'
    }
  },
  {
    tag: 'Switch',
    componentType: 'basic',
    name: '开关',
    icon: 'ios-switch-outline',
    category: 'basic',
    defaultProps: {
      size: 'default'
    }
  },
  {
    tag: 'DatePicker',
    componentType: 'basic',
    name: '日期选择',
    icon: 'ios-calendar-outline',
    category: 'basic',
    defaultProps: {
      type: 'date',
      placeholder: '选择日期'
    }
  },
  {
    tag: 'Text',
    componentType: 'basic',
    name: '文本',
    icon: 'ios-text-outline',
    category: 'basic',
    defaultProps: {
      content: '这是一段文本内容',
      style: {
        fontSize: '14px',
        color: '#515a6e'
      }
    }
  },
  {
    tag: 'Image',
    componentType: 'basic',
    name: '图片',
    icon: 'ios-image-outline',
    category: 'basic',
    defaultProps: {
      src: 'https://via.placeholder.com/150',
      style: {
        width: '150px',
        height: '150px'
      }
    }
  },
  {
    tag: 'Divider',
    componentType: 'basic',
    name: '分割线',
    icon: 'ios-remove',
    category: 'basic',
    defaultProps: {
      dashed: false
    }
  },
  {
    tag: 'Table',
    componentType: 'basic',
    name: '表格',
    icon: 'ios-list-box-outline',
    category: 'basic',
    defaultProps: {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' }
      ],
      data: [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 }
      ]
    }
  }
]
