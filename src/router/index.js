import { createRouter, createWebHistory } from "vue-router"
import {routeHandler as tabsRouteHandler} from "../documentation/tabs"
import ContainerPage from "../documentation/views/ContainerPage"
import componentsDescription from "../documentation/data/componentsDescription"

const routes = []

const componentNames = Object.keys(componentsDescription)

routes.push({
    path: "/",
    name: "home",
    redirect: {
        name: componentNames[0]
    }
})

for(let i = 0 ; i < componentNames.length ; i++) {
    routes.push(
        {
          path: "/" + componentNames[i] + "/:tab?",
          name: componentNames[i],
          component: ContainerPage,
          props: () => ({
              componentName: componentNames[i],
              previousComponentName: i === 0 ? componentNames[componentNames.length - 1] : componentNames[i - 1],
              nextComponentName: i === componentNames.length - 1 ? componentNames[0] : componentNames[i + 1]
          })
        }
    )
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(tabsRouteHandler)

export default router