import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'

/* import css from comand-frontend-framework */
import 'comand-frontend-framework/src/assets/css/normalize.css'
import 'comand-frontend-framework/src/assets/css/framework.css'
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'

/* import additional iconfont containing company-logos */
import '@/assets/styles/logos-iconfont.css'

/* import css for comand-component-library-structure */
import '@/assets/styles/comand-component-library-structure.scss'

/* import css for your custom styles */
import '@/assets/styles/template.css'

/* import css for demopage only */
import 'comand-frontend-framework/public/demopage-only.css'

const router = new VueRouter({
  mode: 'history'
})

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vClickOutside)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
