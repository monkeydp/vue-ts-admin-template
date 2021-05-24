const name = '管理后台'

function isEnv(env: string) {
    return process.env.NODE_ENV === env
}

function isProd() {
    return isEnv('production')
}

module.exports = {
    devServer: {
        port: 8082,
        proxy: isProd() ? null :{
            '/adminend': {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: {
                    // '^/adminend': 'adminend'
                }
            }
        },
    },
    // lintOnSave: isDev(),
    lintOnSave: false, // 是否启用 eslint 检测
    pwa: {
        name: name
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "./src/style/_variables.scss";
                @import "./src/style/_mixins.scss";
                `
            }
        }
    },
    chainWebpack(config) {
        // Provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        config.set('name', name)
    }
}
