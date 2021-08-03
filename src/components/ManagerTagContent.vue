<template>
  <div>
    <div class="tags">
      <div v-for="item in tags"
           :key="item"
           class="tag-wrap">
        <div class="delete"></div>
        <div class="tag"> {{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagerTagContent',
  props: { tags: Array }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .tag-wrap {
    display: flex;

    .tag {
      display: flex;
      align-items: center;

      padding: 0 10px;
      height: 30px;
      color: @font-color-grey;
      line-height: 30px;
      background-color: @grey;
      border-right: 1px solid @dark-grey;
    }

    .delete {
      width: 10px;
      height: 30px;
      background-color: @dark-grey;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      transition: background-color 0.6s;
    }
  }
}
</style>