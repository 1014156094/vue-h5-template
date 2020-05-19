# 好赛擂大赛系统用户 H5 端

## 开发步骤

1. 全局安装依赖管理工具 `yarn`，`注意`以后安装依赖包请不要使用 `npm`，请使用 `yarn`，官方文档 https://yarn.bootcss.com/docs/usage/

``` bash
$ npm install yarn --global
```

2. 使用依赖管理工具 yarn 安装所有依赖

``` bash
$ yarn install
```

3. 编译运行代码

``` bash
$ yarn dev
```

4. 全局安装代理工具并运行

``` bash
$ npm install whistle --global
```

5. 运行代理工具

``` bash
$ w2 start
```

6. 设置代理规则，浏览器打开 `127.0.0.1:8899`，复制以下规则到 `Rules`，然后点击 `Save` 保存

``` bash
# H5 正服
/actv\.haosailei\.cn\/(?!api)(.*)/ http://localhost:3000/$1
/actv\.haosailei\.cn\/(.*)/ disable://cache

# H5 测服
/dev\-h5\.haosailei\.cn\/(?!api)(.*)/ http://localhost:3000/$1
/dev\-h5\.haosailei\.cn\/(.*)/ disable://cache
```

7. 微信开发者工具或浏览器打开 http://dev-h5.haosailei.cn/2/user 即可，`2` 为大赛 `id`


## 上线步骤

1. 打开 https://walle.cblink.net
2. 点击创建上线单
3. 点击测试环境或线上环境中的项目
4. 填写上线单标题，选取分支，版本选取，点击提交
5. 点击我的上线单的上线

## git 规范

### 关于代码分支的若干规范

请阅读 https://www.yuque.com/docs/share/bca1851e-5c80-4596-b5ff-bcb83b3ebac9?#（密码：rqx5）

### 拉取远程库代码

``` bash
# 添加主库远程源
$ git remote add team git@git.cblink.net:cblink/h5/hsl-user.git

# 同步主库 master 分支的代码
$ git pull team master
```

### 推送代码到远程库

``` bash
$ git add .

# 请阅读 commit 规范 https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/
$ git commit -m 'fix: xxx'

# 推送，不是第一次执行 git push 就行了
$ git push origin -u master
```

## 项目规范

+ 未经商榷不准将任何依赖包添加进项目，以减少 dist 体积
+ 不可擅自修改项目配置

## 框架及代码规范

+ 命名要求全部采用 `camelCase`，且不能使用缩写，如：getBtnView(X)，getButtonView(√)。在异步请求的函数内的变量命名则无此要求，你们可以随意使用 `under_score_case`，方便构建请求载荷
+ 普通函数的命名请使用 `动 + 宾` 的格式，如：getCategory。事件回调函数请使用 `on + 目标对象 + 事件`，如 `onTimerChange`
+ 尽量写注释，特别是一些业务逻辑比较繁琐的流程，方便回顾的时候快速 get 到当时的想法
+ 异步请求函数请加上注释
+ 未完成的功能写好功能结构后要加上 `TODO` 标志，格式为 `// TODO: @小5 - 主题颜色变更`
+ 不准在 vue template 上有过多的业务逻辑，请尽可能多地使用 `computed`
+ 不准随意添加任何形态的全局对象，如 mixin，修改 Vue 原型链，挂载变量对象到 window 下
+ 所有的异步请求一定要捕捉异常，并至少友好地 toast 出异常内容，如果没有这么做，页面可能停止渲染并全屏显示错误（故意而为之）
+ 路由的设计和命名要和后台模块保持一致，同时尽量保持 RESTful 风格。此外，当某个页面是基于某个 id 来确定资源的，这个 id 就可以定为 param 了，剩下的查询参数都应成为 query
+ 项目开发时尽量抽出可复用的组件，同时外层容器 class 名一律以 `cb-` 开头，以区分隔离样式的命名空间，范例见 `components` 文件夹
+ CSS 样式命名请采用 `BEM` 规范

## vscode 配置

本次开发使用 vscode 或者其他支持 eslint 插件的编辑器，以便统一代码风格，以下为 vscode eslint 关键配置：

``` json

{
    "files.insertFinalNewline": true,
    "editor.quickSuggestions": {
        "strings": true
    },
    "editor.rulers": [
        80
    ],
    "explorer.autoReveal": false,
    "editor.tabSize": 2,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": [
            "vue"
        ]
    },
    "javascript.suggestionActions.enabled": false,
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-aligned"
        }
    },
    "workbench.colorCustomizations": {
        "editorIndentGuide.activeBackground": "#00ffff"
    },
    "emmet.triggerExpansionOnTab": true,
}

```
**注意：**项目加入了 pre-commit git 钩子，将会在提交代码前检查代码规范，不通过将无法提交。当出现提交不通过的情况，请先执行 `yarn fix` 后再 `git add` 所有变更，最后再 commit

## UI 规范

+ iconfont 图标要么用线条型的，要么用封闭的填充类型的，同时图标尺寸应保持一致，另外还要给图标一个规范的名称。

## 项目主要结构

``` bash
项目根目录
├─nuxt.config.js            // Nuxt.js 框架配置文件
│
├─assets                    // 资源文件夹，存放需要 Webpack 加载器来处理文件的加载和引用的资源
│  └─less                   // Less 样式文件夹
│     ├─global.less         // 全局样式
│     └─variables.less      // Less 样式变量
│
├─components                // 组件文件夹
│  └─Toast
│     ├─index.js
│     └─Toast.vue
│
├─layouts                   // 布局视图
│  └─default.vue            // 默认布局
│  └─default.vue            // 错误信息展示布局
│
├─pages                     // 应用页面，需要按照模块进行路由划分
│  ├─index.vue
│  └─user
│     ├─index.vue
│     └─enrolls.vue
│
├─plugins                   // 插件
│  ├─axios.js               // Axios 配置文件
│  ├─inject.js              // Nuxt.js 全局 context 注入配置
│  ├─api                    // API定义，需要按照模块进行划分
│  │  ├─index.js
│  │  └─user.js
│  │
│  └─vue                    // vue 及其插件配置
│     ├─component.js        // 组件注册管理
│     ├─config.js           // vue 实例配置
│     └─router.js           // vue-router 全局钩子配置
│
├─static                    // 资源文件夹，存放不需要 Webpack 处理的静态资源文件
│  ├─fonts                  // 字体文件夹
│  └─images                 // 图片文件夹，需要按照模块和所属页面进行划分
│
├─store                     // Vuex 状态管理，需要按照模块划分状态树   
│  └─user.js
```
