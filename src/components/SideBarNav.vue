<template>
  <div class='side-bar-nav'>
    <div class='top'>
      <div class='title'>
        {{ title }}
      </div>
      <div class='sub-title'>
        {{ subTitle }}
      </div>
    </div>
    <div class='items'>
      <div class='item'
           v-for='(item, index) in items'
           :key='index'
           :class='{selected:selected===item.enTitle}'
           @click="selected = item.enTitle;
           changePage()">{{ item.znTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarNav',
  data: function () {
    return {
      title: "Elcfin's Blog",
      subTitle: '仲夏夜茫 七月未央',
      items: [
        { icon: '', enTitle: 'Home', znTitle: '首页' },
        { icon: '', enTitle: 'About', znTitle: '关于' },
        { icon: '', enTitle: 'Category', znTitle: '分类' },
        { icon: '', enTitle: 'Article', znTitle: '归档' }
      ],
      selected: 'Home'
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.selected)
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.side-bar-nav {
  &:extend(.common-block);

  overflow: hidden;

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
      transition: background-color 0.6s;

      &:hover {
        background-color: @grey;
        cursor: pointer;
        transition: background-color 0.6s;
      }
    }

    .selected {
      background-color: @grey;
    }
  }
}
</style>