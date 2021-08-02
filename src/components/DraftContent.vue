<template>
  <div class="content">
    <v-md-editor v-model="text"
                 height="400px"
                 @save="saveText"></v-md-editor>
    <v-md-editor v-model="text"
                 mode="preview"></v-md-editor>
  </div>

</template>

<script>
export default {
  name: 'Content',
  data: function () {
    return {
      text: ' '
    }
  },
  computed: {},
  methods: {
    saveText() {
      const text = this.text
      console.log(text)
    }
  }
}
</script>

<style lang='less' scoped>
@import '@/assets/style/base.less';

.content {
  &:extend(.common-block);

  padding: 10px;
  width: 100%;
  min-height: 200px;
}
</style>