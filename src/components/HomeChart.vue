<template>
  <div>
    <common-content class="chart-wrap">
      <img :src="state.chart"
           alt="chart"
           class="chart">
    </common-content>
  </div>
</template>

<script>
import { inject } from 'vue'
import CommonContent from '@/components/CommonContent.vue'
export default {
  name: 'HomeChart',
  components: {
    CommonContent
  },
  setup() {
    const state = inject('state')
    return { state }
  }
}
</script>

<style lang='less' scoped>
.chart-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  height: 80px;
  overflow: hidden;
  transition: height 1.2s;

  &:hover {
    height: 480px;
  }
}
</style>