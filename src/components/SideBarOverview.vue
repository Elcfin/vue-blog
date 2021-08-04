<template>
  <div class='side-bar-overview'>
    <div class="profile">
      <div class="profile-img-wrap">
        <img :src="state.profile"
             class="profile-img"
             alt="profile">
      </div>
    </div>
    <div class="author">
      {{ state.author }}
    </div>
    <div class="discription">
      {{ state.discription }}
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'SideBarOverview',
  setup() {
    const state = inject('state')
    return { state }
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

    .profile-img-wrap {
      box-sizing: border-box;
      margin: 0 auto;
      width: 120px;
      height: 120px;
      overflow: hidden;
      border: 6px double @grey;
      border-radius: 50%;

      .profile-img {
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
    color: @font-color-grey;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
}
</style>