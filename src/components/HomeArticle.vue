<template>

  <common-content class="article"
                  @click="readArticle">
    <div class="article-top">
      <div class="title">
        {{articleInfo.title}}
      </div>
      <div class="time">
        发表于 {{articleInfo.createTime}}
      </div>
    </div>
    <div class="abstract">
      <v-md-editor v-model="articleInfo.abstract"
                   mode="preview">
      </v-md-editor>
      <div class="shell"></div>
    </div>
  </common-content>

</template>

<script>
import { reactive, inject } from 'vue'
import CommonContent from '@/components/CommonContent.vue'

export default {
  name: 'HomeArticle',
  components: {
    CommonContent
  },
  setup(props, context) {
    const state = inject('state')
    const articleInfo = reactive(props.article)
    const readArticle = () => {
      state.currentPage = 'article'
      context.emit('readArticle', props.article)
    }
    return { articleInfo, readArticle }
  },
  props: {
    article: Object
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.article {
  margin-top: 15px;
  overflow: hidden;

  .article-top {
    padding: 15px;
    padding-bottom: 0;

    .title {
      padding: 10px;
      font-weight: bold;
      font-size: 20px;
    }

    .time {
      padding: 10px;
      padding-bottom: 0;
      font-size: 14px;
      color: @font-color-grey;
    }
  }

  .abstract {
    position: relative;

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