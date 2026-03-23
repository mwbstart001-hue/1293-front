import { v4 as uuidv4 } from 'uuid'

/**
 * 生成唯一组件 ID
 * @returns {string}
 */
export function generateId() {
    return uuidv4().replace(/-/g, '').substring(0, 16)
}

/**
 * 深拷贝
 * @param {*} obj
 * @returns {*}
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item))
    }
    const cloned = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key])
        }
    }
    return cloned
}

/**
 * 根据组件 JSON 模板创建一个实例（带唯一 ID）
 * @param {Object} config - 组件 JSON 模板
 * @returns {Object}
 */
export function createComponentInstance(config) {
    const instance = deepClone(config)
    instance.componentId = generateId()
    return instance
}
