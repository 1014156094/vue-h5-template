import Vue from 'vue'

const requireBaseComponent = require.context(
  // 组件目录
  '@/base',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index.vue$/
)

// 自动导入
requireBaseComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireBaseComponent(fileName)
  // 通过路径获取组件名
  const componentName = fileName
    .split('/')
    .splice(-2)
    .shift()

  // 全局注册该组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

const requireComponent = require.context(
  // 组件目录
  '@/components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index.vue$/
)

// 自动导入
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 通过路径获取组件名
  const componentName = fileName
    .split('/')
    .splice(-2)
    .shift()

  // 全局注册该组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
