<template>
  <manager-content>
    <template v-slot:title>草稿</template>
    <template v-slot:top-icon>
      <img class="icon"
           src="@/assets/addition.png"
           alt="add"
           @click="writeArticle">
    </template>
    <template v-slot:items>
      <manager-items :items="info.drafts"
                     :icons="icons"
                     @iconClick="iconClick"
                     @readArticle="readArticle">
      </manager-items>
    </template>
    <template v-slot:paging>
      <manager-paging @changeManagerPage="filterDrafts"
                      :pageNumber="draftPageNumber">
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
  draftPaging as apiDraftPaging,
  getDraftPageNumber as apiGetDraftPageNumber,
  toPublicArticle as apiToPublicArticle
} from '@/api/'

const getDrafts = async (data) => {
  const res = await awaitWraper(apiDraftPaging(data))
  let drafts = []
  if (res[0]) processApiError(res[0])
  else drafts = res[1].data.drafts
  return drafts
}

const getPageNumber = async (data) => {
  const res = await awaitWraper(apiGetDraftPageNumber(data))
  let draftPageNumber = 1
  if (res[0]) processApiError(res[0])
  else draftPageNumber = res[1].data.draftPageNumber
  return draftPageNumber
}

const toPublic = async (article) => {
  const res = await awaitWraper(apiToPublicArticle(article))
  if (res[0]) processApiError(res[0])
  else console.log('toPublic success')
}

export default {
  name: 'ManagerDraft',
  components: {
    ManagerContent,
    ManagerPaging,
    ManagerItems
  },
  async setup(props, context) {
    const state = inject('state')
    const flush = inject('flush')
    const info = reactive([])
    const draftPageNumber = ref(1)
    const filterDrafts = async (currentPage = 1) => {
      const data = {
        size: state.pagingSize,
        page: currentPage
      }
      info.drafts = reactive(await getDrafts(data))
      draftPageNumber.value = await getPageNumber(data)
    }

    watch(
      () => flush.draft,
      async () => {
        await filterDrafts()
      }
    )

    await filterDrafts()

    const writeArticle = () => {
      state.currentPage = 'write'
      context.emit('writeArticle')
    }

    const readArticle = (article) => {
      context.emit('readArticle', article)
    }

    const iconClick = async (icon, item) => {
      switch (icon.alt) {
        case 'toPublic':
          await toPublic(item)
          /* 同时更新自身与 public 部分 */
          flush.public = !flush.public
          await filterDrafts()
          break
        case 'edit':
          state.currentPage = 'edit'
          context.emit('editArticle', item)
          break
        case 'delete':
          context.emit('deleteArticle', item)
          await filterDrafts()
          break
      }
    }

    const icons = reactive([
      { src: require('../assets/toPublic.png'), alt: 'toPublic' },
      { src: require('../assets/edit.png'), alt: 'edit' },
      { src: require('../assets/delete.png'), alt: 'delete' }
    ])

    return {
      info,
      state,
      filterDrafts,
      draftPageNumber,
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