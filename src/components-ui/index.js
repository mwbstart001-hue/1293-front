// 自动导入所有组件
const components = {}

// 导入基础组件
const basicCtx = import.meta.globEager('./basics/*.vue')
for (const path in basicCtx) {
  const component = basicCtx[path].default
  components[component.name] = component
}

// 导入容器组件
const containerCtx = import.meta.globEager('./containers/*.vue')
for (const path in containerCtx) {
  const component = containerCtx[path].default
  components[component.name] = component
}

// 运行时组件映射
export const runtimeComponentMap = {
  'dev-button': 'DevButton',
  'dev-input': 'DevInput',
  'dev-text': 'DevText',
  'dev-image': 'DevImage',
  'dev-select': 'DevSelect',
  'dev-switch': 'DevSwitch',
  'dev-container': 'DevContainer',
  'dev-form': 'DevForm'
}

export default components
