<!-- 默认网站入口 -->

<template>
  <div>
    <nuxt
      class="nuxt"
      :keep-alive="keepAliveList.includes($route.name) ? true : undefined"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      wechatConfig: {}, // 微信 api 配置详情
      keepAliveList: [] // 需要启用 keepAlive 功能的页面，列表项为 $route.name 值
    }
  },

  watch: {
    $route(to, from) {
      // 有盟统计
      if (window._czc) {
        let contentUrl = window.location.pathname + window.location.hash // 为需要统计 PV 的页面、弹层指定URL地址
        let refererUrl = window.location.origin + from.fullPath // 该受访页面的来源页 URL 地址

        window._czc &&
          window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }

      // 每次切换路由都检查一下有没有浮动按钮需要调整位置
      setTimeout(this.responsiveFloatButton, 500)
    }
  },

  computed: {
    ...mapState({
      // 用户信息
      userInfo(state) {
        const data = state.user.userInfo
        return data && Object.keys(data).length ? data : null
      }
    })
  },

  mounted() {
    this.fixIOSBug()
    this.initStatistics()
    this.initialResponsiveResizeListener()
  },

  methods: {
    // 修复坑人 iOS 的 bug
    fixIOSBug() {
      // 修复 IOS 12 中个别微信版本键盘收起页面未下移 bug
      this.$utils.isIOS &&
        document.addEventListener(
          'blur',
          event => {
            // 当页面没出现滚动条时才执行，因为有滚动条时，不会出现这问题
            // input textarea 标签才执行，因为 a 等标签也会触发 blur 事件
            if (
              document.documentElement.offsetHeight <=
                document.documentElement.clientHeight &&
              ['input', 'textarea'].includes(event.target.localName)
            ) {
              document.body.scrollIntoView() // 回顶部
            }
          },
          true
        )
    },

    // 初始化友盟统计
    initStatistics() {
      if (!document.getElementById('youmeng')) {
        const script = document.createElement('script')
        script.id = 'youmeng'
        script.language = 'javascript'

        if (this.$configs.isProd) {
          script.src =
            'https://s23.cnzz.com/z_stat.php?id=1276483501&web_id=1276483501' // 线上正服
        } else {
          script.src =
            'https://s23.cnzz.com/z_stat.php?id=1276094250&web_id=1276094250' // 测服
        }

        document.body.appendChild(script)
      }
    },

    // 初始化响应式兼容时窗口大小改变监听事件
    initialResponsiveResizeListener() {
      window.onresize = this.$utils.debounce(this.responsiveFloatButton)
      setTimeout(this.responsiveFloatButton, 500)
    },

    // PC 端响应式兼容时计算浮动按钮的位置
    responsiveFloatButton() {
      if (!this.$utils.isMobile) {
        let positionRight = document.body.clientWidth / 2 - 187
        ;[
          '.create-poster-btn',
          '.customer-service-btn',
          '.get-link',
          '.check-enroll'
        ].forEach(item => {
          let target = document.querySelector(item)
          if (!target) return
          target.style.right = `${positionRight}px`
        })
      }
    }
  }
}
</script>

<style lang="less">
#__layout {
  // 加 “>” 是为了避免子组件出现同类名
  > div {
    > .nuxt {
    }
  }
}
</style>
