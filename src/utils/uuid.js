/**
 * UUID 生成工具
 */

let counter = 0
const timestamp = Date.now()

export function generateUUID() {
  counter++
  return `lc-${timestamp}-${counter}-${Math.random().toString(36).substr(2, 9)}`
}

export function generateShortId() {
  return `id-${Math.random().toString(36).substr(2, 9)}`
}
