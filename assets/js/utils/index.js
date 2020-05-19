/**
 * 项目工具函数
 * 定义规则：当多个文件重复使用一个函数时，可定义该函数到 utils 文件夹中，方便统一管理复用
 */

/* 是否是微信浏览器 */
export const isWechat = /MicroMessenger/i.test(window.navigator.userAgent)

/* 是否是苹果设备 */
export const isIOS = /iPhone|iPad|iPod/i.test(window.navigator.userAgent)

/* 是否是苹果设备 */
export const isAndroid = /Android/i.test(window.navigator.userAgent)

/* 是否是移动端 */
export const isMobile = isWechat || isIOS || isAndroid

/**
 * 七牛图片瘦身
 * @param {String} url 七牛链接
 * @param {Number} width 设置宽
 * @param {Number} height 设置高
 * @return {String} 瘦身后的url
 */
export const imageSlim = (url, width, height) => {
  // 不是七牛链接不瘦身
  if (!url || !url.includes('cdn.')) {
    return url
  }

  // base64 不瘦身
  if (/^data:image\/png;base64/.test(url)) {
    return url
  }

  if (/\?/.test(url)) {
    url = url + `&`
  } else {
    url = url + `?`
  }

  // 设置宽
  if (width && !height) {
    return url + `imageView2/2/w/${width}`
  }
  // 设置高
  if (!width && height) {
    return url + `imageView2/2/h/${height}`
  }
  // 设置宽高
  if (width && height) {
    return url + `imageView2/2/w/${width}/h/${height}`
  }
  // 无损压缩，效果不好
  return url + 'imageslim'
}

/**
 * 将 html 字符串内的七牛图片瘦身
 * @param {String} html html 字符串
 */
export const htmlImageSlim = html => {
  return html.replace(/((http|https):\/\/(dev-)?cdn\.[^"]*)/g, item => {
    return imageSlim(item, 750)
  })
}

/**
 * 校验是否是手机号
 * @param {*} val 字符串
 */
export const validatePhone = val => {
  return /^\d{1,11}$/.test(val) // 为了适应国际各种奇葩手机号码，校验放松了一些
}

/**
 * 校验是否是电子邮箱
 * @param {*} val 字符串
 */
export const validateEmail = val => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val)
}

/**
 * 校验是否是身份证
 * @param {*} val 字符串
 */
export const validateIdCard = val => {
  return /^[a-zA-Z0-9]{18}$/.test(val)
}

/**
 * 获取链接参数
 * @param {*} param 要获取的链接参数
 * @param {*} url 链接，默认值-当前链接
 * @return {String} 链接参数值
 */
export const getURLParam = (param, url = window.location.href) => {
  const params = new URLSearchParams(url.split('?')[1])

  return params.get(param)
}

/**
 * 设置 URL 参数，参数存在时会覆盖参数，否则会添加参数
 * @param {String} url 链接，默认 window.location.href
 * @param {String | Object} param 参数，字符串只允许传一个参数，例 id=1，对象可以传无限个参数，例 { a: 1, b: 2 }
 * @return {String} 新的 URL
 */
export const setURLParam = (url = window.location.href, newParams) => {
  const urlArr = url.split('?')
  const urlHrefFullPath = urlArr[0] // 链接路径
  const urlSearch = urlArr[1] // 链接查询参数
  const params = new URLSearchParams(urlSearch)

  if (typeof newParams === 'string') {
    return url + (params.toString() ? '&' : '?') + newParams
  }

  if (newParams instanceof Object) {
    for (const key of Object.keys(newParams)) {
      params.set(key, newParams[key])
    }

    return params.toString() ? urlHrefFullPath + '?' + params.toString() : url
  }
}

/**
 * 删除 URL 参数
 * @param {String} url 地址
 * @param {String} delParams 要删除的参数名称
 * @return 删除参数后的地址
 */
export const delURLParam = (url = window.location.href, delParams) => {
  const urlArr = url.split('?')
  const urlHrefFullPath = urlArr[0] // 链接路径
  const urlSearch = urlArr[1] // 链接查询参数
  const params = new URLSearchParams(urlSearch)

  params.delete(delParams)

  return params.toString()
    ? urlHrefFullPath + `?${params.toString()}`
    : urlHrefFullPath
}

/**
 * 倒计时
 * @param {String} targetDate 时间
 * @return {String} 倒计时
 */
export const countDown = targetDate => {
  let today = new Date()
  let endDate = new Date(targetDate.replace(/-/g, '/'))
  let leftTime = Date.parse(endDate) - Date.parse(today)
  let leftSecond = parseInt(leftTime / 1000)
  let day = Math.floor(leftSecond / (60 * 60 * 24))
  let hour = Math.floor((leftSecond - day * 24 * 60 * 60) / 3600)
  let minute = Math.floor((leftSecond - day * 24 * 60 * 60 - hour * 3600) / 60)
  let second = Math.floor(
    leftSecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60
  )
  let checkTime = i => {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  minute = checkTime(minute)
  second = checkTime(second) // 小于10的话加0

  let time
  if (leftTime <= 0) {
    time = '0天'
  } else {
    time = day + '天' + hour + '小时' + minute + '分' + second + '秒'
  }

  return time
}

/**
 * 将 base64 的图片转换为 file 文件
 * @param {String} urlData base64
 */
export const base64ToBlob = urlData => {
  let bytes = window.atob(urlData.split(',')[1]) // 去掉 url 的头，并转换为 byte
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)

  // 处理异常,将 ascii 码小于 0 的转换为大于 0
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/jpeg' })
}

