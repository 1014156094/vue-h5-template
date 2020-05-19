/**
 * 模块全局注入
 * https://zh.nuxtjs.org/guide/plugins/#%E5%90%8C%E6%97%B6%E6%B3%A8%E5%85%A5
 */

import * as utils from '@/assets/js/utils'
import * as configsEnv from '@/assets/js/configs/env'
import * as constants from '@/assets/js/constants'

export default (context, inject) => {
  const configs = {
    ...configsEnv
  }

  inject('utils', utils)
  inject('configs', configs)
  inject('constants', constants)
}
