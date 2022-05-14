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
    }
}
