<template>
  <top-bar class='top-bar'
           @changePage="changePage"></top-bar>
  <div class='app'>
    <side-bar class='side-bar'
              @changePage="changePage"></side-bar>
    <router-view class='content'
                 @readArticle="readArticle"
                 @editArticle="editArticle"
                 @writeArticle="writeArticle"></router-view>
    <Footer class='footer'></Footer>
  </div>
</template>

<script>
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import { state } from '@/store/'

import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'

const routerChange = () => {
  const router = useRouter()
  const changePage = (selected) => {
    router.push({
      name: selected
    })
  }

  return {
    changePage
  }
}

export default {
  name: 'App',
  components: { SideBar, Footer, TopBar },
  setup() {
    const { changePage } = routerChange()

    provide('state', state)

    return {
      changePage
    }
  },
  methods: {
    readArticle(article) {
      this.$router.push(`/article/${article._id}`)
    },
    editArticle(article) {
      this.$router.push(`/edit/${article._id}`)
    },
    writeArticle() {
      this.$router.push(`/write`)
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  margin: auto;
  width: 95vw;
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
  border-top: 75px solid transparent;
}

.footer {
  border-top: 10px solid transparent;
}

@media (min-width: 980px) {
  .app {
    max-width: 1080px;
    min-height: 720px;
  }

  .top-bar {
    display: none;
  }

  .side-bar {
    display: block;
    position: fixed;
    border-top: 10px solid transparent;
  }

  .content {
    box-sizing: border-box;
    border-top: 0;
    border-top: 10px solid transparent;
    border-left: 235px solid transparent;
  }

  .footer {
    border-left: 235px solid transparent;
  }
} ;
</style>>

