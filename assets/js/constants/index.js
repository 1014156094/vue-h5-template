/**
 * 项目常量
 * 定义规则：当多个文件重复使用一个变量时，并且该值是一成不变的，可定义该变量到 constants 文件夹中，方便统一管理复用
 */

// 通过手动上传到七牛的静态资源的 CDN 地址需要固定为一个链接
export const qiniuCDN = 'https://cdn.haosailei.cn'

// 默认头像链接
export const defaultAvatar = `${qiniuCDN}/hsl-user/images/common/default-avatar.jpg`
