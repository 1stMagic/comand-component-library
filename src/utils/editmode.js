function findEditComponentWrapper(component) {
    if (component?.$options?.name === "EditComponentWrapper") {
        return component
    }
    if (component?.$parent) {
        return findEditComponentWrapper(component.$parent)
    }
    return null
}

function buildComponentPath(component, ...extraPathElements) {
    const path = []
    for (let parent = findEditComponentWrapper(component); parent; parent = findEditComponentWrapper(parent.$parent)) {
        path.unshift(...parent.componentPath)
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

export {
    findEditComponentWrapper,
    buildComponentPath,
    componentPathAsString,
    updateHandlerProvider
}
