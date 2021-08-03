<template>
  <div>
    <div class="bar">
      <div class="btn"
           v-for="index in pageNumber"
           :class="{current:index===currentPublicPage}"
           :key="index"
           @click="currentPublicPage=index;
           changePublicPage()">{{index}}</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ManagerPublicPaging',
  props: {
    pageNumber: Number
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      currentPublicPage: 1
    }
  },
  methods: {
    changePublicPage: function () {
      this.$emit('changePublicPage', this.currentPublicPage)
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.bar {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  height: 30px;
  color: @font-color-dark;
  line-height: 30px;

  .btn {
    padding: 0 10px;
    color: @font-color-dark;
    background-color: @light;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.6s;
  }

  .btn:hover {
    background-color: @dark-grey;
  }

  .current {
    background-color: @dark-grey;
  }
}
</style>