<template>
  <div>
    <common-content class="common-content">
      <div class="wrap">
        <v-md-editor v-model="state.about"
                     mode="preview">
        </v-md-editor>
        <div class="shell">
        </div>
      </div>
    </common-content>
  </div>
</template>

<script>
import { inject } from 'vue'
import CommonContent from '@/components/CommonContent.vue'

export default {
  name: 'About',
  components: {
    CommonContent
  },
  setup() {
    const state = inject('state')
    return { state }
  }
}
</script>

<style lang='less' scoped>
.common-content {
  /* 覆盖原组件 padding 样式 */
  padding: 0;
  overflow: hidden;

  .wrap {
    position: relative;

    /*遮盖 markdown 编辑器插件底部 cursor: pointer */
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