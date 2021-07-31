<template>
  <div class='home'>
    <Content></Content>
  </div>
</template>

<script>
import Content from '@/components/Content.vue'

export default {
  name: 'Home',
  components: { Content }
}
</script>

<style lang='less' scoped>
.home {
  width: 100%;
}
</style>