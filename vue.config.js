// vue的核心配置env文件，调用方式 process.env.baseUrl
// 更多请查看https://cli.vuejs.org/zh/config/#runtimecompiler
module.exports = {
  // 基本路径,生产环境和开发环境配置
  publicPath: process.env.publicPath,
  // 输出文件目录
  outputDir: process.env.outputDir,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: '',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // eslint-loader 是否在保存的时候检查

  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  // webpack的基本配置
  configureWebpack: {},
  // vue-loader 配置项
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  devServer: {
    // 设置主机地址
    host: process.env.host,
    // 设置默认端口
    port: process.env.port,
    // 设置代理
    proxy: {
      '/api/user': {
        // 目标 API 地址
        target: process.env.user_target,
        // 如果要代理 websockets
        ws: true,
        // 如果是https接口，需要配置这个参数
        secure: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': '/api/user'
        },
        '/api/file': {
          // 目标 API 地址
          target: process.env.target,
          // 如果要代理 websockets
          ws: true,
          // 如果是https接口，需要配置这个参数
          secure: false,
          // 将主机标头的原点更改为目标URL
          changeOrigin: true,
          pathRewrite: {
            '^/api/file': '/api/file'
          }
        }
      }
    }
  },

  // 设置路径别名

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
