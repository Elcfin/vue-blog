<template>
  <div class='items'>
    <div class='item'
         v-for='item in items'
         :key='item'
         :class='{currentPage: state.currentPage === item.enTitle}'
         @click="changePage(item.enTitle)">
      {{ item.znTitle }}
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { inject } from 'vue'

export default {
  name: 'SideBarNavItems',
  setup(props, context) {
    const state = inject('state')
    const items = reactive([
      { enTitle: 'home', znTitle: '首页' },
      { enTitle: 'about', znTitle: '关于' },
      { enTitle: 'login', znTitle: '登录' },
      { enTitle: 'manager', znTitle: '管理' }
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

.items {
  box-sizing: border-box;
  padding: 10px 0;
  color: @font-color-grey;
  font-size: 12px;
  line-height: 30px;

  .item {
    padding: 0 20px;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.6s;

    &:hover {
      background-color: @grey;
    }
  }

  .currentPage {
    background-color: @grey;
  }
}
</style>