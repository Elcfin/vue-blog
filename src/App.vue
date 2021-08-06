<template>
  <div class='app'>
    <!-- 宽度较小时出现顶部导航栏 -->
    <top-bar class='top-bar'
             @changePage="changePage">
    </top-bar>
    <!-- 宽度较大时出现侧边导航栏 -->
    <side-bar class='side-bar'
              @changePage="changePage">
    </side-bar>
    <!-- 路由页面 -->
    <suspense>
      <router-view class='content'
                   v-slot="{ Component }"
                   @changePage="changePage"
                   @readArticle="toArticle"
                   @editArticle="toArticle"
                   @writeArticle="changePage">
        <!-- 路由跳转动画 -->
        <transition name="content"
                    mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </suspense>
    <!-- 页脚 -->
    <page-footer class='page-footer'></page-footer>
  </div>
</template>

<script>
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import { state } from '@/store/'

import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'
import PageFooter from '@/components/PageFooter.vue'

/* 切换路由页面 */
const routerChange = () => {
  const router = useRouter()

  /* 通过 state.currentPage 获取要切换的页面 */
  const changePage = () => {
    router.push({
      name: state.currentPage
    })
    console.log(state.currentPage)
  }

  const toArticle = (article) => {
    router.push({
      name: state.currentPage,
      params: {
        id: article._id
      }
    })
  }

  return {
    changePage,
    toArticle
  }
}

export default {
  name: 'App',
  components: { TopBar, SideBar, PageFooter },
  setup() {
    const { changePage, toArticle } = routerChange()

    provide('state', state)
    return {
      changePage,
      toArticle
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  margin: auto;
  min-height: 110vh;
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
  min-height: 110vh;
  /* 透明上边框 75px = 60px 顶部导航栏高度 + 15px */
  border-top: 75px solid transparent;
  padding-bottom: 60px; /* >= footer高度，避免被覆盖 */
}

.page-footer {
  box-sizing: border-box;
  position: absolute;
  margin-top: -50px;
  /* 与 app width: 95vw 一致*/
  width: 95%;
  height: 50px;
}

@media (min-width: 980px) {
  .app {
    max-width: 1080px;
  }

  .top-bar {
    display: none;
  }

  .side-bar {
    display: block;
    position: fixed;
    /* 透明上边框 10px */
    border-top: 10px solid transparent;
  }

  .content {
    box-sizing: border-box;
    /* 透明上边框 10px */
    border-top: 10px solid transparent;
    /* 透明左边框 235px = 220px 侧边导航栏宽度 + 15px */
    border-left: 235px solid transparent;
  }

  .page-footer {
    /* 透明左边框 235px = 220px 侧边导航栏宽度 + 15px */
    border-left: 235px solid transparent;
  }
}
</style>>

