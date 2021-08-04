<template>
  <div>
    <div class="content">
      <common-content class="common-content chart-wrap">
        <img :src="state.chart"
             alt="chart"
             class="chart">
      </common-content>
      <home-tag-content @filterArticle="changeHomePage"></home-tag-content>
      <common-content class="common-content article"
                      v-for="item in articles"
                      :key="item"
                      @click="$emit('readArticle',item)">
        <div class="common-content-top">
          <div class="title">
            {{item.title}}
          </div>
          <div class="create-time time">发表于 {{item.createTime}}</div>
        </div>
        <div class="abstract"
             :v-if="item.abstract!==''">
          <v-md-editor v-model="item.abstract"
                       mode="preview"></v-md-editor>
          <div class="shell"></div>
        </div>
      </common-content>
    </div>
    <home-paging @changeHomePage="changeHomePage"
                 :pageNumber="homePageNumber"></home-paging>
  </div>
</template>

<script>
import { inject } from 'vue'
import CommonContent from '@/components/CommonContent.vue'
import HomePaging from '@/components/HomePaging.vue'
import HomeTagContent from '@/components/HomeTagContent.vue'

import {
  paging as apiPaging,
  getPageNumber as apiGetPageNumber,
  filterTags as apiFilterTags
} from '@/api/'

const transformTime = (time) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

export default {
  name: 'Home',
  components: {
    CommonContent,
    HomePaging,
    HomeTagContent
  },
  setup() {
    const state = inject('state')
    return { state }
  },
  data: function () {
    return {
      articles: [],
      homePageNumber: 1
    }
  },
  methods: {
    changeHomePage: async function (currentHomePage) {
      const data = {
        size: this.state.pagingSize,
        page: currentHomePage,
        tags: this.state.tagsChecked
      }

      const res = await apiPaging(data)
      this.articles = res.data.articles

      if (this.articles.length) {
        this.articles.forEach((article) => {
          article.createTime = transformTime(article.createTime)
        })
      }

      const numberResult = await apiGetPageNumber(data)
      this.homePageNumber = numberResult.data.pageNumber
    }
  },
  async created() {
    await apiFilterTags()

    const data = {
      size: this.state.pagingSize,
      tags: this.state.tagsChecked,
      page: 1
    }
    const res = await apiPaging(data)
    this.articles = res.data.articles

    if (this.articles.length) {
      this.articles.forEach((article) => {
        article.createTime = transformTime(article.createTime)
      })
    }

    const numberResult = await apiGetPageNumber(data)

    this.homePageNumber = numberResult.data.pageNumber
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.content {
  display: flex;
  flex-direction: column;

  .chart-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    height: 80px;
    transition: height 1.2s;
  }

  .chart-wrap:hover {
    height: 480px;
  }

  .article {
    margin-top: 15px;
  }

  .common-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .common-content-top {
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
}
</style>