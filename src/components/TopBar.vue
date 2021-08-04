<template>
  <div class='top-bar'>
    <div class="wrap">
      <div class="title">{{ state.title }}</div>
      <img src="@/assets/more.png"
           alt="more"
           class="more-img"
           @click="isSideShow=!isSideShow">
    </div>
    <top-bar-side :class="{'side-show': isSideShow}"
                  @changePage="changePage">
    </top-bar-side>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import TopBarSide from '@/components/TopBarSide.vue'

export default {
  name: 'TopBar',
  components: { TopBarSide },
  setup(props, context) {
    const state = inject('state')
    const isSideShow = ref(false)

    const changePage = () => {
      console.log(state.currentPage)
      context.emit('changePage')
    }

    return { state, isSideShow, changePage }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.top-bar {
  &:extend(.common-block);

  height: 60px;
  font-size: 20px;
  line-height: 60px;
  background-color: @dark;
  border-radius: 0;
  z-index: 2;

  .wrap {
    margin: 0 auto;
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @font-color-light;

    .more-img {
      width: 20px;
    }
  }

  .side-show {
    left: 0;
  }
}
</style>