<template>
  <div>
    <div class="tags">
      <div v-for="item in tags"
           :key="item"
           class="tag-wrap"
           @click="state.tagsChecked.includes(item)?state.tagsChecked.splice(state.tagsChecked.indexOf(item),1):state.tagsChecked.push(item);
           filterArticle()">
        <div class="delete"></div>
        <div class="tag"
             :class="{checked:state.tagsChecked.includes(item)}"> {{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { getTags as apiGetTags } from '@/api/index'

export default {
  name: 'HomeTagContent',
  data: function () {
    return {
      tags: []
    }
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  methods: {
    filterArticle: function () {
      this.$emit('filterArticle')
    }
  },
  async created() {
    const tags = await apiGetTags()
    this.tags = tags.data
  }
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
    cursor: pointer;

    .tag {
      display: flex;
      align-items: center;

      padding: 0 10px;
      height: 30px;
      color: @font-color-grey;
      line-height: 30px;
      background-color: #fff;
      border-right: 1px solid @dark-grey;
      transition: background-color 0.6s;
    }

    .tag:hover {
      background-color: @dark-grey;
    }

    .checked {
      background-color: @dark-grey;
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