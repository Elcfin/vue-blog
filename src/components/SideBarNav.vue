<template>
  <div class='side-bar-nav'>
    <div class='top'>
      <div class='title'>
        {{ state.title }}
      </div>
      <div class='sub-title'>
        {{ state.subTitle }}
      </div>
    </div>
    <side-bar-nav-items @changePage="changePage">
    </side-bar-nav-items>
  </div>
</template>

<script>
import { inject } from 'vue'
import SideBarNavItems from '@/components/SideBarNavItems.vue'

export default {
  name: 'SideBarNav',
  components: { SideBarNavItems },
  setup(props, context) {
    const state = inject('state')

    const changePage = () => {
      context.emit('changePage')
    }

    return { state, changePage }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.side-bar-nav {
  &:extend(.common-block);

  overflow: hidden;
  transition: box-shadow 0.6s;

  &:hover {
    box-shadow: 0 0 10px #555;
  }

  .top {
    box-sizing: border-box;
    padding: 20px;
    color: @font-color-light;
    text-align: center;
    line-height: 30px;
    background-color: @dark;

    .title {
      height: 30px;
    }

    .sub-title {
      height: 30px;
      font-size: 14px;
    }
  }
}
</style>