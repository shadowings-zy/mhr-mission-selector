import { createApp } from 'vue'
import App from './App.vue'
import { ElButton, ElCheckbox, ElCheckboxGroup, ElCollapse, ElCollapseItem, ElForm, ElFormItem, ElInputNumber } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const components = [
  ElButton,
  ElInputNumber,
  ElCheckbox,
  ElCheckboxGroup,
  ElForm,
  ElFormItem,
  ElCollapse,
  ElCollapseItem
]

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app.mount('#app')
