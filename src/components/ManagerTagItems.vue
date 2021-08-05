<template>
  <div class="tags">
    <div v-for="tag in tags"
         :key="tag"
         class="tag-wrap">
      <div class="todo"></div>
      <div class="tag">
        {{tag.name}}
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
  color: @font-color-grey;

  .tag-wrap {
    display: flex;
    background-color: @grey;
    height: 30px;
    line-height: 30px;

    .tag {
      padding: 0 10px;
      border-right: 1px solid @dark-grey;
    }

    .todo {
      width: 10px;
      background-color: @dark-grey;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
</style>