/* import css from comand-frontend-framework */
import 'comand-frontend-framework/src/assets/css/normalize.css'
import 'comand-frontend-framework/src/assets/css/framework.css'
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import "clickout-event"

/* import directive to format telephone- and fax-number */
import directiveTelephone from "./directives/telephone"

/* import additional iconfont containing company-logos */
import '@/assets/styles/logos-iconfont.css'

/* import css for global-styles */
import '@/assets/styles/global-styles.scss'

/* import css for global transitions */
import '@/assets/styles/transitions.scss'

/* import css for your custom styles */
import '@/assets/styles/template.css'

/* import css for demopage only */
import 'comand-frontend-framework/public/demopage-only.css'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'somename',
      component: App
    }
  ]
})

createApp(App).use(router).directive('telephone', directiveTelephone).mount('#app')