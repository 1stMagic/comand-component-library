function getRoute (entry) {
    if(entry.link.path) {
        return entry.link.path
    }
    return {
        name: entry.link.name,
        params: entry.link.params || {} // if entry.link.params is set (or return empty object)
    }
}

export { getRoute }