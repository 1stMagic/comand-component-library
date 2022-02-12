function capitalize(string) {
    if(string) {
        return string.slice(0, 1).toUpperCase() + string.slice(1)
    }
    return ""
}

export {capitalize}