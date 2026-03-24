import containerComponentsData from './containerComponents'
import basicComponentsData from './basicComponents'

export const componentList = [
  ...containerComponentsData,
  ...basicComponentsData
]

export const containerComponentsList = containerComponentsData
export const containerComponents = containerComponentsData

export const basicComponentsList = basicComponentsData
export const basicComponents = basicComponentsData

export function createComponentConfig(componentDef) {
  return {
    tag: componentDef.tag,
    componentType: componentDef.componentType,
    componentId: '',
    name: componentDef.name,
    attr: {},
    props: JSON.parse(JSON.stringify(componentDef.defaultProps || {})),
    children: componentDef.componentType === 'container' ? [] : undefined
  }
}

export default {
  containerComponents: containerComponentsData,
  basicComponents: basicComponentsData,
  componentList,
  createComponentConfig
}
