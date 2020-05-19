// 通用模块API

export default function(axios) {
  return {
    // 获取七牛 token
    getQiniuToken: () => axios.get(`/api/qiniu/token`)
  }
}
