import { v4 as uuidv4 } from 'uuid'

// 生成唯一ID
export function generateId() {
  return uuidv4()
}

// 生成组件JSON结构
export function createComponentJson(componentConfig) {
  return {
    tag: componentConfig.tag,
    componentType: componentConfig.componentType,
    componentId: generateId(),
    name: componentConfig.name,
    icon: componentConfig.icon,
    attr: {},
    props: { ...componentConfig.defaultProps },
    children: componentConfig.children || []
  }
}

// 深拷贝
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 查找组件在列表中的索引
export function findComponentIndex(list, componentId) {
  return list.findIndex(item => item.componentId === componentId)
}

// 查找组件
export function findComponent(list, componentId) {
  return list.find(item => item.componentId === componentId)
}

// 更新组件属性
export function updateComponentProp(list, componentId, key, value) {
  const component = findComponent(list, componentId)
  if (component) {
    if (key.includes('.')) {
      const keys = key.split('.')
      let target = component
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]]
      }
      target[keys[keys.length - 1]] = value
    } else {
      component.props[key] = value
    }
  }
  return [...list]
}

// 删除组件
export function removeComponent(list, componentId) {
  return list.filter(item => item.componentId !== componentId)
}

// 移动组件（重新排序）
export function moveComponent(list, fromIndex, toIndex) {
  const newList = [...list]
  const [removed] = newList.splice(fromIndex, 1)
  newList.splice(toIndex, 0, removed)
  return newList
}

// 获取画布JSON树
export function getCanvasJsonTree(componentList) {
  return {
    version: '1.0.0',
    timestamp: Date.now(),
    components: deepClone(componentList)
  }
}

// 导出JSON文件
export function exportJsonFile(data, filename = 'page-config.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
