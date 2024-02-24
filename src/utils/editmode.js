function findEditComponentWrapper(component, filter) {
    return findParentComponent(component, "EditComponentWrapper", filter)
}

function findEditSettingsComponentWrapper(component) {
    return findParentComponent(component, "EditModeSettingsSidebar")
}

function findMainSidebar(component) {
    return findParentComponent(component, "EditModeMainSidebar")
}

function findParentComponent(component, parentComponentName, filter) {
    if (component?.$options?.name === parentComponentName && (filter == null || filter(component))) {
        return component
    }
    if (component?.$parent) {
        return findParentComponent(component.$parent, parentComponentName, filter)
    }
    return null
}

function buildComponentPath(component, ...extraPathElements) {
    const path = []
    for (let parent = findEditComponentWrapper(component); parent; parent = findEditComponentWrapper(parent.$parent)) {
        if (parent.componentPath) {
            path.unshift(...parent.componentPath);
        }
    }
    path.push(...extraPathElements)
    return path
}

function componentPathAsString(componentPath) {
    if (Array.isArray(componentPath) && componentPath.length > 0) {
        return JSON.stringify(componentPath)
    }
    return ""
}

function updateHandlerProvider(component, options) {
    if (component?.$options?.name) {
        return {
            name: component.$options.name,
            ...options
        }
    }
    return options
}

function highlightSection(sectionId) {
    document.querySelectorAll(".section-wrapper.active").forEach((section) => section.classList.remove("active"))
    // get the edit-mode-wrapper of a section
    const element = document.getElementById("edit-mode-" + sectionId)
    element.scrollIntoView()
    element.classList.add("active")
}

export {
    findEditComponentWrapper,
    findEditSettingsComponentWrapper,
    findMainSidebar,
    buildComponentPath,
    componentPathAsString,
    updateHandlerProvider,
    highlightSection
}
