const path = require("path")

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }
            })

        config.module
            .rule("cmd")
            .test(/Cmd.+?\.vue$/)
            .use("props-loader")
            .loader("props-loader")
            .tap(options => {
                return {
                    ...(options || {}),
                    targetFilenameTemplate: "{componentName}PropertyDescriptions.json",
                    targetDirectory: path.resolve(__dirname, "src/documentation/generated")
                }
            })
            .end()

        config.resolveLoader.alias.set("props-loader", path.resolve(__dirname, "build/plugins/propsLoader.js"))
    }
}
