function getOffsetTop(el) {
    if (el.offsetParent) {
        return el.offsetTop + getOffsetTop(el.offsetParent)
    }
    return el.offsetTop
}

export {getOffsetTop}
