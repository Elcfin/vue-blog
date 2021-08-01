<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonContent'
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.content {
  &:extend(.common-block);

  padding: 20px;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0 10px #555;
  }
}
</style>