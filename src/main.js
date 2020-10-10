import Vue from 'vue'
import App from './App.vue'
import vClickOutside from 'v-click-outside'

/* import css from comand-frontend-framework */
import 'comand-frontend-framework/src/assets/css/normalize.css'
import 'comand-frontend-framework/src/assets/css/framework.css'
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'

import '@/assets/styles/comand-ui_structure.css'
import 'comand-frontend-framework/public/demopage-only.css'

Vue.config.productionTip = false

Vue.use(vClickOutside)

new Vue({
  render: h => h(App),
}).$mount('#app')
