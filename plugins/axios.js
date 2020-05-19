// Axios 文档: https://axios.nuxtjs.org/usage

/**
 * Axios 在请求流程设计上的几点原则：
 *
 * 1. 所有软错误的 error_message 错误信息不一定要 toast 出来，譬如登录、注册失败，
 *    这些 error_message 将会被显示在表单元素附近，所以需要在 reject 错误参数时
 *    附带回调函数 hideToast 让开发者在 api 调用处的 catch 回调中控制是否 toast。
 *    默认情况下，所有的错误信息都会被 toast 出来。
 * 2. 所有的 http 错误也不一定都要展示错误信息，处理方式同上 —— 提供回调函数由开发者
 *    决定是否展示错误信息。
 * 3. 所有的错误流程均要让 api 调用处的代码进入 catch 流程。
 *
 * 名词解析：
 * a. 软错误：指 http 请求的状态码为 200 但 response.data.error 不为零的情况
 * b. http 错误：指 http 请求的状态码不为 200 的情况
 *
 * 调用示例：
 *
 * this.$api.login({
 *   mobile,
 *   password
 * }).then(({ data }) => {
 *   // 正常流程
 * }, ({ error, hideToast }) => {
 *   // axios 请求过程出错会进入该流程，而该 then 回调中的其他出错会进入下一个 catch
 *   // axios 异常流程
 * })
 * .catch(e => {
 *   // 上一个 then 里的异常流程
 * })
 * .finally(() => {
 *   // 收尾工作
 * })
 *
 */

import Vue from 'vue'

export default function({ $axios, store, route, app, redirect }) {
  $axios.onRequest(config => {
    let userInfo = store.state.user.info
    let userToken = (userInfo instanceof Object && userInfo.token) || ''

    config.baseURL = app.$configs.apiOrigin // API 路径前缀
    config.timeout = 1000 * 20 // 请求超时时间
    userToken && (config.headers['Authorization'] = 'Bearer ' + userToken)

    return config
  })

  $axios.onResponse(response => {
    if (response.data.error_code === 0) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  })

  $axios.onError(error => {
    // 非 HTTP 200 时 error.response 会存在数据
    if (error.response) {
      switch (error.response.status) {
        case 401:
          error.error_message = '登录过期'
          setTimeout(() => {
            store.commit('user/resetUserInfo') // 重置用户信息

            if (app.$utils.isWechat) {
              window.location = store.getters['env/wechatLoginURL'] // 跳转到微信授权
            } else {
              redirect(`/login?redirect=${encodeURIComponent(route.fullPath)}`) // 重定向到登录页面
            }
          }, 1000)
          break
        case 403:
          // 跳转到 layouts/error.vue
          window.$nuxt.error({
            message: '无权访问，请求被拒绝'
          })
          break
        case 404:
          error.error_message = '资源不存在'
          break
        case 405:
          error.error_message = '请求方法错误'
          break
        default:
          error.error_message = '服务器开小差了，请稍后重试'
      }
    }

    const timer = setTimeout(() => {
      Vue.prototype.$toast(error.error_message || '未知异常，请稍后重试吧')
    })

    return Promise.reject({
      error,
      // 用于在业务页面控制是否显示轻提示
      hideToast() {
        clearTimeout(timer)
      }
    })
  })
}
