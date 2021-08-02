<template>
  <div>
    <div class="bar">
      <div class="btn"
           v-for="item in btns"
           :class="{current:item===currentHomePage}"
           :key="item"
           @click="currentHomePage=item;
           changeHomePage()">{{item}}</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { getPageNumber as apiGetPageNumber } from '@/api/'

export default {
  name: 'HomePaging',
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      currentHomePage: 1,
      btns: []
    }
  },
  created: async function () {
    const data = {
      size: this.state.pagingSize
    }
    const res = await apiGetPageNumber(data)
    const pageNumber = res.data.pageNumber

    for (let i = 1; i <= pageNumber; i++) {
      this.btns.push(i)
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