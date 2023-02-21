/* begin imports css from comand-frontend-framework ---------------------------------------------------------------------------------------- */
/* import normalize to set same default styles for all browsers */
import 'comand-frontend-framework/src/assets/css/normalize.css'

/* import framework-styles */
import 'comand-frontend-framework/src/assets/css/framework.css'

/* import breakpoints */
import 'comand-frontend-framework/src/assets/css/breakpoints.css'

/* import framework-iconfont */
import 'comand-frontend-framework/src/assets/css/framework-iconfont.css'
/* end imports css from comand-frontend-framework ---------------------------------------------------------------------------------------- */

import { createApp } from 'vue'

// import App from './App.vue'
import App from './App.vue'
//import { createRouter, createWebHistory } from 'vue-router'
import "clickout-event"

/* import directives */
// directive to format telephone- and fax-number
import directiveTelephone from "./directives/telephone"

// directive to set focus on specific form-elements
import directiveFocus from "./directives/focus"

/* begin imports css from comand-component-library ---------------------------------------------------------------------------------------- */
/* import additional iconfont containing company-logos */
import '@/assets/styles/logos-iconfont.css'

/* import css for global-styles */
import '@/assets/styles/global-styles.scss'

/* import css for global transitions */
import '@/assets/styles/transitions.scss'

/* import css-example for your custom styles (contains overwritten primary-color only) */
import '@/assets/styles/template.css'

/* import css for prism-library (for styling syntax) */
import "prismjs/themes/prism.css"

/* import css for demopage only */
import 'comand-frontend-framework/public/demopage-only.css'
/* end imports css from comand-component-library ---------------------------------------------------------------------------------------- */

import router from "./router"

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes: [
//     {
//       path: '/:pathMatch(.*)*',
//       name: 'somename',
//       component: App
//     }
//   ]
// })

// createApp(App).use(router).directive('telephone', directiveTelephone).directive('focus', directiveFocus).mount('#app')
createApp(App).use(router).directive('telephone', directiveTelephone).directive('focus', directiveFocus).mount('#app')