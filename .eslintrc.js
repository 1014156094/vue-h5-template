module.exports = {
  // extends 和 plugins 都是有顺序之分的，所有的规则会先后进行覆盖
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended'
  ],
  rules: {}
}
