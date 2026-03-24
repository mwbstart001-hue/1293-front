import Vue from 'vue'

// 运行时组件
import LcContainer from './runtime/LcContainer'
import LcButton from './runtime/LcButton'
import LcText from './runtime/LcText'
import LcImage from './runtime/LcImage'
import LcInput from './runtime/LcInput'
import LcCard from './runtime/LcCard'

// 开发时组件
import DevLcContainer from './dev/DevLcContainer'
import DevLcButton from './dev/DevLcButton'
import DevLcText from './dev/DevLcText'
import DevLcImage from './dev/DevLcImage'
import DevLcInput from './dev/DevLcInput'
import DevLcCard from './dev/DevLcCard'

const components = {
  // 运行时
  LcContainer,
  LcButton,
  LcText,
  LcImage,
  LcInput,
  LcCard,
  // 开发时
  DevLcContainer,
  DevLcButton,
  DevLcText,
  DevLcImage,
  DevLcInput,
  DevLcCard
}

const ComponentsUI = {
  install(Vue) {
    Object.keys(components).forEach(name => {
      Vue.component(name, components[name])
    })
  }
}

export default ComponentsUI
