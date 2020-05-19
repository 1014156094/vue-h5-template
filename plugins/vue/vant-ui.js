/**
 * VantUI 组件库加载方式为手动按需加载，故在使用新组件之前需要在此处引用，
 * 参照：https://youzan.github.io/vant/#/zh-CN/quickstart
 */

import Vue from 'vue'

import {
  Lazyload,
  ImagePreview,
  Swipe,
  SwipeItem,
  Field,
  Button,
  Popup,
  Area,
  DatetimePicker,
  Divider,
  Toast,
  Icon,
  Stepper,
  Overlay,
  NoticeBar,
  Tab,
  Tabs,
  List,
  Tabbar,
  TabbarItem,
  Cell,
  Image,
  Tag,
  Row,
  Col,
  ActionSheet,
  Search,
  CountDown,
  Loading,
  Uploader,
  Dialog
} from 'vant'

export default ({ app }) => {
  const loadingURL = `${
    app.$constants.qiniuCDN
  }/hsl-user/images/common/loading.gif`

  // 修改弹出层默认为圆角
  Popup.props.round = {
    type: Boolean,
    default: true
  }

  // 修改轻提示的加载提示
  Toast.loading = function(opts = {}) {
    return Toast(
      Object.assign(opts, {
        type: 'loading', // 提示类型，可选值为 loading success fail html
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
    )
  }

  // 修改通知栏默认的左侧图标
  NoticeBar.props.leftIcon = {
    type: String,
    default: 'volume-o'
  }

  // 修改标签页默认开启手势滑动切换
  Tabs.props.swipeable = {
    type: Boolean,
    default: true
  }

  // 修改列表默认的完成文案
  List.props.finishedText = {
    type: String,
    default: '没有更多了噢'
  }

  // 修改图片组件默认开启懒加载
  Image.props.lazyLoad = {
    type: Boolean,
    default: true
  }

  // 修改图片组件图片填充模式默认为 cover（保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边）
  Image.props.fit = {
    type: String,
    default: 'cover'
  }

  // 修改加载时提示的图标名称或图片链接
  Image.props.loadingIcon = {
    type: String,
    default: loadingURL
  }

  // 修改上拉菜单的默认关闭图标
  ActionSheet.props.closeIcon = {
    type: String,
    default: 'cross'
  }

  // 修改上传组件的预览图裁剪模式，可选值见 Image 组件
  Uploader.props.imageFit = {
    type: String,
    default: 'contain'
  }

  // 修改输入框组件默认启用清除控件
  Field.props.clearable = {
    type: Boolean,
    default: true
  }

  Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: loadingURL,
    attempt: 1
  })
    .use(ImagePreview)
    .use(Swipe)
    .use(SwipeItem)
    .use(Field)
    .use(Button)
    .use(Popup)
    .use(Area)
    .use(DatetimePicker)
    .use(Divider)
    .use(Toast)
    .use(Icon)
    .use(Stepper)
    .use(Overlay)
    .use(NoticeBar)
    .use(Tab)
    .use(Tabs)
    .use(List)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Cell)
    .use(Image)
    .use(Tag)
    .use(Row)
    .use(Col)
    .use(ActionSheet)
    .use(Search)
    .use(CountDown)
    .use(Loading)
    .use(Uploader)
    .use(Dialog)

  Vue.prototype.$imagePreview = ImagePreview
}
