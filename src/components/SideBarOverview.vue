<template>
  <div class='side-bar-overview'>
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
    <!-- <div class="navbar">
      <div class="item"
           v-for="(item, index) in items"
           :key="index"
           @click="$emit('changePage',item.enTitle)">{{ item.znTitle }}</div>
    </div> -->
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'SideBarOverview',
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {}
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.side-bar-overview {
  &:extend(.common-block);

  padding: 20px;
  margin-top: 10px;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0 10px #555;
  }

  .profile {
    padding-bottom: 10px;

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
    font-size: 12px;
    color: @font-color-grey;
    text-align: center;
    line-height: 30px;
  }

  /* .navbar {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding-bottom: 10px;
    color: @font-color-grey;
    font-size: 12px;

    .item {
      padding: 10px;
      cursor: pointer;
    }
  } */
}
</style>