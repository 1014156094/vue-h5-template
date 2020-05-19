/**
 * 当前用户模块
 */

import Cookies from 'js-cookie'

export const state = () => ({
  info: (Cookies.get('user_info') && JSON.parse(Cookies.get('user_info'))) || {} // 当前用户信息
})

export const getters = {}

export const mutations = {}

export const actions = {}
