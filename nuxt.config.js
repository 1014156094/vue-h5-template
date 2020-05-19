const path = require('path')

module.exports = {
  /**
   * 构建模式
   */
  mode: 'spa',

  /**
   * 自定义环境变量
   */
  env: {
    NODE_ENV: process.env.NODE_ENV // package.json 自定义设置的 NODE_ENV 会被中途改变，不想被改变需要在这赋值
  },

  /*
  ** 自定义页面头部
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: '网站描述'
      },
      {
        name: 'referrer',
        content: 'always'
      }
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1023794_knw2mbsx2b8.js', async: 'async' } // 阿里图标
    ]
  },

  /*
  ** 自定义加载指示器样式
  */
  loading: false,
  loadingIndicator: {
    name: 'cube-grid',
    color: '#FFCF00',
    background: '#FFF'
  },

  /*
  ** 全局样式
  */
  css: [
    'normalize.css',
    './assets/styles/reset.less',
    './assets/styles/base.less',
    './assets/styles/responsive.less',
    './assets/styles/vant-ui/base.less'
  ],

  /*
  ** 注册模块，作用于 nuxt 初始化前
  */
  plugins: [
    'babel-polyfill',
    'url-search-params-polyfill',
    'api',
    'axios',
    'inject',
    'router',
    'vue/vant-ui',
    'vue/component',
    'vue/config'
  ].map(fileName => '~/plugins/' + fileName),

  /*
   ** Nuxt.js 模块
   */
  modules: [
    // 文档: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // 文档: https://zh.nuxtjs.org/api/configuration-build#styleresources
    '@nuxtjs/style-resources',
    // 文档: https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry'
  ],

  /*
   ** Axios 模块配置
   */
  axios: {
    // 文档: https://github.com/nuxt-community/axios-module#options
  },

  /**
   * sentry 错误采集配置
   */
  sentry: {
    dsn: 'https://747826beb042478a8e3dfecee5127367@sentry.tongxinghui.com/14', // sentry 日志上报地址
    disabled: process.env.NODE_ENV === 'development', // 开发模式下错误告警不被记录到 sentry
    publishRelease: process.env.SENTRY_RELEASE === 'true' // 仅在执行名称为 sentry-release 的 npm 任务时才上传 sourceMap 到 sentry
  },

  /*
  ** StyleResources 模块配置
  */
  styleResources: {
    less: ['./assets/styles/mixins.less']
  },

  /**
   * 路由中间件，有顺序限制，按照数组下标顺序加载
   */
  router: {
    middleware: []
  },

  /*
  ** 构建配置，文档: https://zh.nuxtjs.org/api/configuration-build
  */
  build: {
    babel: {
      plugins: [
        // VantUI 自动按需引入组件配置
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: name => `${name}/style/less` // 指定样式路径
          },
          'vant'
        ]
      ]
    },
    loaders: {
      // VantUI 定制主题配置
      less: {
        javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './assets/styles/vant-ui/variables.less'
          )}";`
        }
      }
    },
    /*
    ** 您可以在这里扩展 webpack 配置
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'source-map' // 调试显示源码
      }
    }
  }
}
