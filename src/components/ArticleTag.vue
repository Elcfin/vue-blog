<template>
  <div class="tags"
       :v-if="tags.length">
    <div v-for="tag in tags"
         :key="tag"
         class="tag">
      # {{tag.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTag',
  props: { tags: Array }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 14px;

  .tag {
    padding: 5px 10px;
    color: @font-color-grey;
    background-color: @grey;
    border-left: 1px solid @dark-grey;
    border-right: 1px solid @dark-grey;
  }
}
</style>