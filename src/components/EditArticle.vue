<template>
  <div>
    <common-content class="common-content">
      <div class="input-wrap">
        <input type="text"
               placeholder="标题"
               v-model="article.title" />
        <div class="save-wrap">
          <img src="@/assets/save.png"
               class="save"
               @click="updateArticle">
        </div>
      </div>
      <div class="input-wrap">
        <input type="text"
               placeholder="标签"
               v-model="article.tags" />
      </div>
      <v-md-editor v-model="article.abstract"
                   height="200px"
                   placeholder="摘要"></v-md-editor>
      <v-md-editor v-model="article.content"
                   height="600px"
                   placeholder="正文"></v-md-editor>

    </common-content>

  </div>
</template>

<script>
import CommonContent from '@/components/CommonContent.vue'
import {
  getArticle as apiGetArticle,
  updateArticle as apiUpdateArticle,
  filterTags as apiFilterTags
} from '@/api'

export default {
  name: 'WriteArticle',
  components: { CommonContent },
  data: function () {
    return {
      article: {
        tags: '[""]'
      }
    }
  },
  methods: {
    updateArticle: async function () {
      const data = this.article
      await apiUpdateArticle(data)
      await apiFilterTags()
    }
  },
  async created() {
    const data = {
      id: this.$route.params.id
    }
    const articleRes = await apiGetArticle(data)
    this.article = articleRes.data[0]

    const tags = []
    if (this.article.tags.length) {
      for (const tag of this.article.tags) {
        tags.push(tag.name)
      }
    }

    this.article.tags = JSON.stringify(tags)
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.common-content {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Tahoma;

    & > input[type='text'] {
      box-sizing: border-box;
      padding: 10px 20px;
      width: 100%;

      font-family: Tahoma;
      font-size: 14px;
      border: none;
      background-color: @grey;
      outline: none;
    }

    .save-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .save {
        height: 30px;
        cursor: pointer;
        transition: background-color 0.6s;
      }

      .save:hover {
        background-color: @dark-grey;
      }
    }
  }
}
</style>