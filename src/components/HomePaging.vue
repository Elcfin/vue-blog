<template>
  <div>
    <div class="bar">
      <div class="btn"
           v-for="index in btnNumber"
           :class="{current:index===currentHomePage}"
           :key="index"
           @click="currentHomePage=index;
           changeHomePage()">{{index}}</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'HomePaging',
  props: {
    pageNumber: Number
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      currentHomePage: 1
    }
  },
  computed: {
    btnNumber() {
      return this.pageNumber === 1 ? 0 : this.pageNumber
    }
  },
  methods: {
    changeHomePage: function () {
      this.$emit('changeHomePage', this.currentHomePage)
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  height: 30px;
  line-height: 30px;

  .btn {
    &:extend(.common-block);

    padding: 0 10px;
    color: @font-color-dark;
    background-color: @light;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.6s, background-color 0.6s;
  }

  .btn:hover {
    color: @font-color-light;
    background-color: @dark;
  }

  .current {
    color: @font-color-light;
    background-color: @dark;
  }
}
</style>