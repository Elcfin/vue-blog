<template>
  <div>
    <div class='side-bar'>
      <side-bar-nav @changePage="changePage">
      </side-bar-nav>
      <side-bar-overview @changePage="changePage">
      </side-bar-overview>
    </div>
  </div>
</template>

<script>
import SideBarNav from '@/components/SideBarNav.vue'
import SideBarOverview from '@/components/SideBarOverview.vue'

export default {
  name: 'SideBar',
  components: {
    SideBarNav,
    SideBarOverview
  },
  setup(props, context) {
    /* 切换路由界面 */
    const changePage = (page) => {
      context.emit('changePage', page)
    }
    return { changePage }
  }
}
</script>

<style lang='less' scoped>
.side-bar {
  width: 220px;
  /* 考虑侧边导航栏长度超出页面时滚动 */
  height: 100vh;
  overflow: auto;
}
</style>