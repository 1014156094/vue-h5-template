<!-- 图标组件 -->

<template>
  <svg
    class="icon"
    aria-hidden="true"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="'#icon-' + name" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
