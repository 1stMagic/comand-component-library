function getRoute (entry) {
    if(entry.path) {
        return entry.path
    }
    return entry.route
}

export { getRoute }