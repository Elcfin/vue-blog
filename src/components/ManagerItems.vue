<template>
  <div class="items">
    <div class="item"
         v-for="item in items"
         :key="item">
      <div class="item-part"
           @click="readArticle(item)">
        {{item.title}}
      </div>
      <div class="item-part">
        {{item.createTime}}
      </div>
      <img v-for="icon in icons"
           :key="icon"
           class="icon"
           :src="icon.src"
           :alt="icon.alt"
           @click="iconClick(icon,item)">
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ManagerItems',
  props: { items: Array, icons: Array },
  setup(props, context) {
    const state = inject('state')
    const readArticle = (article) => {
      state.currentPage = 'article'
      context.emit('readArticle', article)
    }
    const iconClick = (icon, item) => {
      context.emit('iconClick', icon, item)
    }
    return { iconClick, readArticle }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.icon {
  height: 20px;
  background-color: @grey;
  border-radius: 6px;
  transition: background-color 0.6s;

  &:hover {
    background-color: @dark;
  }
}

.items {
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover .item-part {
      background-color: @dark-grey;
    }

    .item-part {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background-color: @grey;
      transition: background-color 0.6s;

      &:nth-child(1) {
        flex: 2;
      }

      &:nth-child(2) {
        flex: 1;
      }
    }
  }
}
</style>