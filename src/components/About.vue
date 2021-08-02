<template>
  <div>
    <common-content class="common-content">
      <v-md-editor v-model="text"
                   mode="preview"></v-md-editor>
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
  },
  data: function () {
    return {
      text: this.state.about
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';
</style>