function isFrameMode() {
    const frameUrl = new URL(location)
    return frameUrl.searchParams.has("frameMode")
}

export {isFrameMode}