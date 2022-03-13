import {ref} from "vue"
import router from "../router"

const tabs = [{name: 'Component'}, {name: 'Properties'}]
const tabProps = {
    tabs,
    stretchTabs: true,
    useSlot: true,
    activeTab: ref(0)
}
const tabHandlers = {
    activeTab: setActiveTab
}

function getActiveTab(tabName) {
    const tabIndex = tabs.map(tab => tab.name.toLowerCase()).indexOf(tabName?.toLowerCase())
    if (tabIndex > -1) {
        return tabIndex
    }
    return 0
}

// set url-parameter if tab is clicked
function setActiveTab(index) {
    const tab = tabs[index]
    if (tab) {
        router.push({
            name: router.currentRoute.name,
            params: {
                tab: tab.name.toLowerCase()
            }
        })
    }
}

function routeHandler(to) {
    tabProps.activeTab = getActiveTab(to.params.tab)
}

export {
    tabs,
    tabProps,
    tabHandlers,
    setActiveTab,
    routeHandler
}
