<template>
  <div>
    <div class='side-bar'>
      <side-bar-nav @changePage="changePage"></side-bar-nav>
      <side-bar-overview @changePage="changePage"></side-bar-overview>
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
  methods: {
    changePage(selected) {
      this.$emit('changePage', selected)
    }
  }
}
</script>

<style lang='less' scoped>
.side-bar {
  width: 220px;
  height: 100vh;
  overflow: auto;
}
</style>