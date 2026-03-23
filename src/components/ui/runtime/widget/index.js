import WidgetInput from './WidgetInput.vue'
import WidgetButton from './WidgetButton.vue'
import WidgetText from './WidgetText.vue'
import WidgetSelect from './WidgetSelect.vue'
import WidgetSwitch from './WidgetSwitch.vue'

const widgets = [
    { name: 'widget-input', component: WidgetInput },
    { name: 'widget-button', component: WidgetButton },
    { name: 'widget-text', component: WidgetText },
    { name: 'widget-select', component: WidgetSelect },
    { name: 'widget-switch', component: WidgetSwitch }
]

export default {
    install(Vue) {
        widgets.forEach(w => {
            Vue.component(w.name, w.component)
        })
    },
    widgets
}
