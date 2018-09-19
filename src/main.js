import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

export const eventBus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
