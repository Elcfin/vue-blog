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
               @click="createArticle">
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
import CommonContent from '@/components/CommonContent.vue'
import { createArticle as apiCreateArticle } from '@/api'
import { awaitWraper, processApiError } from '@/utils'

export default {
  name: 'WriteArticle',
  components: { CommonContent },
  setup(props, context) {
    const article = reactive({ tags: '[""]' })
    const state = inject('state')
    /* 创建新文章 */
    const createArticle = async () => {
      const data = article
      const res = await awaitWraper(apiCreateArticle(data))
      if (res[0]) processApiError(res[0])
      else {
        console.log('create success')
        state.currentPage = 'manager'
        /* 保存成功后触发回到管理页面 */
        context.emit('changePage')
      }
    }
    return { article, createArticle }
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