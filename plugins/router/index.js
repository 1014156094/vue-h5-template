import VConsole from 'vconsole'

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    next()
  })

  app.router.afterEach((to, from) => {
    // url 带有 vconsole 参数则显示 vconsole 控制台
    if (app.router.history.current.query.vconsole) {
      new VConsole()
    }
  })
}
