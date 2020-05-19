<!-- 错误布局，比如 404 等错误将进入这个布局 -->

<template>
  <div class="page-error">
    <div class="error">
      <cb-icon name="empty" />
      <div class="title">
        {{ message }}
      </div>
      <div
        class="button refresh"
        @click="onRefresh"
      >
        刷新
      </div>
      <div
        class="button back"
        @click="onBack"
      >
        返回
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      const { statusCode } = this
      const message = (this.error && this.error.message) || `未知错误！`

      switch (statusCode) {
        case 404:
          return '页面或资源不存在！'
          break
        default:
          return message
      }
    }
  },
  methods: {
    onBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        window.location.href = '/'
      }
    },
    onRefresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.page-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  color: #47494e;
  background: #f7f8fb;
  text-align: center;

  .error {
    margin-top: -20%;
    width: 80%;

    .icon {
      font-size: 75px;
      color: rgb(252, 228, 121);
    }

    .title {
      font-size: 16px;
      margin: 15px 0px 18px;
      color: #7f828b;
    }

    .button {
      padding: 8px 0;
      color: #fff;
      background-color: #ffcf00;
    }

    .back {
      margin-top: 15px;
    }
  }
}
</style>
