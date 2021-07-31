<template>
  <div class="content"></div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.content {
  &:extend(.common-block);

  padding: 10px;
  width: 100%;
  min-height: 200px;
}
</style>