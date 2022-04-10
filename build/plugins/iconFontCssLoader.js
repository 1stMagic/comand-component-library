const loaderUtils = require("loader-utils")
const path = require("path")
const fs = require("fs")

const FILENAME_PATTERN = /^(.+?)-iconfont.css$/

function buildTargetFilename(cssName, filenameTemplate) {
    const template = filenameTemplate || "{cssName}Icons.json"
    return template.replace("{cssName}", cssName)
}

function camelize(value) {
    return (value || "").replace(/(.)-(.)/g, (match, p1, p2) => p1 + p2.toUpperCase())
}

module.exports = function(source) {
    const filename = path.basename(this.resourcePath)
    if (filename.toLowerCase().slice(-4) === ".css") {
        const icons = []
        const iconPattern = /\.(icon-(.+?)):/g
        for (const match of source.matchAll(iconPattern)) {
            icons.push({
                name: match[2],
                iconClass: match[1]
            })
        }
        if (icons.length) {
            const match = filename.match(FILENAME_PATTERN)
            const cssName = camelize(match?.[1] || filename.slice(0, -4))
            const options = loaderUtils.getOptions(this)
            const targetFilename = buildTargetFilename(cssName, options.targetFilenameTemplate)
            const targetFile = path.resolve(options.targetDirectory, targetFilename)
            try {
                fs.writeFileSync(targetFile, JSON.stringify(icons, null, 4))
            } catch (e) {
                this.emitWarning(e)
            }
        }
    }
    return source
}
