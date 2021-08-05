<template>
  <manager-content class="manager-content">
    <template v-slot:title>标签</template>
    <template v-slot:nav-bar>
      <div class="null"></div>
    </template>
    <template v-slot:items>
      <manager-tag-items :tags="info.tags">
      </manager-tag-items>
    </template>
  </manager-content>
</template>

<script>
import { reactive, watch, inject } from 'vue'
import ManagerContent from '@/components/ManagerContent.vue'
import { getTags as apiGetTags } from '@/api'
import ManagerTagItems from '@/components/ManagerTagItems.vue'
import { awaitWraper, processApiError } from '@/utils'

const getTagsData = async () => {
  let tags = []
  const res = await awaitWraper(apiGetTags())
  if (res[0]) processApiError(res[0])
  else tags = res[1].data.tags
  return tags
}

export default {
  name: 'ManagerTag',
  components: { ManagerContent, ManagerTagItems },
  async setup() {
    const info = reactive({})
    const flush = inject('flush')

    watch(
      () => flush.tag,
      async () => {
        info.tags = reactive(await getTagsData())
      }
    )

    info.tags = reactive(await getTagsData())

    return { info }
  }
}
</script>

<style lang='less' scoped>
.null {
  display: none;
}
</style>