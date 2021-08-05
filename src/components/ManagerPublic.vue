<template>
  <manager-content>
    <template v-slot:title>发布</template>
    <template v-slot:items>
      <manager-items :items="info.publics"
                     :icons="icons"
                     @iconClick="iconClick"
                     @readArticle="readArticle">
      </manager-items>
    </template>
    <template v-slot:paging>
      <manager-paging @changeManagerPage="filterPublics"
                      :pageNumber="publicPageNumber">
      </manager-paging>
    </template>
  </manager-content>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue'
import ManagerContent from '@/components/ManagerContent.vue'
import ManagerPaging from '@/components/ManagerPaging.vue'
import ManagerItems from '@/components/ManagerItems.vue'
import { awaitWraper, processApiError } from '@/utils'
import {
  publicPaging as apiPublicPaging,
  getPublicPageNumber as apiGetPublicPageNumber,
  toDraftArticle as apiToDraftArticle
} from '@/api/'

const getPublics = async (data) => {
  const res = await awaitWraper(apiPublicPaging(data))
  let publics = []
  if (res[0]) processApiError(res[0])
  else publics = res[1].data.publics
  return publics
}

const getPageNumber = async (data) => {
  const res = await awaitWraper(apiGetPublicPageNumber(data))
  let publicPageNumber = 1
  if (res[0]) processApiError(res[0])
  else publicPageNumber = res[1].data.publicPageNumber
  return publicPageNumber
}

const toDraft = async (article) => {
  const res = await awaitWraper(apiToDraftArticle(article))
  if (res[0]) processApiError(res[0])
  else console.log('toDraft success')
}

export default {
  name: 'ManagerPublic',
  components: {
    ManagerContent,
    ManagerPaging,
    ManagerItems
  },
  async setup(props, context) {
    const state = inject('state')
    const flush = inject('flush')
    const info = reactive([])
    const publicPageNumber = ref(1)
    const filterPublics = async (currentPage = 1) => {
      const data = {
        size: state.pagingSize,
        page: currentPage
      }
      info.publics = reactive(await getPublics(data))
      publicPageNumber.value = await getPageNumber(data)
    }

    watch(
      () => flush.public,
      async () => {
        await filterPublics()
      }
    )

    await filterPublics()

    const writeArticle = () => {
      state.currentPage = 'write'
      context.emit('writeArticle')
    }

    const readArticle = (article) => {
      context.emit('readArticle', article)
    }

    const iconClick = async (icon, item) => {
      switch (icon.alt) {
        case 'toDraft':
          await toDraft(item)
          /* 同时更新自身与 draft 部分 */
          flush.draft = !flush.draft
          await filterPublics()
          break
        case 'edit':
          state.currentPage = 'edit'
          context.emit('editArticle', item)
          break
        case 'delete':
          context.emit('deleteArticle', item)
          await filterPublics()
          break
      }
    }

    const icons = reactive([
      { src: require('../assets/toDraft.png'), alt: 'toDraft' },
      { src: require('../assets/edit.png'), alt: 'edit' },
      { src: require('../assets/delete.png'), alt: 'delete' }
    ])

    return {
      info,
      state,
      filterPublics,
      publicPageNumber,
      writeArticle,
      readArticle,
      icons,
      iconClick
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.icon {
  height: 20px;
  background-color: @grey;
  border-radius: 6px;
  transition: background-color 0.6s;

  &:hover {
    background-color: @dark;
  }
}
</style>