export default [
  {
    tag: 'Container',
    componentType: 'container',
    name: '容器',
    icon: 'ios-square-outline',
    category: 'container',
    defaultProps: {
      style: {
        width: '100%',
        minHeight: '100px',
        padding: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e8e8e8'
      }
    },
    children: []
  },
  {
    tag: 'Card',
    componentType: 'container',
    name: '卡片容器',
    icon: 'ios-albums-outline',
    category: 'container',
    defaultProps: {
      title: '卡片标题',
      style: {
        width: '100%',
        minHeight: '120px'
      }
    },
    children: []
  },
  {
    tag: 'Row',
    componentType: 'container',
    name: '栅格行',
    icon: 'ios-grid-outline',
    category: 'container',
    defaultProps: {
      gutter: 16
    },
    children: []
  }
]
