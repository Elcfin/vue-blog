<template>
  <div class='top-bar-side'>
    <div class="profile">
      <div class="profile-img">
        <img src="@/assets/leaf.jpg"
             alt="profile"
             class="img">
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
           v-for="item in items"
           :key="item"
           @click="changePage(item.enTitle)">
        {{ item.znTitle }}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'

export default {
  name: 'TopBarSide',
  setup(props, context) {
    const state = inject('state')
    const items = reactive([
      { enTitle: 'home', znTitle: '日志' },
      { enTitle: 'about', znTitle: '关于' }
    ])

    const changePage = (page) => {
      state.currentPage = page
      context.emit('changePage')
    }

    return { state, items, changePage }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.top-bar-side {
  &:extend(.common-block);

  position: absolute;
  left: -220px;
  top: 0;
  padding: 0 40px;
  height: 100vh;
  overflow: auto;
  /* 覆盖原组件样式 */
  border-radius: 0;
  transition: left 0.3s;

  .profile {
    padding: 20px 0 10px 0;

    .profile-img {
      box-sizing: border-box;
      margin: 0 auto;
      width: 120px;
      height: 120px;
      overflow: hidden;
      border: 6px double @grey;
      border-radius: 50%;

      .img {
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