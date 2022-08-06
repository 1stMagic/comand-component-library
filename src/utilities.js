function getRoute (entry) {
    if(entry.path) {
        return entry.path
    }

    if(entry.route == null || typeof entry.route !== "object" || (!entry.route.path && !entry.route.name)) {
        console.error("Error in router configuration. Expected object with 'path' or 'name', got", entry.route)
    }
    return entry.route
}

export { getRoute }