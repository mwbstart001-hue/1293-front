import UIContainer from './container/UIContainer.vue'
import DevUIContainer from './container/DevUIContainer.vue'
import UICard from './container/UICard.vue'
import DevUICard from './container/DevUICard.vue'
import UIRow from './container/UIRow.vue'
import DevUIRow from './container/DevUIRow.vue'

import UIButton from './basic/UIButton.vue'
import DevUIButton from './basic/DevUIButton.vue'
import UIInput from './basic/UIInput.vue'
import DevUIInput from './basic/DevUIInput.vue'
import UISelect from './basic/UISelect.vue'
import DevUISelect from './basic/DevUISelect.vue'
import UICheckbox from './basic/UICheckbox.vue'
import DevUICheckbox from './basic/DevUICheckbox.vue'
import UIRadio from './basic/UIRadio.vue'
import DevUIRadio from './basic/DevUIRadio.vue'
import UISwitch from './basic/UISwitch.vue'
import DevUISwitch from './basic/DevUISwitch.vue'
import UIDatePicker from './basic/UIDatePicker.vue'
import DevUIDatePicker from './basic/DevUIDatePicker.vue'
import UIText from './basic/UIText.vue'
import DevUIText from './basic/DevUIText.vue'
import UIImage from './basic/UIImage.vue'
import DevUIImage from './basic/DevUIImage.vue'
import UIDivider from './basic/UIDivider.vue'
import DevUIDivider from './basic/DevUIDivider.vue'
import UITable from './basic/UITable.vue'
import DevUITable from './basic/DevUITable.vue'

const components = {
  UIContainer,
  DevUIContainer,
  UICard,
  DevUICard,
  UIRow,
  DevUIRow,
  UIButton,
  DevUIButton,
  UIInput,
  DevUIInput,
  UISelect,
  DevUISelect,
  UICheckbox,
  DevUICheckbox,
  UIRadio,
  DevUIRadio,
  UISwitch,
  DevUISwitch,
  UIDatePicker,
  DevUIDatePicker,
  UIText,
  DevUIText,
  UIImage,
  DevUIImage,
  UIDivider,
  DevUIDivider,
  UITable,
  DevUITable
}

const ComponentsUI = {
  install(Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}

export const componentMap = {
  Container: { runtime: 'UIContainer', dev: 'DevUIContainer' },
  Card: { runtime: 'UICard', dev: 'DevUICard' },
  Row: { runtime: 'UIRow', dev: 'DevUIRow' },
  Button: { runtime: 'UIButton', dev: 'DevUIButton' },
  Input: { runtime: 'UIInput', dev: 'DevUIInput' },
  Select: { runtime: 'UISelect', dev: 'DevUISelect' },
  Checkbox: { runtime: 'UICheckbox', dev: 'DevUICheckbox' },
  Radio: { runtime: 'UIRadio', dev: 'DevUIRadio' },
  Switch: { runtime: 'UISwitch', dev: 'DevUISwitch' },
  DatePicker: { runtime: 'UIDatePicker', dev: 'DevUIDatePicker' },
  Text: { runtime: 'UIText', dev: 'DevUIText' },
  Image: { runtime: 'UIImage', dev: 'DevUIImage' },
  Divider: { runtime: 'UIDivider', dev: 'DevUIDivider' },
  Table: { runtime: 'UITable', dev: 'DevUITable' }
}

export default ComponentsUI
