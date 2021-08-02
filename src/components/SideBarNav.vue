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
    <div class='items'>
      <div class='item'
           v-for='(item, index) in items'
           :key='index'
           :class='{selected:state.currentPage===item.enTitle}'
           @click="state.currentPage = item.enTitle;
           changePage()">{{ item.znTitle }}</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'SideBarNav',
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      items: [
        { icon: '', enTitle: 'home', znTitle: '首页' },
        { icon: '', enTitle: 'about', znTitle: '关于' },
        /*         { icon: '', enTitle: 'tag', znTitle: '标签' }, */
        /*         { icon: '', enTitle: 'article', znTitle: '归档' }, */
        { icon: '', enTitle: 'login', znTitle: '登录' },
        { icon: '', enTitle: 'manager', znTitle: '管理' }
      ]
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.state.currentPage)
    }
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

  .items {
    box-sizing: border-box;
    padding: 10px 0;
    color: @font-color-grey;
    line-height: 30px;

    .item {
      padding: 0 20px;
      height: 30px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.6s;

      &:hover {
        background-color: @grey;
      }
    }

    .selected {
      background-color: @grey;
    }

    .manager {
      display: none;
    }
  }
}
</style>