<template>
  <div class="wrap">
    <manager-tag></manager-tag>
    <manager-draft @WriteArticle="$emit('WriteArticle')"
                   @readArticle="readArticle"
                   @editArticle="editArticle"
                   @deleteArticle="deleteArticle"></manager-draft>
    <manager-public @readArticle="readArticle"
                    @editArticle="editArticle"
                    @deleteArticle="deleteArticle"></manager-public>
  </div>
</template>

<script>
import { reactive, provide } from 'vue'
import ManagerTag from '@/components/ManagerTag.vue'
import ManagerDraft from '@/components/ManagerDraft.vue'
import ManagerPublic from '@/components/ManagerPublic.vue'
import { awaitWraper, processApiError } from '@/utils'
import {
  deleteArticle as apiDeleteArticle,
  filterTags as apiFilterTags
} from '@/api/'

export default {
  name: 'Manager',
  components: {
    ManagerDraft,
    ManagerPublic,
    ManagerTag
  },
  async setup(props, context) {
    const flush = reactive({ tag: true, draft: true, public: true })
    provide('flush', flush)

    const readArticle = (article) => {
      context.emit('readArticle', article)
    }

    const editArticle = (article) => {
      context.emit('editArticle', article)
    }

    const deleteArticle = async (article) => {
      const res = await awaitWraper(apiDeleteArticle(article))
      if (res[0]) processApiError(res[0])
      else 'delete success'
      const filterRes = await awaitWraper(apiFilterTags())
      if (filterRes[0]) processApiError(filterRes[0])
      else {
        console.log('filterTags success')
        flush.tag = !flush.tag
      }
    }

    return { readArticle, editArticle, deleteArticle }
  }
}
</script>

<style lang='less' scoped>
.wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.null {
  display: none;
}
</style>