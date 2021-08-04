<template>
  <div>
    <common-content class="common-content">
      <div class="content">
        <v-md-editor v-model="article.content"
                     mode="preview">
        </v-md-editor>
        <div class="shell"></div>
      </div>
    </common-content>
    <article-tag :tags="article.tags"></article-tag>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import CommonContent from '@/components/CommonContent.vue'
import ArticleTag from '@/components/ArticleTag.vue'
import { getArticle as apiGetArticle } from '@/api'
import { transformTime, awaitWraper, processApiError } from '@/utils'

const getArticleData = async (data) => {
  const res = await awaitWraper(apiGetArticle(data))
  let article
  if (res[0]) processApiError(res[0])
  else {
    article = res[1].data.article
    article.createTime = transformTime(article.createTime)
    article.lastEditTime = transformTime(article.lastEditTime)

    /* 将标题和时间加入内容中直接渲染 */
    article.content =
      `# ${article.title}\n` +
      `>${article.createTime} | 更新于 ${article.lastEditTime}\n\n` +
      `${article.content}`
  }

  return article
}

export default {
  name: 'Article',
  components: { CommonContent, ArticleTag },
  async setup() {
    const route = new useRoute()

    /* 获取文章数据 */
    const data = { id: route.params.id }
    const articleInfo = await getArticleData(data)
    const article = reactive(articleInfo)

    return { article }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

/* 覆盖原组件样式 */

.common-content {
  /* 覆盖原组件 padding 样式 */
  padding: 0;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 4px #aaa;
  }

  .content {
    position: relative;
    margin-bottom: 20px;

    /*遮盖 markdown 编辑器插件底部 cursor: pointer */
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