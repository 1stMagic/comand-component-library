import { createRouter, createWebHistory } from 'vue-router'
import ContainerPage from "../documentation/views/ContainerPage"
import componentsDescription from "../documentation/data/componentsDescription.json"

const routes = []

const componentNames = Object.keys(componentsDescription)

function getActiveTab(tabName) {
    const tabIndex = ["view", "usage", "properties"].indexOf(tabName?.toLowerCase())
    if (tabIndex > -1) {
        return tabIndex
    }
    return 0
}

for(let i = 0 ; i < componentNames.length ; i++) {
    routes.push(
        {
          path: "/" + componentNames[i] + "/:tab?",
          name: componentNames[i],
          component: ContainerPage,
          props: route => ({
              componentName: componentNames[i],
              previousComponentName: i === 0 ? componentNames[componentNames.length - 1] : componentNames[i - 1],
              nextComponentName: i === componentNames.length - 1 ? componentNames[0] : componentNames[i + 1],
              activeTab: getActiveTab(route.params.tab)
          })
        }
    )
}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router