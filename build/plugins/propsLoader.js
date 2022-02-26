const loaderUtils = require("loader-utils")
const path = require("path")
const fs = require("fs")

const COMMENT_START_PATTERN = /^\/\*\*$/
const COMMENT_END_PATTERN = /^\*\/$/
const PROPS_PATTERN = /^\s*props\s*:\s*\{.*$/
const PROP_PATTERN = /^(.+?)\s*:\s*\{$/
const ANNOTATION_PATTERN = /^@(.+?)[:\s](.*)$/

function canProcess(filename) {
    return filename.match(/^Cmd.+?(?<!Help)\.vue$/)
}

function indexOfProps(lines) {
    for (let i = 0, c = lines.length; i < c; i++) {
        if (lines[i].match(PROPS_PATTERN)) {
            return i
        }
    }
    return -1
}

function processLine(context, line) {
    if (line.match(COMMENT_START_PATTERN)) {
        context.inComment = true
        context.currentComments = []
        return true
    }
    if (line.match(COMMENT_END_PATTERN)) {
        context.inComment = false
        return true
    }
    if (context.inComment && line.charAt(0) === "*") {
        context.currentComments.push(line.slice(2))
        return true
    }
    if (!context.inComment) {
        if (!context.inProperty && line.match(PROP_PATTERN)) {
            context.inProperty = true
            context.currentProperty = line.replace(PROP_PATTERN, "$1")
            context.depth = 2
            return true
        }
        if (line.indexOf("{") > -1) {
            context.depth++
            return true
        }
        if (line.indexOf("}") > -1) {
            context.depth--
            if (context.depth === 1) {
                if (context.inProperty) {
                    context.inProperty = false
                    if (context.currentProperty && context.currentComments.length) {
                        context.propertyDescriptions[context.currentProperty] = {
                            comments: context.currentComments
                        }
                    }
                    context.currentProperty = null
                }
                return true
            }
            return context.depth > 0
        }
    }
    return true
}

function processAnnotations(context) {
    Object.entries(context.propertyDescriptions)
        .forEach(([property, data]) => processPropertyData(property, data))
}

function processPropertyData(property, data) {
    if (data.comments && data.comments.length) {
        const context = {
            annotations: {},
            currentAnnotation: null,
            currentAnnotationValues: []
        }
        data.comments.forEach(comment => processComment(context, comment))
        if (context.currentAnnotation && context.currentAnnotationValues.length) {
            context.annotations[context.currentAnnotation] = context.currentAnnotationValues
        }
        if (Object.keys(context.annotations).length) {
            const firstAnnotationIndex = data.comments.findIndex(comment => comment.match(ANNOTATION_PATTERN))
            if (firstAnnotationIndex > -1) {
                data.comments.splice(firstAnnotationIndex)
                for (let i = data.comments.length - 1; i > 0; i--) {
                    if (!data.comments[i].trim()) {
                        data.comments.splice(i, 1)
                    }
                }
            }
            data.annotations = context.annotations
        }
    }
}

function processComment(context, comment) {
    if (context.currentAnnotation && !comment.match(ANNOTATION_PATTERN)) {
        context.currentAnnotationValues.push(comment)
        return
    }
    if (comment.match(ANNOTATION_PATTERN)) {
        if (context.currentAnnotation && context.currentAnnotationValues.length) {
            context.annotations[context.currentAnnotation] = context.currentAnnotationValues
        }
        context.currentAnnotation = comment.replace(ANNOTATION_PATTERN, "$1")
        context.currentAnnotationValues = [comment.replace(ANNOTATION_PATTERN, "$2").trim()]
    }
}

function buildTargetFilename(filename, filenameTemplate) {
    const template = filenameTemplate || "{componentName}_pd.json"
    return template.replace("{componentName}", filename.replace(/\.vue$/, ""))
}

module.exports = function(source) {
    const filename = path.basename(this.resourcePath)
    if (canProcess(filename)) {
        const lines = source.split(/\r?\n/)
        const propsIndex = indexOfProps(lines)
        if (propsIndex > -1) {
            const context = {
                propertyDescriptions: {},
                currentComments: [],
                currentProperty: null,
                inComment: false,
                inProperty: false,
                depth: 1
            }
            for (let i = propsIndex + 1, c = lines.length; i < c; i++) {
                if (!processLine(context, lines[i].trim())) {
                    break
                }
            }
            processAnnotations(context)
            if (this.__cmdTestContext) {
                this.__cmdResult = context.propertyDescriptions
            } else {
                if (Object.keys(context.propertyDescriptions).length) {
                    const options = loaderUtils.getOptions(this)
                    const targetFilename = buildTargetFilename(filename, options.targetFilenameTemplate)
                    const targetFile = path.resolve(options.targetDirectory, targetFilename)
                    try {
                        fs.writeFileSync(targetFile, JSON.stringify(context.propertyDescriptions, null, 4))
                    } catch (e) {
                        this.emitWarning(e)
                    }
                }
            }
        }
    }
    return source
}
