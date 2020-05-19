/**
 * 项目环境变量配置
 * 定义规则：当在不同的环境中，它的值可能会变动，那么它应该定义为环境变量，当遇到紧急情况也方便切换值来调试或发布等
 */
import { setURLParam } from '../utils'

let _isProd = false // 是否为线上正服

if (process.env.NODE_ENV === 'development') {
  // 本地环境
} else if (window.location.hostname.includes('dev-')) {
  // 测服环境
} else {
  // 正服环境
  _isProd = true
}

// 是否为线上环境
export const isProd = _isProd

// 接口地址，服务器已通过 nginx 代理为当前域名的 /api
export const apiOrigin = '/api'
