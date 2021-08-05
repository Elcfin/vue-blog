<template>
  <div class="tags">
    <div v-for="tag in tags"
         :key="tag"
         class="tag-wrap"
         :class="{checked:tagsChecked.includes(tag)}"
         @click="filterArticle(tag)">
      <!-- 虽然可以用左边框实现同样效果，不过留着或许可以加什么功能 -->
      <div class="todo"></div>
      <div class="tag">
        {{tag.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'
import { getPublicTags as apiGetPublicTags } from '@/api'
import { awaitWraper, processApiError } from '@/utils'

const getPublicTagsData = async () => {
  let tags = []
  const res = await awaitWraper(apiGetPublicTags())
  if (res[0]) processApiError(res[0])
  else tags = res[1].data.tags

  return tags
}

export default {
  name: 'HomeTag',
  async setup(props, context) {
    const tagsChecked = inject('tagsChecked')
    const tagsInfo = await getPublicTagsData()
    const tags = reactive(tagsInfo)

    const filterArticle = (tag) => {
      tagsChecked.includes(tag)
        ? tagsChecked.splice(tagsChecked.indexOf(tag), 1)
        : tagsChecked.push(tag)
      context.emit('filterArticle')
    }

    return { tagsChecked, tags, filterArticle }
  }
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
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.6s;

    &:hover {
      background-color: @dark-grey;
    }

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

  .checked {
    background-color: @dark-grey;
  }
}
</style>