<template>
  <div class='footer'>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data: function () {
    return {
      content: '© 2021 Elcfin'
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.footer {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: @font-color-grey;
  font-size: 12px;
}
</style>