/**
 * 图片转换为 Base64
 * @param {Object} img new Image() 实例
 * @return {String} Base64 字符串
 */
export const imageToBase64 = img => {
  let canvas = document.createElement('canvas')

  canvas.width = img.width
  canvas.height = img.height

  let ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  let dataURL = canvas.toDataURL('image/png') // 可选其他值 image/jpeg

  return dataURL
}

/**
 * 将日期转换成时间戳
 * @param {String} tm 日期，例：2019/5/23
 */
export const dateToTimestamp = tm => {
  let timestamp = Date.parse(new Date(tm.replace(/-/g, '/'))) / 1000

  return timestamp
}

/**
 * 生成随机字符串
 * @param {boolean} numberOnly - 是否只生成纯数字
 * @param {boolean} randomLength - 是否任意长度，为 true 则生成长度区间为 [min, max] 的字符串，否则生成以 min 为固定长度的字符串
 * @param {number} min - 任意长度最小位（固定长度）
 * @param {number} max - 任意长度最大位
 * @return {string} 随机字符串
 */
export const randomString = (
  numberOnly = true,
  randomLength = true,
  min = 10,
  max = 16
) => {
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ...(!numberOnly
      ? [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ]
      : [])
  ]

  let str = ''
  let pos = ''
  let range = min

  // 随机产生
  if (randomLength) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 对象转为 URL 参数字符串
 *
 * @param {Object} obj 被转换的对象
 * @param {String} prefix 转换后的字符串前缀
 * @returns {String}
 * @api public
 */
export const queryStringify = (obj, prefix) => {
  prefix = prefix || ''

  var pairs = [],
    value,
    key

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?'

  for (key in obj) {
    let has = Object.prototype.hasOwnProperty,
      undef

    if (has.call(obj, key)) {
      value = obj[key]

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = ''
      }

      key = encodeURIComponent(key)
      value = encodeURIComponent(value)

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue
      pairs.push(key + '=' + value)
    }
  }

  return pairs.length ? prefix + pairs.join('&') : ''
}

/**
 * 修复 IOS 内 new Date 不支持 “-” 格式的日期，将 “-” 转为 “/”
 * @param {String} date 日期
 */
export const resetDate = date => date.replace(/-/g, '/')

/**
 * 回车转为 HTML 换行
 * @param {String} str 字符串内容
 */
export const enterToNewline = str => (str ? str.replace(/\n/g, '<br>') : str)

/**
 * 获取要跳转到定制大赛页面的路由路径
 * @param {Object} to router.to
 * @param {Object} from router.from
 * @param {String} path 原路径
 * @return {String} 重定向到定制页面的路径
 */
export const getCustomizeURLPath = (to, from, path) => {
  let time = new Date().getTime() // 避免重定向后的 path 与 url path 相同导致页面空白
  let redirectPath = path + '?customize=' + time // 重定向到定制页面的路径
  let fullPath = to.fullPath

  if (fullPath.indexOf('?') !== -1) {
    let params = new URLSearchParams(
      fullPath.substring(fullPath.indexOf('?'), fullPath.length)
    )

    // 将 from 的 url 参数镜像到重定向后的 url 中
    for (let key of Object.keys(from.query)) {
      if (key === 'customize') {
        params.set(key, time)
      } else {
        params.set(key, to.query[key] || from.query[key]) // to 有与 from 相同的参数，则优先使用 to 的参数值
      }
    }

    redirectPath = path + '?' + params.toString()
  }

  return redirectPath
}

/**
 * 函数去抖
 * @param {function} fn - 需要去抖的函数
 * @param {number} delay - 延迟时间，单位：ms
 * @return {function} 封装后的去抖函数
 */
export const debounce = (fn, delay = 500) => {
  // 定时器
  let timer

  return function() {
    // 保存函数调用时的上下文和参数，用于传递给 fn
    const context = this
    const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param {function} fn - 需要节流的函数
 * @param {number} threshold - 执行间隔阈值，单位：ms
 * @return {function} 封装后的节流函数
 */
export const throttle = (fn, threshold = 500) => {
  // 定时器
  let timer
  // 记录上次执行的时间
  let last = +new Date()

  return function() {
    // 保存函数调用时的上下文和参数，用于传递给 fn
    const context = this
    const args = arguments
    // 记录函数的调用时间
    const now = +new Date()
    clearTimeout(timer)

    // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃执行 fn，并重新计时
    if (now - last < threshold) {
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshold)
    } else {
      // 在大于指定时间阈值后执行一次 fn
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 错误日志上报
 * @param {error} error - 错误对象
 * @param {object} options - 上报配置
 */
export const report = (error, options = {}) => {
  const sentry = window.$nuxt.$sentry

  if (!sentry) return

  sentry.withScope(scope => {
    // 默认置为 “致命” 错误等级
    scope.setLevel(options.level || 'fatal')
    sentry.captureException(error)
  })
}
