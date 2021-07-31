<template>
  <div class='top-bar'>
    <div class="wrap">
      <div class="title">{{ title }}</div>
      <div class="more"
           @click="isSideShow=!isSideShow"><img src="@/assets/more.png"
             alt="more"></div>
    </div>
    <top-bar-side class="top-bar-side"
                  :class="{'side-show': isSideShow}"></top-bar-side>
  </div>
</template>

<script>
import TopBarSide from '@/components/TopBarSide.vue'

export default {
  name: 'TopBar',
  components: { TopBarSide },
  data: function () {
    return {
      title: "Elcfin's Blog",
      items: [
        { icon: '', enTitle: 'Home', znTitle: '首页' },
        { icon: '', enTitle: 'About', znTitle: '关于' },
        { icon: '', enTitle: 'Category', znTitle: '分类' },
        { icon: '', enTitle: 'Article', znTitle: '归档' }
      ],
      isSideShow: false
    }
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

  .wrap {
    margin: auto;
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: @font-color-light;
    }

    .more {
      img {
        display: block;
        margin-right: 0;
        margin-left: auto;
        width: 20px;
      }
    }
  }

  .top-bar-side {
    position: absolute;
    left: -220px;
    top: 0;
    transition: left 0.3s;
  }

  .side-show {
    left: 0;
    transition: left 0.3s;
  }
}
</style>