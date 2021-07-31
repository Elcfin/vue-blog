<template>
  <top-bar class='top-bar'></top-bar>
  <div class='app'>
    <side-bar class='side-bar'
              @changePage="changePage"></side-bar>
    <router-view class='content'></router-view>
  </div>
  <Footer class='footer'></Footer>
</template>

<script>
import { useRouter } from 'vue-router'

import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { SideBar, Footer, TopBar },
  setup() {
    const router = useRouter()
    const changePage = (selected) => {
      router.push({
        name: selected
      })
    }
    return {
      changePage
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.app {
  margin: auto;
  margin-top: 10px;
  width: 90vw;
  min-height: 1080px;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.side-bar {
  display: none;
}

.content {
  border-top: 60px solid transparent;
}

@media (min-width: 980px) {
  .app {
    width: 80vw;
    max-width: 1060px;
  }

  .top-bar {
    display: none;
  }

  .side-bar {
    display: block;
    position: fixed;
  }

  .content {
    box-sizing: border-box;
    border-top: none;
    border-left: 230px solid transparent;
  }
} ;
</style>>

