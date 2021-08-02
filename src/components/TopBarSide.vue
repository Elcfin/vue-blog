<template>
  <div class='top-bar-side'>
    <div class="profile">
      <div class="profile-img">
        <img src="@/assets/leaf.jpg"
             alt="profile">
      </div>
    </div>
    <div class="author">
      {{ state.author }}
    </div>
    <div class="discription">
      {{ state.discription }}
    </div>
    <div class="navbar">
      <div class="item"
           v-for="(item, index) in items"
           :key="index"
           @click="$emit('changePage',item.enTitle)">{{ item.znTitle }}</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'TopBarSide',
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      items: [
        { icon: '', enTitle: 'home', znTitle: '日志' },
        /*         { icon: '', enTitle: 'tag', znTitle: '标签' }, */
        { icon: '', enTitle: 'about', znTitle: '关于' }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.top-bar-side {
  &:extend(.common-block);

  padding: 0 40px;
  height: 100vh;
  overflow: auto;
  border-radius: 0;

  .profile {
    padding: 20px 0 10px 0;

    .profile-img {
      box-sizing: border-box;
      margin: auto;
      width: 120px;
      height: 120px;
      overflow: hidden;
      border: 6px double @grey;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }
  }

  .author {
    height: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
  }

  .discription {
    font-size: 14px;
    color: @font-color-grey;
    text-align: center;
    line-height: 30px;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    color: @font-color-grey;
    font-size: 14px;

    .item {
      box-sizing: border-box;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: @grey;
      border-radius: 6px;
      cursor: pointer;
      transition: color 0.6s, background-color 0.6s;
    }

    .item:hover {
      color: @font-color-light;
      background-color: @dark;
      transition: color 0.6s, background-color 0.6s;
    }
  }
}
</style>