import { v4 as uuidv4 } from 'uuid'

const UtilsPlugin = {
  install(Vue) {
    Vue.prototype.$utils = {
      generateId() {
        return uuidv4()
      },
      
      deepClone(obj) {
        return JSON.parse(JSON.stringify(obj))
      },
      
      findComponentById(tree, id) {
        for (const node of tree) {
          if (node.componentId === id) return node
          if (node.children && node.children.length) {
            const found = this.findComponentById(node.children, id)
            if (found) return found
          }
        }
        return null
      },
      
      removeComponentById(tree, id) {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].componentId === id) {
            tree.splice(i, 1)
            return true
          }
          if (tree[i].children && tree[i].children.length) {
            if (this.removeComponentById(tree[i].children, id)) {
              return true
            }
          }
        }
        return false
      },
      
      updateComponentById(tree, id, updates) {
        const component = this.findComponentById(tree, id)
        if (component) {
          Object.assign(component, updates)
          return true
        }
        return false
      }
    }
  }
}

export default UtilsPlugin
