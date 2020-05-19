import Vue from 'vue'

export default ({ app }) => {
  /*
  ** 禁用相关生命周期里的错误处理，以避免出错时直接阻止了页面跳转
  */

  // Vue.config.errorHandler = (err, vm, info) => {
  //   if (['mounted hook', 'render'].indexOf(info)) {
  //     console.error(err)
  //     return true
  //   }
  // }

  /*
  ** 阻止默认的全局错误处理，避免一出错就跳转到错误页面 layouts/error.vue
  */

  // Vue.config.$nuxt = {}

  /*
  ** 添加全局混入，请谨慎使用，确保全页面都用到，不然导致打包文件变大
  */

  Vue.mixin({})
}
