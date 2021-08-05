<template>
  <div>
    <div>
      <home-chart></home-chart>
      <home-tag @filterArticle="filterArticle"></home-tag>
      <home-article v-for="article in info.articles"
                    :article="article"
                    :key="article._id"
                    @readArticle="readArticle"></home-article>
    </div>
    <home-paging @changeHomePage="filterArticle"
                 :pageNumber="homePageNumber"></home-paging>
  </div>
</template>

<script>
import { inject, provide, reactive, ref } from 'vue'
import HomePaging from '@/components/HomePaging.vue'
import HomeTag from '@/components/HomeTag.vue'
import HomeArticle from '@/components/HomeArticle.vue'
import HomeChart from '@/components/HomeChart.vue'
import { transformTime, awaitWraper, processApiError } from '@/utils'

import { paging as apiPaging, getPageNumber as apiGetPageNumber } from '@/api/'

const getArticles = async (data) => {
  const res = await awaitWraper(apiPaging(data))
  let articles = []
  if (res[0]) processApiError(res[0])
  else articles = res[1].data.articles
  articles.forEach((article) => {
    article.createTime = transformTime(article.createTime)
  })
  return articles
}

const getPageNumber = async (data) => {
  const res = await awaitWraper(apiGetPageNumber(data))
  let homePageNumber = 1
  if (res[0]) processApiError(res[0])
  else homePageNumber = res[1].data.pageNumber

  return homePageNumber
}

export default {
  name: 'Home',
  components: {
    HomePaging,
    HomeTag,
    HomeChart,
    HomeArticle
  },
  async setup(props, context) {
    const state = inject('state')
    const tagsChecked = reactive([])
    provide('tagsChecked', tagsChecked)
    const readArticle = (article) => {
      context.emit('readArticle', article)
    }

    const info = reactive({})
    const homePageNumber = ref(1)
    const filterArticle = async (currentPage = 1) => {
      const data = {
        size: state.pagingSize,
        page: currentPage,
        tags: tagsChecked
      }
      info.articles = reactive(await getArticles(data))
      homePageNumber.value = await getPageNumber(data)
    }

    await filterArticle()

    return {
      state,
      tagsChecked,
      readArticle,
      filterArticle,
      info,
      homePageNumber
    }
  }
}
</script>

<style lang='less' scoped>
</style>