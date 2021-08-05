<template>
  <div>
    <common-content class="common-content">
      <div class="top-bar">
        <input type="text"
               placeholder="标题"
               class="input"
               v-model="article.title" />
        <div class="save-wrap">
          <img src="@/assets/save.png"
               class="save"
               @click="updateArticle">
        </div>
      </div>
      <input type="text"
             placeholder="标签"
             class="input"
             v-model="article.tags" />
      <v-md-editor v-model="article.abstract"
                   height="200px"
                   placeholder="摘要">
      </v-md-editor>
      <v-md-editor v-model="article.content"
                   height="600px"
                   placeholder="正文">
      </v-md-editor>
    </common-content>
  </div>
</template>

<script>
import { reactive, inject } from 'vue'
import { useRoute } from 'vue-router'
import CommonContent from '@/components/CommonContent.vue'
import {
  getArticle as apiGetArticle,
  updateArticle as apiUpdateArticle,
  filterTags as apiFilterTags
} from '@/api'
import { awaitWraper, processApiError } from '@/utils'

const getArticleData = async (data) => {
  const res = await awaitWraper(apiGetArticle(data))
  let article
  if (res[0]) processApiError(res[0])
  else {
    article = res[1].data.article

    if (article.tags.length) {
      const tags = []
      for (const tag of article.tags) tags.push(tag.name)
      article.tags = JSON.stringify(tags)
    } else article.tags = '[""]'
  }
  return article
}

export default {
  name: 'EditArticle',
  components: { CommonContent },
  async setup(props, context) {
    const route = new useRoute()

    /* 获取文章数据 */
    const data = { id: route.params.id }
    const articleInfo = await getArticleData(data)
    const article = reactive(articleInfo)

    /* 更新文章数据 */
    const updateArticle = async () => {
      const data = article
      const state = inject('state')
      const res = await awaitWraper(apiUpdateArticle(data))

      if (res[0]) processApiError(res[0])
      else {
        console.log('updateArticle success')

        /* 更新后过滤，删去没有文章使用的标签 */
        const filterRes = await awaitWraper(apiFilterTags())
        if (filterRes[0]) processApiError(filterRes[0])
        else console.log('filterTags success')

        /* 保存成功后触发回到管理页面 */
        state.currentPage = 'manager'
        context.emit('changePage')
      }
    }
    return { article, updateArticle }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.common-content {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .top-bar {
    display: flex;
    align-items: center;
    gap: 10px;

    .save-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .save {
        height: 30px;
        cursor: pointer;
        transition: background-color 0.6s;

        &:hover {
          background-color: @dark-grey;
        }
      }
    }
  }

  .input {
    box-sizing: border-box;
    padding: 10px 20px;
    width: 100%;
    font-family: Tahoma;
    font-size: 14px;
    background-color: @grey;
    border: none;
    outline: none;
  }
}
</style>