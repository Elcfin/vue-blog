<template>
  <div>
    <common-content class="common-content">
      <div class="content">
        <v-md-editor v-model="article.content"
                     mode="preview"></v-md-editor>
        <div class="shell"></div>
      </div>
    </common-content>
    <div class="tags"
         :v-if="tags.length">
      <div v-for="item in tags"
           :key="item"
           class="tag-wrap">
        <div class="tag"># {{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'
import { getArticle as apiGetArticle } from '@/api'

const transformTime = (time) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

export default {
  name: 'Article',
  components: { CommonContent },
  data: function () {
    return { article: {}, tags: [] }
  },
  async created() {
    const data = {
      id: this.$route.params.id
    }
    const articleRes = await apiGetArticle(data)
    this.article = articleRes.data[0]

    this.article.createTime = transformTime(this.article.createTime)
    this.article.lastEditTime = transformTime(this.article.lastEditTime)

    if (this.article.tags.length) {
      for (const tag of this.article.tags) {
        this.tags.push(tag)
      }
    }

    this.article.content = `# ${this.article.title}\n>${this.article.createTime} | 更新于 ${this.article.lastEditTime}\n\n${this.article.content}`
  }
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

  .tag-wrap {
    display: flex;
    font-size: 14px;

    .tag {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 24px;
      color: @font-color-grey;
      line-height: 24px;
      background-color: @grey;
      border-left: 1px solid @dark-grey;
      border-right: 1px solid @dark-grey;
    }
  }
}

.common-content:hover {
  box-shadow: 0 0 4px #aaa;
}

.common-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  overflow: hidden;

  .content {
    position: relative;
    margin-bottom: 20px;

    .shell {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 10px;
      cursor: default;
      z-index: 1;
    }
  }
}
</style>