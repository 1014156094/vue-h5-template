import Vue from 'vue'

// 先按照规范写好的模块 API 后再统一引入
import common from './common'

// 加入 API 集合
const modules = [common]

export default ({ $axios }, inject) => {
  let api = {}
  modules.forEach(item => {
    if (typeof item === 'function') {
      api = { ...api, ...item($axios) }
    }
  })
  Vue.prototype.$_api = api
  inject('api', api)
}
