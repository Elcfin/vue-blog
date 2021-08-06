<template>
  <div>
    <div class='footer'>
      <div>© 2021 Elcfin</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: @font-color-grey;
  font-size: 12px;
}
</style>